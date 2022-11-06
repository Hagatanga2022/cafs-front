<template>
  <v-container>
    <v-btn @click="loginPopUp = true" class="v-btn1">Login</v-btn>
    <v-dialog v-model="loginPopUp" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title
            class="text-h6 font-weight-regular justify-space-between"
          >
            Login
          </v-card-title>
          <span>{{ currentTitle }}</span>

          <v-col justify="center">
            <v-text-field
              @keyup.enter="submitLogin"
              color="teal"
              append-icon="mdi-email"
              square
              required
              v-model="user.username"
              label="Digite seu email ou apelido"
            ></v-text-field>

            <v-text-field
              @keyup.enter="submitLogin"
              color="teal"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              square
              required
              v-model="user.password"
              label="Digite sua senha"
            >
            </v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Esqueceu sua senha?
            </span>

            <div class="mt-2" align="center">
              <v-btn
                @click="submitLogin"
                :disabled="!valid"
                class="mt-1 white--text"
                color="blue"
                >Logar</v-btn
              >
            </div>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="red darken-2"
      v-model="errorLogin"
      multline
      timeout="2000"
      >{{ errorMessage }}</v-snackbar
    >
  </v-container>
</template>

<script>
// import Cadastro from "../components/Cadastro.vue";
import { mapActions } from "vuex";

export default {
  // components: { Cadastro },
  data() {
    return {
      user: {},
      valid: true,
      loginPopUp: false,
      errorMessage: null,
      errorLogin: false,
      show: false,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async submitLogin() {
      try {
        await this.login(this.user);
        this.$router.push({ path: "/home" });
      } catch (e) {
        let firstDataError = JSON.stringify(
          Object.keys(e.response.data)[0]
        ).replace(/[\]["]/g, "");
        this.errorMessage = JSON.stringify(
          e.response.data[firstDataError]
        ).replace(/[\]["]/g, "");
        this.errorLogin = true;
      }
    },
  },
};
</script>
