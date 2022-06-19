<template>
  <div class="container-fluid">
    <div v-if="!toggle" class="row">
      <div class="col-lg-3 col-md-5 col-sm-5 col-12 chat-list">
        <ChatList />
      </div>
      <div class="col-lg-9 col-md-7 col-sm-7 col-12 message-main">
        <router-view :socket="socket" />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-lg-3 col-md-5 col-sm-5 col-12 chat-list">
        <ChatList />
      </div>
      <div class="col-lg-6 col-md-4 col-sm-4 col-12 message-main">
        <router-view :socket="socket" />
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-12 side-profile">
        <SideProfile />
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatList from '../../components/module/ChatList'
import SideProfile from '../../components/module/SideProfile'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: {
    ChatList,
    SideProfile
  },
  data () {
    return {
      socket: io(`${process.env.VUE_APP_SOCKET_URL}`)
    }
  },
  computed: {
    ...mapGetters(['toggle'])
  }
}
</script>

<style scoped>
.chat-list {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  min-height: 100vh;
}

.message-main {
  background: #fafafa;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
}

.side-profile {
  border: 1px solid #e5e5e5;
  background: #ffffff;
}
</style>
