<template>
<div>
    <div class="menu-top">
        <h1>Telegram</h1>
        <Menu/>
    </div>
    <div class="menu-search">
        <input v-model="search" @keyup.enter="searchUser" type="text" class="form-control" placeholder="Search User">
        <!-- <img src="../../assets/plus.png" alt="icon plus"> -->
        <ChildMenu/>
    </div>
    <div class="menu-chat-list">
        <h1>All</h1>
        <div v-if="!search">
            <div class="form-chat" v-on:click="goMessage(data.id)" v-for="data in friends" :key="data.id">
                <div class="img-profile">
                    <img :src="data.photoProfile" alt="user photo">
                </div>
                <div class="name-message">
                    <h6 class="username">{{data.name}}</h6>
                    <p class="message"></p>
                </div>
                <p class="time">15.12</p>
            </div>
        </div>

        <div v-if="search">
            <div class="form-chat" v-on:click="goMessage(data.id)" v-for="data in searchName" :key="data.id">
                <div class="img-profile">
                    <img :src="data.photoProfile" alt="user photo">
                </div>
                <div class="name-message">
                    <h6 class="username">{{data.name}}</h6>
                    <p class="message"></p>
                </div>
                <p class="time">15.12</p>
            </div>
        </div>

        <div v-if="!search">
            <div class="form-chat" v-on:click="goRoomMessage(data.nameRoom)" v-for="(data, index) in getGroup" :key="index">
                <div class="img-profile">
                    <img :src="data.imgRoom" alt="user photo">
                </div>
                <div class="name-message">
                    <h6 class="username">{{data.nameRoom}}</h6>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Menu from '../module/Menu'
import ChildMenu from '../module/CildMenu'
export default {
  name: 'ChatList',
  props: ['socket'],
  components: {
    Menu,
    ChildMenu
  },
  data () {
    return {
      searchName: '',
      search: '',
      message: ''
    }
  },
  methods: {
    ...mapActions(['getFriends', 'getAllUser', 'getGroupById', 'getAllHistory', 'messageFriends']),
    ...mapMutations(['REMOVE_HISTORY', 'SET_MESSAGE', 'REMOVE_MESSAGE']),
    async goMessage (id) {
      console.log('isi id', id)
      this.$router.push(`/main/message/${id}`)
      this.REMOVE_MESSAGE()
      this.messageFriends(id)
      const historyChat = await this.getAllHistory(id)
      console.log('isi history chat chatlist', historyChat)
      const get = historyChat.data.result
      console.log('isi get chat list', get)
      this.SET_MESSAGE(get)
    },
    goRoomMessage (nameRoom) {
      this.$router.push({ name: 'Room', query: { nameRoom: nameRoom } })
    },
    async searchUser () {
      const searchName = await axios.get(`${process.env.VUE_APP_URL_BACKEND}/users?name=${this.search}`)
      const resultSearch = searchName.data.result
      this.searchName = resultSearch
      console.log(searchName)
    }
  },
  watch: {
    search (newSearch, oldSearch) {
      console.log('New search is', newSearch)
      console.log('Old search is', oldSearch)
      this.searchUser()
    }
  },
  mounted () {
    this.getFriends()
    this.searchUser()
    this.getGroupById()
  },
  computed: {
    ...mapGetters(['friends', 'getGroup'])
  }
}
</script>

<style scoped>
.menu-top,
.menu-search {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-left: 20px;
}

.menu-top h1 {
    font-weight: 500;
    font-size: 29px;
    line-height: 34px;
    letter-spacing: -0.165px;
    color: #7E98DF;
}

.menu-search img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    margin-right: 10px;
}

.menu-search input {
    background: #FAFAFA;
    border-radius: 15px;
    width: 320px;
    height: 60px;
    background-image: url('../../assets/search.png');
    background-repeat: no-repeat;
    background-position: left;
    background-position-x: 20px;
    padding-left: 60px;
}

.menu-search input:focus {
    box-shadow: none;
}

.menu-chat-list {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    justify-content: center;
    position: relative;
}

.menu-chat-list h1 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    background: #7E98DF;
    border-radius: 20px;
    width: 133px;
    height: 50px;
    padding-top: 13px;
    align-self: center;
}

.menu-chat-list .form-chat {
    display: flex;
    margin-top: 30px;
    cursor: pointer;
    padding-left: 30px;
}

.menu-chat-list .form-chat .time {
    position: absolute;
    right: 20px;
}

.menu-chat-list .form-chat .img-profile img{
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 100%;
}

.menu-chat-list .form-chat .name-message {
    padding-left: 20px;
}

.menu-chat-list .form-chat .time {
    padding-left: 10px;
}
</style>
