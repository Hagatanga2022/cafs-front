import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import StartPage from "../pages/StartPage.vue";
import Bolsistas from "../pages/Bolsistas.vue";
import Computadores from "../pages/Computadores.vue";
import Projetos from "../pages/Projetos.vue"
import ProjetosConcluidos from "../pages/ProjetosC.vue"
import Perfil from "../pages/Perfil.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Blank.vue"), 
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
        path: "/home",
        name: Home,
        component: Home,
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
