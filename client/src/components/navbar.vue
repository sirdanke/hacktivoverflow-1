<template>
  <v-toolbar>
    <v-toolbar-title @click="$router.push('/')"><p class="logo" >Hacktiv-Overflow</p></v-toolbar-title>
    <v-spacer></v-spacer>
    <form class="form-inline" @submit.prevent="searchTag">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search by tag"
        aria-label="Search"
        v-model="tag"
      >
      <button class="btn btn-light my-2 my-sm-0" type="submit">SEARCH</button>
    </form>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat  v-if="!isLogin" @click="$router.push('/login')">Login</v-btn>
      <v-btn flat  v-if="isLogin" @click="logout">logout</v-btn>
      <v-btn  flat @click="$router.push('/signup')">signup</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import search from "@/components/searchpage";
export default {
  components: {
    search
  },
  name: "navbar",
  data() {
    return {
      tag: ""
    };
  },
  created() {
    this.$store.commit("cekLogin");
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin[0];
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$store.commit("logout");
    },
    searchTag() {
      this.$router.push({ path: `/search/${this.tag}` });
    }
  }
};
</script>

<style scoped>
.logo{
  cursor: all-scroll
}
</style>

