<template>
  <v-flex xs8 offset-xs1>
    <v-layout style="margin-top:5px">
      <h3>{{selectedPosting.title}}</h3>
    </v-layout>
    <v-divider light></v-divider>
    <v-layout style="max-width:90%">
      <v-flex xs3>
        <v-layout align-center column>
          <v-flex>
            <h3
              class="voteButton"
              @click.prevent="addVotePosting(selectedPosting, index, 'upvotes')"
              style="margin:5px"
            >
              <i class="material-icons">change_history</i>
            </h3>
          </v-flex>
          <v-flex>
            <h4>{{selectedPosting.upvotes.length - selectedPosting.downvotes.length }}</h4>
          </v-flex>
          <v-flex>
            <h3
              @click="addVotePosting(selectedPosting, index, 'downvotes')"
              style="margin:5px"
              class="voteButton"
            >
              <i class="material-icons">details</i>
            </h3>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs5>
        <v-layout align-start>
          <!-- <h3>{{selectedPosting.title}}</h3> -->
          <p>{{selectedPosting.description}}</p>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-layout align-center justify-space-between>
      <h5>{{selectedPosting.answers.length}} Answer</h5>
      <v-btn data-toggle="modal" data-target="#exampleModalCenter">answer</v-btn>
    </v-layout>
    <v-divider light></v-divider>

    <v-layout
      style="max-width:100%;"
      v-for=" (answer, index) in selectedPosting.answers"
      :key="index"
    >
      <v-card class="ma-3" style="min-width:90%">
        <v-layout>
          <v-flex xs3>
            <v-layout align-center column>
              <v-flex>
                <h3
                  class="voteButton"
                  @click="addVote(answer, index, 'upvotes')"
                  style="margin:5px"
                >
                  <i class="material-icons">change_history</i>
                </h3>
              </v-flex>
              <v-flex>
                <h4>{{answer.upvotes.length - answer.downvotes.length }}</h4>
              </v-flex>
              <v-flex>
                <h3
                  class="voteButton"
                  @click="addVote(answer, index, 'downvotes')"
                  style="margin:5px"
                >
                  <i class="material-icons">details</i>
                </h3>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs9>
            <v-layout style="margin-top:5px">
              <v-flex xs9>
                <p>{{answer.description}}</p>
              </v-flex>
              <v-flex xs3>
                <v-layout align-center justify-space-between column fill-height>
                  <v-flex>
                    <p>posted by {{answer.user.name}}</p>
                  </v-flex>
                  <v-flex>
                    <button
                      v-if="user == answer.user._id || user == answer.user"
                      type="button"
                      @click="editAnswer(answer, index)"
                      data-toggle="modal"
                      data-target="#exampleModalLong2"
                      style="margin:5px"
                    >
                      <i class="fas fa-edit"></i>
                    </button>

                    <!-- <button
                    v-if="user == answer.user._id || user == answer.user"
                    class="btn btn-primary"
                    style="margin:5px"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalLong2"
                    @click="editAnswer(answer, index)"
                    >edit your answer</button>-->
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>

    <editAnswer :selected-answer="selectedAnswer"/>
    <addAnswer :posting-id="selectedPosting._id" @newdata="refreshData"/>
    <!-- <button @click="addAnswer">submit</button> -->
  </v-flex>
</template>
<script>
import axios from "@/api/server";
import addAnswer from "@/components/addAnswer";
import editAnswer from "@/components/editAnswer";
// import router from "@/router"
export default {
  name: "posting",
  components: {
    addAnswer,
    editAnswer
  },
  data() {
    return {
      newAnswer: "",
      selectedAnswer: "",
      data: this.$route.params.id,
      index: this.$route.params.index,
      user: localStorage.getItem("user")
    };
  },
  computed: {
    allPostings() {
      return this.$store.state.allPostings;
    },
    selectedPosting() {
      let result = "";
      for (let i = 0; i < this.allPostings.length; i++) {
        if (this.allPostings[i]._id == this.data) {
          result = this.allPostings[i];
        }
      }
      return result;
    }
  },
  methods: {
    refreshData(payload) {
      console.log(payload, "====ni comment baru");

      this.selectedPosting.answers.push(payload);
    },

    editAnswer(answer) {
      this.selectedAnswer = answer;
    },
    addVotePosting(post, index, command) {
      console.log("masuk sini");

      let currentUser = localStorage.getItem("user");

      let upvoter = false;
      let downvoter = false;

      this.selectedPosting.upvotes.forEach(element => {
        if (element == currentUser) {
          upvoter = true;
        }
      });

      this.selectedPosting.downvotes.forEach(el => {
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
    },
    addVote(post, index, command) {
      let currentUser = localStorage.getItem("user");
      let upvoter = false;
      let downvoter = false;

      this.selectedPosting.answers[index].upvotes.forEach(element => {
        if (element == currentUser) {
          upvoter = true;
        }
      });

      this.selectedPosting.answers[index].downvotes.forEach(el => {
        if (el == currentUser) {
          downvoter = true;
        }
      });
      // proses pemilihan
      let model = "answers";
      if (command == "upvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            postingIndex: this.index,
            postingId: this.data,
            index: index,
            command: "upvotes",
            model: model
          });
        } else if (!upvoter && downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model,
            postingIndex: this.index,
            postingId: this.data
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
            model: "answers",
            model: model,
            postingIndex: this.index,
            postingId: this.data
          });
        } else if (upvoter && !downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model,
            postingIndex: this.index,
            postingId: this.data
          });
        } else {
          swal("you already dowvoter");
        }
      }
    }
  }
};
</script>

<style scoped>
.voteButton {
  cursor: all-scroll;
}
</style>

