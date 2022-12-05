<template>
  <v-app>
    <v-card>
      <v-toolbar
        class="white--text d-flex"
        color="#1d6382"
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
          <h1>Computadores</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Computador from "../assets/computador.png";

export default {
  data: () => ({
    Computador,
  }),
  computed: {
    ...mapState("computer", ["computer", "allComputers"]),
  },
  methods: {
    ...mapActions("computer", [
      "postComputer",
      "editComputer",
      "deleteComputer",
    ]),

    async postComputerInfo() {
      try {
        this.computer.published_by = this.user.pk;
        await this.postComputer();
      } catch (e) {
        console.log(e);
      }
    },
    async editComputerInfo(computerID) {
      try {
        await this.editComputer(computerID);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteComputerInfo(computerID) {
      try {
        await this.deleteComputer(computerID);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.title,
#Computador {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
</style>
