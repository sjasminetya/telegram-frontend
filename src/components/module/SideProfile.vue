<template>
  <div id="menu-content">
    <div class="menu-top">
      <img src="../../assets/back.png" alt="arrow back" @click="show(!toggle)" />
      <h6 class="username">@{{ messageToFriends.username }}</h6>
    </div>
    <div class="profile">
      <div class="img-profile">
        <img :src="messageToFriends.photoProfile" alt="user photo" />
      </div>
      <div class="profile-content">
        <div class="info-profile">
          <h6 class="name">{{ messageToFriends.name }}</h6>
          <p class="status">{{ messageToFriends.status }}</p>
        </div>
        <img src="../../assets/chat.png" alt="icon chat" />
      </div>

      <div class="info-contact">
        <h6>Phone Number</h6>
        <p>{{ messageToFriends.phoneNumber }}</p>
      </div>

      <hr>

      <div class="location">
        <h3>Location</h3>
        <div class="map">
          <GmapMap
            :center="{
              lat: parseFloat(messageToFriends.lat),
              lng: parseFloat(messageToFriends.lng)
            }"
            :zoom="7"
            map-type-id="terrain"
            style="width: 290px; height: 200px"
          >
            <GmapMarker
              :position="{
                lat: parseFloat(messageToFriends.lat),
                lng: parseFloat(messageToFriends.lng)
              }"
              :clickable="true"
              :draggable="true"
              @click="center = m.position"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SideProfile',
  methods: {
    ...mapActions(['messageFriends', 'toggleOpen']),
    friends () {
      const id = this.$route.params.id
      const payload = {
        id: id
      }
      this.messageFriends(payload)
    },
    show (open) {
      this.toggleOpen(open)
    }
  },
  mounted () {
    this.friends()
  },
  computed: {
    ...mapGetters(['messageToFriends', 'toggle'])
  }
}
</script>

<style scoped>
.icon-profile {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  position: absolute;
  right: 50px;
  top: 45px;
  cursor: pointer;
}

.menu-top {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  /* margin-left: 50px; */
}

.menu-top img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
}

.menu-top h6.username {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #7e98df;
  padding-left: 50px;
}

.profile {
  text-align: center;
  /* display: flex; */
}

.profile .img-profile {
  display: flex;
  flex-direction: column;
}

.profile .img-profile img {
  width: 100px;
  height: 100px;
  border-radius: 30px;
  object-fit: cover;
  margin: 20px auto;
}

.profile .profile-content {
  display: flex;
  justify-content: space-between;
}

.profile .profile-content img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  padding-left: 90px;
}

.profile .profile-content .info-profile {
  text-align: left;
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.profile .profile-content .info-profile h6 {
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.165px;
  color: #232323;
}

.profile .profile-content .info-profile p {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1.335px;
  color: #848484;
}

.profile .info-contact {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: left;
  margin-left: 10px;
}

.profile .location {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.profile .location h3 {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  background: #7e98df;
  border-radius: 20px;
  width: 133px;
  height: 50px;
  padding-top: 13px;
  margin: 20px auto;
}

.profile .location .map {
  width: 290px;
  height: 200px;
  background: #848484;
  margin: 30px;
}
</style>
