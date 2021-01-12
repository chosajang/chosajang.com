<template>
  <div class="containter mx-auto">
    <!-- url에 다른 뷰컴포넌트 출력 -->
    <layout>
      <router-view></router-view>
    </layout>
  </div>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  

  <!-- <HelloWorld msg="Hello World"/> -->
</template>

<script>
import Layout from './layouts/Layout.vue';

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style src="./assets/tailwind.css"/>