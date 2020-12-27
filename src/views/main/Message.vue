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

        <div class="message-content">
            <div class="message" v-for="msg in messages" :key="msg.id">
                <div class="receiver" v-if="msg.senderId === msg.cekReceiver && msg.receiverId === msg.cekSender">
                    <img :src="getUser.photoProfile" alt="receiver profile">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <!-- <h6>{{receiverMessage.time}}</h6> -->
                </div>

                <div class="sender" v-else-if="msg.senderId === msg.cekSender && msg.receiverId === msg.cekReceiver">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <div class="img-profile">
                        <img @click.prevent="clickProfile" :src="userLogin.photoProfile" alt="sender profile">
                    </div>
                </div>

                <!-- <ul class="list-group">
                    <li class="list-group-item active">Name room: {{userLogin.name}}</li>
                    <li class="list-group-item" v-for="(msg, index) in messages" :key="index">{{msg.senderId}}=>{{msg.message}}</li>
                </ul> -->
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
      cekSender: ''
    }
  },
  props: ['socket'],
  components: {
    SideProfile
  },
  methods: {
    ...mapActions(['getUserById', 'getAll', 'senderMessage', 'receiverMessage', 'getAllMessage']),
    clickProfile () {
      this.$router.push('/profile')
    },
    handleClick () {
      this.socket.emit('receiverMessage', { message: this.inputMessage, senderId: this.senderId, receiverId: this.getUser.id, name: this.userLogin.name })
      this.inputMessage = ''
    }
  },
  mounted () {
    this.getUserById()
    this.getAll()
    this.getAllMessage()
      .then(res => {
        this.socket.on('kirimkembali', (data) => {
          console.log('kirim kembali', data)
          const dataMessage = res.data.result
          const cekReceiver = this.getUser.id
          const cekSender = sessionStorage.getItem('id')
          this.cekReceiver = cekReceiver
          this.cekSender = cekSender
          console.log('data message', res.data.result)
          for (const all of dataMessage) {
            all.cekSender = cekSender
            all.cekReceiver = cekReceiver
          }

          data.cekSender = cekSender
          data.cekReceiver = cekReceiver
          this.messages.push(data)
        })
      })
    const senderId = sessionStorage.getItem('id')
    this.senderId = senderId
    this.socket.emit('initialUser', { senderId })
    // this.socket.on('kirimkembali', (data) => {
    //   console.log(data)
    //   this.messages.push(data)
    // })
  },
  computed: {
    ...mapGetters(['userLogin', 'getUser'])
  }
}
</script>

<style scoped>
.menu-message {
    display: flex;
    flex-direction: column;
}

.nav-profile {
    display: flex;
    background: #FFFFFF;
    width: 100%;
    height: 120px;
    position: relative;
    /* border-bottom-right-radius: 50px; */
    border-bottom: 10px solid #7E98DF;
    border-radius: 50px;
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
    height: 800px;
    overflow: auto; /* scrollbar */
    -ms-overflow-style: none;  /* scrollbar */
    scrollbar-width: none; /* scrollbar */
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

.message .receiver {
    float: left;
}

.message .sender {
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
    object-fit: contain;
    margin-right: 60px;
    border-radius: 20px;
    cursor: pointer;
}

.footer-message {
    width: 100%;
    height: 120px;
    background: #FFFFFF;
    position: absolute;
    bottom: 0;
    border-top: 10px solid #7E98DF;
    border-radius: 50px;
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
