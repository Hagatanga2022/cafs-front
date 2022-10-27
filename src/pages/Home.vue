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
          <v-textarea
            prepend-inner-icon="mdi-comment"
            outlined
            auto-grow
            name="input-7-4"
            background-color="white"
            rows="1"
            width="100px"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
          ></v-textarea>
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
        </v-container>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Avisos from "../assets/avisos.png";
export default {
  data() {
    return {
      Avisos,
    };
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
#content{
  border-radius: 0%;
}

.cafs-title {
  margin-left: 50%;
  margin-right: 50%;
}
</style>
