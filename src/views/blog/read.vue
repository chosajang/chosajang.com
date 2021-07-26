<template>
  <main class="w-full">

    <!-- Contents : ST -->
    <div class="container m-auto max-w-screen-lg min-h-min px-1 md:px-4 my-10 md:my-14">
      
      <!-- 제목 -->
      <div class="mb-10 mx-2 md:mx-0">
        <div class="text-2xl md:text-3xl text-gray-800 border-b border-gray-100 pb-4 mb-4">블로그 제작하기 - 개발 및 운영 환경</div>
        <div class="text-gray-400 text-xs md:text-sm"><i class="far fa-calendar-alt mr-2"></i>2021-07-21</div>
      </div>
      
      <!-- 내용 -->
      <div class="mx-2 md:mx-0">
        내용
        <viewer v-if="content != null" :initialValue="content" height="500px" />
      </div>

    </div>
    <!-- Contents : ED -->
  </main>
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';
export default {
  components: {
    viewer: Viewer
  },
  data() {
    return {
      content : '# H1 TEST ##2 H2 TEST'
    }
  },
  mounted() {
    this.content = "# 헤더 ## 헤더2a"
  },
}
</script>
