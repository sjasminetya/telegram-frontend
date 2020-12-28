<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 chat-list">
                <ChatList/>
            </div>
            <div class="col-lg-8 message-main">
                <router-view :socket = "socket" />
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
      socket: io('http://localhost:2000')
    }
  }
}
</script>

<style scoped>
/* .container-fluid {
    min-height: 800px;
} */

.chat-list {
    background: #FFFFFF;
}

.message-main {
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
}

.col-lg-8 {
    margin: 0;
    padding: 0;
}
</style>
