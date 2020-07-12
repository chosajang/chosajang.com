<template>
  <div class="content">
    <div class="banner">
      공부하고 만들며 경험한 것을 정리하여 나누는 공간 :)
    </div>
    <div class="list">
      <div v-for="item in itemList" v-bind:key="item.SEQ" :value="item.SEQ">
        <div class="thumbnail">이미지</div>
        <div class="title">제목 : {{item.TITLE}}</div>
        <div class="info"><i class="far fa-calendar-alt"></i> {{$moment(item.ADD_DATE).format('YYYY.MM.DD')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { servicePostList } from '@/api';

export default {
  data () {
    return {
      itemList: [],
      pageSize: 10,
      pageNum: 0
    };
  },
  created () {
    const vm = this;
    servicePostList()
      .then(response => {
        if (response.data.result) {
          vm.itemList = response.data.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
}

.content > .banner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: coral;
  margin: 0 auto;
}

.content > .list {
  max-width: 900px;
  width: 900px;
  margin: 0 auto;
  background-color: cyan;
}

</style>
