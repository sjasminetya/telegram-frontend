<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-lg-5 form-box">
                <router-view/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped>
main {
    background: #E5E5E5;
    height: max-content;
}

main .form-box {
    margin: 50px auto;
    background: #FFFFFF;
    box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
    border-radius: 30px;
    width: 500px;
    height: 710px;
}
</style>
