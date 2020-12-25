import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null || sessionStorage.getItem('id'),
    token: null || sessionStorage.getItem('token'),
    users: [],
    userLogin: [],
    friends: [],
    messageSender: [],
    messageReceiver: []
  },
  plugins: [createPersistedState()],
  mutations: {
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
    SET_MESSAGE_SENDER (state, payload) {
      state.messageSender = payload
    },
    SET_MESSAGE_RECEIVER (state, payload) {
      state.messageReceiver = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_BACKEND}/users/login`, payload)
          .then(res => {
            console.log(res.data.result)
            const result = res.data.result
            sessionStorage.setItem('id', result.id)
            sessionStorage.setItem('token', result.token)
            context.commit('SET_USER', result)
            resolve(result)
          })
      })
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
        axios.patch(`${process.env.VUE_APP_URL_BACKEND}/users/${sessionStorage.getItem('id')}`, payload)
          .then(res => {
            console.log('data update', res.data.result)
            const result = res.data.result
            context.commit('SET_USER', result)
            resolve(res)
          })
          .catch(err => {
            console.log('ada error?', err.response)
          })
      })
    },
    getUserById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/${sessionStorage.getItem('id')}`)
          .then(res => {
            console.log('data login', res.data.result)
            const result = res.data.result[0]
            context.commit('SET_PROFILE', result)
            resolve(res)
          })
      })
    },
    getAll (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/${router.currentRoute.query.id}`)
          .then(res => {
            console.log('data login', res.data.result)
            const result = res.data.result[0]
            context.commit('SET_USER', result)
            resolve(res)
          })
      })
    },
    getFriends (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/friends/${sessionStorage.getItem('id')}`)
          .then(res => {
            console.log('data friends', res.data.result)
            const result = res.data.result
            context.commit('SET_FRIENDS', result)
            resolve(res)
          })
      })
    },
    senderMessage (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message/sender/${sessionStorage.getItem('id')}`)
          .then(res => {
            console.log('data message sender', res.data.result)
            const result = res.data.result
            context.commit('SET_MESSAGE_SENDER', result)
            resolve(res)
          })
      })
    },
    receiverMessage (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message/sender/${router.currentRoute.query.id}`)
          .then(res => {
            console.log('data message receiver', res.data.result)
            const result = res.data.result
            context.commit('SET_MESSAGE_RECEIVER', result)
            resolve(res)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        if (response.data.statusCode === 200) {
          if (response.data.result.message === 'Please check your email for activation account') {
            Swal.fire({
              icon: 'success',
              title: 'Success register. Please check your email for activation account',
              showConfirmButton: false,
              timer: 2000
            })
            router.push('/auth/login')
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
          if (error.response.data.err.error === 'please confirm your email to login') {
            Swal.fire({
              icon: 'error',
              title: 'please confirm your email to login',
              showConfirmButton: false,
              timer: 2000
            })
          } else if (error.response.data.err.error === 'Login failed, wrong password') {
            Swal.fire({
              icon: 'error',
              title: 'Login failed, wrong password',
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
      })
    }
  },
  getters: {
    getUser (state) {
      return state.users
    },
    userLogin (state) {
      return state.userLogin
    },
    friends (state) {
      return state.friends
    },
    getMessageSender (state) {
      return state.messageSender
    },
    getMessageReceiver (state) {
      return state.messageReceiver
    }
  },
  modules: {
  }
})
