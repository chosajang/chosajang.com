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
        <div class="flex bg-white cursor-pointer outline-none border-b py-8 hover:border-yellow-400 duration-300">
          <div class="flex-none w-32 md:w-48 mr-1 md:mr-0 flex items-center">
            <img src="/assets/images/post-thumbnail.png" class="absolute object-none object-scale-down object-center w-32 h-24 md:w-48 md:h-32" onerror="this.src='/assets/images/post-thumbnail.png'" />
          </div>
          <div class="flex-grow grid grid-flow-row grid-rows-4">
            <div class="row-span-1 text-lg md:text-2xl text-gray-800 truncate">
              블로그 개발하기 - 개발 및 운영 환경
            </div>
            <div class="row-span-2 text-sm md:text-lg truncate mt-2 text-gray-600">
              기술 블로그 운영을 하기 위해 블로그를 제작하였습니다. 이 글을 보고 누군가에게는 도움이 누군가에게는 삽질 방지를 위한 글이 되었으면 합니다.<br/>
              어떻게 개발하였는지 과정을 설명합니다!
            </div>
            <div class="row-span-1 text-sm flex items-center text-gray-400">
              <i class="far fa-calendar-alt mr-2"></i>2021-07-21
            </div>
          </div>
        </div>
        <!--// Card : ED -->

      </div>
    </div>
    <!--// Contents : ED -->
  </main>
</template>
<script>
export default {
  
}
</script>