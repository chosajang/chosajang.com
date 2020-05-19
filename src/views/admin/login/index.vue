<template>
    <div class="page-wrapper">
        <login-form></login-form>
    </div>
</template>

<script>
import loginForm from './loginForm.vue';

export default {
  components: {
    loginForm
  }
};
</script>

<style scoped>
.page-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #2D353C;
    display: flex;
}
</style>
