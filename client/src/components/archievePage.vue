<template>
 
  <v-flex xs-8 offset-xs1>
    <v-layout v-for="(post, index) in userPostings" :key="index">
      <v-card class="ma-3" style="min-width:90%">
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
                <button
                  type="button"
                
                  @click="$router.push(`/edit/${post._id}`)"
                  style="margin:5px"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  @click.prevent="deletePost(post)"
                  style="margin:5px"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
                <!-- <a href @click.prevent="selectedPosting(post, index)">posted by : {{post.user.name}}</a> -->
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
export default {
  name: "archieve",
  components: {
    update
  },
  data() {
    return {
      userPostings: {},
      selectedPost: { title: "", description: "" , tags : [{name : ''}]}
    };
  },
  created() {
    this.getUserPostings();
  },
  // computed : {
  //   allPostings : {

  //   }
  //   }
  // },
  // watch : {
  //   "this.$store.state.allPostings"(v) {

  //   }
  // },
  methods: {
    selectedPosting(posting, index) {
      this.$router.push({
        path: `posting/${posting._id}/${index}`
      });
    },
    getUserPostings() {
      let user = localStorage.getItem("user");
      let data = this.$store.state.allPostings.filter(posting => {
        return posting.user._id == user;
      });
      this.userPostings = data;
    },
    editPost(post) {
      this.selectedPost = post;
    },
    deletePost(post) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        icon: "warning",
        buttons: ["No, cancel it!", "Yes, I am sure!"],
        dangerMode: true
      }).then(isConfirm => {
        if (isConfirm) {
          swal({
            title: "Deleted!",
            text: "your article are successfully deleted!",
            icon: "success"
          })
            .then(() => {
              axios
                .delete(`/postings/${post._id}`, {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                })
                .then(() => {
                  console.log(this.userPostings);

                  let data = this.userPostings.filter(function(a) {
                    console.log(a._id, post._id);

                    return a._id !== post._id;
                  });
                  this.userPostings = data;
                });
            })
            .catch(err => {
              swal("our server are busy, please try again");
            });
        } else {
          swal("Cancelled", "Your posting is safe :)", "error");
        }
      });
    }
  }
};
</script>

