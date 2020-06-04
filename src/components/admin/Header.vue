<template>
  <div class="header">
    <div class="mobile-nav">
      <i class="fas fa-bars"></i>
    </div>
    <div class="logo">
      <router-link to="/admin">CHOSAJANG <span>ADMIN</span></router-link>
    </div>
    <div class="nav">
      <router-link to="/blog">Service.blog</router-link>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
/**
 * common
 */
.header {
  display: flex;
  align-items: center;
  color: #FFF;
  background-color: #2D353C;
}

.logo > a > span {
  color: #FF0000;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .header {
    height: 50px;
    transition: 0.3s;
  }

  .header .nav {
    display: none;
  }

  .logo {
    margin: 0 auto;
  }

  .logo > a {
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;
    text-decoration: none;
  }

  .mobile-nav {
    flex: none;
  }

  .mobile-nav i {
    font-size: 24px;
    padding-left: 10px;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {
  .header {
    height: 70px;
    transition: 0.3s;
  }

  .logo {
    flex: none;
  }

  .logo > a {
    color: #FFF;
    font-size: 20px;
    margin: 0px 20px;
    letter-spacing: 3px;
    text-decoration: none;
  }

  .nav {
    margin-right: auto;
    padding-left: 80px;
  }

  .header .nav .router-link-exact-active {
    color: #FFF;
    font-size: 16px;
    text-decoration: none;
  }

  .header .nav a {
    color: #FFF;
    font-size: 16px;
    text-decoration: none;
    margin: 0px 15px;
  }

  .mobile-nav {
    display: none;
  }
}
</style>
