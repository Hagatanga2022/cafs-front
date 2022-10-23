<template>
  <v-app>
    <v-navigation-drawer
      permanent
      app
      :mini-variant.sync="mini"
      v-model="sidebar"
      class="white--text"
      color="#1d6382"
    >
      <v-list class="d-flex" dense dark>
        <v-list-item class="mt-8">
          <v-btn icon class="mx-auto" to="/" light>
            <v-img
              id="IFLogo"
              alt="IFLogo"
              :src="IFLogo"
              transition="scale-transition"
              contain
              width="100"
              height="100"
            />
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list class="mt-10 white--text">

        <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="white--text">{{
            item.title
          }}</v-list-item-content>
        </v-list-item>

        <v-list-item @click="submitLogout">
          <v-list-item-icon>
            <v-icon dark>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="white--text">
            Sair
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-divider light></v-divider>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app class="py-3">
      <span class="overline">C.A.F.S &copy;2022</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex"
import IFLogo from "../assets/IFLogo1.png";

export default {
  data() {
    return {
      sidebar: true,
      mini: false,
      IFLogo,
      items: [
        { title: "Home", icon: "mdi-home", to: "/home" },
        { title: "Bolsistas", icon: "mdi-school", to: "/bolsistas" },
        { title: "Computadores", icon: "mdi-laptop", to: "/computadores" },
        { title: "Projetos", icon: "mdi-folder", to: "/projetos" },
        { title: "Perfil", icon: "mdi-account", to: "/perfil" },
        {
          title: "Projetos concluídos",
          icon: " mdi-check-circle",
          to: "/projetosc",
        },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async submitLogout() {
      try {
        await this.logout();
        console.log("Saiu")
        this.$router.push({ path: "/" });
      } catch (e) {
        console.log(e);
      }
    },
  }
};
</script>

<style>
.theme--light.v-divider {
  border-color: rgba(255, 255, 255, 0.12) !important;
}
</style>
