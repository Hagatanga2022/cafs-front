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
        <v-spacer />
        <v-toolbar-title class="texts">
          <div class="cafs-title">
            <h1 class="h1">C.A.F.S</h1>
            <h3>
              <p>Controle de acesso à Fábrica de Software</p>
            </h3>
          </div>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col id="text-area" cols="11" md="8">
          <v-text-field
            prepend-inner-icon="mdi-comment"
            outlined
            v-model="announce.descricao"
            auto-grow
            name="input-7-4"
            background-color="white"
            rows="1"
            width="100px"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
            @keydown.enter="postAnnouncementInfo"
          >
          </v-text-field>
        </v-col>
        <v-container>
          <v-row
            v-if="allAnnounces.length === 0"
            class="avisos mb-0 vh-100 vw-100"
          >
            <v-col sm="5">
              <v-img
                class="d-flex justify-center align-center"
                :src="Avisos"
                width="500"
                height="500"
              ></v-img>
            </v-col>
            <v-col sm="7" class="texto">
              <div>
                <h1>
                  Aqui é onde você pode adicionar avisos aos bolsistas nos
                  projetos
                </h1>
                <h3 class="mt-5">
                  Use o mural para compartilhar avisos e postar comunicados para
                  os bolsistas.
                </h3>
              </div>
            </v-col>
          </v-row>
          <v-card
            class="avisos mt-10"
            v-for="(theAnnounce, index) in this.allAnnounces"
            :key="index"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>{{ theAnnounce.titulo }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ theAnnounce.descricao }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ dateAnnouncement(theAnnounce) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <div v-if="user.pk == theAnnounce.publicado_por">
                <v-btn
                  @click="editAnnouncementInfo(theAnnounce.id)"
                  color="secondary"
                  fab
                  x-small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteAnnouncementInfo(theAnnounce.id)"
                  color="secondary"
                  fab
                  x-small
                  dark
                  class="ma-2"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item>
          </v-card>
        </v-container>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Avisos from "../assets/avisos.png";
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.getAnnouncement();
  },
  data() {
    return { Avisos };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("announcement", ["announce", "allAnnounces"]),
  },
  methods: {
    ...mapActions("announcement", [
      "getAnnouncement",
      "postAnnouncement",
      "editAnnouncement",
      "deleteAnnouncement",
    ]),

    dateAnnouncement({ data_publicacao }) {
      return (
        data_publicacao.split("-").reverse().join("/").substr(6, 2) +
        data_publicacao.split("-").reverse().join("/").substr(24, 25)
      );
    },
    async postAnnouncementInfo() {
      try {
        this.announce.publicado_por = this.user.pk;
        this.announce.titulo = `Aviso de ${this.user.first_name}`;
        await this.postAnnouncement();
      } catch (e) {
        console.log(e);
      }
    },
    async editAnnouncementInfo(idAnnounce) {
      try {
        await this.editAnnouncement(idAnnounce);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteAnnouncementInfo(idAnnounce) {
      try {
        await this.deleteAnnouncement(idAnnounce);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
#text-area {
  margin-left: 18rem;
  max-width: 1000px;
}

.texto {
  width: 60vh;
  height: 26vh;
  color: #1d6482ea;
  align-self: center;
}

.texts {
  margin-top: 6rem;
  margin-left: 30rem;
  text-align: center;
  align-content: center;
}

.avisos {
  border-color: lightgray;
  border-style: solid;
  border-width: 2px;
  border-radius: 1%;
  background-color: white;
  margin-left: 18rem;
  max-width: 1000px;
  max-height: 500px;
}

.h1 {
  font-size: 70px;
}

#content {
  border-radius: 0%;
}
</style>
