<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 chat-list">
                <ChatList/>
            </div>
            <div class="col-lg-8 message-content">
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
.container-fluid {
    min-height: 800px;
}

.chat-list {
    background: #FFFFFF;
    border-right: 10px solid #7E98DF;
}

.message-content {
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
}

.message-content h1 {
    font-size: 24px;
    line-height: 28px;
    color: #848484;
    text-align: center;
}

.col-lg-8 {
    margin: 0;
    padding: 0;
}
</style>
