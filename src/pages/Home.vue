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
            v-model="comentario.descricao"
            auto-grow
            name="input-7-4"
            background-color="white"
            rows="1"
            width="100px"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
            @keydown.enter="comentar"
          ></v-text-field>
        </v-col>
        <v-container class="avisos">
          <v-row class="vh-100 vw-100">
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
          <v-card class="mx-auto">
            <v-list-item
              three-line
              v-for="(comentario, index) in comentarios"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>{{
                  comentario.titulo
                }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ comentario.descricao }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ comentario.data_publicacao.split("-").reverse().join("/").substr(6, 2) + comentario.data_publicacao.split("-").reverse().join("/").substr(24, 25) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                @click="deletarComentario(comentario.id)"
                color="secondary"
                fab
                x-small
                dark
                class="ma-2"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                @click="editarComentario(comentario.id)"
                color="secondary"
                fab
                x-small
                dark
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-container>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Avisos from "../assets/avisos.png";
import { mapState } from "vuex"
import axios from "axios";

export default {
  async created() {
    await this.listarComentarios()
  },
  data() {
    return {
      Avisos,
      comentarios: [],
      comentario: {},
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async listarComentarios() {
      const { data } = await axios.get("avisos/");
      this.comentarios = data;
    },
    async comentar() {
      this.comentario.publicado_por = this.user.pk;
      this.comentario.titulo = `Aviso de ${this.user.first_name}`;
      await axios.post("avisos/", this.comentario);
      this.listarComentarios();
    },
    async deletarComentario(id) {
      await axios.delete(`avisos/${id}/`);
      this.listarComentarios();
    },
    async editarComentario(id) {
      try {
        await axios.put(`avisos/${id}/`, this.comentario);
        this.listarComentarios();
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
