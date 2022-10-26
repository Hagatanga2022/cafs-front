<template>
  <v-app>
    <v-card id="content">
      <v-toolbar class="white--text d-flex" color="#1d6382" dark extended extension-height="100" elevation="1">
        <v-img id="Perfil" alt="Perfil" :src="Perfil" width="150" height="150"></v-img>
        <v-spacer />
        <v-toolbar-title v-model="newUser.username" class="title ml-5">
          <h1>Perfil</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container sm="7" id="profilebody" fluid
    style="padding-left: 4vw;padding-top: 6vh;">
      <div class="siape">
        <h3 class="h3">Siape</h3>
        <h1>181734619</h1>
      </div>
      <div class="cpf mt-5">
        <h3 class="h3">CPF</h3>
        <h1>736.932.871-57</h1>
      </div>
      <v-form>
        <h3 class="h3 mt-5">Apelido</h3>
        <v-text-field class="input" color="teal" square outlined v-model="newUser.username">
        </v-text-field>
        <h3 class="h3">Nome</h3>
        <v-text-field class="input" color="teal" square outlined v-model="newUser.first_name">
        </v-text-field>
        <h3 class="h3">Sobrenome</h3>
        <v-text-field class="input" color="teal" square outlined v-model="newUser.last_name">
        </v-text-field>
        <v-btn class="white--text" color="teal" @click="updateInfo">Salvar</v-btn>
      </v-form>
      <v-snackbar color="blue darken-2" v-model="salvar" multline timeout="2000">Perfil salvo com sucesso!</v-snackbar>
      <v-snackbar color="red darken-2" v-model="notChanged" multline timeout="2000">Não houve alteração no perfil!
      </v-snackbar>
      <v-snackbar color="red darken-2" v-model="errorUpdate" multline timeout="2000">Erro ao salvar o perfil!
      </v-snackbar>
    </v-container>
    <v-container sm="5"></v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Perfil from "../assets/perfil.jpg";

export default {
  created() {
    this.setInfoUser()
  },
  data() {
    return {
      Perfil,
      show: false,
      salvar: false,
      notChanged: false,
      errorUpdate: false,
      newUser: {},
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["get", "update"]),
    setInfoUser() {
      this.get()
      console.log("No peril: ", this.user.first_name)
      this.newUser.username = this.user.username
      this.newUser.first_name = this.user.first_name
      this.newUser.last_name = this.user.last_name
    },
    compareInfo() {
      return this.newUser.username != this.user.username || this.newUser.first_name != this.user.first_name || this.newUser.last_name != this.user.last_name
    },
    async updateInfo() {
      if (this.compareInfo()) {
        try {
          if (this.newUser.username == this.user.username) delete this.newUser.username
          await this.update(this.newUser);
          await this.setInfoUser();
          this.salvar = true;
        } catch (e) {
          this.errorUpdate = true;
          console.log(e);
        }
      } else {
        this.notChanged = true;
      }
    }
  }
};
</script>

<style>
.title,
#Perfil {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}

.h3 {
  color: teal;
}
#content{
  border-radius: 0;
  height: auto;
}
#profilebody{
  overflow: scroll;
}
</style>
