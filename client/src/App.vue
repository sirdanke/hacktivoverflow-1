<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "app",
  created() {
    this.$store.dispatch("getAllPostings");
    this.cekLogin()
    // this.$store.dispatch("cekLogin");
  },
  methods: {
    cekLogin() {
      axios
        .get(`/users/tag`,{headers : {
          token : localStorage.getItem('token')
        }})
        .then(({data})=> {
          // console.log(data);
          
          // this.$store.commit('login', data.tag)    
        })
        .catch(()=> {
          // swal('oops our server is busy, please refresh your browser')        
        })
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
