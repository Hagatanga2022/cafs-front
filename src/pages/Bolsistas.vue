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
          id="Bolsista"
          alt="Bolsista"
          :src="Bolsista"
          width="200"
          height="200"
        ></v-img>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title ml-5">
          <h1>Bolsistas</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
import Bolsista from "../assets/bolsista.png";
export default {
  data() {
    return {
      Bolsista,
    };
  },
};
</script>

<style>
.title,
#Bolsista {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
</style>
