<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 chat-list">
                <Profile/>
            </div>
            <div class="col-lg-8 message-content">
                <Message/>
            </div>
        </div>
    </div>
</template>

<script>
import Message from '../main/Message'
import Profile from '../../components/module/Profile'
export default {
  name: 'Main',
  components: {
    Profile,
    Message
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
