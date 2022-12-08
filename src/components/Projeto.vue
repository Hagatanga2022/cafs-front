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
            <span>{{ currentTitle }}</span>
            <v-avatar
              color="primary lighten-2"
              class="subheading white--text"
              size="24"
              v-text="step"
            ></v-avatar>
          </v-card-title>

          <v-window v-model="step" class="ma-3">
            <v-window-item :value="1"
              ><v-file-input
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
              ></v-file-input
            ></v-window-item>
            <v-window-item :value="2">
              <v-text-field
                @keyup.enter="postProjectInfo"
                color="teal"
                square
                required
                v-model="project.coordenador"
                label="Coordenador"
              >
              </v-text-field
            ></v-window-item>
            <v-window-item :value="3">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }"
                  ><v-text-field
                    @keyup.enter="postProjectInfo"
                    color="teal"
                    square
                    required
                    v-model="dateFormatted"
                    hint="formato MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    label="Adicione uma data de fim"
                    :close-on-content-click="false"
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-text-field
                ></template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-window-item>
            <v-window-item :value="4">
              <h4 style="color: black">
                Todos os dados foram adicionados. Deseja criar o projeto?
              </h4>
              <v-textarea
                @keyup.enter="postProjectInfo"
                class="mt-2"
                color="teal"
                square
                required
                v-model="project.descricao"
                label="Adicione uma descrição"
              >
              </v-textarea
            ></v-window-item>
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
              @click="postProjectInfo"
            >
              Concluir Cadastro
            </v-btn>
          </v-card-actions>
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
  data: (vm) => ({
    show: false,
    valid: true,
    loginPopUp: false,
    errorLogin: false,
    errorMessage: null,
    step: 1,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
  }),
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("project", ["project", "allProjects"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Foto do Projeto";
        case 2:
          return "Adicione um Coordenador";
        case 3:
          return "Data de Fim";
        case 4:
          return "Descrição";
        default:
          return "Dados informados!";
      }
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
