<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  async created() {
    this.loggedIn ? this.setHeaders() : this.unsetHeaders();
    this.loggedIn ? await this.getAnnouncement() : this.cleanAnnouncement();
    this.loggedIn ? await this.getComment() : this.cleanComments();
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapMutations("auth", ["setHeaders", "unsetHeaders"]),
    ...mapMutations("announcement", ["cleanAnnouncement"]),
    ...mapMutations("comment", ["cleanComments"]),

    ...mapActions("announcement", ["getAnnouncement"]),
    ...mapActions("comment", ["getComment"]),
  },
};
</script>

<style></style>
