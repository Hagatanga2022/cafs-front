<template>
  <v-container>
    <v-btn @click="newAccount = true" class="v-btn1">Cadastro</v-btn>
    <v-dialog v-model="newAccount" max-width="600px" max-height="600px">
      <v-card class="mx-auto" max-width="600">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="Apelido"
                v-model="form.username"
              ></v-text-field>

              <v-text-field
                label="Email"
                v-model="form.email"
                hint="youremail@gmail.com"
                append-icon="mdi-email"
              ></v-text-field>

              <span class="text-caption grey--text text--darken-1">
                Este é o e-mail que você usará para fazer login na sua conta
                C.A.F.S
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                label="SIAPE"
                v-model="form.siape"
                type="number"
              ></v-text-field>

              <v-text-field
                label="CPF"
                v-model="form.cpf"
                type="number"
              ></v-text-field>
              <span class="text-caption grey--text text--darken-1">
                Por favor, digite seus dados pessoais
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <v-text-field
                label="Senha"
                v-model="form.password1"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
              >
              </v-text-field>

              <v-text-field
                label="Confirme sua senha"
                v-model="form.password2"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              >
              </v-text-field>
              <span class="text-caption grey--text text--darken-1">
                Por favor, digite uma senha para sua a conta
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="4">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="../assets/LOGO02.png"
              ></v-img>
              <h3 class="text-h6 font-weight-light mb-2">
                Bem vindo ao C.A.F.S.
              </h3>
              <span class="text-caption grey--text">
                Pronto para fazer seu cadastro!</span
              >
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--"> Voltar </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step < 4" color="primary" depressed @click="step++">
            Próximo
          </v-btn>
          <v-btn
            v-if="step === 4"
            color="primary"
            depressed
            @click="submitForm"
          >
            Concluir Cadastro
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="red darken-2"
      v-model="errorRegister"
      multline
      timeout="2000"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    newAccount: false,
    show: false,
    errorMessage: null,
    errorRegister: false,
    form: {},
    step: 1,
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Cadastrar-se";
        case 2:
          return "Informações pessoais";
        case 3:
          return "Criar senha";
        default:
          return "Dados informados!";
      }
    },
  },
  methods: {
    ...mapActions("auth", ["register"]),

    async submitForm() {
      try {
        await this.register(this.form);
        this.$router.push({ path: "/home" });
      } catch (e) {
        let firstDataError = JSON.stringify(
          Object.keys(e.response.data)[0]
        ).replace(/[\]["]/g, "");
        this.errorMessage = `${firstDataError.toUpperCase()}, ${JSON.stringify(
          e.response.data[firstDataError]
        )
          .replace(/[\]["]/g, "")
          .toLowerCase()}`;
        this.errorRegister = true;
      }
    },
  },
};
</script>
