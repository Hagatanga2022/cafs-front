<template>
  <v-app>
    <v-card>
      <v-toolbar
        class="upbar white--text"
        color="#1d6382"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-toolbar-title class="texts">
          <div class="cafs-title">
            <h1 class="h1">C.A.F.S</h1>
            <h3>
              <p>Controle de acesso à Fábrica de Software</p>
            </h3>
          </div>
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-container id="content" fluid>
      <v-row class="quadro-avisos">
        <v-col id="text-area" cols="11">
          <v-card>
            <v-card-text>
              <v-textarea
                filled
                v-model="announce.description"
                label="Escreva um aviso para todos"
              ></v-textarea>
              <v-row class="pb-2 ma-0" justify="space-between">
                <v-btn-toggle v-model="formatting" multiple>
                  <v-btn>
                    <v-icon>mdi-format-italic</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon>mdi-format-bold</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon>mdi-format-underline</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-row align="center" class="flex-column" justify="center">
                      <v-icon class="cols 12"> mdi-format-color-text </v-icon>

                      <v-sheet
                        tile
                        style="margin-top: -4px"
                        height="4"
                        width="26"
                        color="purple"
                      ></v-sheet>
                    </v-row>
                  </v-btn>
                </v-btn-toggle>

                <v-btn-toggle v-model="alignment">
                  <v-btn>
                    <v-icon>mdi-format-align-center</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon>mdi-format-align-left</v-icon>
                  </v-btn>

                  <v-btn>
                    <v-icon>mdi-format-align-right</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-row>

              <v-sheet class="py-4 text-center" tile>
                <v-row class="mb-2" dense>
                  <v-col
                    v-for="n in numbers"
                    :key="n"
                    class="text-caption grey--text text--darken-1"
                    v-text="n"
                  ></v-col>
                </v-row>

                <v-row dense>
                  <v-col
                    v-for="l in letters"
                    :key="l"
                    class="text-h6 grey--text font-weight-regular text--darken-2"
                    v-text="l"
                  ></v-col>
                </v-row>
              </v-sheet>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed @click="announce.description = ''">
                Cancelar
              </v-btn>
              <v-btn
                color="green darken-4"
                @click="postAnnouncementInfo"
                depressed
              >
                Postar
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <v-text-field
            prepend-inner-icon="mdi-comment"
            outlined
            v-model="announce.description"
            auto-grow
            name="input-7-4"
            background-color="white"
            rows="1"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
            @keydown.enter="postAnnouncementInfo"
          >
          </v-text-field> -->
        </v-col>
        <div class="container-avisos">
          <v-row
            v-if="verifyAnnounces === 0"
            class="avisos mb-0 vh-100 vw-100 mt-5"
          >
            <v-col sm="5">
              <v-img
                class="d-flex justify-center align-center"
                :src="Avisos"
                width="500"
                height="500"
              ></v-img>
            </v-col>
            <v-col sm="7" class="texto-aviso">
              <div>
                <h1>
                  Aqui é onde você pode adicionar avisos aos bolsistas nos
                  projetos.
                </h1>
                <h3 class="mt-5">
                  Use o mural para compartilhar avisos e postar comunicados para
                  os bolsistas.
                </h3>
              </div>
            </v-col>
          </v-row>
          <div
            class="cards"
            v-for="(theAnnounce, indexAnnounce) in allAnnounces"
            :key="indexAnnounce"
          >
            <v-card class="mt-10 pa-2" elevation="3">
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
              <section class="my-2">
                <h3
                  v-if="verifyComments(allComments, theAnnounce).length"
                  class="justify-start ml-3"
                >
                  Comentários
                </h3>
                <div
                  :rounded="false"
                  class="pl-3"
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
                    <section v-if="user.pk == theComment.published_by.pk">
                      <v-btn
                        @click="editCommentInfo(theComment.id, indexAnnounce)"
                        color="secondary"
                        fab
                        x-small
                        dark
                        class="mx-2"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        @click="deleteCommentInfo(theComment.id)"
                        color="secondary"
                        fab
                        x-small
                        dark
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </section>
                  </v-list-item>
                </div>
              </section>
              <v-divider></v-divider>
              <v-text-field
                v-model="specificComment['comment' + indexAnnounce]"
                prepend-inner-icon="mdi-comment"
                @keydown.enter="postCommentInfo(theAnnounce, indexAnnounce)"
                filled
                dense
                rounded
                auto-grow
                name="input-7-4"
                rows="1"
                class="comentario"
                placeholder="Digite aqui seu comentário"
              >
                <v-icon
                  slot="append"
                  @click="postCommentInfo(theAnnounce, indexAnnounce)"
                  >mdi-send-circle</v-icon
                >
              </v-text-field>
              <v-divider></v-divider>
            </v-card>
          </div>
        </div>
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
  data: () => ({
    alignment: 1,
    formatting: [],
    value:
      "Toggle button requirements.\r\rHave at least three toggle buttons in a group\rLabel buttons with text, an icon, or",
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
  }),
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
    async editAnnouncementInfo(announceID) {
      try {
        await this.editAnnouncement(announceID);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteAnnouncementInfo(announceID) {
      try {
        await this.deleteAnnouncement(announceID);
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
    async editCommentInfo(commentID, commentIdentifier) {
      try {
        this.comment.description =
          this.specificComment["comment" + commentIdentifier];
        await this.editComment(commentID);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCommentInfo(commentID) {
      try {
        await this.deleteComment(commentID);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#text-area {
  max-width: 62%;
}

.texto-aviso {
  width: 60vh;
  height: 26vh;
  color: #1d6482ea;
  align-self: center;
}

.texts {
  display: flex;
  margin-top: 6rem;
}

.h1 {
  font-size: 70px;
}

#content {
  border-radius: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upbar,
div.cafs-title h1,
h3 {
  display: flex;
  justify-content: center;
  max-width: 100vw;
}

.quadro-avisos,
.container-avisos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cards {
  width: 130%;
}

.comentario {
  display: flex;
  align-self: flex-end;
  margin: 20px;
  height: 40px;
  justify-content: center;
}
</style>
