<template>
  <layout id="app">
    <router-view></router-view>
  </layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue';
import bus from './utils/bus';

export default {
  name: 'App',
  components: { Layout },
  methods: {
    startSpinner () {
      this.$swal({
        text: 'Loading...',
        width: 180,
        allowEscapeKey: true,
        allowOutsideClick: true,
        backdrop: 'rgba(0,0,0,0.1)',
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
    },

    stopSpinner () {
      this.$swal.close();
    },

    forceAlert (stateCode) {
      let title = '';
      let message = '';
      if (stateCode === process.env.VUE_APP_NETWORK_ERROR) {
        title = '네트워크 장애';
        message = 'API 서버에 문제가 발생되었습니다.<br/>다시 시도해 주세요';
      }
      this.$swal({
        title: title,
        html: message,
      }).then(() => {});
    },
  },
  created () {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.stopSpinner);
    bus.$on('forceAlert', this.forceAlert);
  },
  beforeDestroy () {
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.stopSpinner);
    bus.$off('forceAlert', this.forceAlert);
  },
};
</script>
