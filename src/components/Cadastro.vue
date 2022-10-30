<template>
  <v-container>
    <v-btn @click="novaConta = true" class="v-btn1">Cadastro</v-btn>
    <v-dialog v-model="novaConta" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-card-title class="text-h3 mb-5 justify-center teal--text"
          >Cadastro</v-card-title
        >
        <v-col>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            square
            outlined
            v-model="form.username"
            label="Apelido"
          >
          </v-text-field>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            append-icon="mdi-email"
            square
            outlined
            v-model="form.email"
            label="Email"
            hint="www.example.com/page"
          >
          </v-text-field>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            type="number"
            square
            outlined
            v-model="form.siape"
            label="Siape"
          >
          </v-text-field>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            type="number"
            square
            outlined
            v-model="form.cpf"
            label="CPF"
          >
          </v-text-field>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            outlined
            v-model="form.password1"
            label="Senha"
          >
          </v-text-field>
          <v-text-field
            class="input mx-auto"
            @keyup.enter="submitForm"
            color="teal"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            outlined
            v-model="form.password2"
            label="Confirme sua senha"
          >
          </v-text-field>
          <div align="center">
            <v-btn class="ma-1 white--text" @click="submitForm" color="teal"
              >Cadastrar</v-btn
            >
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      novaConta: false,
      show: false,
      form: {},
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async submitForm() {
      try {
        await this.register(this.form);
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
