<template>
  <main class="w-full">

    <!-- Contents : ST -->
    <div class="container m-auto max-w-screen-lg min-h-min px-1 md:px-4 my-10 md:my-14">
      
      <!-- 제목 -->
      <div class="mb-10 mx-2 md:mx-0">
        <div class="text-2xl md:text-3xl text-gray-800 border-b border-gray-100 pb-4 mb-4">{{ article.title }}</div>
        <div class="text-gray-400 text-xs md:text-sm">
          <i class="far fa-calendar-alt mr-2"></i>
          <span v-if="article.created_at == article.updated_at">{{ article.created_at }}에 작성하였습니다.</span>
          <span v-else>{{ article.created_at }}에 발행, {{ article.updated_at }}에 마지막으로 수정하였습니다.</span>
        </div>
      </div>
      
      <!-- 내용 -->
      <div class="mx-2 md:mx-0">
        <!-- 게시물 내용 -->
        <viewer 
          v-if="article.contents != null"
          :initialValue="article.contents"
          :options="tuiOptions"
        />
        <!-- 업데이트 내역 -->
        <!-- <p class="mt-10 mr-4 text-right text-sm text-gray-500">이 글은 {{ article.updated_at }}에 수정했습니다.</p> -->
        <!-- 목록 버튼 -->
        <div class="grid grid-cols-1 items-center my-6">
          <div class="col-span-1 grid justify-items-end">
            <div>
              <input type="button" value="목록" v-on:click="goList" class="rounded bg-gray-500 py-2 px-6 cursor-pointer text-white text-xl w-28 hover:bg-gray-600">
            </div>
          </div>
        </div>
      </div>

      <!-- 작성자 -->
      <div class="flex border-t border-b mt-10 py-6 md:py-10">
        <div class="flex-none flex items-center ml-6 md:ml-10 w-16 md:w-20 mr-1 md:mr-0">
          <img :src="article.user_image_url" class="absolute object-none object-scale-down object-center rounded-full w-16 h-16 md:w-20 md:h-20" onerror="this.src='/assets/images/user.png'" />
        </div>
        <div class="flex-grow grid grid-flow-row grid-rows-2 ml-6 md:ml-10">
          <div class="row-span-1 text-lg md:text-xl">
            {{ article.user_name }}
            <span class="text-xs text-gray-400 mx-2 align-middle">|</span>
            {{ article.user_nickname }}</div>
          <div class="row-span-1 text-gray-500 text-base md:text-lg">{{ article.user_comment }}</div>
        </div>
      </div>

      <!-- 댓글 영역 -->
      <div class="mt-10">
        <Disqus />
      </div>

    </div>
    <!-- Contents : ED -->
  </main>
</template>
<script>
import { apiArticleRead } from '@/api'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Viewer } from '@toast-ui/vue-editor'

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs'
import 'prismjs/components/prism-clojure.js'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import { Disqus } from 'vue-disqus'

export default {
  components: {
    viewer: Viewer,
    Disqus
  },
  data() {
    return {
      article_seq: this.$route.params.article_seq,
      article: {
        contents: null
      },
      tuiOptions: {
        plugins: [
          [ codeSyntaxHighlight, { highlighter: Prism } ]
        ],
        linkAttribute : {
          target: '_blank'
        },
      }
    }
  },
  metaInfo() {
    const title = this.article.title
    const description = this.article.description
    const user_name = `${this.article.user_name}(${this.article.user_id})`
    const thumbnail_url = this.article.thumbnail_url
    const current_url = `${process.env.VUE_APP_SERVICE_URL}/blog/${this.article_seq}`
    return {
      title: title,
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name : 'author',
          content : user_name
        },
        {
          name : 'og:url',
          content: current_url
        },
        {
          name : 'og:title',
          content: title
        },
        {
          name : 'og:description',
          content: description
        },
        {
          vmid: 'og:image',
          name: 'og:image',
          content : thumbnail_url
        }
      ]
    }
  },
  methods: {
    goList() {
      this.$router.push({ path: '/blog' })
    }
  },
  mounted() {
    apiArticleRead(this.article_seq)
    .then(res => {
      if( res.status == 200 ) {
        this.article = res.data.article
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
<style scoped>
div >>> .toastui-editor-contents{
  font-size: 16px;
}

div >>> .toastui-editor-contents img {
  margin: 0px auto;
  border: 1px solid #1F2937;
}

div >>> .toastui-editor-contents table {
  margin: 0px auto;
}

div >>> .toastui-editor-contents blockquote {
  border-left: 4px solid #60A5FA;
  padding: 6px 16px;
}

div >>> .toastui-editor-contents a {
  text-decoration: none;
}

div >>> .toastui-editor-contents pre {
  overflow-x: auto;
}
</style>