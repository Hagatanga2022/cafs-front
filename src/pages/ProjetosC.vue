<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-toolbar
        class="white--text d-flex"
        color="cyan darken-1"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-img
          id="ProjetosC"
          alt="ProjetosC"
          :src="ProjetosC"
          width="200"
          height="200"
        ></v-img>
        <v-spacer />
        <v-toolbar-title class="title ml-5">
          <h1>Projetos Concluídos</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
import ProjetosC from "../assets/concluidos.png";
export default {
  data() {
    return {
      ProjetosC,
    };
  },
};
</script>

<style>
.title,
#ProjetosC {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
</style>
