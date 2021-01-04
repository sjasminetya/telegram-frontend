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
                      <!-- <div> -->
                        <p>{{msg.message}}</p>
                      <!-- </div> -->
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
    this.getAllHistory(id)
    this.REMOVE_MESSAGE()

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
      if (data.receiverId === this.messageToFriends.id) {
        this.SET_MESSAGE_PUSH(data)
        if (data.senderId !== this.userLogin.id) {
          console.log('notif')
          this.$notify({
            group: 'foo',
            title: `New message from: ${this.messageToFriends.name}`,
            text: `${data.message}`
          })
        }
      } else {
        if (data.senderId !== this.userLogin.id) {
          console.log('notif')
          this.$notify({
            group: 'foo',
            title: `New message from: ${this.messageToFriends.name}`,
            text: `${data.message}`
          })
        }
      }
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

.message-content {
    overflow: auto;
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

.message img {
  margin-left: 20px;
}

.message .receiver img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    border-radius: 100%;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}

.sender {
    align-self: flex-end;
}

.message .receiver .the-message {
    background: #7E98DF;
    border-radius: 35px 35px 35px 10px;
    width: 241px;
    font-size: 15px;
    color: #FFFFFF;
    padding: 30px 30px 30px 30px;
    margin-left: 20px;
    box-shadow: 0 0px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.22);
}

.message .sender .the-message {
    background: #FFFFFF;
    border-radius: 35px 10px 35px 35px;
    width: 241px;
    font-size: 15px;
    color: #232323;
    padding: 30px 30px 30px 30px;
    margin-right: 10px;
    word-wrap: break-word;
    box-shadow: 0 0px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.22);
}

.message .sender img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    margin-right: 60px;
    border-radius: 100%;
    cursor: pointer;
    margin-top: 20px;
}

.footer-message {
    position:absolute;
    bottom:0;
    width:100%;
    height:90px;
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

@media (max-width: 1276px) {
  .footer-message input {
    width: 750px;
  }

  .footer-message .icon-send {
    background-position-x: 680px;
  }
}

@media (max-width: 1224px) {
  .footer-message input {
    width: 700px;
  }

  .footer-message .icon-send {
    background-position-x: 650px;
  }
}

@media (max-width: 1145px) {
  .footer-message input {
    width: 650px;
  }

  .footer-message .icon-send {
    background-position-x: 600px;
  }
}

@media (max-width: 1085px) {
  .footer-message input {
    width: 600px;
  }

  .footer-message .icon-send {
    background-position-x: 550px;
  }
}

@media (max-width: 1029px) {
  .nav-profile {
    width: 100%;
  }

  .footer-message input {
    width: 580px;
  }

  .footer-message .icon-send {
    background-position-x: 530px;
  }
}

@media (max-width: 991px) {
  .footer-message input {
    width: 480px;
  }

  .footer-message .icon-send {
    background-position-x: 430px;
  }
}

@media (max-width: 931px) {
  .footer-message input {
    width: 430px;
  }

  .footer-message .icon-send {
    background-position-x: 380px;
  }
}

@media (max-width: 893px) {
  .footer-message input {
    width: 430px;
  }

  .footer-message .icon-send {
    background-position-x: 370px;
  }
}

@media (max-width: 837px) {
  .footer-message input {
    width: 400px;
  }

  .footer-message .icon-send {
    background-position-x: 340px;
  }
}

@media (max-width: 794px) {
  .footer-message input {
    width: 340px;
  }

  .footer-message .icon-send {
    background-position-x: 280px;
  }
}

@media (max-width: 789px) {
  .footer-message input {
    width: 370px;
  }

  .footer-message .icon-send {
    background-position-x: 310px;
  }
}

@media (max-width: 763px) {
  .footer-message input {
    width: 330px;
  }

  .footer-message .icon-send {
    background-position-x: 290px;
  }
}

@media (max-width: 722px) {
  .message .sender .the-message,
  .message .receiver .the-message {
    width: 200px;
  }

  .message .receiver .the-message {
    margin-left: 45px;
  }

  .message .sender img {
    margin-right: 10px !important;
  }
}

@media (max-width: 687px) {
  .message .sender .the-message {
    margin-right: -20px;
  }

  .message .sender .img-profile img {
    margin-left: 30px;
  }
}

@media (max-width: 675px) {
  .footer-message input {
    width: 280px;
  }

  .footer-message .icon-send {
    background-position-x: 220px;
  }
}

@media (max-width: 661px) {
  .footer-message input {
    width: 300px;
  }

  .footer-message .icon-send {
    background-position-x: 260px;
  }
}

@media (max-width: 617px) {
  .footer-message input {
    width: 280px;
  }

  .footer-message .icon-send {
    background-position-x: 240px;
  }
}

@media (max-width: 572px) {
  .nav-profile .img-profile img {
    margin-left: 25px;
  }

  .footer-message input {
    width: 450px;
  }

  .footer-message .icon-send {
    background-position-x: 390px;
  }
}

@media (max-width: 567px) {
  .nav-profile .img-profile img {
    margin-left: 25px;
  }

  .footer-message input {
    width: 450px;
  }

  .footer-message .icon-send {
    background-position-x: 390px;
  }
}

@media (max-width: 523px) {
  .footer-message input {
    width: 430px;
  }

  .footer-message .icon-send {
    background-position-x: 370px;
  }
}

@media (max-width: 503px) {
  .footer-message input {
    width: 400px;
  }

  .footer-message .icon-send {
    background-position-x: 340px;
  }
}

@media (max-width: 475px) {
  .footer-message input {
    width: 380px;
  }

  .footer-message .icon-send {
    background-position-x: 340px;
  }
}

@media (max-width: 447px) {
  .footer-message input {
    width: 350px;
  }

  .footer-message .icon-send {
    background-position-x: 300px;
  }
}

@media (max-width: 415px) {
  .footer-message input {
    width: 330px;
  }

  .footer-message .icon-send {
    background-position-x: 280px;
  }
}

@media (max-width: 391px) {
  .footer-message input {
    width: 300px;
  }

  .footer-message .icon-send {
    background-position-x: 260px;
  }
}

@media (max-width: 360px) {
  .message .sender .the-message,
  .message .receiver .the-message {
    width: 200px;
  }

  .message .receiver .the-message {
    margin-left: 45px;
  }

  .message .sender img {
    margin-right: 10px !important;
  }

  .footer-message input {
    width: 260px;
  }

  .footer-message .icon-send {
    background-position-x: 210px;
  }
}
</style>
