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
        title: '조사장 블로그',
        titleTemplate: '%s | chosajang.com',
        meta: [
            {
                'http-equiv': 'Content-Security-Policy',
                content: 'upgrade-insecure-requests'
            }
        ]
    },
};
</script>
