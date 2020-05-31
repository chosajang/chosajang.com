<template>
  <div class="layoutWrap">
      <admin-header></admin-header>
      <div class="contentWrap">
        <component v-bind:is="lnbName"></component>
        <slot></slot>
      </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import AdminHeader from '../components/admin/Header.vue';
import LnbUser from '../components/admin/LnbUser.vue';

export default {
  name: 'AdminLayout',
  components: {
    AdminHeader,
    LnbUser
  },
  setup (props, { root }) {
    const contentStyle = computed(() => root.$route.meta.contentStyle || 'blank');
    const lnbName = computed(() => root.$route.meta.lnbName || 'blank');
    console.log(contentStyle);
    return {
      contentStyle,
      lnbName
    };
  }
};
</script>

<style>
/**
 * common
 */
.layoutWrap {
  height: 100vh;
}
.contentWrap {
  display: flex;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {

}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {

}
</style>
