<template>
    <div class="menu" id="menuId">
        <img class="icon-profile" src="../../assets/profile-menu.png" alt="icon profile menu" @click="show">
        <div class="menu-profile">
            <div id="menu-content">
                <div class="menu-top">
                    <img src="../../assets/back.png" alt="arrow back" @click="show">
                    <h6 class="username">{{messageToFriends.username}}</h6>
                </div>
                <div class="profile">
                    <div class="img-profile">
                        <img :src="messageToFriends.photoProfile" alt="user photo">
                    </div>
                    <div class="profile-content">
                        <div class="info-profile">
                            <h6 class="name">{{messageToFriends.name}}</h6>
                            <p class="status">{{messageToFriends.status}}</p>
                        </div>
                        <img src="../../assets/chat.png" alt="icon chat">
                    </div>

                    <div class="info-contact">
                        <h6>Phone Number</h6>
                        <p>{{messageToFriends.phoneNumber}}</p>
                    </div>

                    <div class="location">
                        <h3>Location</h3>
                        <div class="map">
                            <GmapMap
                                :center="{lat:parseFloat(messageToFriends.lat), lng:parseFloat(messageToFriends.lng)}"
                                :zoom="7"
                                map-type-id="terrain"
                                style="width: 290px; height: 200px"
                            >
                                <GmapMarker
                                :position="{lat:parseFloat(messageToFriends.lat), lng:parseFloat(messageToFriends.lng)}"
                                :clickable="true"
                                :draggable="true"
                                @click="center=m.position"
                                />
                            </GmapMap>
                        </div>
                    </div>
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
    ...mapActions(['messageFriends']),
    friends () {
      const id = this.$route.params.id
      const payload = {
        id: id
      }
      this.messageFriends(payload)
    },
    show () {
      document.getElementById('menu-content').classList.toggle('active')
    }
  },
  mounted () {
    this.friends()
  },
  computed: {
    ...mapGetters(['messageToFriends'])
  }
}
</script>

<style scoped>
.menu-profile {
    position: relative;
    transition: 2s;
}

.icon-profile {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    position: absolute;
    right: 50px;
    top: 45px;
    cursor: pointer;
}

#menu-content {
    width: 0px;
    height: max-content;
    background: #FFFFFF;
    position: absolute;
    left: 300px;
    z-index: 1;
    overflow: auto;
}

#menu-content.active {
    width: 349px;
}

.menu-top {
    display: flex;
    margin-top: 30px;
    margin-left: 50px;
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
    color: #7E98DF;
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
    border-radius: 100%;
    object-fit: cover;
    margin: 20px auto;
}

.profile .profile-content {
    display: flex;
}

.profile .profile-content img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    padding-left: 90px;
}

.profile .profile-content .info-profile {
    text-align: left;
    margin-left: 30px;
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
    margin-left: 30px;
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
    color: #FFFFFF;
    background: #7E98DF;
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
    margin-bottom: 70px;
}

@media (max-width: 1276px) {
    .menu-content {
        left: 240px;
    }
}

@media (max-width: 1252px) {
    .menu-content {
        left: 220px;
    }
}

@media (max-width: 1224px) {
    .menu-content {
        left: 200px;
    }
}

@media (max-width: 1196px) {
    .menu-content {
        left: 180px;
    }
}

@media (max-width: 1168px) {
    .menu-content {
        left: 160px;
    }
}

@media (max-width: 1145px) {
    .menu-content {
        left: 140px;
    }
}

@media (max-width: 1114px) {
    .menu-content {
        left: 120px;
    }
}

@media (max-width: 1085px) {
    .menu-content {
        left: 105px;
    }
}

@media (max-width: 1073px) {
    .menu-content {
        left: 100px;
    }
}

@media (max-width: 1051px) {
    .menu-content {
        left: 80px;
    }
}

@media (max-width: 1028px) {
    .menu-content {
        left: 60px;
    }
}

@media (max-width: 995px) {
    .menu-content {
        left: 40px;
    }
}

@media (max-width: 990px) {
    .menu-content {
        left: -40px;
    }
}

@media (max-width: 962px) {
    .menu-content {
        left: -60px;
    }
}

@media (max-width: 931px) {
    .menu-content {
        left: -80px;
    }
}

@media (max-width: 915px) {
    .menu-content {
        left: -100px;
    }
}

@media (max-width: 865px) {
    .menu-content {
        left: -120px;
    }
}

@media (max-width: 832px) {
    .menu-content {
        left: -140px;
    }
}

@media (max-width: 794px) {
    .menu-content {
        left: -160px;
    }
}

@media (max-width: 756px) {
    .menu-content {
        left: -180px;
    }
}

@media (max-width: 729px) {
    .menu-content {
        left: -200px;
    }
}

@media (max-width: 687px) {
    .menu-content {
        left: -220px;
    }
}

@media (max-width: 663px) {
    .menu-content {
        left: -240px;
    }
}

@media (max-width: 609px) {
    .menu-content {
        left: -260px;
    }
}

@media (max-width: 581px) {
    .menu-content {
        left: -280px;
    }
}

@media (max-width: 575px) {
    .menu-content {
        left: 10px;
    }
}

@media (max-width: 556px) {
    .menu-content {
        left: -10px;
    }
}

@media (max-width: 530px) {
    .menu-content {
        left: -40px;
    }
}

@media (max-width: 504px) {
    .menu-content {
        left: -60px;
    }
}

@media (max-width: 485px) {
    .menu-content {
        left: -80px;
    }
}

@media (max-width: 464px) {
    .menu-content {
        left: -100px;
    }
}

@media (max-width: 440px) {
    .menu-content {
        left: -120px;
    }
}

@media (max-width: 424px) {
    .menu-content {
        left: -140px;
    }
}

@media (max-width: 403px) {
    .menu-content {
        left: -160px;
    }
}

@media (max-width: 389px) {
    .menu-content {
        left: -180px;
    }
}
</style>
