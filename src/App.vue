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
console.log('App.vue');

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style src="./assets/tailwind.css"/>