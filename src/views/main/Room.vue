<template>
<div>
    <div class="menu-message">
        <div class="nav-profile">
            <div class="img-profile">
                <img :src="roomMessage.imgRoom" alt="">
            </div>
            <div class="info-profile">
                <h6 class="username">{{roomMessage.nameRoom}}</h6>
                <!-- <div class="who-join-room" v-for="join in nameJoinRoom" :key="join.id">
                    <h6>{{join.name}}</h6>
                </div> -->
            </div>
            <!-- <SideProfile/> -->
        </div>

        <div class="message-content" id="message-content">

            <div class="message" v-for="msg in messages" :key="msg.id">
                <div v-if="msg.senderId !== userLogin.id" class = "receiver">
                    <div class="img-profile">
                        <img :src="msg.photoProfile" alt="profile">
                    </div>
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                        <h6>{{setDate(msg.time)}}</h6>
                        <h6>{{msg.sendername}}</h6>
                    </div>
                </div>
                <div v-else-if="msg.senderId === userLogin.id" class = "sender">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                        <h6>{{setDate(msg.time)}}</h6>
                        <h6>{{msg.sendername}}</h6>
                    </div>
                    <div class="img-profile">
                        <img :src="msg.photoProfile" alt="profile">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <footer class="footer-message">
        <input type="text" v-model="inputMessage" placeholder="Type your message..." class="form-control icon-send" @keyup.enter="sendMessage">
    </footer>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'Room',
  props: ['socket'],
  data () {
    return {
      inputMessage: '',
      messages: [],
      nameRoom: '',
      senderName: ''
    }
  },
  methods: {
    ...mapActions(['messageRoom', 'getUserById', 'historyChatGroup', 'whoJoinRoom']),
    sendMessage () {
      this.socket.emit('send-message', { nameRoom: this.nameRoom, message: this.inputMessage, senderId: localStorage.getItem('id'), senderName: this.senderName })
      this.inputMessage = ''
    },
    setDate (date) {
      return moment(date).format('LT')
    },
    whoJoin () {
      const nameRoom = this.$route.query.nameRoom
      const payload = {
        nameRoom
      }
      this.whoJoinRoom(payload)
    }
  },
  async mounted () {
    this.messageRoom()
    this.getUserById()
    this.whoJoin()

    const historyChat = await this.historyChatGroup()
    const get = historyChat.data.result
    this.messages.push(...get)

    const nameRoom = this.roomMessage.nameRoom
    const senderName = this.roomMessage.name
    this.nameRoom = nameRoom
    this.senderName = senderName
    this.socket.emit('inital-user-join-group', { nameRoom, senderName })
    this.socket.on('send-to-client', data => {
      this.messages.push(data)
    })

    const scrollMessage = document.querySelector('#message-content')
    scrollMessage.addEventListener('scroll', e => {
      if (scrollMessage.scrollTop + scrollMessage.clientHeight >= scrollMessage.scrollHeight) {
        this.historyChatGroup()
      }
    })
    this.historyChatGroup()
  },
  computed: {
    ...mapGetters(['roomMessage', 'userLogin', 'nameJoinRoom'])
  }
}
</script>

<style scoped>
.who-join-room {
    float: left;
}

.nav-profile {
    display: flex;
    background: #FFFFFF;
    width: 100%;
    height: 120px;
    position: relative;
    border-bottom-right-radius: 50px;
}

.nav-profile .icon-profile {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    position: absolute;
    right: 20px;
    top: 45px;
}

.nav-profile .img-profile img {
    width: 62px;
    height: 62px;
    object-fit: cover;
    border-radius: 100%;
    margin-top: 25px;
    margin-left: 80px;
}

.nav-profile .info-profile {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 20px;
}

/* .menu-message {
    border: 1px solid blue;
} */

.message-content {
    overflow: auto;
    /* border: 1px solid red; */
    height: 100vh;
    position: relative;
    overflow: auto; /* scrollbar */
    -ms-overflow-style: none;  /* scrollbar */
    scrollbar-width: none; /* scrollbar */
    margin-bottom: 100px;
}

.message-content::-webkit-scrollbar {
    display: none;
}

.message {
    display: flex;
    flex-direction: column;
}

.message .receiver,
.message .sender {
    display: flex;
    margin-top: 50px;
}

.receiver {
    float: left;
}

.message .receiver img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    border-radius: 100%;
    float: left;
}

.sender {
    align-self: flex-end;
}

.message img {
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 20px;
    margin-top: 20px;
    margin-left: 80px;
}

.message .receiver .the-message {
    background: #7E98DF;
    border-radius: 35px 35px 35px 10px;
    width: 241px;
    font-size: 15px;
    line-height: 185.17%;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    padding: 30px 10px 30px 30px;
    margin-left: 20px;
}

.message .sender .the-message {
    background: #FFFFFF;
    border-radius: 35px 10px 35px 35px;
    width: 241px;
    font-size: 15px;
    line-height: 185.17%;
    letter-spacing: -0.165px;
    color: #232323;
    padding: 30px 10px 30px 30px;
    margin-right: -50px;
}

.message .sender .img-profile img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    margin-right: 60px;
    border-radius: 100%;
    cursor: pointer;
}

.footer-message {
    position:absolute;
    bottom:0;
    width:100%;
    height:90px;
    /* border: 1px solid red; */

    background: #FFFFFF;

}

.footer-message input {
    background: #FAFAFA;
    border-radius: 15px;
    margin-top: 15px;
    margin-left: 50px;
    width: 800px;
    height: 60px;
    padding-left: 50px;
}

.footer-message .icon-send {
    background-image: url('../../assets/send.png');
    background-repeat: no-repeat;
    background-position: right;
    background-position-x: 750px;
}
</style>
