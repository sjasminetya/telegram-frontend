<template>
<div>
    <div class="menu-top">
        <img src="../../assets/back.png" @click.prevent="handleBackSettings" alt="arrow back">
        <h6 class="username">@{{userLogin.username}}</h6>
    </div>
    <div class="profile">
        <div class="img-profile">
            <img :src="userLogin.photoProfile" alt="user photo">
        </div>
        <span><i class="fas fa-camera-retro"></i></span>
        <h6 class="name">{{userLogin.name}}</h6>
        <p class="user-name">@{{userLogin.username}}</p>
    </div>
    <div class="menu-info">
        <h3>Account</h3>
        <div class="info-account">
            <div class="input-number">
                <label for="phone-number" class="form-label">Phone Number</label>
                <input type="text" class="form-control edit-number" v-model="phoneNumber" v-if="editPhoneNumber === 1" @keyup.enter="saveNumber">
                <input type="text" class="form-control number" v-model="userLogin.phoneNumber" v-if="editPhoneNumber === 0" disabled>
                <span><i class="fas fa-pen" @click="editNumber" v-if="editPhoneNumber === 0"></i></span>
                <span><i class="fas fa-check" @click="saveNumber" v-if="editPhoneNumber === 1"></i></span>
            </div>
            <div class="input-username">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control edit-username" v-model="username" v-if="editUsername === 1" @keyup.enter="saveUsername">
                <input type="text" class="form-control username" v-model="userLogin.username" v-if="editUsername === 0" disabled>
                <span><i class="fas fa-pen" @click="editUserName" v-if="editUsername === 0"></i></span>
                <span><i class="fas fa-check" @click="saveUsername" v-if="editUsername === 1"></i></span>
            </div>
            <div class="input-bio">
                <label for="bio" class="form-label">Bio</label>
                <input type="text" class="form-control edit-bio" v-model="bio" v-if="editBio === 1" @keyup.enter="saveBio">
                <input type="text" class="form-control bio" v-model="userLogin.bio" v-if="editBio === 0" disabled>
                <span><i class="fas fa-pen" @click="editBioUser" v-if="editBio === 0"></i></span>
                <span><i class="fas fa-check" @click="saveBio" v-if="editBio === 1"></i></span>
            </div>
        </div>
        <div class="location">
            <h3>Location</h3>
            <div class="map">
              <GmapMap
                :center="{lat:lat, lng:lng}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 360px; height: 200px"
              >
                <GmapMarker
                  :position="{lat:lat, lng:lng}"
                  :clickable="true"
                  :draggable="true"
                  @click="center=m.position"
                />
              </GmapMap>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
export default {
  name: 'Profile',
  data () {
    return {
      phoneNumber: '',
      editPhoneNumber: 0,
      editUsername: 0,
      editBio: 0,
      editImage: 0,
      username: '',
      bio: '',
      lat: 0,
      lng: 0,
      photoProfile: '',
      socket: io('http://localhost:2000')
    }
  },
  methods: {
    ...mapActions(['getUserById', 'update']),
    editNumber () {
      if (this.editPhoneNumber === 0) {
        this.editPhoneNumber++
      }
    },
    saveNumber () {
      if (this.editPhoneNumber > 0) {
        this.editPhoneNumber--
      }
      const payload = {
        phoneNumber: this.phoneNumber
      }
      this.update(payload)
        .then(() => {
          this.getUserById()
        })
    },
    editUserName () {
      if (this.editUsername === 0) {
        this.editUsername++
      }
    },
    saveUsername () {
      if (this.editUsername > 0) {
        this.editUsername--
      }
      const payload = {
        username: this.username
      }
      this.update(payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Succeed',
            text: 'Success update',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUserById()
        })
    },
    editBioUser () {
      if (this.editBio === 0) {
        this.editBio++
      }
    },
    saveBio () {
      if (this.editBio > 0) {
        this.editBio--
      }
      const payload = {
        bio: this.bio
      }
      this.update(payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Succeed',
            text: 'Success update',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUserById()
        })
    },
    // updateLocation () {
    //   const payload = {
    //     lat: this.lat,
    //     lng: this.lng
    //   }
    //   console.log('isi dari payload location', payload)
    //   this.update(payload)
    //     .then(() => {
    //       console.log('data location')
    //       // this.getUserById()
    //     })
    // },
    handleBackSettings () {
      this.$router.push('/main/default')
    }
  },
  mounted () {
    this.getUserById()
    // this.updateLocation()
    // this.update()
    this.$getLocation()
      .then(coordinates => {
        this.lat = coordinates.lat
        this.lng = coordinates.lng
        console.log(coordinates)
        this.socket.emit('newLocation', { lat: this.lat, lng: this.lng, id: this.userLogin.id })
      })
  },
  computed: {
    ...mapGetters(['userLogin'])
  }
}
</script>

