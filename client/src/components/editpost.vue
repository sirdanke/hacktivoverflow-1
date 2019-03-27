<template>
  <!-- Modal -->

  <v-flex xs10>
    <v-layout align-center justify-center row fill-height>
      <form action method="POST" style="min-width:60%" class="ma-3">
        <div class="form-group">
          <label for="title">
            Title 
            <span class="require"></span>
          </label>
          <input type="text" class="form-control" name="title" v-model="selectedPost.title">
        </div>

        <div class="form-group">
          <label for="description">
            Description
            <span class="require"></span>
          </label>
          <wysiwyg v-model="selectedPost.description"/>
        </div>
        <VueTagsInput
          v-model="selectedPost.tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        />
        <!-- <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/> -->

        

        <div class="form-group">
          <button type="button" @click.prevent="updatePost" class="btn btn-success">Post Question</button>
        </div>
      </form>
    </v-layout>
  </v-flex>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "@/api/server";
import loginVue from "./login.vue";
export default {
  name: "update",
  data() {
    return {
      image: "",
      tag: "",
      tags: [{ text: "" }],
      id: this.$route.params.id,
      selectedPost: []
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  components: {
    VueTagsInput
  },
  created() {
    this.getPostToEdit();
    // this.getTags();
  },
  mounted() { 
    // this.getTags()
  },
  // props: ["selected-post"],
  watch: {
    // selectedPost(v) {
    //   let array = []
    //    v.tags.forEach(e => {
    //         let obj = {};
    //         obj.text = e.name;
    //         array.push(obj);
    //       });
    //   this.tags = v.tags.map(a => a.name);
    // }
  },
  methods: {
    getPostToEdit() {
      console.log('masuk sini');
      
      axios
        .get(`/postings/${this.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          // console.log(data, "====ini datanya");
          this.selectedPost = data;
          this.getTags()
        })
        .catch(({ response }) => {
          console.log(response, "====ERROR");
        });
    },
    getTags() {
      let array = [];
      this.selectedPost.tags.forEach(e => {
        let obj = {};
        obj.text = e.name;
        array.push(obj);
      });
      this.tags = array;

      console.log(this.tags);
      
      // this.tags = this.selectedPost.tags.map(a => a.name);
    },
    updatePost() {
      console.log(this.tags);

      axios
        .put(
          `/postings/${this.selectedPost._id}`,
          {
            title: this.selectedPost.title,
            description: this.selectedPost.description,
            tags: this.tags
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
          console.log(data, "==ini data");
          
          this.$store.dispatch('editPost', data)
          this.selectedPost = data;
          swal("data updated");
        })
        .catch(err => {
          swal("oops, something bad happen");
        });
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
