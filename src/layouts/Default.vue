<template>
  <v-app id="content">
    <v-navigation-drawer
      permanent
      mini-variant-width="100"
      transition="slide-x-transition"
      expand-on-hover
      app
      :mini-variant.sync="mini"
      v-model="sidebar"
      class="barra white--text"
      color="#1d6382"
    >
      <v-list class="d-flex" dense dark>
        <v-list-item class="mt-8 pt-9">
          <v-btn icon class="mx-auto" to="/" light>
            <v-img
              id="IFLogo"
              alt="IFLogo"
              :src="IFLogo"
              transition="scale-transition"
              contain
              width="100%"
              height="15vh"
            />
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list class="mt-10 white--text pt-9">
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
          <v-list-item-content class="white--text"> Sair </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider light></v-divider>
    </v-navigation-drawer>
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
    <v-footer class="footer" padless>
      <v-card class="cafs-footer">
        <v-card-text class="white--text text-center">
          {{ new Date().getFullYear() }} — <strong>C.A.F.S</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import IFLogo from "../assets/IFLogo1.png";

export default {
  data() {
    return {
      sidebar: true,
      mini: true,
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
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#content {
  border-radius: 0;

}

.main-content {
  margin-bottom: 20rem;
}

#testing {
  margin: 0px;
  padding-right: 0px;
}

.theme--light.v-divider {
  border-color: rgba(255, 255, 255, 0.12) !important;
}

.footer, .cafs-footer {
  display: flex;
  color: white;
  background-color: #808080;
  width: 100vw;
  height: 100%;
}

#IFLogo {
  opacity: 0;
}

.barra:hover #IFLogo {
  opacity: 1;
  animation: animate 0.3s;
}

@keyframes animate {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
