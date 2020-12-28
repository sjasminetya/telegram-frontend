<template>
<div>
    <div class="menu-top">
        <h1>Telegram</h1>
        <Menu/>
    </div>
    <div class="menu-search">
        <input type="text" class="form-control" placeholder="Search User">
        <img src="../../assets/plus.png" alt="icon plus">
    </div>
    <div class="menu-chat-list">
        <h1>All</h1>
        <div class="form-chat" @click.prevent="goMessage(friend.id)" v-for="friend in friends" :key="friend.id">
            <div class="img-profile">
                <img :src="friend.photoProfile" alt="user photo">
            </div>
            <div class="name-message">
                <h6 class="username">{{friend.name}}</h6>
                <p class="message"></p>
            </div>
            <p class="time">15.12</p>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Menu from '../module/Menu'
export default {
  name: 'ChatList',
  components: {
    Menu
  },
  props: ['socket'],
  methods: {
    ...mapActions(['getFriends']),
    goMessage (id) {
      this.$router.push({ name: 'Message', query: { id: id } })
    }
  },
  mounted () {
    this.getFriends()
  },
  computed: {
    ...mapGetters(['friends'])
  }
}
</script>

<style scoped>
.menu-top,
.menu-search {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-left: 50px;
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
    width: 250px;
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

.menu-chat-list .form-chat .img-profile img{
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 20px;
}

.menu-chat-list .form-chat .name-message {
    padding-left: 20px;
}

.menu-chat-list .form-chat .time {
    padding-left: 10px;
}
</style>
