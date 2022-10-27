<template>
  <v-app id="body" style="background-color: #1d6382" view="lHh Lpr lFf">
    <v-container class="context"></v-container>
    <div
      style="background-color: #1d6382; padding-top: 10%"
      class="text-container"
    >
      <div class="sphere-cube"></div>
      <div class="cube"></div>
      <div class="cube">
        <div class="image1"></div>
      </div>
      <div class="text">
        <div class="text text-shadow">
          <b> Controle de Acesso à Fábrica de Software </b>
        </div>
        <div class="text mt-5 text-shadow">
          O Controle de acesso à fábrica de software, referido pelo acrônimo
          C.A.F.S, é um sistema que busca auxiliar os coordenadores e as suas
          equipes a gerenciarem a sua jornada de trabalho previamente
          estabelecida.
        </div>
      </div>
    </div>

    <v-app-bar class="context" flat outlined color="#1D6382">
      <div class="btn-container">
        <div>
          <Cadastro class="overlap" />
        </div>
        <v-divider dark vertical inset class="mx-4"> </v-divider>
        <div>
          <Login />
        </div>
      </div>
    </v-app-bar>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </v-app>
</template>
<script>
import Login from "../components/Login.vue";
import Cadastro from "../components/Cadastro.vue";
export default {
  components: {
    Login,
    Cadastro,
  },
};
</script>

<style>
@viewport {
  user-zoom: fixed;
}
.sidebar-content {
  height: 100%;
}
.title {
  color: white;
  font-size: 40px;
  font-weight: 500;
}
.minor-title {
  color: white;
}
.container {
  height: 93vh;
}
.btn-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: right;
  padding: 10px;
}
.cube:nth-child(3) {
  background-color: #ffffff;
  width: 36vw;
  height: 70vh;
  border-radius: 30px;
  transform: rotate(45deg);
  position: fixed;
  left: 12vw;
  top: 50vh;
  display: flex;
  box-shadow: 0px 10px 30px #3b3b3b57;
  border-right: rgba(0, 0, 0, 0.397) 1px solid;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 3;
}
.cube:nth-child(3) .image1 {
  background-image: url(../assets/CAFS1.png);
  width: 60%;
  height: 75%;
  position: fixed;
  background-size: contain;
  border-radius: 200px 200px 100px 100px;
  transform: rotate(315deg);

}
.cube:nth-child(2) {
  background-color: #d9d9d9;
  width: 37vw;
  height: 70vh;
  border-radius: 40px;
  transform: rotate(45deg);
  position: fixed;
  left: 3vw;
  top: 45vh;
  box-shadow: 0px 10px 30px #3b3b3b57;
  z-index: 3;
}
.sphere-cube {
  position: relative;
  left: -25vw;
  top: 5vh;
}
.text {
  width: 60vh;
  height: 26vh;
  background-color: #1d6482ea;
  border-radius: 20px 0px 10px 20px;
}
.text:nth-child(1) {
  font-size: 3em;
  line-height: 100%;
  text-align: right;
  position: absolute;
  top: 30vh;
  right: 10vh;
}
.text:nth-child(2) {
  font-size: 1.75em;
  line-height: 100%;
  text-align: right;
  position: absolute;
  right: 10vh;
  top: 50vh;
}
#body {
  overflow: hidden;
}
.text {
  color: white;
}
/* .text-container {
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  display: flex;
} */

/* Fundo */
* {
  margin: 0px;
  padding: 0px;
}

.context {
  position: absolute;
  z-index: 2;
}

.area {
  background: "#1d6382";
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: auto;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 15s linear infinite;
  bottom: -200px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 20%;
   
  }
  50% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  
  }
  70% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 100%;
    
  }
}
</style>
