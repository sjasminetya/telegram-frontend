<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 col-md-5 col-sm-5 col-12 chat-list">
                <ChatList/>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-7 col-12 message-main">
                <router-view :socket="socket"/>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import ChatList from '../../components/module/ChatList'
export default {
  name: 'Main',
  components: {
    ChatList
  },
  data () {
    return {
      socket: io(`${process.env.VUE_APP_SOCKET_URL}`)
    }
  }
}
</script>

<style scoped>
.chat-list {
    background: #FFFFFF;
}

.message-main {
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    position: relative;
}
</style>
