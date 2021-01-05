<template>
    <div>
        <button :type="type" :class="className" @click.prevent="$emit('onClick')">{{name}}</button>
    </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    className: String,
    name: String,
    type: String
  }
}
</script>

<style scoped>
button {
    border-radius: 70px;
    width: 360px;
    height: 60px;
    margin-top: 50px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
}

button:focus {
    outline: none;
}

.btn-login,
.btn-register {
    background: #7E98DF;
    color: #FFFFFF;
    border: none;
}

.btn-google {
    background: #FFFFFF;
    border: 1px solid #7E98DF;
    box-sizing: border-box;
    color: #7E98DF;
}

.icon-google {
    background-repeat: no-repeat;
    padding-right: 15px;
}

@media (max-width: 600px) {
    button {
        width: 250px;
    }
}

@media (max-width: 470px) {
    button {
        width: 350px;
    }
}

@media (max-width: 470px) {
    button {
        width: 320px;
    }
}

@media (max-width: 411px) {
    button {
        width: 300px;
    }
}

@media (max-width: 382px) {
    button {
        width: 300px;
    }
}

@media (max-width: 374px) {
    button {
        width: 310px;
    }
}

@media (max-width: 372px) {
    button {
        width: 300px;
    }
}

</style>
