<template>
  <v-flex xs10>
    <v-layout align-center justify-center row fill-height>
      <form action method="POST" @submit.prevent="createPost" style="min-width:60%" class="ma-3">
        <div class="form-group">
          <label for="title">
            Title
            <span class="require">*</span>
          </label>
          <input type="text" class="form-control" name="title" v-model="title">
        </div>

        <div class="form-group">
          <label for="description">
            Description
            <span class="require">*</span>
          </label>
          <wysiwyg v-model="description" />
          <!-- <textarea rows="5" class="form-control" name="description" v-model="description"></textarea> -->
        </div>
        <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>

        <div class="form-group">
          <p>
            <span class="require">*</span> - required fields
          </p>
        </div>

        <div class="form-group">
          <div> 
            <img src="https://gifimage.net/wp-content/uploads/2017/09/ajax-loading-gif-transparent-background-8.gif" v-if="isLoading">
          </div>
          <button type="submit" class="btn btn-success">Post Question</button>
        </div>
        
      </form>
    </v-layout>
  </v-flex>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "createpost",
  components : {
    VueTagsInput
  },
  computed : { 
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  data() {
    return {
      title: "",
      description: "",
      tag: "",
      tags: [],
      myHTML : ''
    };
  },
  methods: {
    createPost() {
      let newPosting = {
        title: this.title,
        description: this.description,
        tags : this.tags
      };

      this.$store.state.isLoading = true
      this.$store.dispatch("createPost", newPosting);
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

