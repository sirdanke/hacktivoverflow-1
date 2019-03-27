<template>
  <v-flex xs-8 offset-xs1>
    <v-layout align-start justify-center column class="ma-5">
        <v-flex><div> <h3> User Suggestion by Watched Tags</h3></div></v-flex>
      <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
    </v-layout>
    <v-layout v-for="(post, index) in suggestionPost" :key="index">
      <v-card class="ma-3" style="min-width:90%">
          <!-- {{post}} -->
        <v-layout>
          <v-flex xs4>
            <v-layout style="margin:10px">
              <v-flex>
                <h5>{{post.upvotes.length - post.downvotes.length }}</h5>
                <p>vote(s)</p>
              </v-flex>
              <v-flex>
                <h5>{{post.answers.length}}</h5>
                <p>answer(s)</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs8>
            <v-layout>
              <h5>
                <a
                  href
                  @click.prevent="selectedPosting(post, index)"
                  style="padding:7px"
                >{{post.title}}</a>
              </h5>
            </v-layout>
            <v-layout>
              <v-flex grow pa-1>
                <v-layout align-start>
                  <li style="display:inline; margin:5px " v-for="tag in post.tags" :key="tag._id">
                    <a
                      href
                      @click.prevent="search(tag.name)"
                      class="{elevation-0:true}"
                    >{{tag.name}}</a>
                  </li>
                </v-layout>
              </v-flex>
              <v-flex>
                <a href @click.prevent="selectedPosting(post, index)">posted by : {{post.user.name}}</a>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
    <!-- <update :selected-post="selectedPost"/> -->
  </v-flex>
</template>
<script>
import axios from "@/api/server";
import update from "@/components/editpost.vue";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "watched-tag",
  components: {
    update,
    VueTagsInput
  },
  data() {
    return {
      userPostings: {},
      selectedPost: { title: "", description: "", tags: [{ name: "" }] },
      tags: [{ text: "" }],
      tag: "",
      suggestionPost: []
    };
  },
  watch: {
    tags(v) {
      //   console.log(v);

      //       let data = []
      //       v.forEach(e => {
      //       let obj = {}
      //           obj.text = e
      //           data.push(obj)
      //       });
      axios
        .patch(
          "/users/updateTag",
          { tags: v },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.suggestionPost = data;
          console.log(data, "===data fetch");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    // userTags() {
    //   return this.$store.state.userWatchedTag;
    // }
  },
  created() {
    this.fetchTag();
  },
  methods: {
    fetchTag() {
      axios
        .get("/users/tag", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          let array = [];
          data.tag.forEach(e => {
            let obj = {};
            obj.text = e.name;
            array.push(obj);
          });
          this.tags = array;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getUserTag() {
      this.tags = this.userTags.map(a => a.name);
    },
    selectedPosting(posting, index) {
      this.$router.push({
        path: `posting/${posting._id}/${index}`
      });
    },
    updateTag() {
      console.log("masuk sini");
    },
    getSuggestion(v) {
      console.log(v);

      axios
        .patch(
          "/users/updateTag",
          { tags: v },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.suggestionPost = data;
          console.log(data, "===data fetch");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

