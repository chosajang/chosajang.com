<template>
  <header class="sticky top-0 z-10 flex flex-none w-full h-16 top-0 z-50 bg-white border-b border-gray-200">
    <div class="flex flex-grow items-center z-10">
      <!--// mobile menu icon -->
      <div id="mobile-menu-btn" class="hidden flex flex-none px-4 items-center md:hidden cursor-pointer text-gray-600">
        <i class="fas fa-bars text-2xl"></i>
      </div>
      <a href="/" class="flex ml-4 md:ml-10 text-xl text-black items-center font-normal tracking-widest uppercase focus:outline-none focus:shadow-outline">
        조사장 블로그
      </a>
    </div>
    <!--// search menu -->
    <div class="flex flex-none items-center px-2 md:px-4 md:mr-4 z-11 relative min-w-min">
      <input v-model="search" v-on:keyup.enter="blogSearch" class="w-40 md:w-48 h-10 pl-4 pr-8 py-1 text-lg md:text-xl text-gray-700 font-medium outline-none border-transparent border-b-2 border-gray-200 hover:border-blue-300 focus:border-blue-300 focus:bg-white duration-300" type="text" maxlength=20 placeholder="검색">
      <span v-on:click="blogSearch" class="absolute right-4 md:right-8 text-gray-600 cursor-pointer"><i class="fas fa-search text-2xl"></i></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    
  },
  methods: {
    blogSearch() {
      this.$EventBus.$emit('blogSearch', this.search)
    }
  }
};
</script>
