<template>
  <div>
      <service-header></service-header>
      <slot></slot>
  </div>
</template>

<script>
import ServiceHeader from '../components/service/Header.vue';

export default {
  name: 'ServiceLayout',
  components: {
    ServiceHeader
  }
};
</script>

<style>

</style>
