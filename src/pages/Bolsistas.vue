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
          id="Bolsista"
          alt="Bolsista"
          :src="Bolsista "
          width="200"
          height="200"
        ></v-img>
        <v-spacer />
        <v-toolbar-title class="title ml-5">
          <h1>Bolsista</h1>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container>
      <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview
              
              :active.sync="active"
              :items="items"
              :load-children="fetchUsers"
              :open.sync="open"
              activatable
              color="blue"
              open-on-click
              transition
            >
              <template v-slot:prepend="{ item }">
                <v-icon  v-if="!item.children"> mdi-school </v-icon>
              </template>
            </v-treeview>
          </v-col>
  
          <v-divider vertical></v-divider>
  
          <v-col class="d-flex text-center">
            <v-scroll-y-transition mode="out-in">
              <div
                v-if="!selected"
                class="text-h6 grey--text text--lighten-1 font-weight-light"
                style="align-self: center"
              >
                Selecione o bolsista para ver suas informações
              </div>
              <v-card
                v-else
                :key="selected.id"
                class="pt-6 mx-auto"
                flat
                max-width="400"
              >
                <v-card-text>
                  <v-avatar v-if="avatar" size="88">
                    <v-img
                      :src="`https://avataaars.io/${avatar}`"
                      class="mb-6"
                    ></v-img>
                  </v-avatar>
                  <h3 class="text-h5 mb-2">
                    {{ selected.name }}
                  </h3>
                  <div class="blue--text mb-2">
                    {{ selected.email }}
                  </div>
                  <div class="blue--text subheading font-weight-bold">
                    {{ selected.username }}
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-row class="text-left">
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                    Company:
                  </v-col>
                  <v-col>{{ selected.company.name }}</v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                    E-mail:
                  </v-col>
                  <v-col>
                    <a :href="`//${selected.email}`" target="_blank">{{
                      selected.email
                    }}</a>
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                    Telefone:
                  </v-col>
                  <v-col>{{ selected.phone }}</v-col>
                </v-row>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>
    </v-container>
  </v-app>
</template>

<script>
const avatars = [
    "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
    "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
    "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
    "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
    "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
  ];
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  import Bolsista from "../assets/bolsista.png";
  export default {
    data() {
      return {
        Bolsista,
        active: [],
        avatar: null,
        open: [],
        users: [],
      };
    },
    computed: {
      items() {
        return [
          {
            name: "Bolsistas",
            children: this.users,
          },
        ];
      },
      selected() {
        if (!this.active.length) return undefined;
        const id = this.active[0];
        return this.users.find((user) => user.id === id);
      },
    },
    watch: {
      selected: "randomAvatar",
    },
    methods: {
      async fetchUsers(item) {
        // Remove in 6 months and say
        // you've made optimizations! :)
        await pause(1500);
        return fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((json) => item.children.push(...json))
          .catch((err) => console.warn(err));
      },
      randomAvatar() {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
      },
    },
  };
  </script>
  
  <style scoped>
  .title,
  #Bolsista {
    margin-top: 6rem;
    text-align: center;
    align-content: center;
  }
  #content {
    border-radius: 0%;
  }
  #bolsName{
   color: black;
   size: 100px;
  }
  </style>
