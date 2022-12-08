<template>
  <v-container>
    <v-btn @click="loginPopUp = true" class="v-btn1"
      >Cadastrar um computador</v-btn
    >
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
              @keyup.enter="postComputerInfo"
              color="teal"
              square
              required
              v-model="computer.name"
              label="Nome"
            ></v-text-field>

            <v-text-field
              @keyup.enter="postComputerInfo"
              color="teal"
              square
              required
              v-model="computer.locationX"
              label="Fileira"
            >
            </v-text-field>
            <v-text-field
              @keyup.enter="postComputerInfo"
              color="teal"
              square
              required
              v-model="computer.locationY"
              label="Coluna"
            >
            </v-text-field>
            <v-file-input
              :rules="rules"
              square
              outlined
              type="file"
              ref="file"
              @change="uploadFile"
              show-size
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Upe sua foto de perfil"
              prepend-icon=""
              prepend-inner-icon="mdi-camera"
              label="Foto do computador"
            ></v-file-input>

            <div class="mt-2" align="center">
              <v-btn
                :disabled="!valid"
                class="mt-1 white--text"
                color="blue"
                @click="postComputerInfo"
                >Adicionar</v-btn
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
    ></v-snackbar>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  created() {
    this.getComputers();
  },
  data: () => ({
    show: false,
    valid: true,
    loginPopUp: false,
    errorLogin: false,
    errorMessage: null,
  }),
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("computer", ["computer", "allComputers"]),
  },
  methods: {
    ...mapActions("computer", [
      "getComputers",
      "postComputer",
      "editComputer",
      "deleteComputer",
    ]),

    uploadFile() {
      this.image = this.$refs.file[Object.keys(this.$refs.file)[95]];
    },
    async submitFile() {
      const formData = new FormData();
      formData.append("file", this.image);
      const headers = { "Content-Type": "multipart/form-data" };
      const { data } = await axios.post(
        `${axios.defaults.baseURL}api/media/images/`,
        formData,
        { headers }
      );
      return data.attachment_key;
    },
    async postComputerInfo() {
      try {
        this.computer.created_by = this.user.pk;
        this.computer.computer_photo_attachment_key = await this.submitFile();
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
