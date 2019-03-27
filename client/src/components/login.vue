<template>

  <v-flex>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs6>
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">My Account</h5>

            <form class="form-signup" @submit.prevent="login">
              <div class="form-label-group">
                <label for="inputName">Email</label>
                <input
                  type="email"
                  id="inputName"
                  class="form-control"
                  placeholder="Email address"
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
              <br>

              <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">login</button>
            </form>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {
    isLogin() {
      return this.$state.isLogin;
    }
  }
};
</script>

