<template>
  <v-flex xs-8 offset-xs1>
    <v-layout v-for="(post,index) in allData" :key="index">
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
                <a href @click.prevent="selectedPosting(post, index)">posted by : {{post.user.name}}</a>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
    <v-divider></v-divider>
    <div>
      <h5>Job Recomendation</h5>
    </div>
    <v-divider></v-divider>
    <v-layout>
      <v-flex xs-2 v-for="job in relatedJobs" :key="job.id">
        <v-card color="blue-grey darken-2" class="ma-3 white--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{job.title}}</div>
              <span>{{job.company}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>{{job.location}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "search",
  data() {
    return {
      allPostings: "",
      querySearch: this.$route.params.query,
      relatedJobs: ""
    };
  },
  watch: {
    "$route.params.query"(v) {
      this.querySearch = v;
      this.searchedTag();
    },
    "$store.state.searchedPosting"(v) {
      this.allData = v
    }
  },
  computed: {
    allData() {
      return this.$store.state.searchedPosting;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    this.querySearch = this.$route.params.query;
    this.searchedTag();
  },
  mounted() {
    this.relatedJob();
  },
  methods: {
    relatedJob() {
      this.relatedJobs = this.allData[0].tags[0].job;
    },
    search(tag) {
      this.$router.push({ path: `/search/${tag}` });
    },
    searchedTag(payload) {
      let query = payload || this.querySearch;
      console.log(query);
      console.log(query);

      this.$store.dispatch("searchedTag", query);
    },
    selectedPosting(posting, index) {
      this.$router.push({
        path: `/posting/${posting._id}/${index}`
      });
    },
    addVote(post, index, command) {
      let currentUser = localStorage.getItem("user");

      let upvoter = false;
      let downvoter = false;

      this.$store.state.allPostings[index].upvotes.forEach(element => {
        if (element == currentUser) {
          upvoter = true;
        }
      });

      this.allPostings[index].downvotes.forEach(el => {
        if (el == currentUser) {
          downvoter = true;
        }
      });
      let model = "postings";

      // proses pemilihan
      if (command == "upvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model
          });
        } else if (!upvoter && downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model
          });
        } else {
          swal("you already upvoter");
        }
      } else if (command == "downvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model
          });
        } else if (upvoter && !downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model
          });
        } else {
          swal("you already dowvoter");
        }
      }
    }
  }
};
</script>

