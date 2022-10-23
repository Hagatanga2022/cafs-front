<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-toolbar
        class="white--text d-flex"
        color="#1d6382"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-img
          id="Perfil"
          alt="Perfil"
          :src="Perfil"
          width="150"
          height="150"
        ></v-img>
        <v-spacer />
        <v-toolbar-title class="title ml-5">
          <h1>Perfil.</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container sm="7" class="pa-15" fluid>
      <div class="siape">
        <h3 class="h3">Siape</h3>
        <h1>181734619</h1>
      </div>
      <div class="cpf mt-5">
        <h3 class="h3">CPF</h3>
        <h1>736.932.871-57</h1>
      </div>
      <v-form>
        <h3 class="h3 mt-5">Email</h3>
        <v-text-field
          class="input"
          color="teal"
          append-icon="mdi-email"
          square
          outlined
          v-model="user.username"
          
        ></v-text-field>
        <h3 class="h3">Senha</h3>
        <v-text-field
          class="input"
          color="teal"
          square
          outlined
          v-model="user.password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          
        >
        </v-text-field>
        <v-btn class="white--text" color="teal" @click="verificarAtualizacao"
          >Salvar</v-btn
        >
      </v-form>
      <v-snackbar color="blue darken-2" v-model="salvar" multline timeout="2000"
        >Perfil salvo com sucesso!</v-snackbar
      >
    </v-container>
    <v-container sm="5"></v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Perfil from "../assets/perfil.jpg";

export default {
  created() {
    this.newUser.username = this.user.username
    this.newUser.password = this.user.password
  },
  data() {
    return {
      Perfil,
      show: false,
      salvar: false,
      newUser: {},
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["updateUser"]),
    verificarAtualizacao() {
      if (this.user.username != this.newUser.username || this.user.password != this.newUser.password) {
        this.updateUser(this.newUser)
        console.log("DEU")
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
</style>
