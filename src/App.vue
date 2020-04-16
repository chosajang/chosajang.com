<template>
  <div id="app">
    <!-- url에 다른 뷰컴포넌트 출력 -->
    <!-- <tool-bar></tool-bar> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import ToolBar from './components/ToolBar.vue';

export default {
  components: {
    // ToolBar
  },
  created () {
    console.log('App.vue > created()', this.$route.name);
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

/* Router Transitions */
/* .page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
} */
</style>
