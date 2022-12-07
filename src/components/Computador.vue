<template>
    <v-container>
      <v-btn @click="loginPopUp = true" class="v-btn1">Cadastrar um computador</v-btn>
      <v-dialog v-model="loginPopUp" max-width="600px" max-height="600px">
        <v-card class="pop-up-card" elevation="10" outlined>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title
              class="text-h6 font-weight-regular justify-space-between"
            >
              Adicionar um computador
            </v-card-title>
  
            <v-col justify="center">
              <v-text-field
                @keyup.enter="submitLogin"
                color="teal"
                
                square
                required
                v-model="user.username"
                label="Nome"
              ></v-text-field>
  
              <v-text-field
                @keyup.enter="submitLogin"
                color="teal"
                
               
                square
                required
                v-model="user.password"
                label="Fileira"
              >
              </v-text-field>
              <v-text-field
                
                color="teal"
                
                
                
                square
                required
                v-model="user.password"
                label="Número"
              >
              </v-text-field>
              
  
              <div class="mt-2" align="center">
                <v-btn
                  
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
        ></v-snackbar
      >
    </v-container>
  </template>
  <script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    data: () => ({
    user: {},
    show: false,
    valid: true,
    loginPopUp: false,
    errorLogin: false,
    errorMessage: null,
    }),
    computed: {
    ...mapState("computer", ["computer", "allComputers"]),
  },
  methods: {
    ...mapActions("computer", [
      "postComputer",
      "editComputer",
      "deleteComputer",
    ]),

    async postComputerInfo() {
      try {
        this.computer.published_by = this.user.pk;
        await this.postComputer();
      } catch (e) {
        console.log(e);
      }
    },
    async editComputerInfo(computerID) {
      try {
        await this.editComputer(computerID);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteComputerInfo(computerID) {
      try {
        await this.deleteComputer(computerID);
      } catch (e) {
        console.log(e);
      }
    },
  },
  };
  </script>
  