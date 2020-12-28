<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 edit-profile">
                <Profile/>
            </div>
            <div class="col-lg-8 message-content">
                <Default/>
            </div>
        </div>
    </div>
</template>

<script>
import Default from '../main/Default'
import Profile from '../../components/module/Profile'
export default {
  name: 'Main',
  components: {
    Profile,
    Default
  }
}
</script>

<style scoped>
.container-fluid {
    min-height: 800px;
}

.edit-profile {
    background: #FFFFFF;
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
