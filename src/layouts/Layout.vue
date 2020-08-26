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
  },
  metaInfo: {
    title: 'chosajang.com',
    titleTemplate: '%s - chosajang.com',
    meta: [
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests'
      }
    ]
  }
};
</script>

<style>
/** common Style */
.contentWrap .content { width: 100%; }

/**
 * Toast UI Viewer Custom
 */
.tui-editor-contents {
  font-size: 18px !important;
  font-family: 'Noto Sans KR','NotoSans','Apple SD Gothic Neo',sans-serif !important;
  line-height: 24px !important;
}

.tui-editor-contents blockquote {
  padding: 0 16px !important;
  color: #999 !important;
  margin: 14px 0 14px 20px !important;
  padding: 0 20px !important;
  border-left: 4px solid #608BCB !important;
  background: #f8f8f8 !important;
  border-bottom-right-radius: 2px !important;
  border-top-right-radius: 2px !important;
}

.tui-editor-contents h3 {
  margin: 1em 0 !important;
  font-size: 1.3em !important;
  padding-bottom: 0.3em !important;
  border-bottom: 1px solid #e5e5e5 !important;
}

.tui-editor-contents a {
  text-decoration: none !important;
  color: #608BCB !important;
}

.tui-editor-contents ul, ol {
  overflow: auto !important;
  margin: 15px 0 !important;
}

.tui-editor-contents ul {
  display: block !important;
  list-style-type: disc !important;
  margin-block-start: 1em !important;
  margin-block-end: 1em !important;
  margin-inline-start: 0px !important;
  margin-inline-end: 0px !important;
  padding-inline-start: 40px !important;
}

.tui-editor-contents li::before {
  display: none !important;
}

.tui-editor-contents p {
  line-height: 1.6em !important;
  padding: 8px 0px !important;
  word-spacing: 0.05em !important;
}

.tui-editor-contents img {
  max-width: 100% !important;
  display: block !important;
  margin: 20px auto !important;
}

.tui-editor-contents code {
  font-size: 14px !important;
  font-family: Consolas, Courier, "Apple SD 산돌고딕 Neo", -apple-system, "Lucida Grande", "Apple SD Gothic Neo", "맑은 고딕", "Malgun Gothic", "Segoe UI", "돋움", dotum, sans-serif !important;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .tui-editor-contents {
    font-size: 15px !important;
    line-height: 22px !important;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {
}
</style>
