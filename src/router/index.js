import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../pages/Home.vue";
import StartPage from "../pages/StartPage.vue";
import Bolsistas from "../pages/Bolsistas.vue";
import Computadores from "../pages/Computadores.vue";
import Projetos from "../pages/Projetos.vue";
import ProjetosConcluidos from "../pages/ProjetosC.vue";
import Perfil from "../pages/Perfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Blank.vue"),
    meta: {
      auth: false,
    },
    children: [
      {
        path: "",
        name: StartPage,
        component: StartPage,
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layouts/Default.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/home",
        name: Home,
        component: Home,
      },
      {
        path: "/bolsistas",
        name: Bolsistas,
        component: Bolsistas,
      },
      {
        path: "/computadores",
        name: Computadores,
        component: Computadores,
      },
      {
        path: "/projetos",
        name: Projetos,
        component: Projetos,
      },
      {
        path: "/projetosc",
        name: ProjetosConcluidos,
        component: ProjetosConcluidos,
      },
      {
        path: "/perfil",
        name: Perfil,
        component: Perfil,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (!store.state.auth.loggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
