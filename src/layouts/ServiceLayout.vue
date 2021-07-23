<template>
  <div>
    <service-header></service-header>
    <slot></slot>
    <service-footer></service-footer>
  </div>
</template>

<script>
import ServiceHeader from '../components/Header.vue'
import ServiceFooter from '../components/Footer.vue'

export default {
  name: 'ServiceLayout',
  components: {
    ServiceHeader,
    ServiceFooter
  },
  created() {
    // console.log('ServiceLayout.created')
  }
};
</script>
