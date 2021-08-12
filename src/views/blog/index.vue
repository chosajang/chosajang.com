<template>
  <main class="w-full">
    <!--// Banner : ST -->
    <div class="h-40 md:h-72 m-auto grid items-center justify-center relative overflow-hidden bg-no-repeat bg-center" style="background-image: url('/assets/images/blog-banner.png'); background-color:#71cdff;">
      <div v-if="search == ''" class="py-2 px-4 bg-white opacity-80 z-10">
        <p class="text-xl md:text-2xl">공부하고 알게된 내용들을 정리하여 공유합니다.</p>
      </div>
      <div v-if="search != ''" class="py-2 px-4 bg-white z-10">
        <p class="text-3xl text-bold text-indigo-700 md:text-4xl">검색어 : {{ search }}</p>
      </div>
    </div>
    <!--// Banner : ED -->
    
    <!--// Contents : ST -->
    <div class="container m-auto max-w-screen-lg min-h-min px-1 md:px-4 my-10 md:my-14">
      <div class="grid grid-flow-row">

        <!-- 게시물 또는 검색 결과가 없을 경우 -->
        <div v-if="listFiltered.length == 0" class="bg-white outline-none py-10 text-center text-xl text-gray-700">
          <p v-if="search == ''">게시물이 없습니다</p>
          <p v-if="search != ''"><span class="text-blue-600 text-2xl">"{{ search }}"</span>에 대한 검색 결과가 없습니다</p>
        </div>

        <!--// Card : ST -->
        <router-link :to="'/blog/'+item.article_seq" v-for="(item) in listItemSlice" v-bind:key="item.SEQ" class="flex bg-white cursor-pointer outline-none border-b py-8 hover:border-blue-300 duration-300">
          <div class="flex-none w-32 md:w-48 mr-1 md:mr-0 flex items-center">
            <img :src="item.thumbnail_url" class="absolute object-none object-scale-down object-center w-32 h-24 md:w-48 md:h-32" onerror="this.src='/assets/images/post-thumbnail.png'" />
          </div>
          <div class="flex-grow grid grid-flow-row grid-rows-4 ml-4">
            <div class="row-span-1 text-lg md:text-2xl text-gray-800 truncate">
              {{ item.title }}
            </div>
            <div v-html="blogDescription(item.description)" class="row-span-2 text-sm md:text-lg truncate mt-2 text-gray-600"></div>
            <div class="row-span-1 text-sm flex items-center text-gray-400">
              <i class="far fa-calendar-alt mr-2"></i>
              <span v-if="item.created_at == item.updated_at">{{ item.created_at }} 발행</span>
              <span v-else>{{ item.updated_at }} 수정</span>
            </div>
          </div>
        </router-link>
        <!--// Card : ED -->

        <!--// Pagination : ST -->
        <div v-if="paginateRender" class="flex justify-center mt-10">
          <paginate
            :pageCount="pageCount"
            :clickHandler="pageMove"
            :containerClass="'flex text-sm text-gray-600'"
            :prev-class="'mr-3 py-2'"
            :prev-link-class="'py-2 px-3 rounded-lg hover:bg-gray-200'"
            :page-class="'mx-1 py-2'"
            :page-link-class="'py-2 px-3 font-bold rounded-lg hover:bg-blue-500 hover:text-gray-100'"
            :next-class="'ml-3 py-2'"
            :next-link-class="'py-2 px-3 rounded-lg hover:bg-gray-200'"
            :active-class="'font-bold text-gray-100 bg-blue-500 rounded-lg'" >
          </paginate>
        </div><!--// Pagination : ED -->

      </div>
    </div>
    <!--// Contents : ED -->
  </main>
</template>
<script>
import { apiArticleList } from '@/api'

export default {
  name: 'articleList',
  data() {
    return {
      articleList: [],
      pageSize: 10,
      pageRange: 3,
      pageNum: 0,
      search: this.$route.query.search == undefined ? '' : this.$route.query.search,
      paginateRender: true
    }
  },
  metaInfo() {
    const current_url = process.env.VUE_APP_SERVICE_URL
    const thumbnail_url = `${process.env.VUE_APP_SERVICE_URL}/assets/images/blog-banner-thumbnail.png`
    return {
      title: '조사장 블로그',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          property : 'author',
          content : '조사장(chosajang)'
        },
        {
          property : 'og:type',
          content : 'website'
        },
        {
          property : 'og:url',
          content: current_url
        },
        {
          property : 'og:title',
          content: '조사장 블로그'
        },
        {
          property : 'og:description',
          content: '조사장 블로그 목록'
        },
        {
          property : 'og:image',
          content : thumbnail_url
        }
      ]
    }
  },
  methods: {
    pageMove (pageNum) {
      this.pageNum = pageNum - 1;
    },
    blogDescription(str) {    
      return String(str).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    blogSearch(search) {
      this.search = search
    }
  },
  created() {
    apiArticleList()
    .then(res => {
      const apiData = res.data
      this.articleList = apiData.articleList
    })
    .catch(error => {
      console.log(error)
    })
  },
  mounted() {
    this.$EventBus.$on('blogSearch', this.blogSearch)
  },
  computed: {
    /**
     * 페이지 랜더링 및 페이지네이트용 배열 자르기
     */
    listItemSlice () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      return this.listFiltered.slice(start, end)
    },
    /**
     * 회원 ID,이름 검색 시 필터 처리
     */
    listFiltered () {
      // const search = (this.search).replace(/ /gi, '')
      const search = this.search
      // List Filter
      let titleItems = this.articleList
      titleItems = titleItems.filter(item => {
        return item.title.toLowerCase().includes(search.toLowerCase())
      });
      // 페이지네이트 출력여부
      if( titleItems.length <= this.pageSize ){
        this.paginateRender = false
      }
      return titleItems
    },
    pageCount () {
      const listLength = this.listFiltered.length
      const pageSize = this.pageSize
      let page = Math.ceil(listLength / pageSize)
      return page
    },
  }
}
</script>
