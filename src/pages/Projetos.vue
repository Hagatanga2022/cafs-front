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
    </v-card>
  </v-app>
</template>

<script>
import Projetos from "../assets/projetos.png";
export default {
  data() {
    return {
      Projetos,
    };
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
#content {
  border-radius: 0%;
}
</style>
