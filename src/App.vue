<template>
  <layout id="app">
    <router-view></router-view>
  </layout>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import bus from './utils/bus'

export default {
  name: 'App',
  components: { Layout },
  methods: {
    startSpinner() {
      this.$swal({
        text: 'Loading...',
        width: 180,
        allowEscapeKey: false,
        allowOutsideClick: false,
        backdrop: 'rgba(0,0,0,0.1)',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })
    },

    stopSpinner() {
      this.$swal.close()
    },

    forceAlert(state_code) {
      let title = ''
      let message = ''
      if( state_code == process.env.VUE_APP_AUTH_FAILURE ) {
        title = '인증실패'
        message = 'API 인증키가 만료되었거나 유효하지 않습니다.<br/>자동로그아웃 되니 다시 로그인하여 사용해주세요'
      } else {
        title = '네트워크 장애'
        message = 'API 서버에 문제가 발생되었습니다.<br/>다시 시도해 주세요'
      }
      this.$swal({
        title: title,
        html: message
      })
      .then(() => {
        if( state_code == process.env.VUE_APP_AUTH_FAILURE ) {
          this.$store.commit('SET_USERINFO', '')
          this.$router.push({ path: '/login' })
        }
      })
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner)
    bus.$on('end:spinner', this.stopSpinner)
    bus.$on('forceAlert', this.forceAlert)
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner)
    bus.$off('end:spinner', this.stopSpinner)
    bus.$off('forceAlert', this.forceAlert)
  }
};
</script>