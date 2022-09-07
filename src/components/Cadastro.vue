<template>
  <v-container>
    <v-btn @click="cadastro = true" class="v-btn1" v-on="on">Cadastro</v-btn>
    <v-dialog v-model="cadastro" max-width="600px" max-height="600px">
      <v-card class="pop-up-card">
        <v-card-title class="text-h3 justify-center">Cadastro</v-card-title>
        <v-col>
          <v-text-field
            class="input mx-auto"
            square
            outlined
            v-model="text"
            label="Digite seu e-mail"
          ></v-text-field>
          <v-text-field
            class="input mx-auto"
            square
            outlined
            v-model="text"
            label="Digite sua senha"
          >
          </v-text-field>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cadastro: false,
    };
  },
};
</script>

<style>
.pop-up-card {
    justify-items: center;
}
.input {
  max-width: 400px;
  display: block;
  margin: 0 auto;
}
.v-btn1:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: none;
}
</style>
