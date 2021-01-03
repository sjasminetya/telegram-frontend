<template>
<div>
    <div class="menu-message">
        <div class="nav-profile">
            <div class="img-profile">
                <img :src="messageToFriends.photoProfile" alt="">
            </div>
            <div class="info-profile">
                <h6 class="username">{{messageToFriends.name}}</h6>
                <p :class="messageToFriends.status == 'online' ? 'online' : 'offline'">{{messageToFriends.status}}</p>
            </div>
            <SideProfile/>
        </div>

        <div class="message-content" id="message-content">

            <div class="message" v-for="(msg, index) in this.$store.state.messages" :key="index">
                <div :class = "msg.senderId === messageToFriends.id ? 'receiver' : 'sender'">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                        <h6>{{setDate(msg.time)}}</h6>
                    </div>
                    <div class="img-profile">
                        <img :src="msg.senderId === messageToFriends.id ? messageToFriends.photoProfile : userLogin.photoProfile" alt="profile">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <footer class="footer-message">
        <input type="text" v-model="inputMessage" placeholder="Type your message..." class="form-control icon-send" @keyup.enter="handleClick">
    </footer>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import SideProfile from '../../components/module/SideProfile'
import moment from 'moment'
export default {
  name: 'Message',
  props: ['socket'],
  data () {
    return {
      name: '',
      senderId: '',
      receiverId: '',
      ...mapState(['messages']),
      inputMessage: '',
      historyMessage: [],
      idUser: ''
    }
  },
  components: {
    SideProfile
  },
  methods: {
    ...mapActions(['getUserById', 'messageFriends', 'getAllHistory']),
    ...mapMutations(['SET_MESSAGE', 'REMOVE_MESSAGE', 'SET_MESSAGE_PUSH']),
    friends () {
      const id = this.$route.params.id
      this.messageFriends(id)
    },
    clickProfile () {
      this.$router.push('/profile')
    },
    handleClick () {
      this.socket.emit('receiverMessage', { message: this.inputMessage, senderId: this.userLogin.id, receiverId: this.messageToFriends.id })
      this.inputMessage = ''
    },
    setDate (date) {
      return moment(date).format('LT')
    }
  },
  async mounted () {
    await this.friends()

    // get history message
    const id = this.$route.params.id
    console.log('isi id mounted', id)
    const historyChat = await this.getAllHistory(id)
    console.log('history chat', historyChat)
    const get = historyChat.data.result
    console.log('isi get', get)
    this.REMOVE_MESSAGE()
    this.SET_MESSAGE(get)
    // this.messages.push(...get)

    // user login
    const senderId = localStorage.getItem('id')
    this.senderId = senderId
    this.socket.emit('initialUser', { senderId })

    // user online
    const idUser = localStorage.getItem('id')
    this.idUser = idUser
    this.socket.emit('online', { idUser })

    // listen message from backend
    this.socket.on('kirimkembali', (data) => {
      console.log('from backend after insert message', data)
      this.SET_MESSAGE_PUSH(data)
    })

    this.socket.on('notificationMessage', data => {
      console.log('notif', data)
      this.$notify({
        group: 'foo',
        title: `New message from: ${this.messageToFriends.name}`,
        text: `${data.message}`
      })
    })

    this.getUserById()

    // scroll
    const scrollMessage = document.querySelector('#message-content')
    scrollMessage.addEventListener('scroll', e => {
      if (scrollMessage.scrollTop + scrollMessage.clientHeight >= scrollMessage.scrollHeight) {
        this.getAllHistory(id)
      }
    })
    this.getAllHistory(id)
  },
  computed: {
    ...mapGetters(['userLogin', 'messageToFriends', 'historyChat'])
  }
}
</script>

<style scoped>
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

.online {
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.165px;
    color: #7E98DF;
}

.offline {
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.165px;
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
