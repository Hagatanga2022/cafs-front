<template>
  <v-container>
    <v-btn @click="login = true" class="v-btn1" v-on="on">Login</v-btn>
    <v-dialog v-model="login" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-card-title class="text-h3 justify-center teal--text"
          >Login</v-card-title
        >
        <v-col justify="center">
          <v-text-field
            class="input mx-auto"
            color="teal"
            square
            outlined
            v-model="text"
            label="Digite seu e-mail"
          ></v-text-field>
          <v-text-field
            class="input mx-auto"
            color="teal"
            square
            outlined
            v-model="text"
            label="Digite sua senha"
          >
          </v-text-field>
        <div class="mt-2" align="center">
          <v-btn class="mt-1 white--text" color="teal">Logar</v-btn>
        </div>
        </v-col>
        <v-col>
          <div align="center">Ainda não possui uma conta?</div>
          <div @click="cadastro = true">
            <Cadastro />
          </div>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Cadastro from '../components/Cadastro.vue'
export default {
  data() {
    return {
      login: false,
      Cadastro,
    };
  },
};
</script>

<style>
.pop-up-card {
  justify-items: center;
  border-radius: 50px;
}
.input {
  max-width: 400px;
  display: block;
}
.v-btn1:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: none;
}
</style>
