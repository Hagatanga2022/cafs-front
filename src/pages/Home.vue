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
        <v-toolbar-title class="texts">
          <div class="title">
            <h1>
              <b>C.A.F.S</b>
            </h1>
            <h3>
              <p>Controle de acesso à Fábrica de Software</p>
            </h3>
          </div>
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7">
            <v-textarea
            outlined
            name="input-7-4"
            label="Quadro de avisos"
            placeholder="Informe avisos aos bolsistas de seus projetos."
          ></v-textarea>
          </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style>

.texts {
  margin-top: 6rem;
  text-align: center;
  text-justify: center;
  margin-top: 6rem; 
}
</style>
