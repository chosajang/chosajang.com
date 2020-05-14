<template>
  <component v-bind:is="layout">
    <transition name="page" mode="out-in">
      <slot></slot>
    </transition>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api';
import BlankLayout from './BlankLayout.vue';
import AdminLayout from './AdminLayout.vue';
import ServiceLayout from './ServiceLayout.vue';

export default {
  name: 'Layout',
  components: {
    BlankLayout,
    AdminLayout,
    ServiceLayout
  },
  setup (props, { root }) {
    const layout = computed(() => root.$route.meta.layout || 'BlankLayout');
    return {
      layout
    };
  }
};
</script>

<style>

</style>
