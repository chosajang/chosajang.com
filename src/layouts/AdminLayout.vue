<template>
  <div class="layoutWrap">
      <admin-header></admin-header>
      <div class="contentWrap">
        <lnb></lnb>
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
  height: 100vh;
}
.contentWrap {
  width: 100vw;
  display: flex;
}

.contentWrap > .content {
  width: 100vw;
  padding: 20px 20px 0px 220px;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .contentWrap > .content {
    padding-left: 20px;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {

}
</style>
