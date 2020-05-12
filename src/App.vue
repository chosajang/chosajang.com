<template>
  <div id="app">
    <!-- url에 다른 뷰컴포넌트 출력 -->
    <!-- <tool-bar></tool-bar> -->
    <template v-if="viewType === 'admin'">
      admin
    </template>
    <template v-else-if="viewType === 'service'">
      <service-gnb-bar></service-gnb-bar>
    </template>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ServiceGnbBar from './components/service/Gnb.vue';

export default {
  data () {
    return {
      viewType: ''
    };
  },
  components: {
    ServiceGnbBar
  },
  created () {
    const vm = this;
    vm.viewType = this.$route.meta.type;
  }
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
