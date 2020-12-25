<template>
        <div class="menu">
            <img src="../../assets/menu.png" @click.prevent="handleClick" class="dropmenu" alt="icon menu">
            <div id="myMenu" class="menu-content">
                <router-link to="/profile"><img src="../../assets/settings.png" alt="icon settings"> Settings </router-link>
                <router-link to="#"><img src="../../assets/contacts.png" alt="icon contacts"> Contacts </router-link>
            </div>
        </div>
</template>

<script>
export default {
  name: 'Menu',
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
}

.menu-content a {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    margin-top: 10px;
}

.show {
    display: block;
}
</style>
