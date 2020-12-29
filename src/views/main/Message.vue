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
                <div class="receiver" v-if="msg.senderId === getUser.id">
                    <img :src="getUser.photoProfile" alt="receiver profile">
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <h6>{{msg.time}}</h6>
                </div>

                <div class="sender" v-else-if="msg.senderId === userLogin.id">
                    <h6>{{msg.time}}</h6>
                    <div class="the-message">
                        <h6>{{msg.message}}</h6>
                    </div>
                    <div class="img-profile">
                        <img @click.prevent="clickProfile" :src="userLogin.photoProfile" alt="sender profile">
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
  methods: {
    ...mapActions(['getUserById', 'getAll', 'getAllMessage', 'getAllHistory']),
    clickProfile () {
      this.$router.push('/profile')
    },
    handleClick () {
      this.socket.emit('receiverMessage', { message: this.inputMessage, senderId: this.userLogin.id, receiverId: this.getUser.id })
      this.inputMessage = ''
    }
  },
  mounted () {
    this.getUserById()
    this.getAll()
    this.getAllHistory()
    const senderId = localStorage.getItem('id')
    this.senderId = senderId
    this.socket.emit('initialUser', { senderId })
    this.socket.on('kirimkembali', async (data) => {
      console.log('data message dari backend', data)
      await this.messages.push(data)
      console.log(this.messages)
    })
  },
  computed: {
    ...mapGetters(['userLogin', 'getUser', 'historyChat'])
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

.message .receiver img {
    width: 82px;
    height: 82px;
    object-fit: cover;
    border-radius: 100%;
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
    object-fit: cover;
    margin-right: 60px;
    border-radius: 100%;
    cursor: pointer;
}

footer {
    position:absolute;
    bottom:0;
    width:100%;
    height:120px;

    background: #FFFFFF;

}

/* .footer-message {
    width: 100%;
    height: 90px;
    background: #FFFFFF;
    position: absolute;
    bottom: 0;
} */

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
