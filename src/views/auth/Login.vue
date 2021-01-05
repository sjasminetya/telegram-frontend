<template>
    <div>
        <h1>Login</h1>
        <p class="text-welcome">Hi, Welcome back!</p>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model.trim="$v.email.$model" :class="{ 'is-invalid': validationStatus($v.email) }" class="form-control" placeholder="Enter your email address">
                <div class="invalid-feedback" v-if="!$v.email.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.email.email">invalid email</div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="$v.password.$model" :class="{ 'is-invalid': validationStatus($v.password) }" class="form-control icon-password" placeholder="Enter your password">
                <input type="checkbox" class="toggle-password" @click="togglePassword">
                <div class="invalid-feedback" v-if="!$v.password.required">Field is required.</div>
                <div class="invalid-feedback" v-if="!$v.password.minLength">Field must have at least {{ $v.password.$params.minLength.min }} characters.</div>
            </div>
            <div class="form-group">
                <router-link to="#" class="forgot-password">Forgot Password?</router-link>
            </div>
            <div class="form-group button-group">
                <Button type="submit" className="btn-login" @onClick="goLogin" name="Login"/>
                <Button type="submit" className="btn-google" name="Google"/>
            </div>
            <div class="form-group">
                <p class="text-rergister">Dont't have an account? <router-link to="/auth/register">Sign Up</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import { required, minLength, email } from 'vuelidate/lib/validators'
import Button from '../../components/base/Button'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Button
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    ...mapActions(['login', 'update']),
    goLogin () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) return
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success Login',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push('/main/default')
        })
    },
    ...mapMutations(['togglePassword'])
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
    box-sizing: border-box;
}

form input:focus {
    border: none;
    border-bottom: 1px solid #232323;
    box-shadow: none;
}

form .is-invalid {
    border-bottom: 1px solid red;
}

form .is-invalid:focus {
    border-bottom: 1px solid red;
    box-shadow: none;
}

form .invalid-feedback {
    padding-left: 40px;
}

form .icon-password {
    background-image: url('../../assets/eye.png');
    background-repeat: no-repeat;
    background-position: right;
}

form .toggle-password {
    position: absolute;
    top: 308px;
    left: 360px;
    opacity: 0;
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

@media (max-width: 600px) {
    form input {
        max-width: 250px;
    }

    form .forgot-password {
        padding-left: 150px;
    }
}

@media (max-width: 470px) {
    form input {
        max-width: 350px;
    }

    form .forgot-password {
        padding-left: 250px;
    }
}

@media (max-width: 470px) {
    form input {
        max-width: 320px;
    }

    form .forgot-password {
        padding-left: 220px;
    }
}

@media (max-width: 411px) {
    form input {
        max-width: 300px;
    }

    form .forgot-password {
        padding-left: 200px;
    }
}

@media (max-width: 382px) {
    form input {
        max-width: 300px;
    }

    form .forgot-password {
        padding-left: 200px;
    }
}

@media (max-width: 374px) {
    form input {
        max-width: 310px;
    }

    form .forgot-password {
        padding-left: 210px;
    }
}

@media (max-width: 372px) {
    h1 {
        padding-left: 50px;
    }

    form input {
        max-width: 300px;
    }

    form .forgot-password {
        padding-left: 200px;
    }
}

@media (max-width: 362px) {
    h1 {
        padding-left: 60px;
    }

    form .forgot-password {
        padding-left: 190px;
    }
}

@media (max-width: 352px) {
    h1 {
        padding-left: 70px;
    }

    form .forgot-password {
        padding-left: 175px;
    }
}

@media (max-width: 332px) {
    h1 {
        padding-left: 80px;
    }

    form .forgot-password {
        padding-left: 168px;
    }
}

@media (max-width: 330px) {
    h1 {
        padding-left: 90px;
    }

    form .forgot-password {
        padding-left: 160px;
    }
}

@media (max-width: 322px) {
    h1 {
        padding-left: 100px;
    }

    form .forgot-password {
        padding-left: 150px;
    }
}

@media (max-width: 306px) {
    h1 {
        padding-left: 110px;
    }

    form .forgot-password {
        padding-left: 140px;
    }
}
</style>
