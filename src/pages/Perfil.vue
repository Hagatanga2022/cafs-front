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
          id="Perfil"
          alt="Perfil"
          :src="Perfil"
          width="150"
          height="150"
        ></v-img>
        <v-spacer />
        <v-toolbar-title class="title ml-5">
          <h1>Perfil</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
import Perfil from "../assets/perfil.jpg";
export default {
  data() {
    return {
      Perfil,
    };
  },
};
</script>

<style>
.title,
#Perfil {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
</style>
