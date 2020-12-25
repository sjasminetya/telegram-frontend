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
        <h6 class="name">{{userLogin.name}}</h6>
        <p class="user-name">@{{userLogin.username}}</p>
    </div>
    <div class="menu-info">
        <h3>Account</h3>
        <div class="info-account">
            <div class="input-number">
                <input type="text" class="form-control edit-number" v-model="phoneNumber" v-if="editPhoneNumber === 1" @keyup.enter="save">
                <input type="text" class="form-control number" v-model="userLogin.phoneNumber" v-if="editPhoneNumber === 0" disabled>
                <div class="change-the-text" @click="edit" v-if="editPhoneNumber === 0">Edit phone number</div>
                <div class="change-the-text" @click="save" v-if="editPhoneNumber === 1">Save update phone number</div>
            </div>
            <hr>
            <div class="input-username">
                <input type="text" class="form-control edit-username" v-model="username" v-if="editUsername === 1" @keyup.enter="save">
                <input type="text" class="form-control username" v-model="userLogin.username" v-if="editUsername === 0" disabled>
                <div class="change-the-text" @click="edit" v-if="editUsername === 0">Edit username</div>
                <div class="change-the-text" @click="save" v-if="editUsername === 1">Save update username</div>
            </div>
            <hr>
            <div class="input-bio">
                <input type="text" class="form-control" v-model="userLogin.bio" disabled>
                <!-- <input type="text" class="form-control"> -->
                <p>Bio</p>
            </div>
        </div>
        <div class="location">
            <h3>Location</h3>
            <div class="map"></div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      phoneNumber: '',
      editPhoneNumber: 0,
      editUsername: 0,
      editBio: 0,
      username: '',
      bio: ''
    }
  },
  methods: {
    ...mapActions(['getUserById', 'update']),
    edit () {
      if (this.editPhoneNumber === 0 || this.editUsername === 0) {
        this.editPhoneNumber++
        this.editUsername++
      }
    },
    save () {
      if (this.editPhoneNumber > 0 || this.editUsername > 0) {
        this.editPhoneNumber--
        this.editUsername--
      }
      const form = new FormData()
      form.append('phoneNumber', this.phoneNumber)
      form.append('username', this.username)
      const payload = {
        form
      }
      this.update(payload)
        .then(res => {
          console.log('berhasil', res)
        })
        .catch(err => {
          console.log('gagal', err)
        })
    },
    // editUserName () {
    //   if (this.editUsername === 0) {
    //     this.editUsername++
    //   }
    // },
    // saveUsername () {
    //   if (this.editUsername > 0) {
    //     this.editUsername--
    //   }
    // },
    handleBackSettings () {
      this.$router.push('/main/message')
    }
  },
  mounted () {
    this.getUserById()
    this.update()
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

.profile .img-profile img {
    width: 82px;
    height: 82px;
    object-fit: contain;
    margin: 20px auto;
    border-radius: 20px;
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

.menu-info .info-account .input-number .edit-number,
.menu-info .info-account .input-number .number {
    border: none;
    outline: none;
    margin-top: 10px;
    background: none;
    padding-left: 0;
}

.menu-info .info-account .input-number .edit-number:focus,
.menu-info .info-account .input-number .number:focus {
    outline: none;
    box-shadow: none;
    border: none;
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

hr {
    width: 290px;
    margin-left: 0;
    margin-bottom: 30px;
}

.menu-info .info-account .input-username .username,
.menu-info .info-account .input-username .edit-username {
    border: none;
    outline: none;
    margin-top: 10px;
    background: none;
    padding-left: 0;
}

.menu-info .info-account .input-username .username:focus,
.menu-info .info-account .input-username .edit-username:focus {
    outline: none;
    box-shadow: none;
    border: none;
    background: none;
}

.menu-info .info-account .input-bio input {
    border: 0;
    box-shadow: 0;
    outline: 0;
    background: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 181%;
    color: #232323;
    padding-left: 0;
}

.menu-info .info-account .input-bio input:focus {
    outline: none;
    box-shadow: none;
    border: none;
    background: none;
}

.menu-info .info-account .input-bio p {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #848484;
    margin-bottom: 30px;
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
