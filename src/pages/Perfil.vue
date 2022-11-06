<template>
  <v-app>
    <v-card id="content">
      <v-toolbar
        class="white--text d-flex"
        color="#1d6382"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-row justify="space-around">
          <v-avatar id="Perfil" width="150" height="150">
            <img
              :src="user.profile_photo ? user.profile_photo.url : Perfil"
              :alt="ownerOfThePhoto"
            />
          </v-avatar>
        </v-row>
        <v-spacer />
        <v-toolbar-title v-model="newUser.username" class="title ml-5">
          <h1>{{ userName }}</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container sm="7" class="profilebody pl-12 pt-12" fluid>
      <div v-if="user.siape">
        <div>
          <h3>Siape</h3>
          <h1>{{ user.siape }}</h1>
        </div>
        <div class="mt-5">
          <h3>CPF</h3>
          <h1>{{ user.cpf }}</h1>
        </div>
      </div>
      <v-form>
        <h3 class="mt-5">Apelido</h3>
        <v-text-field
          color="teal"
          square
          outlined
          v-model="newUser.username"
        ></v-text-field>
        <h3>Nome</h3>
        <v-text-field
          color="teal"
          square
          outlined
          v-model="newUser.first_name"
        ></v-text-field>
        <h3>Sobrenome</h3>
        <v-text-field
          color="teal"
          square
          outlined
          v-model="newUser.last_name"
        ></v-text-field>
        <h3>Siape</h3>
        <v-text-field
          color="teal"
          type="number"
          square
          outlined
          v-model.number="newUser.siape"
        ></v-text-field>
        <h3>CPF</h3>
        <v-text-field
          color="teal"
          type="number"
          square
          outlined
          v-model.number="newUser.cpf"
        ></v-text-field>
        <h3>Foto de Perfil</h3>
        <v-file-input
          :rules="rules"
          square
          outlined
          show-size
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Upe sua foto de perfil"
          prepend-icon=""
          prepend-inner-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>
        <v-btn class="white--text" color="teal" @click="updateUserInfo">
          Salvar
        </v-btn>
      </v-form>
      <v-snackbar color="blue darken-2" v-model="save" multline timeout="2000">
        Perfil salvo com sucesso!
      </v-snackbar>
      <v-snackbar
        color="red darken-2"
        v-model="notChanged"
        multline
        timeout="2000"
      >
        Não houve alteração no perfil!
      </v-snackbar>
      <v-snackbar
        color="red darken-2"
        v-model="errorUpdate"
        multline
        timeout="2000"
      >
        {{ errorMessage }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Perfil from "../assets/perfil.jpg";

export default {
  created() {
    this.newUser = { ...this.user };
  },
  data() {
    return {
      Perfil,
      newUser: {},
      show: false,
      save: false,
      notChanged: false,
      errorMessage: null,
      errorUpdate: false,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),

    userName() {
      return this.newUser.first_name != "" || this.newUser.last_name != ""
        ? `Perfil de ${this.newUser.first_name} ${this.newUser.last_name}`
        : `Perfil de ${this.newUser.username}`;
    },

    ownerOfThePhoto() {
      return `Foto de ${this.userName}`;
    },
  },
  methods: {
    ...mapActions("auth", ["updateUser", "deleteUser"]),

    hasChangedUserInfo() {
      return !Object.keys(this.newUser).every(
        (key) =>
          this.user.hasOwnProperty(key) && this.user[key] === this.newUser[key]
      );
    },
    async updateUserInfo() {
      if (await this.hasChangedUserInfo()) {
        try {
          if (this.newUser.username == this.user.username)
            delete this.newUser.username;
          await this.updateUser(this.newUser);
          this.newUser = { ...this.user };
          this.save = true;
        } catch (e) {
          this.newUser = { ...this.user };
          let firstDataError = JSON.stringify(
            Object.keys(e.response.data)[0]
          ).replace(/[\]["]/g, "");
          this.errorMessage = `${firstDataError.toUpperCase()}, ${JSON.stringify(
            e.response.data[firstDataError]
          )
            .replace(/[\]["]/g, "")
            .toLowerCase()}`;
          this.errorUpdate = true;
        }
      } else {
        this.notChanged = true;
      }
    },
    async deleteUser() {
      try {
        await this.deleteUser();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.title,
#Perfil {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}

h3 {
  color: teal;
}

#content {
  border-radius: 0;
  height: auto;
}

.profilebody {
  overflow-y: visible;
}
</style>
