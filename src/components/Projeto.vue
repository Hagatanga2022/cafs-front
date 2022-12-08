<template>
  <v-container>
    <v-btn @click="loginPopUp = true" class="v-btn1"
      >Cadastrar um projeto</v-btn
    >
    <v-dialog v-model="loginPopUp" max-width="600px" max-height="600px">
      <v-card class="pop-up-card" elevation="10" outlined>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title
            class="text-h6 font-weight-regular justify-space-between"
          >
            Adicionar um projeto
          </v-card-title>

          <v-col justify="center">
            <v-text-field
              @keyup.enter="postProjectInfo"
              color="teal"
              square
              required
              v-model="project.name"
              label="Nome"
            ></v-text-field>

            <v-text-field
              @keyup.enter="postProjectInfo"
              color="teal"
              square
              required
              v-model="project.orientador"
              label="Orientador"
            >
            </v-text-field>
            <v-text-field
              @keyup.enter="postProjectInfo"
              color="teal"
              square
              required
              v-model="project.bolsista"
              label="Bolsistas"
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
              label="Foto do projeto"
            ></v-file-input>

            <div class="mt-2" align="center">
              <v-btn
                :disabled="!valid"
                class="mt-1 white--text"
                color="blue"
                @click="postProjectInfo"
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
    this.getProjects();
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
    ...mapState("project", ["project", "allProjects"]),
  },
  methods: {
    ...mapActions("project", [
      "getProjects",
      "postProject",
      "editProject",
      "deleteProject",
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
    async postProjectInfo() {
      try {
        this.project.created_by = this.user.pk;
        this.project.project_photo_attachment_key = await this.submitFile();
        await this.postProject();
      } catch (e) {
        console.log(e);
      }
    },
    async editProjectInfo(projectID) {
      try {
        await this.editProject(projectID);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteProjectInfo(projectID) {
      try {
        await this.deleteProject(projectID);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
