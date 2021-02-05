<template>
<div>
    <div class="menu-top">
        <h1>Telegram</h1>
        <Menu/>
    </div>
    <div class="menu-search">
        <input v-model="search" @keyup.enter="searchUser" type="text" class="form-control" placeholder="Search User">
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
                    <div v-for="(last, index) in lastMessage" :key="index">
                        <div v-if="data.id === last.receiverId && last.senderId === userLogin.id">
                            <p class="message">{{last.message}}</p>
                        </div>
                    </div>
                </div>
                <div v-for="(last, index) in lastMessage" :key="index">
                    <div v-if="data.id === last.receiverId && last.senderId === userLogin.id">
                        <p class="time">{{setDate(last.time)}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="search">
            <div class="form-chat" v-on:click="goMessage(data.id)" v-for="data in searchName" :key="data.id">
                <div class="img-profile">
                    <img :src="data.photoProfile" alt="user photo">
                </div>
                <div class="name-message">
                    <h6 class="username">{{data.name}}</h6>
                    <div v-for="(last, index) in lastMessage" :key="index">
                        <div v-if="data.id === last.receiverId && last.senderId === userLogin.id">
                            <p class="message">{{last.message}}</p>
                        </div>
                    </div>
                </div>
                <div v-for="(last, index) in lastMessage" :key="index">
                    <div v-if="data.id === last.receiverId && last.senderId === userLogin.id">
                        <p class="time">{{setDate(last.time)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Menu from '../module/Menu'
export default {
  name: 'ChatList',
  props: ['socket'],
  components: {
    Menu
  },
  data () {
    return {
      searchName: '',
      search: '',
      message: ''
    }
  },
  methods: {
    ...mapActions(['getFriends', 'getAllUser', 'getAllHistory', 'messageFriends', 'currentMessage', 'getUserById']),
    ...mapMutations(['REMOVE_HISTORY', 'SET_MESSAGE', 'REMOVE_MESSAGE', 'SET_MESSAGE_PUSH']),
    async goMessage (id) {
      console.log('isi id', id)
      this.$router.push(`/main/message/${id}`)
      this.REMOVE_MESSAGE()
      this.messageFriends(id)
      const historyChat = await this.getAllHistory(id)
      const get = historyChat.data.result
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
    },
    setDate (date) {
      return moment(date).format('LT')
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
    this.currentMessage()
    this.getUserById()
  },
  computed: {
    ...mapGetters(['friends', 'lastMessage', 'userLogin'])
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

@media (max-width: 1196px) {
    .menu-search input {
        width: 280px;
    }
}

@media (max-width: 1083px) {
    .menu-search input {
        width: 250px;
    }
}

@media (max-width: 1025px) {
    .menu-search input {
        width: 230px;
    }
}

@media (max-width: 990px) {
    .menu-search input {
        width: 300px;
    }
}

@media (max-width: 976px) {
    .menu-search input {
        width: 280px;
    }
}

@media (max-width: 889px) {
    .menu-search input {
        width: 260px;
    }
}

@media (max-width: 836px) {
    .menu-search input {
        width: 230px;
    }
}

@media (max-width: 828px) {
    .menu-search input {
        width: 200px;
    }
}

@media (max-width: 770px) {
    .menu-search input {
        width: 200px;
    }
}

@media (max-width: 731px) {
    .menu-search input {
        width: 180px;
    }
}

@media (max-width: 684px) {
    .menu-search input {
        width: 170px;
    }
}

@media (max-width: 675px) {
    .menu-chat-list .form-chat {
        padding-left: 5px;
    }
}

@media (max-width: 651px) {
    .menu-search input {
        width: 150px;
    }
}

@media (max-width: 581px) {
    .menu-search input {
        width: 140px;
    }

    .menu-chat-list .form-chat {
        padding-left: 10px;
    }
}

@media (max-width: 576px) {
    .menu-search input {
        width: 120px;
    }

    .menu-chat-list .form-chat {
        padding-left: 10px;
    }
}

@media (max-width: 572px) {
    .menu-search input {
        width: 450px;
    }
}

@media (max-width: 543px) {
    .menu-search input {
        width: 430px;
    }
}

@media (max-width: 519px) {
    .menu-search input {
        width: 410px;
    }
}

@media (max-width: 495px) {
    .menu-search input {
        width: 390px;
    }
}

@media (max-width: 476px) {
    .menu-search input {
        width: 370px;
    }
}

@media (max-width: 457px) {
    .menu-search input {
        width: 350px;
    }
}

@media (max-width: 436px) {
    .menu-search input {
        width: 330px;
    }
}

@media (max-width: 417px) {
    .menu-search input {
        width: 310px;
    }
}

@media (max-width: 396px) {
    .menu-search input {
        width: 290px;
    }
}

@media (max-width: 372px) {
    .menu-search input {
        width: 270px;
    }
}

@media (max-width: 356px) {
    .menu-search input {
        width: 250px;
    }
}

@media (max-width: 328px) {
    .menu-search input {
        width: 230px;
    }
}

@media (max-width: 319px) {
    .menu-search input {
        width: 210px;
    }
}
</style>
