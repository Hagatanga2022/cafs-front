<template>
  <router-view></router-view>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  created() {
    this.loggedIn ? this.setHeaders() : this.unsetHeaders();
    this.loggedIn ? this.setAnnounces() : this.cleanAnnouncement();
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapMutations("auth", ["setHeaders", "unsetHeaders"]),
    ...mapMutations("announcement", ["cleanAnnouncement", "setAnnounces"]),
  },
};
</script>

<style></style>
