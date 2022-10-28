<template>
  <router-view></router-view>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  created() {
    if (this.token) {
      this.setHeaders();
    } else {
      this.unsetHeaders();
    }
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    ...mapMutations("auth", ["setHeaders", "unsetHeaders"]),
  }
};
</script>

<style>

</style>
