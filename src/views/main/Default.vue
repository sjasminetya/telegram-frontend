<template>
    <div>
        <h1>Please select a chat to start messaging</h1>
    </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Default',
  data () {
    return {
      lat: 0,
      lng: 0,
      idUser: '',
      socket: io(`${process.env.VUE_APP_SOCKET_URL}`)
    }
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.lat = coordinates.lat
        this.lng = coordinates.lng
        this.socket.emit('newLocation', { lat: this.lat, lng: this.lng, id: this.idUser })
      })

    // user online
    const idUser = localStorage.getItem('id')
    this.idUser = idUser
    this.socket.emit('online', { idUser })
  }
}
</script>

<style scoped>
h1 {
    font-size: 24px;
    line-height: 28px;
    color: #848484;
    text-align: center;
    margin: 400px auto;
}
</style>
