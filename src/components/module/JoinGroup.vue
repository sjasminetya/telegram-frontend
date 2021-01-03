<template>
<div>
    <div class="menu-top">
        <h1>Join Group</h1>
    </div>
    <div class="list-group">
        <h1>All</h1>
        <div class="main-group">
            <div class="img-profile">
                <img src="../../assets/avatar.jpg" alt="user photo">
            </div>
            <div class="join">
                <h6 class="name-group">{{data.name}}</h6>
                <button>Join this group</button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
  name: 'JoinGroup'
}
</script>

<style scoped>

</style>
