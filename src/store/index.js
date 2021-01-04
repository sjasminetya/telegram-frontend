import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null || localStorage.getItem('id'),
    token: null || localStorage.getItem('token'),
    users: [],
    userLogin: [],
    friends: [],
    messageFriends: null,
    messages: [],
    historyMessage: [],
    password: '',
    searchUser: [],
    room: [],
    roomMessage: [],
    historyRoom: [],
    nameJoinRoom: []
  },
  plugins: [createPersistedState()],
  mutations: {
    togglePassword (state) {
      state.password = document.getElementById('password')
      if (state.password.type === 'password') {
        state.password.type = 'text'
      } else {
        state.password.type = 'password'
      }
    },
    SET_USER (state, payload) {
      state.users = payload
      state.token = payload.token
      state.id = payload.id
    },
    SET_PROFILE (state, payload) {
      state.userLogin = payload
    },
    SET_FRIENDS (state, payload) {
      state.friends = payload
    },
    SET_MESSAGE_FRIENDS (state, payload) {
      state.messageFriends = payload
    },
    SET_MESSAGE (state, payload) {
      state.messages = payload
    },
    SET_MESSAGE_PUSH (state, payload) {
      state.messages.push(payload)
      console.log('message push')
    },
    REMOVE_MESSAGE (state) {
      state.messages = []
    },
    REMOVE_HISTORY (state) {
      state.historyMessage = []
    },
    SEARCH_USER (state, payload) {
      state.searchUser = payload
    },
    SET_ROOM (state, payload) {
      state.room = payload
    },
    SET_ROOM_MESSAGE (state, payload) {
      state.roomMessage = payload
    },
    SET_HISTORY_ROOM (state, payload) {
      state.historyRoom = payload
    },
    SET_NAME_JOIN_ROOM (state, payload) {
      state.nameJoinRoom = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    },
    REMOVE_ALL (state) {
      state.message = null
      state.messageFriends = null
      state.historyMessage = null
      state.friends = null
      state.userLogin = null
      state.users = null
      state.id = null
      state.password = ''
      state.searchUser = null
      state.room = null
      state.roomMessage = null
      state.historyRoom = null
      state.nameJoinRoom = null
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/login`, payload)
          .then(res => {
            console.log(res.data.result)
            const result = res.data.result
            localStorage.setItem('id', result.id)
            localStorage.setItem('token', result.token)
            context.commit('SET_USER', result)
            resolve(result)
          })
      })
    },
    logout (context) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      context.commit('REMOVE_TOKEN')
      context.commit('REMOVE_ALL')
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/register`, payload)
          .then(res => {
            console.log(res.data.result)
            const result = res.data.result
            context.commit('SET_USER', result)
            resolve(res)
          })
      })
    },
    update (context, payload) {
      return new Promise((resolve, reject) => {
        // console.log('ini errornya?')
        axios.patch(`${process.env.VUE_APP_URL_BACKEND}/users/${localStorage.getItem('id')}`, payload)
        // console.log('ini isi payload update', payload)
          .then((res) => {
            console.log('data update', res.data.result)
            resolve(res)
          })
          .catch(err => {
            console.log('ada error?', err.response)
            reject(err)
          })
      })
    },
    updateImage (context, formData) {
      return new Promise((resolve, reject) => {
        // console.log('ini errornya?')
        axios.patch(`${process.env.VUE_APP_URL_BACKEND}/users/image/${localStorage.getItem('id')}`, formData)
        // console.log('ini isi payload update', payload)
          .then((res) => {
            console.log('data update', res.data.result)
            resolve(res)
          })
          .catch(err => {
            console.log('ada error?', err.response)
            reject(err)
          })
      })
    },
    getAllUser (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users?name=${payload.name}`)
          .then(res => {
            const result = res.data.result
            context.commit('SEARCH_USER', result)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    getUserById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/${localStorage.getItem('id')}`)
          .then(res => {
            console.log('data login', res.data.result)
            const result = res.data.result[0]
            context.commit('SET_PROFILE', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get user by id', err)
            reject(err)
          })
      })
    },
    getAllHistory (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message/history/${localStorage.getItem('id')}/${payload}`)
          .then(res => {
            const result = res.data.result
            console.log('all history', res.data.result)
            context.commit('SET_MESSAGE', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get history page message', err)
            reject(err)
          })
      })
    },
    getFriends (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/friends/${localStorage.getItem('id')}`)
          .then(res => {
            console.log('data friends', res.data.result)
            const result = res.data.result
            context.commit('SET_FRIENDS', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get chat list', err)
            reject(err)
          })
      })
    },
    messageFriends (context, payload) {
      // console.log('ngga kepanggil?')
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/friends/message/${payload}`)
        // console.log('halo')
          .then((res) => {
            const result = res.data.result[0]
            console.log('ini di page message', result)
            context.commit('SET_MESSAGE_FRIENDS', result)
            resolve(res)
          })
          .catch(err => {
            console.log('ada error?', err)
            reject(err)
          })
      })
    },
    getGroupById (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/room/${localStorage.getItem('id')}`)
          .then(res => {
            console.log('data group untuk chat list', res.data.result)
            const result = res.data.result
            context.commit('SET_ROOM', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get room by id', err)
            reject(err)
          })
      })
    },
    messageRoom (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/room/message/${localStorage.getItem('id')}`)
          .then(res => {
            console.log('data group untuk message room', res.data.result[0])
            const result = res.data.result[0]
            context.commit('SET_ROOM_MESSAGE', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get room by id', err)
            reject(err)
          })
      })
    },
    historyChatGroup (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/chat-room/history`)
          .then(res => {
            const result = res.data.result
            console.log('all history chat group', res.data.result)
            context.commit('SET_HISTORY_ROOM', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get history page message room', err)
            reject(err)
          })
      })
    },
    whoJoinRoom (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/chat-room?nameRoom=${payload.nameRoom}`)
          .then(res => {
            const result = res.data.result
            console.log('name join room', res.data.result)
            context.commit('SET_NAME_JOIN_ROOM', result)
            resolve(res)
          })
          .catch(err => {
            console.log('error di get name join room', err)
            reject(err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        if (response.data.status_code === 200) {
          if (response.data.result.message === 'Success register, please check your email to verify') {
            Swal.fire({
              icon: 'success',
              title: 'Success register, check your email to confirmation',
              showConfirmButton: false,
              timer: 2000
            })
            router.push('/auth/login')
          } else if (response.data.result.message === 'data successfull update') {
            Swal.fire({
              icon: 'success',
              title: 'Success update',
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
        return response
      }, function (error) {
        if (error.response.data.status_code === 400) {
          if (error.response.data.err.message === 'email already exists') {
            Swal.fire({
              icon: 'error',
              title: 'email already exists',
              showConfirmButton: false,
              timer: 2000
            })
          }
        } else if (error.response.data.status_code === 401) {
          if (error.response.data.err.error === 'Login failed, wrong password') {
            Swal.fire({
              icon: 'error',
              title: 'Login failed, wrong password',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (error.response.data.err.message === 'invalid token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Swal.fire({
              icon: 'error',
              title: 'Dont change token',
              showConfirmButton: false,
              timer: 2000
            })
            router.push('/auth/login')
          } else if (error.response.data.err.message === 'token expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Swal.fire({
              icon: 'error',
              title: 'Token expired, please login again',
              showConfirmButton: false,
              timer: 2000
            })
            router.push('/auth/login')
          } else if (error.response.data.err.error === 'please confirm your email to login') {
            Swal.fire({
              icon: 'error',
              title: 'Login failed, please confirmation your email',
              showConfirmButton: false,
              timer: 2000
            })
          }
        } else if (error.response.data.status_code === 404) {
          if (error.response.data.err.message === 'email and password cannot be empty') {
            Swal.fire({
              icon: 'error',
              title: 'Email not found',
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    userLogin (state) {
      return state.userLogin
    },
    friends (state) {
      return state.friends
    },
    messageToFriends (state) {
      return state.messageFriends
    },
    isLogin (state) {
      return state.token !== null
    },
    historyChat (state) {
      return state.historyMessage
    },
    getGroup (state) {
      return state.room
    },
    roomMessage (state) {
      return state.roomMessage
    },
    nameJoinRoom (state) {
      return state.nameJoinRoom
    }
  },
  modules: {
  }
})