<style scoped>
.menu-top {
    display: flex;
    margin-top: 50px;
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
    margin: 10px 100px;
    text-align: center;
}

.profile {
    text-align: center;
}

.profile i {
  font-size: 40px;
  position: absolute;
  top: 200px;
  left: 250px;
  cursor: pointer;
  color: #7E98DF;
}

.profile .img-profile .change-the-text {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #7E98DF;
    margin-bottom: 30px;
    cursor: pointer;
}

.profile .img-profile .edit-image {
    border: none;
    outline: none;
    margin: 40px;
    background: none;
    padding-left: 0;
}

.profile .img-profile .edit-image:focus {
    outline: none;
    box-shadow: none;
    border: none;
    background: none;
}

.profile .img-profile img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin: 20px auto;
    border-radius: 100%;
}

.profile h6 {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.165px;
    color: #232323;
}

.profile p {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.335px;
    color: #848484;
}

.menu-info {
    margin-top: 40px;
    margin-left: 20px;
}

.menu-info h3 {
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    color: #232323;
}

.menu-info .info-account {
  position: relative;
}

.menu-info .info-account .input-number .form-label,
.menu-info .info-account .input-username .form-label,
.menu-info .info-account .input-bio .form-label {
  margin-top: 20px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #7E98DF;
}

.menu-info .info-account .input-number i {
  position: absolute;
  top: 67px;
  right: 10px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #7E98DF;
  cursor: pointer;
}

.menu-info .info-account .input-username i {
  position: absolute;
  top: 200px;
  right: 10px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #7E98DF;
  cursor: pointer;
}

.menu-info .info-account .input-bio i {
  position: absolute;
  top: 335px;
  right: 10px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #7E98DF;
  cursor: pointer;
}

.menu-info .info-account .input-number .edit-number,
.menu-info .info-account .input-number .number,
.menu-info .info-account .input-username .username,
.menu-info .info-account .input-username .edit-username,
.menu-info .info-account .input-bio .bio,
.menu-info .info-account .input-bio .edit-bio {
    border: none;
    border-bottom: 1px solid #7E98DF;
    outline: none;
    margin-top: 10px;
    margin-bottom: 40px;
    background: none;
    padding-left: 0;
}

.menu-info .info-account .input-number .edit-number:focus,
.menu-info .info-account .input-number .number:focus,
.menu-info .info-account .input-username .username:focus,
.menu-info .info-account .input-username .edit-username:focus,
.menu-info .info-account .input-bio .bio:focus,
.menu-info .info-account .input-bio .edit-bio :focus {
    outline: none;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #7E98DF;
    background: none;
}

.menu-info .info-account .change-the-text {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #7E98DF;
    margin-bottom: 30px;
    cursor: pointer;
}

.location h3 {
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    color: #232323;
}

.location .map {
    width: 350px;
    height: 200px;
    background: #848484;
    margin-bottom: 30px;
}
</style>
