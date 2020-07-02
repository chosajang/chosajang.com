<template>
  <div class="content">
    <p>Admin / Article</p>
    <ul>
      <li>작성된 글 목록 조회</li>
      <li>글 쓰기 / 수정 / 삭제</li>
    </ul>
    <input type="button" class="btn btn-primary" value="글쓰기" @click="location.href='/admin/article'" />
  </div>
</template>

<script>
export default {
};
</script>

<style>

</style>
