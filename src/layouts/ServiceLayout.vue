<template>
  <div>
    <service-header></service-header>
    <div class="contentWrap">
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

<style scoped>
.contentWrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #FFF;
  transition: .2s;
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
