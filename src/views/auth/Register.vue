<template>
    <div>
        <div class="handleBack" @click.prevent="handleBack">
            <img src="../../assets/back.png" alt="arrow-back">
        </div>
        <h1>Register</h1>
        <p>Let's create your account!</p>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model.trim="$v.name.$model" :class="{ 'is-invalid': validationStatus($v.name) }" class="form-control" placeholder="Enter your name">
                <div class="invalid-feedback" v-if="!$v.name.required">Field is required.</div>
            </div>
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
            <div class="form-group button-group">
                <Button type="submit" className="btn-register" @onClick="goRegister" name="Register"/>
                <Button type="submit" className="btn-google" name="Google"/>
            </div>
        </form>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapActions } from 'vuex'
import Button from '../../components/base/Button'
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  components: {
    Button
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    name: { required }
  },
  methods: {
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    handleBack () {
      this.$router.push('/auth/login')
    },
    ...mapActions(['register']),
    goRegister () {
      this.$v.$touch()
      if (this.$v.$pendding || this.$v.$error) return
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.register(payload)
        .then(() => {
        })
    },
    ...mapMutations(['togglePassword'])
  }
}
</script>

<style scoped>
.handleBack img {
    position: absolute;
    top: 55px;
    left: 50px;
    cursor: pointer;
}

h1 {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #7E98DF;
    margin-top: 50px;
}

p,
form label,
form input,
form .button-group {
    margin-left: 40px;
}

p {
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
    cursor: pointer;
}

form .toggle-password {
    position: absolute;
    top: 390px;
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
}

@media (max-width: 470px) {
    form input {
        max-width: 350px;
    }
}

@media (max-width: 470px) {
    form input {
        max-width: 320px;
    }
}

@media (max-width: 411px) {
    form input {
        max-width: 300px;
    }
}

@media (max-width: 382px) {
    form input {
        max-width: 300px;
    }
}

@media (max-width: 374px) {
    form input {
        max-width: 310px;
    }
}

@media (max-width: 372px) {
    h1 {
        padding-left: 50px;
    }

    form input {
        max-width: 300px;
    }
}

@media (max-width: 362px) {
    h1 {
        padding-left: 60px;
    }
}

@media (max-width: 352px) {
    h1 {
        padding-left: 70px;
    }
}

@media (max-width: 332px) {
    h1 {
        padding-left: 80px;
    }
}

@media (max-width: 330px) {
    h1 {
        padding-left: 90px;
    }
}

@media (max-width: 322px) {
    h1 {
        padding-left: 100px;
    }
}

@media (max-width: 306px) {
    h1 {
        padding-left: 110px;
    }
}
</style>
