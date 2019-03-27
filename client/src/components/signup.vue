<template>
  <v-flex>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs6>
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Register Form</h5>

            <form class="form-signup" @submit.prevent="register">
              <div class="form-label-group">
                <label for="inputEmail">Full Name</label>
                <input
                  type="text"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Full Name"
                  v-model="name"
                >
              </div>
              <div class="form-label-group">
                <label for="inputName">Email</label>
                <input
                  type="email"
                  id="inputName"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                >
              </div>

              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required
                  v-model="password"
                >
              </div>
              <div class="form-label-group">
                <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
              </div>

              <div>
                <img
                  src="https://gifimage.net/wp-content/uploads/2017/09/ajax-loading-gif-transparent-background-8.gif"
                  v-if="isLoading"
                >
              </div>

              <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">REGISTER</button>
            </form>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "@/api/server";
export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      tag: "",
      tags: []
    };
  },
  components: {
    VueTagsInput
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    register() {
      this.$store.state.isLoading = true;
      this.$store.dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password,
        tags: this.tags
      });
    }
  }
};
</script>
