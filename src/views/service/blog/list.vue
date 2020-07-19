<template>
  <div class="content">
    <div class="banner">
      <h3>기술과 경험을 정리하여 나누는 공간 :)</h3>
    </div>
    <div class="list">
      <div class="post" v-for="item in itemList" v-bind:key="item.ARTICLE_SEQ" :value="item.ARTICLE_SEQ" @click="postRead(item.ARTICLE_SEQ)">
        <div class="image">
          <img src="" onerror="this.src='/img/blog-post-default.png'">
        </div>
        <div class="text">
          <div class="title">{{item.TITLE}}</div>
          <div class="preview">{{item.CONTENT_PREVIEW}}</div>
          <div class="other"><i class="far fa-calendar-alt"></i> {{$moment(item.ADD_DATE).format('YYYY.MM.DD')}}</div>
        </div>
      </div>
      <div class="pagination-cutstom">
        <!-- Page Navigation -->
        <nav aria-label="Page navigation">
          <paginate
            :pageCount="pageCount"
            :clickHandler="pageMove"
            :containerClass="'pagination justify-content-center'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'">
          </paginate>
        </nav>
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
  },
  computed: {
    pageCount () {
      const listLeng = this.listFiltered.length;
      const listSize = this.pageSize;
      let page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) {
        page += 1;
      }
      return page;
    },
    /**
     * 회원 ID,이름 검색 시 필터 처리
     */
    listFiltered () {
      // const boardSeq = this.selectBoard;
      // List Filter
      // return this.itemList.filter(item => {
      //   return item.BOARD_SEQ.includes(boardSeq);
      // });
      return this.itemList;
    },
    /**
     * 페이지네이션을 위한 배열 슬라이스
     */
    itemListSlice () {
      // Paginated(Item Slice)
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.listFiltered.slice(start, end);
    }
  },
  methods: {
    postRead (postSeq) {
      this.$router.push({ path: '/blog/' + postSeq });
    },
    pageMove (pageNum) {
      this.pageNum = pageNum - 1;
    }
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
  margin: 0 auto;
  background-image: url('/img/blog-banner.png');
  background-repeat: no-repeat;
  background-color: #71cdff;
  background-position: center 30%;
}

.content > .banner > h3, h4 {
  color: #FFF;
  background-color: #608BCB;
}

.content > .list {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
}

.content > .list > .post {
  display: flex;
  justify-content: start;
  padding: 30px 0px 30px 0px;
  background-color: #FFF;
  cursor: pointer;
  border-bottom: 1px solid #EEE;
  transition: 0.3s;
}

.content > .list > .post:hover {
  border-bottom: 1px solid #608BCB;
  transition: 0.3s;
}

.post > .image {
  width: 20%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post > .image > img {
  width: 90%;
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

.content > .list > .pagination-cutstom {
  margin-top: 40px;
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
