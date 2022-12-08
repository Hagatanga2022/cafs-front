<template>
  <v-app>
    <v-card id="content">
      <v-toolbar
        class="white--text d-flex"
        color="#1d6382"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-img
          id="Projetos"
          alt="Projetos"
          :src="Projetos"
          width="200"
          height="200"
        ></v-img>
        <v-spacer />
        <v-toolbar-title class="title ml-5">
          <h1>Projetos</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <CadastrarProjeto class="cadastro" />
    </v-card>
    <v-container class="ProjetoBody">
      <!-- <v-img class="imgFilter" 
      :src="ProjetoB"
      width="20vw"
      height="50vh">

      </v-img>
      <h1 class="pl-10" style="color:#3B7994"> Não existem projetos cadastrados. </h1> -->
      <section v-for="projeto in allProjects" :key="projeto.id">
        <v-card class="ProjetoCard">
          <v-item-list>
            <v-item>
              <div class="camOne">
                <h2 style="color: white">{{ projeto.name }}</h2>
              </div>
            </v-item>
            <v-item>
              <div class="camBall">
                <div>
                  <v-avatar class="ball" size="13vh">
                    <img
                      alt="Foto do projeto"
                      :src="projeto.project_photo.file"
                    />
                  </v-avatar>
                </div>
              </div>
            </v-item>
            <v-item>
              <div class="camTwo">
                <div class="informations">Status : Em uso</div>
                <div class="informations">
                  Coordenador : {{ projeto.coordenador }}
                </div>
                <div class="informations">
                  Bolsista : {{ projeto.bolsista }}
                </div>
              </div>
            </v-item>
          </v-item-list>
        </v-card>
      </section>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Projetos from "../assets/projetos.png";
import CadastrarProjeto from "../components/Projeto.vue";

export default {
  created() {
    this.getProjects();
  },
  data: () => ({
    Projetos,
  }),
  components: {
    CadastrarProjeto,
  },
  computed: {
    ...mapState("project", ["allProjects"]),
  },
  methods: {
    ...mapActions("project", ["getProjects"]),
  },
};
</script>

<style scoped>
.title,
#Projetos {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
.ProjetoBody {
  max-width: 70vw;
  height: 100vh;
  margin-top: 2vh;
  justify-content: center;
  overflow-wrap: break-word;
}
.imgFilter {
  filter: opacity(0.2);
}
.ProjetoCard {
  display: flex;
  height: 40vh;
  width: 20vw;
  background: white;
  margin-top: 5vh;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}

.camOne {
  background-color: #3b7994;
  height: 10vh;
  width: 20vw;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.camTwo {
  background-color: #ffffff25;
  height: 20vh;
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
}
.informations {
  color: #3b7994;
  padding-top: 2vh;
}
.ball {
  height: 13vh;
  width: 13vh;
  background-color: rgb(255, 255, 255);
  background-size: 10vh;
  background-repeat: no-repeat;
  border-radius: 100%;
  background-position: center;
  border: 1px solid #3b7994;
}
.camBall {
  width: 20vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cadastro {
  margin-top: 6vh;
  width: auto;
  height: 10vh;
  display: flex;
}
</style>
