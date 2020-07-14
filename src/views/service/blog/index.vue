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
          <div class="preview">{{item.CONTENT_PREVIEW}}</div>
          <div class="other"><i class="far fa-calendar-alt"></i> {{$moment(item.ADD_DATE).format('YYYY.MM.DD')}}</div>
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
  height: 300px;
  background-color: coral;
  margin: 0 auto;
  font-size: 20px;
}

.content > .list {
  max-width: 900px;
  width: 100%;
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
  width: 20%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #EEE;
}

.post > .text {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.text > .title {
  font-size: 22px;
  font-weight: bold;
}

.text > .preview {
  font-size: 16px;
  margin: 6px 0;
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap:break-word;
}

.text > .other {
  font-size: 16px;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .post > .list {
    width: 100%;
  }

  .text > .title {
    font-size: 18px;
  }

  .text > .preview {
    font-size: 12px;
    -webkit-line-clamp: 3;
  }

  .text > .other {
    font-size: 12px;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {
}
</style>
