<template>
  <v-container style="max-widht:80%">
    <navbar/>
    <v-layout>
      <sidenav/>
      <router-view/>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import sidenav from "@/components/sidenav.vue";

export default {
  name: "home",
  components: {
    navbar,
    sidenav
  },
  created() {
    this.$store.commit("cekLogin");
  }
};
</script>
