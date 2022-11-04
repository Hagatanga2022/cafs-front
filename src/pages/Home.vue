<template>
  <v-app>
    <v-card id="content">
      <v-toolbar
        class="white--text"
        color="#1d6382"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-toolbar-title class="texts justify-center">
          <div class="cafs-title">
            <h1 class="h1">C.A.F.S</h1>
            <h3>
              <p>Controle de acesso à Fábrica de Software</p>
            </h3>
          </div>
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-container fluid>
      <v-row class="ml-16">
        <v-col id="text-area" cols="11" md="8">
          <v-card>
            <v-card-text>
              <v-textarea
                filled
                v-model="announce.description"
                label="Escreva um aviso para todos"
              ></v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed @click="announce.description = ''">
                Cancelar
              </v-btn>
              <v-btn color="success" @click="postAnnouncementInfo" depressed>
                Publicar
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <v-text-field
            prepend-inner-icon="mdi-comment"
            outlined
            auto-grow
            clearable
            name="input-7-4"
            background-color="white"
            rows="1"
            width="100px"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
            >
          </v-text-field> -->
        </v-col>
        <v-container>
          <v-row v-if="verifyAnnounces === 0" class="avisos mb-0 vh-100 vw-100">
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
          <div
            v-for="(theAnnounce, indexAnnounce) in allAnnounces"
            :key="indexAnnounce"
          >
            <v-card class="avisos mt-10">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle
                    >{{
                      theAnnounce.published_by.first_name
                        ? theAnnounce.published_by.first_name
                        : theAnnounce.published_by.username
                    }}
                    - {{ dateAndTime(theAnnounce) }}
                  </v-list-item-subtitle>
                  <v-list-item-title>
                    {{ theAnnounce.description }}
                  </v-list-item-title>
                </v-list-item-content>
                <div v-if="user.pk == theAnnounce.published_by.pk">
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
              <v-text-field
                v-model="specificComment['comment' + indexAnnounce]"
                prepend-inner-icon="mdi-comment"
                @keydown.enter="postCommentInfo(theAnnounce, indexAnnounce)"
                outlined
                auto-grow
                clearable
                name="input-7-4"
                background-color="white"
                rows="1"
                width="100px"
                placeholder="Digite aqui seu comentário"
              >
              </v-text-field>
            </v-card>
            <v-card
              class="avisos mt-10"
              v-for="(theComment, indexComment) in verifyComments(
                allComments,
                theAnnounce
              )"
              :key="indexComment"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{
                      theComment.published_by.first_name
                        ? theComment.published_by.first_name
                        : theComment.published_by.username
                    }}
                    - {{ dateAndTime(theComment) }}</v-list-item-subtitle
                  >
                  <v-list-item-title>
                    {{ theComment.description }}
                  </v-list-item-title>
                </v-list-item-content>
                <div v-if="user.pk == theComment.published_by.pk">
                  <v-btn
                    @click="editCommentInfo(theComment.id, indexAnnounce)"
                    color="secondary"
                    fab
                    x-small
                    dark
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    @click="deleteCommentInfo(theComment.id)"
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
          </div>
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
    this.getComment();
  },
  data() {
    return {
      Avisos,
      specificComment: {},
      month: [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("announcement", ["announce", "allAnnounces"]),
    ...mapState("comment", ["comment", "allComments"]),

    verifyAnnounces() {
      return this.allAnnounces ? this.allAnnounces.length : 1;
    },
  },
  methods: {
    ...mapActions("announcement", [
      "getAnnouncement",
      "postAnnouncement",
      "editAnnouncement",
      "deleteAnnouncement",
    ]),
    ...mapActions("comment", [
      "getComment",
      "postComment",
      "editComment",
      "deleteComment",
    ]),

    dateAndTime({ created_at }) {
      const date =
        created_at.split("-").reverse().join("/").substr(6, 2) +
        created_at.split("-").reverse().join("/").substr(24, 25);
      const time = created_at.split("-").reverse().join("/").substr(9, 5);

      return `${date.substr(0, 2)} de ${
        this.month[date.substr(3, 2) - 1]
      } de ${date.substr(6, 4)} às ${time}`;
    },

    // CRUD Announces
    async postAnnouncementInfo() {
      try {
        this.announce.published_by = this.user.pk;
        this.announce.title = `Aviso de ${
          this.user.first_name ? this.user.first_name : this.user.username
        }`;
        await this.postAnnouncement();
        this.specificComment = {};
        this.announce.description = "";
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

    // CRUD Comments
    verifyComments(allComments, theAnnounce) {
      return allComments.filter(
        (comment) => comment.announce.id === theAnnounce.id
      );
    },
    async postCommentInfo({ id }, commentIdentifier) {
      try {
        this.comment.description =
          this.specificComment["comment" + commentIdentifier];
        this.comment.published_by = this.user.pk;
        this.comment.announce = id;
        await this.postComment();
      } catch (e) {
        console.log(e);
      }
    },
    async editCommentInfo(idComment, commentIdentifier) {
      try {
        this.comment.description =
          this.specificComment["comment" + commentIdentifier];
        await this.editComment(idComment);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCommentInfo(idComment) {
      try {
        await this.deleteComment(idComment);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
#text-area {
  margin-left: 18.5rem;
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
  margin-left: 39rem;
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
