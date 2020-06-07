<template>
  <div class="layoutWrap">
      <div class="headerWrap">
        <admin-header></admin-header>
      </div>
      <div class="lnbWrap">
        <lnb></lnb>
      </div>
      <div class="contentWrap">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import AdminHeader from '../components/admin/Header.vue';
import Lnb from '../components/admin/Lnb.vue';

export default {
  name: 'AdminLayout',
  components: {
    AdminHeader,
    Lnb
  }
};
</script>

<style scope>
/**
 * common
 */
.layoutWrap {
  display: flex;
  height: 100%;
  min-height: 100vh;
  background-color: #2D353C;
}

.headerWrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  max-height: 70px;
  height: 70px;
  transition: .2s;
}

.lnbWrap {
  position: absolute;
  top: 70px;
  left: 0px;
  transition: .2s;
}

.contentWrap {
  display: flex;
  margin: 70px 0 0 200px;
  padding: 0 20px;
  width: 100%;
  background-color: #FFF;
  transition: .2s;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .headerWrap {
    height: 50px;
    transition: .3s;
  }

  .lnbWrap {
    top: 50px;
    left: -200px;
    transition: 0.2s;
  }

  .contentWrap {
    margin: 50px 0 0 0;
    transition: 0.2s;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {

}
</style>
