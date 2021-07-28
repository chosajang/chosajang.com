<template>
  <main class="w-full">
    <!--// Banner : ST -->
    <div class="h-40 md:h-72 bg-blue-400 m-auto grid items-center justify-center relative overflow-hidden bg-no-repeat bg-center" style="background-image: url('/assets/images/blog-banner.png')">
      <div class="py-2 px-4 bg-white opacity-80 z-10">
        <p class="text-xl md:text-2xl">기술과 경험을 정리하여 공유합니다 :)</p>
      </div>
    </div>
    <!--// Banner : ED -->
    
    <!--// Contents : ST -->
    <div class="container m-auto max-w-screen-lg min-h-min px-1 md:px-4 my-10 md:my-14">
      <div class="grid grid-flow-row">

        <!--// Card : ST -->
        <router-link :to="'/blog/'+item.article_seq" v-for="(item) in listItemSlice" v-bind:key="item.SEQ" class="flex bg-white cursor-pointer outline-none border-b py-8 hover:border-blue-300 duration-300">
          <div class="flex-none w-32 md:w-48 mr-1 md:mr-0 flex items-center">
            <img :src="item.thumbnail_url" class="absolute object-none object-scale-down object-center w-32 h-24 md:w-48 md:h-32" onerror="this.src='/assets/images/post-thumbnail.png'" />
          </div>
          <div class="flex-grow grid grid-flow-row grid-rows-4">
            <div class="row-span-1 text-lg md:text-2xl text-gray-800 truncate">
              {{ item.title }}
            </div>
            <div class="row-span-2 text-sm md:text-lg truncate mt-2 text-gray-600">
              {{ item.description }}
            </div>
            <div class="row-span-1 text-sm flex items-center text-gray-400">
              <i class="far fa-calendar-alt mr-2"></i>{{ item.created_at }}
            </div>
          </div>
        </router-link>
        <!--// Card : ED -->

        <!--// Pagination : ST -->
        <div class="flex justify-center mt-10">
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
      pageSize: 5,
      pageRange: 3,
      pageNum: 0,
      search:"",
    }
  },
  methods: {
    pageMove (pageNum) {
      this.pageNum = pageNum - 1;
    },
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
      const search = (this.search).replace(/ /gi, '')
      // List Filter
      let titleItems = this.articleList
      titleItems = titleItems.filter(item => {
        return item.title.toLowerCase().includes(search.toLowerCase())
      });
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
