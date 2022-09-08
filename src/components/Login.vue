<template>
  <v-container>
    <v-btn @click="loginPopUp = true" class="v-btn1" v-on="on">Login</v-btn>
    <v-dialog v-model="loginPopUp" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-card-title class="text-h3 justify-center teal--text"
          >Login</v-card-title
        >
        <v-col justify="center">
          <v-text-field
            class="input mx-auto"
            color="teal"
            append-icon="mdi-email"
            square
            outlined
            v-model="user.username"
            label="Digite seu e-mail"
          ></v-text-field>
          <v-text-field
            class="input mx-auto"
            color="teal"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            square
            outlined
            v-model="user.password"
            label="Digite sua senha"
          >
          </v-text-field>
          <div class="mt-2" align="center">
            <v-btn to="/home" class="mt-1 white--text" color="teal"
              >Logar</v-btn
            >
          </div>
        </v-col>
        <!-- <v-col>
          <div align="center">Ainda não possui uma conta?</div>
          <div @click="cadastro = true">
            <Cadastro />
          </div>
        </v-col> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Cadastro from "../components/Cadastro.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loginPopUp: false,
      Cadastro,
      show: false,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async submitLogin() {
      try {
        await this.login(this.user);
        this.$router.push({ name: "Home" });
      } catch (e) {
        console.log(e);
      }
    },
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
