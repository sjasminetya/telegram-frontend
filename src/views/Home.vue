<template>
  <div class="home">
    <div class="icon">
      <img @click.prevent="goLogin" src="../assets/icon.png" alt="splash screen">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    goLogin () {
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.home {
  background: #7E98DF;
  height: 657px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.home img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
}
</style>
