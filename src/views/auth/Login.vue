<template>
    <div>
        <h1>Login</h1>
        <p class="text-welcome">Hi, Welcome back!</p>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" class="form-control" id="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" class="form-control icon-password" id="password">
            </div>
            <div class="form-group">
                <router-link to="#" class="forgot-password">Forgot Password?</router-link>
            </div>
            <div class="form-group button-group">
                <button type="submit" @click.prevent="goLogin" class="btn btn-login">Login</button>
                <button type="submit" class="btn btn-google"><img src="../../assets/logo-google.png" class="icon-google">Google</button>
            </div>
            <div class="form-group">
                <p class="text-rergister">Dont't have an account? <router-link to="/auth/register">Sign Up</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    goLogin () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success Login',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push('/main/default')
        })
    }
  }
}
</script>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #7E98DF;
    margin-top: 50px;
}

p.text-welcome,
form label,
form input,
form .button-group {
    margin-left: 40px;
}

p.text-welcome {
    font-size: 14px;
    line-height: 17px;
    color: #232323;
    margin-top: 50px;
}

form {
    margin-top: 40px;
}

form label {
    font-size: 14px;
    line-height: 17px;
    color: #848484;
    opacity: 0.75;
}

form input {
    border: none;
    border-bottom: 1px solid #232323;
    max-width: 360px;
}

form input:focus {
    border: none;
    border-bottom: 1px solid #232323;
    box-shadow: none;
}

form .icon-password {
    background-image: url('../../assets/eye.png');
    background-repeat: no-repeat;
    background-position: right;
}

form .forgot-password {
    font-size: 16px;
    line-height: 19px;
    color: #7E98DF;
    margin-top: 20px;
    padding-left: 265px;
}

form .button-group {
    display: flex;
    flex-direction: column;
}

form .button-group button {
    border-radius: 70px;
    width: 360px;
    height: 60px;
    margin-top: 50px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
}

form .button-group .btn-login {
    background: #7E98DF;
    color: #FFFFFF;
}

form .button-group .btn-google {
    background: #FFFFFF;
    border: 1px solid #7E98DF;
    box-sizing: border-box;
    color: #7E98DF;
}

form .button-group .icon-google {
    background-repeat: no-repeat;
    padding-right: 15px;
}

form .text-rergister {
    font-size: 14px;
    line-height: 17px;
    color: #313131;
    text-align: center;
    margin-top: 10px;
}

form .text-rergister a {
    color: #7E98DF;
}
</style>
