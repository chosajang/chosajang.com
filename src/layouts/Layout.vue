<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script>
import BlankLayout from '@/layouts/BlankLayout.vue';

export default {
  name: 'Layout',
  components: {
    BlankLayout,
  },
  data: () => ({
    layout : BlankLayout
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`)
          this.layout = component ? component.default : BlankLayout
        } catch (e) {
          this.layout = BlankLayout
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
