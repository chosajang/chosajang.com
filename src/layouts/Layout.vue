<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script>
import BlankLayout from './BlankLayout.vue'
import ServiceLayout from './ServiceLayout.vue'

export default {
  name: 'Layout',
  components: {
    BlankLayout,
    ServiceLayout
  },
  data: () => ({
    layout : 'BlankLayout'
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          this.layout = route.meta.layout ? route.meta.layout : 'BlankLayout'
        } catch (e) {
          this.layout = 'BlankLayout'
        }
      }
    }
  },
  metaInfo: {
    title: 'chosajang.com',
    titleTemplate: '%s - chosajang.com',
    meta: [
      {
        // 'http-equiv': 'Content-Security-Policy',
        // content: 'upgrade-insecure-requests'
      }
    ]
  }
};
</script>

<style>

</style>
