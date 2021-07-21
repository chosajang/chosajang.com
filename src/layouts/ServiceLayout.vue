<template>
  <div>
    <service-header></service-header>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import ServiceHeader from '../components/service/Header.vue';

export default {
  name: 'ServiceLayout',
  components: {
    // ServiceHeader
  }
};
</script>
