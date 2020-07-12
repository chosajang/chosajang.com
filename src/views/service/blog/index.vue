<template>
  <div class="content">
    <div class="banner">
      공부하고 만들며 경험한 것을 정리하여 나누는 공간 :)
    </div>
    <div class="list">
      <div class="post" v-for="item in itemList" v-bind:key="item.SEQ" :value="item.SEQ">
        <div class="image">이미지</div>
        <div class="text">
          <div class="title">{{item.TITLE}}</div>
          <div class="summary">내용 요약본이 여기에 출력됩니다 최대 2줄까지를 기획중이며, 글이 넘어가는 경우 마지막에 ...으로 표시하여 화면이 깨지는 것을 방지할 수 있도록 합니다</div>
          <div class="info"><i class="far fa-calendar-alt"></i> {{$moment(item.ADD_DATE).format('YYYY.MM.DD')}}</div>
        </div>
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

.content > .list > .post {
  display: flex;
  justify-content: start;
  margin: 20px 0px 20px 0px;
  height: 140px;
  background-color: #FFF;
}

.post > .image {
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post > .text {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0 10px 0;
}

.text > .title {
  font-size: 22px;
}

.text > .summary {
  font-size: 16px;
  margin: 6px 0;
}

</style>
