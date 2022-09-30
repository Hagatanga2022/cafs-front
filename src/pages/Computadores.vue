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
          id="Computador"
          alt="Computador"
          :src="Computador"
          width="200"
          height="200"
        ></v-img>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title ml-5">
          <h1>Computadores.</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
import Computador from "../assets/computador.png";
export default {
  data() {
    return {
      Computador,
    };
  },
};
</script>

<style>
.title,
#Computador {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
</style>
