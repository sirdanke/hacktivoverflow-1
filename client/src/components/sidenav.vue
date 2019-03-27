<template>
  <v-flex xs2>
    <v-list>
      <!-- <router-link to="/"> -->
      <!-- <i class="fas fa-book-reader"></i> Read
      </router-link>
    </p>
    <p>
      <router-link to="/create">
        <i class="fas fa-blog"></i> Create
      </router-link>
    </p>
      <p>-->

      <!-- <router-link to="/archieve"> -->
      <v-list-tile @click.prevent="$router.push('/')">Read</v-list-tile>
      <v-list-tile @click.prevent="$router.push('/create')" v-if="isLogin[0]">Create</v-list-tile>
      <v-list-tile @click.prevent="$router.push('/archieve')" v-if="isLogin[0]">Archieve</v-list-tile>
      <v-list-tile @click.prevent="$router.push('/watched-tag')" v-if="isLogin[0]">watched Tag</v-list-tile>
    </v-list>
    <v-divider></v-divider>

    <v-list subheader two-line>
      <!-- <v-subheader>Hangout notifications</v-subheader> -->

      <v-list-tile>
        <!-- <v-list-tile-action> -->
        <!-- <v-checkbox v-model="notifications"></v-checkbox> -->
        <!-- </v-list-tile-action> -->

        <v-list-tile-content>
          <!-- <v-list-tile-title>User Watched Tag</v-list-tile-title> -->
          <!-- <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/> -->
          <v-list-tile-sub-title v-for="tag in watchedTag" :key="tag._id"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "@/api/server";
export default {
  name: "sidenav",

  data() {
    return {
      allTags: ""
    };
  },
  components: {
    VueTagsInput
  },
  created() {
    this.getAllTag();
  },
  computed: {
    watchedTag() {
      return this.$store.state.userWatchedTag;
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    search(tag) {
      this.$router.push({ path: `/search/${tag}` });
    },
    getAllTag() {
      axios
        .get("/tags", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.allTags = data;
        })
        .catch(err => {
          swal("internal server error");
        });
    }
  }
};
</script>
