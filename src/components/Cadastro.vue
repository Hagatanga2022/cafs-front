<template>
  <v-container>
    <v-btn @click="Novaconta = true" class="v-btn1">Cadastro</v-btn>
    <v-dialog v-model="Novaconta" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-card-title class="text-h3 justify-center teal--text">Cadastro</v-card-title>
        <v-col>
          <v-text-field class="input mx-auto" color="teal" square outlined label="Nome"></v-text-field>
          <v-text-field class="input mx-auto" color="teal" square outlined label="Sobrenome">
          </v-text-field>
          <v-text-field class="input mx-auto" color="teal" square outlined label="SIAPE">
          </v-text-field>
          <v-text-field class="input mx-auto" color="teal" append-icon="mdi-email" square outlined label="Email"
            hint="www.example.com/page">
          </v-text-field>
          <v-text-field class="input mx-auto" color="teal" :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" outlined label="Senha">
          </v-text-field>
          <div align="center">
            <v-btn class="ma-1 white--text" color="teal">Cadastrar</v-btn>
          </div>
        </v-col>
        <!-- <v-col>
          <div align="center">Já possui uma conta?</div>
          <div @click="cadastro = true">
            <Cadastro />
          </div>
        </v-col> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Novaconta: false,
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>
.pop-up-card {
  justify-items: center;
  border-radius: 100px;
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
