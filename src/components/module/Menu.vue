<template>
        <div class="menu">
            <img src="../../assets/menu.png" @click.prevent="handleClick" class="dropmenu" alt="icon menu">
            <div id="myMenu" class="menu-content">
                <router-link to="/profile"><i class="fas fa-cog"></i> Settings </router-link>
                <div @click.prevent="handleLogout" class="logout"><i class="fas fa-sign-out-alt"></i> Logout </div>
            </div>
        </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Menu',
  data () {
    return {
      idUser: '',
      socket: io(`${process.env.VUE_APP_SOCKET_URL}`)
    }
  },
  methods: {
    handleClick () {
      document.getElementById('myMenu').classList.toggle('show')
    },
    handleMenu () {
      window.onclick = function (event) {
        if (!event.target.matches('.dropmenu')) {
          const dropmenu = document.getElementsByClassName('menu-content')
          for (let i = 0; i < dropmenu.length; i++) {
            const openMenu = dropmenu[i]
            if (openMenu.classList.contains('show')) {
              openMenu.classList.remove('show')
            }
          }
        }
      }
    },
    ...mapActions(['logout']),
    handleLogout () {
      const idUser = localStorage.getItem('id')
      this.idUser = idUser
      this.socket.emit('offline', { idUser })
      this.logout()
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Succeed logout',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/auth/login')
        })
    }
  }
}
</script>

<style scoped>
.menu {
    position: relative;
    display: inline-block;
}

.menu img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    margin-right: 10px;
    cursor: pointer;
}

.menu-content {
    display: none;
    position: absolute;
    background: #7E98DF;
    border-radius: 35px 10px 35px 35px;
    min-width: 160px;
    overflow: auto;
    z-index: 1;
    right: 0px;
    margin-top: 10px;
}

.menu-content a,
.menu-content .logout {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    display: block;
    text-decoration: none;
    padding: 10px 25px;
    margin-top: 15px;
    margin-bottom: 20px;
}

.menu-content i {
  display: inline-block;
  padding-right: 0;
  font-size: 25px;
}

.menu-content .logout {
  cursor: pointer;
}

.show {
    display: block;
}
</style>
