<template>
  <main class="w-full">

    <!-- Contents : ST -->
    <div class="container m-auto max-w-screen-lg min-h-min px-1 md:px-4 my-10 md:my-14">
      
      <!-- 제목 -->
      <div class="mb-10 mx-2 md:mx-0">
        <div class="text-2xl md:text-3xl text-gray-800 border-b border-gray-100 pb-4 mb-4">{{ title }}</div>
        <div class="text-gray-400 text-xs md:text-sm"><i class="far fa-calendar-alt mr-2"></i>{{ created_at }}</div>
      </div>
      
      <!-- 내용 -->
      <div class="mx-2 md:mx-0">
        <viewer v-if="contents != null" :initialValue="contents" />
      </div>

      <!-- 작성자 -->

    </div>
    <!-- Contents : ED -->
  </main>
</template>
<script>
import { apiArticleRead } from '@/api'

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';

export default {
  components: {
    viewer: Viewer
  },
  data() {
    return {
      article_seq: this.$route.params.article_seq,
      title: '',
      created_at: '',
      contents : null
    }
  },
  mounted() {
    apiArticleRead(this.article_seq)
    .then(res => {
      console.log('res', res)
      if( res.status == 200 ) {
        const article = res.data.article
        this.title = article.title
        this.created_at = article.created_at
        this.contents = article.contents
      } else {
        this.$swal({
          title: '정보 없음',
          html: '요청한 정보가 존재하지 않습니다<br/>목록으로 돌아갑니다',
          icon: 'error'
        }).then(() => {
          this.$router.push({ path: '/blog' })
        })
      }
    })
  },
}
</script>
