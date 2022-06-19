<template>
  <div>
    <div class="menu-message">
      <div class="nav-profile">
        <div class="img-profile">
          <img :src="messageToFriends.photoProfile" alt="" />
        </div>
        <div class="info-profile">
          <h6 class="username">{{ messageToFriends.name }}</h6>
          <p :class="messageToFriends.status">{{ messageToFriends.status }}</p>
        </div>
        <!-- <SideProfile/> -->
        <img
          class="icon-profile"
          src="../../assets/profile-menu.png"
          alt="icon profile menu"
          @click="show(!toggle)"
        />
      </div>

      <div class="message-content" id="message-content">
        <div
          class="message"
          v-for="(msg, index) in this.$store.state.messages"
          :key="index"
        >
          <div
            :class="msg.senderId === messageToFriends.id ? 'receiver' : 'sender'"
          >
            <div
              class="img-profile"
              v-if="msg.senderId === messageToFriends.id"
            >
              <img :src="messageToFriends.photoProfile" alt="profile" />
            </div>
            <div class="the-message">
              <p>{{ msg.message }}</p>
              <h6>{{ setDate(msg.time) }}</h6>
            </div>
            <div
              class="img-profile"
              v-if="msg.senderId !== messageToFriends.id"
            >
              <img :src="userLogin.photoProfile" alt="profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer-message">
      <img src="../../assets/send.png" alt="">
      <input
        type="text"
        v-model="inputMessage"
        placeholder="Type your message..."
        class="form-control icon-send"
        @keyup.enter="handleClick"
      />
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
// import SideProfile from '../../components/module/SideProfile'
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
      lat: 0,
      lng: 0
    }
  },
  // components: {
  //   SideProfile
  // },
  methods: {
    ...mapActions([
      'getUserById',
      'messageFriends',
      'getAllHistory',
      'currentMessage',
      'toggleOpen'
    ]),
    ...mapMutations(['SET_MESSAGE', 'REMOVE_MESSAGE', 'SET_MESSAGE_PUSH']),
    friends () {
      const id = this.$route.params.id
      this.messageFriends(id)
    },
    clickProfile () {
      this.$router.push('/profile')
    },
    handleClick () {
      this.socket.emit('receiverMessage', {
        message: this.inputMessage,
        senderId: this.userLogin.id,
        receiverId: this.messageToFriends.id
      })
      this.inputMessage = ''
    },
    setDate (date) {
      return moment(date).format('LT')
    },
    show (open) {
      this.toggleOpen(open)
    }
  },
  async mounted () {
    await this.friends()
    await this.currentMessage()

    // get history message
    const id = this.$route.params.id
    this.getAllHistory(id)
    this.REMOVE_MESSAGE()

    // user login
    const senderId = localStorage.getItem('id')
    this.senderId = senderId
    this.socket.emit('initialUser', { senderId })

    // listen message from backend
    this.socket.on('kirimkembali', data => {
      if (
        data.receiverId === this.messageToFriends.id ||
        data.senderId === this.messageToFriends.id
      ) {
        this.SET_MESSAGE_PUSH(data)
        if (data.senderId !== this.userLogin.id) {
          this.$notify({
            group: 'foo',
            title: `New message from: ${this.messageToFriends.name}`,
            text: `${data.message}`
          })
        }
      } else {
        if (data.senderId !== this.userLogin.id) {
          this.$notify({
            group: 'foo',
            title: 'New message',
            text: `${data.message}`
          })
        }
      }
    })

    this.getUserById()

    // scroll
    const scrollMessage = document.querySelector('#message-content')
    scrollMessage.addEventListener('scroll', e => {
      if (
        scrollMessage.scrollTop + scrollMessage.clientHeight >=
        scrollMessage.scrollHeight
      ) {
        this.getAllHistory(id)
      }
    })
    this.getAllHistory(id)
  },
  computed: {
    ...mapGetters(['userLogin', 'messageToFriends', 'historyChat', 'toggle'])
  }
}
</script>

<style scoped>
.nav-profile {
  display: flex;
  background: #ffffff;
  width: 100%;
  height: 120px;
  position: relative;
  /* border-bottom-right-radius: 50px; */
}

.nav-profile .icon-profile {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  position: absolute;
  right: 20px;
  top: 45px;
  cursor: pointer;
}

.nav-profile .img-profile img {
  width: 62px;
  height: 62px;
  object-fit: cover;
  border-radius: 30px;
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
  color: #7e98df;
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
  -ms-overflow-style: none; /* scrollbar */
  scrollbar-width: none; /* scrollbar */
  /* margin-bottom: 100px; */
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
  border-radius: 30px;
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

.sender {
  align-self: flex-end;
}

.message .receiver .the-message {
  background: #7e98df;
  border-radius: 35px 35px 35px 10px;
  width: 241px;
  font-size: 15px;
  color: #ffffff;
  padding: 30px 30px 30px 30px;
  margin-left: 20px;
  border: 1px solid #ffffff;
}

.message .sender .the-message {
  background: #ffffff;
  border-radius: 35px 10px 35px 35px;
  width: 241px;
  font-size: 15px;
  color: #232323;
  padding: 30px 30px 30px 30px;
  margin-right: 10px;
  word-wrap: break-word;
  border: 1px solid #7e98df;
}

.message .sender img {
  width: 82px;
  height: 82px;
  object-fit: cover;
  margin-right: 60px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
}

.footer-message {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: #ffffff;
  padding: 15px;
}

.footer-message img {
  position: absolute;
  top: 35px;
  left: auto;
  right: 35px;
}

.footer-message input {
  background: #fafafa;
  border-radius: 15px;
  /* width: 100%; */
  height: 60px;
  padding-left: 30px;
}

.footer-message input:focus {
  box-shadow: none;
  border: 1px solid #7e98df;
}

/* .footer-message .icon-send {
  background-image: url("../../assets/send.png");
  background-repeat: no-repeat;
  background-position: right;
  background-position-y: 20px;
  margin-right: 10px;
} */

@media (max-width: 1029px) {
  .nav-profile {
    width: 100%;
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

@media (max-width: 572px) {
  .nav-profile .img-profile img {
    margin-left: 25px;
  }
}

@media (max-width: 567px) {
  .nav-profile .img-profile img {
    margin-left: 25px;
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
}
</style>
