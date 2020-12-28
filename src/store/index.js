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
    messageSender: [],
    messageReceiver: [],
    message: [],
    historyMessage: []
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
    SET_MESSAGE_SENDER (state, payload) {
      state.messageSender = payload
    },
    SET_MESSAGE_RECEIVER (state, payload) {
      state.messageReceiver = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_HISTORY_MESSAGE (state, payload) {
      state.historyMessage = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
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
    getUserById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/users/${localStorage.getItem('id')}`)
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
            console.log('data friends', res.data.result[0])
            const result = res.data.result[0]
            context.commit('SET_USER', result)
            resolve(res)
          })
      })
    },
    getAllHistory (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message/history/${localStorage.getItem('id')}/${router.currentRoute.query.id}`)
          .then(res => {
            const result = res.data.result
            console.log('all history', res.data.result)
            context.commit('SET_HISTORY_MESSAGE', result)
            resolve(res)
          })
      })
    },
    getAllMessage (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message`)
          .then(res => {
            console.log('all message', res.data.result)
            const result = res.data.result
            context.commit('SET_MESSAGE', result)
            resolve(res)
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
      })
    },
    senderMessage (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_BACKEND}/message/sender/${localStorage.getItem('id')}`)
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
    },
    isLogin (state) {
      return state.token !== null
    },
    historyChat (state) {
      return state.historyMessage
    }
  },
  modules: {
  }
})
