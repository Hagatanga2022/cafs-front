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
    <v-container sm="7" class="pl-12 pt-12" fluid>
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
          class="textfield-perfil"
          color="teal"
          square
          outlined
          v-model="newUser.username"
        ></v-text-field>
        <h3>Nome</h3>
        <v-text-field
          class="textfield-perfil"
          color="teal"
          square
          outlined
          v-model="newUser.first_name"
        ></v-text-field>
        <h3>Sobrenome</h3>
        <v-text-field
          class="textfield-perfil"
          color="teal"
          square
          outlined
          v-model="newUser.last_name"
        ></v-text-field>
        <h3>Siape</h3>
        <v-text-field
          class="textfield-perfil"
          color="teal"
          type="number"
          square
          outlined
          v-model.number="newUser.siape"
        ></v-text-field>
        <h3>CPF</h3>
        <v-text-field
          class="textfield-perfil"
          color="teal"
          type="number"
          square
          outlined
          v-model.number="newUser.cpf"
        ></v-text-field>
        <h3>Foto de Perfil</h3>
        <v-file-input
          class="textfield-perfil"
          :rules="rules"
          square
          outlined
          type="file"
          ref="file"
          @change="uploadFile"
          show-size
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Upe sua foto de perfil"
          prepend-icon=""
          prepend-inner-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>
        <br />
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
import axios from "axios";
import { mapState, mapActions } from "vuex";
import Perfil from "../assets/perfil.jpg";

export default {
  created() {
    this.newUser = { ...this.user };
  },
  data: () => ({
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
        "O tamanho do avatar deve ser menor de 2 MB!",
    ],
  }),
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
      console.log(
        !Object.keys(this.newUser).every(
          (key) =>
            this.user.hasOwnProperty(key) &&
            this.user[key] === this.newUser[key]
        ) || this.image !== undefined
      );
      return (
        !Object.keys(this.newUser).every(
          (key) =>
            this.user.hasOwnProperty(key) &&
            this.user[key] === this.newUser[key]
        ) || this.image !== undefined
      );
    },
    uploadFile() {
      this.image = this.$refs.file[Object.keys(this.$refs.file)[95]];
    },
    async submitFile() {
      const formData = new FormData();
      formData.append("file", this.image);
      const headers = { "Content-Type": "multipart/form-data" };
      const { data } = await axios.post(
        `${axios.defaults.baseURL}api/media/images/`,
        formData,
        { headers }
      );
      return data.attachment_key;
    },
    async updateUserInfo() {
      if (await this.hasChangedUserInfo()) {
        try {
          if (this.newUser.username == this.user.username)
            delete this.newUser.username;
          if (this.image)
            this.newUser.profile_photo_attachment_key = await this.submitFile();
          await this.updateUser(this.newUser);
          this.newUser = { ...this.user };
          this.save = true;
        } catch (e) {
          this.newUser = { ...this.user };
          console.log(e);

          // Error message formatting
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
.textfield-perfil {
  max-width: 30%;
}

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
</style>
