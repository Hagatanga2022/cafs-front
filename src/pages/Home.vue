<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-toolbar
        class="white--text d-flex"
        color="cyan darken-1"
        dark
        extended
        extension-height="100"
        elevation="1"
      >
        <v-spacer />
        <v-toolbar-title class="texts">
          <div>
            <h1>
              <b>C.A.F.S</b>
            </h1>
            <h3>
              <p>Controle de acesso à Fábrica de Software</p>
            </h3>
          </div>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col id="text-area" cols="12" md="7">
          <v-textarea
            prepend-inner-icon="mdi-comment"
            outlined
            name="input-7-4"
            background-color="grey lighten-2"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
          ></v-textarea>
        </v-col>
        <v-container class="avisos"></v-container>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
#text-area {
  margin-left: 18rem;
}
.texts {
  margin-top: 6rem;
  margin-left: 30rem;
  text-align: center;
  align-content: center;
}

.avisos {
  height: 1000px;
  width: 1000px;
}
</style>
