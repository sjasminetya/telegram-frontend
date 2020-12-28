<template>
    <div class="menu-message">
        <div class="nav-profile">
            <div class="img-profile">
                <img :src="getUser.photoProfile" alt="">
            </div>
            <div class="info-profile">
                <h6 class="username">{{getUser.name}}</h6>
                <p class="status">Online</p>
            </div>
            <SideProfile/>
        </div>

        <div class="message-content" id="messageBody">
            <div class="message" v-for="history in historyChat" :key="history.id">
                <div class="receiver" v-if="history.senderId === getUser.id">
                    <img :src="getUser.photoProfile" alt="receiver profile">
                    <div class="the-message">
                        <h6>{{history.message}}</h6>
                    </div>
                    <h6>{{history.time}}</h6>
                </div>

                <div class="sender" v-else-if="history.senderId === userLogin.id">
                    <h6>{{history.time}}</h6>
                    <div class="the-message">
                        <h6>{{history.message}}</h6>
                    </div>
                    <div class="img-profile">
                        <img @click.prevent="clickProfile" :src="userLogin.photoProfile" alt="sender profile">
                    </div>
                </div>
            </div>

            <!-- message -->
            <div class="message" v-for="msg in messages" :key="msg.id">
                <div class="receiver" v-if="msg.senderId === getUser.id && msg.receiverId === userLogin.id">
                    <img :src="getUser.photoProfile" alt="receiver profile">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <h6>{{history.time}}</h6>
                </div>

                <div class="sender" v-else-if="msg.senderId === userLogin.id && msg.receiverId === getUser.id">
                    <h6>{{history.time}}</h6>
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <div class="img-profile">
                        <img @click.prevent="clickProfile" :src="userLogin.photoProfile" alt="sender profile">
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-message">
            <input type="text" v-model="inputMessage" placeholder="Type your message..." class="form-control icon-send" @keyup.enter="handleClick">
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SideProfile from '../../components/module/SideProfile'
export default {
  name: 'Message',
  data () {
    return {
      name: '',
      senderId: '',
      receiverId: '',
      messages: [],
      inputMessage: '',
      cekReceiver: '',
      cekSender: '',
      historyMessage: []
    }
  },
  props: ['socket'],
  components: {
    SideProfile
  },
  //   created () {
  //     this.scroll()
  //   },
  methods: {
    ...mapActions(['getUserById', 'getAll', 'getAllMessage', 'getAllHistory']),
    clickProfile () {
      this.$router.push('/profile')
    },
    handleClick () {
      this.socket.emit('receiverMessage', { message: this.inputMessage, senderId: this.userLogin.id, receiverId: this.getUser.id })
      this.inputMessage = ''
    }
    // scroll () {
    //   window.addEventListener('scroll', () => {
    //     const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    //     console.log('scroll', { scrollTop, scrollHeight, clientHeight })

    //     if (clientHeight + scrollTop >= scrollHeight) {
    //       console.log('bottom')
    //       this.getAllHistory()
    //     }
    //   })
    // }
  },
  mounted () {
    this.getUserById()
    this.getAll()
    this.getAllHistory()
    const senderId = sessionStorage.getItem('id')
    this.senderId = senderId
    this.socket.emit('initialUser', { senderId })
    this.socket.on('kirimkembali', (data) => {
      console.log('data message dari backend', data)
      this.messages.push(data)
    })
  },
  computed: {
    ...mapGetters(['userLogin', 'getUser', 'historyChat'])
  }
}
</script>

<style scoped>
/* .menu-message {
    max-height: 10px;
} */

#messageBody {
    overflow: auto;
    height: 500px;
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
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 20px;
    margin-top: 25px;
    margin-left: 80px;
}

.nav-profile .info-profile {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 20px;
}

.message-content {
    padding-bottom: 150px;
    height: 100%;
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

.message .receiver {
    float: left;
}

.message .sender {
    align-self: flex-start;
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
    object-fit: contain;
    margin-right: 60px;
    border-radius: 20px;
    cursor: pointer;
}

.footer-message {
    width: 100%;
    height: 90px;
    background: #FFFFFF;
    position: absolute;
}

.footer-message input {
    background: #FAFAFA;
    border-radius: 15px;
    margin-top: 30px;
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
