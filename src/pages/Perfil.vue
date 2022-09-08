<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-toolbar
        class="white--text d-flex"
        color="cyan darken-1"
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
          <h1>Perfil</h1>
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
          v-model="text"
          label="Digite seu e-mail"
        ></v-text-field>
        <h3 class="h3">Senha</h3>
        <v-text-field
          class="input"
          color="teal"
          square
          outlined
          v-model="text"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          label="Digite sua senha"
        >
        </v-text-field>
        <v-btn class="white--text" color="teal" @click="salvarPerfil"
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
import Perfil from "../assets/perfil.jpg";
export default {
  data() {
    return {
      Perfil,
      show: false,
    };
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

.h3 {
  color: teal;
}
</style>
