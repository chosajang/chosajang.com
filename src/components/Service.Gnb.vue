<template>
  <div class="header">
    <div>Logo</div>
    <router-link to="/blog">Blog</router-link> |
    <router-link to="/profile">Profile</router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.header {
  color: #FFF;
  background-color: #2D353C;
  display: flex;
  padding: 10px;
  font-size: 20px;
}
.header .router-link-exact-active {
  color: #FFF;
}
.header a {
  color: #B6B6B6;
}
</style>
