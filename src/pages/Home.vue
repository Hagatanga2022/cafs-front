<template>
    <v-app>
      <v-app-bar app color="blue lighten-2" dark elevation="1">
        <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        </v-app-bar>
      <v-navigation-drawer app v-model="sidebar" :mini-variant.sync="mini">
        <v-list dense color="blue lighten-2" dark>
          <v-list-item>
            <v-list-item-action>
              <v-icon @click.stop="sidebar = !sidebar">mdi-chevron-left</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              <h3>Options</h3>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item class="px=2" @click="mini = !mini">
        </v-list-item>
        <v-list>
          <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list>
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
  export default {
    data() {
      return {
        sidebar: true,
        mini: "falseauthenticated user",
        items: [
          { title: "Pesquisar", icon: "mdi-magnify", to: "/pesquisar" },
          { title: "Home", icon: "mdi-home", to: "/home" },
          { title: "Bolsistas", icon: "mdi-school", to: "/bolsistas" },
          { title: "Computadores", icon: "mdi-laptop", to: "/computadores" },
          { title: "Projetos", icon: "mdi-folder", to: "/projetos" },
        ],
      };
    },
  
  };  
   
  
  </script>
  
  <style>
  </style>