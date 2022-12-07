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
    <v-container class="computerBody">
      <CadastrarPC class="cadastro"/>
      <!-- <v-img class="imgFilter" 
      :src="ComputadorB"
      width="20vw"
      height="50vh">

      </v-img>
      <h1 class="pl-10" style="color:#3B7994"> Não existem computadores cadastrados. </h1> -->
        <v-card class="computerCard">
        <v-item-list>
          <v-item>
            <div class="camOne">
              <h2 style="color:white;">Computador 1</h2>
            </div>
          </v-item>
          <v-item>
          <div class="camBall">
            <div class="ball">
              
            </div>
          </div>
        </v-item>
          <v-item>
            <div class="camTwo">
              <div class="informations">
                Status : Em uso
              </div>
              <div class="informations">
                Projetos : 1 e 2
              </div>
              <div class="informations">
                Coluna : 1
              </div>
              <div class="informations">
                Fileira : 3
              </div>
            </div>
          </v-item>
        </v-item-list>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Computador from "../assets/computador.png";
import ComputadorB from "../assets/computadorblue.png";
import CadastrarPC from "../components/Computador.vue"

export default {
  data: () => ({
    Computador,
    ComputadorB,
  }),
  components:{
    CadastrarPC
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
#ComputadorB {
  margin-top: 6rem;
  text-align: center;
  align-content: center;
}
.computerBody{
  max-width: 70vw;
  height: 100vh;
  margin-top: 2vh;
  justify-content: center;
  overflow-wrap: break-word;
}
.imgFilter{
  filter: opacity(0.2);
}
.computerCard{
  display: flex;
  height: 40vh;
  width: 20vw;
  background: white;
  margin-top: 5vh;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}
.titleComputer{
  display: flex;
  justify-content: center;
   height: 10vh;
   width: auto;

}
.camOne{
  background-color: #3B7994;
  height: 10vh;
  width:20vw;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

}
.camTwo{
  background-color: #ffffff25;
  height: 20vh;
  width:20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
}
.informations{
  color: #3B7994;
  padding-top: 2vh;
}
.ball{
  height: 13vh;
  width: 13vh;
  background-color: rgb(255, 255, 255);
  background-image:url(../assets/computadorblue2.png);
  background-size:10vh;
  background-repeat:no-repeat;
  border-radius: 100%;
  background-position:center;
  border:1px solid #3B7994;
}
.camBall{
  width: 20vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.cadastro{
  margin-top: 6vh;
  width: auto;
  height: 10vh;
  display: flex;
}
</style>
