import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

import axios from '@/api/server'


export default new Vuex.Store({
  state: {
    allPostings: [],
    currentUser: '',
    isLogin: [false],
    userWatchedTag: [],
    searchedPosting: [],
    isLoading: false
  },
  mutations: {
    cekLogin(state, payload) {
      if (localStorage.getItem('token')) {
        state.isLogin.splice(0, 1, true)
      }
    },
    searchedTag(state, payload) {
      state.searchedPosting = payload.searchedTag
      state.userWatchedTag = payload.tags
    },
    login(state, payload) {
      state.userWatchedTag = payload
      state.isLogin.splice(0, 1, true)
      router.push({ path: '/' })
    },
    logout(state) {
      state.userWatchedTag = []
      state.isLogin.splice(0, 1, false)
      router.push({ path: '/' })
    },
    createPost(state, payload) {
      state.isLoading = false
      state.allPostings.unshift(payload)
      router.push({ path: '/' })
    },
    getAllPostings(state, payload) {
      state.allPostings = payload.reverse()
    },
    selectPosting(state, payload) {
      state.selectedPosting = payload
      router.push({ path: '/posting' })
    },
    addVote(state, payload) {
      const newData = { ...state.allPostings[payload.index], upvotes: payload.data.upvotes, downvotes: payload.data.downvotes };
      state.allPostings.splice(payload.index, 1, newData);
      // router.push('/')
    },
    removeVote(state, payload) {
      const newData = { ...state.allPostings[payload.index], downvotes: payload.data.downvotes, upvotes: payload.data.upvotes };
      state.allPostings.splice(payload.index, 1, newData);
      // router.push('/')
    },
    updateVoteInQuestion(state, payload) {
      state.allPostings[payload.postingIndex].answers.splice(payload.index, 1, payload.data)
      router.push(`/posting/${payload.postingId}/${payload.postingIndex}`)
    },
    searchByTag(state, payload) {
      router.push(`/search/${payload}`)
    },
    editData(state, payload) {
      console.log(payload.data, "======ini payload");
      let index
      state.allPostings.forEach((post,i) => {
        if(post._id == payload.data._id) {
          index = i
        }
      })
      state.allPostings.splice(index, 1, payload.data)
      router.push('/archieve')
    }
  },
  actions: {
    editPost(context, payload) {
      context.commit('editData', payload)
    },
    getAllPostings(context, payload) {
      axios
        .get('/postings')
        .then(({ data }) => {
          context.commit('getAllPostings', data)
        })
        .catch(err => {
          swal('our server is on troble, please refresh your browser')
        })
    },
    register(context, payload) {
      axios
        .post('/users', payload)
        .then(data => {
          context.state.isLoading = false
          router.push('/login')
        })
        .catch(err => {
          context.state.isLoading = false
          swal('opps, field cannot be blank')
        })
    },
    login(context, payload) {
      axios
        .post('/users/login', payload)
        .then(({ data }) => {
          console.log(data, "====");

          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.user._id)
          context.commit('login', data.user.watchedTag)
        })
        .catch(({ response }) => {
          swal(response.data.error)
        })
    },
    createPost(context, payload) {

      axios
        .post('/postings', payload, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.commit('createPost', data)
        })
        .catch(({ response }) => {
          context.state.isLoading = false
          swal(response.data.message)
        })
    },
    addVote(context, payload) {
      axios
        .patch(
          `/${payload.model}/${payload.id}`,
          {
            command: payload.command,
            process: '$push'
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          if (payload.model == 'postings') {
            context.commit('addVote', { data: data, index: payload.index })
          } else {
            context.commit('updateVoteInQuestion', { postingId: payload.postingId, postingIndex: payload.postingIndex, data: data, index: payload.index })
          }
        })
        .catch(err => {
          swal('you have login first')
        });
    },
    removeVote(context, payload) {

      axios
        .patch(
          `/${payload.model}/${payload.id}`,
          {
            command: payload.command,
            process: '$pull'
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(({ data }) => {
          if (payload.model == 'postings') {
            context.commit('removeVote', { data: data, index: payload.index })
          } else {
            context.commit('updateVoteInQuestion', { postingId: payload.postingId, postingIndex: payload.postingIndex, data: data, index: payload.index })
          }
        })
        .catch(err => {
          swal('you have login first')
        })
    },
    searchedTag({ commit, state }, payload) {
      let regex = new RegExp(".*" + payload + ".*", "i");
      let array = [];
      let tag = ''
      state.allPostings.forEach(post =>
        post.tags.forEach(c => {
          if (c.name.match(regex)) {
            array.push(post)
            tag = c._id
          }
        })
      )
      commit('searchedTag', { tags: '', searchedTag: array })
    }
  }
})
