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
@import url('http://fonts.googleapis.com/earlyaccess/notosanskr.css');

body {
  padding: 0;
  margin: 0;
  min-width: 360px;
}

/* Router Transitions */
.page-enter-active, .page-leave-active {
  transition: opacity .2s ease;
}
.page-enter, .page-leave-to {
  opacity: 0;
}

::selection {
  background-color: #608BCB;
  color: #FFF;
}
</style>
