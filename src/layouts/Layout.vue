<template>
  <component v-bind:is="layout">
    <transition name="page" mode="out-in">
      <slot></slot>
    </transition>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import BlankLayout from './BlankLayout.vue'
import ServiceLayout from './ServiceLayout.vue'

export default {
  name: 'Layout',
  components: {
    BlankLayout,
    ServiceLayout
  },
  setup (props, {root}) {
    const layout = computed(() => root.$route.meta.layout || 'BlankLayout');
    return {
      layout
    };
  },
  metaInfo: {
    title: 'CSJ Admin',
    titleTemplate: '%s',
    // meta: [
    //   {
    //     'http-equiv': 'Content-Security-Policy',
    //     content: 'upgrade-insecure-requests'
    //   }
    // ]
  },
};
</script>
