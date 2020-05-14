<template>
  <div>
      <admin-header></admin-header>
      <slot></slot>
  </div>
</template>

<script>
import AdminHeader from '../components/admin/Header.vue';

export default {
  name: 'AdminLayout',
  components: {
    AdminHeader
  }
};
</script>

<style>

</style>
