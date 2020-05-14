<template>
  <div id="app">
    <!-- url에 다른 뷰컴포넌트 출력 -->
    <layout>
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import Layout from '@/layouts/Layout.vue';

export default {
  name: 'App',
  components: { Layout }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

/* Router Transitions */
.page-enter-active, .page-leave-active {
  transition: opacity .2s ease;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
