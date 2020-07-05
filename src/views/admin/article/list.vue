<template>
  <div class="content">
    <div class="functionWrap">
      <!-- SelectBox -->
      <select class="form-control" v-model="selectBoard" aria-placeholder="게시판 선택">
        <option v-for="board in boardList" v-bind:key="board.SEQ">
          {{ board.NAME }}
        </option>
      </select>
    </div>
    <div class="itemWrap table-responsive">
      <!-- Item List -->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">게시물 이름</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemListSlice" v-bind:key="item.ARTICLE_SEQ">
            <th scope="row">{{ (pageNum * 10) + index + 1 }}</th>
            <td>{{ item.TITLE }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.ADD_DATE }}</td>
          </tr>
        </tbody>
      </table>
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
      <input type="button" class="btn btn-primary" value="글쓰기" />
    </div>
  </div>
</template>

<script>
import { boardList, ArticleList } from '@/api';

export default {
  components: {
  },
  data () {
    return {
      boardList: '',
      selectBoard: '',
      articleList: '',
      itemList: [],
      pageSize: 10,
      pageNum: 0
    };
  },
  created () {
    const vm = this;
    boardList()
      .then(response => {
        if (response.data.result) {
          vm.boardList = response.data.board_list;
        }
      })
      .catch(error => {
        console.log(error);
      });
    ArticleList()
      .then(response => {
        if (response.data.result) {
          vm.articleList = response.data.article_list;
          console.log(vm.articleList);
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
      // const search = (this.search).replace(/ /gi, '');
      // List Filter
      // return this.articleList.filter(item => {
      //   return item.NAME.toLowerCase().includes(search.toLowerCase());
      // });
      return this.articleList;
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
    pageMove (pageNum) {
      this.pageNum = pageNum - 1;
    },
    boardInfoPop (item) {
      if (item === null) {
        item = {
          INFO_TITLE: '게시판 생성',
          NAME: '',
          ATTACHED_FILE_YN: 'Y',
          COMMENT_YN: 'Y',
          MODE: 'create'
        };
      } else {
        item.INFO_TITLE = '[' + item.NAME + '] 정보';
        item.MODE = 'modify';
      }
      // props: boardItem
      this.boardItem = item;
      this.showModal = true;
    }
  }
};
</script>

<style>
/**
 * common
 */
.functionWrap {
  padding-top: 20px;
  width: 100%;
}

.itemWrap {
  padding-top: 20px;
}

.itemWrap > .title {
  font-size: 18px;
  font-weight: bold;
}

.itemWrap > table > thead tr, tbody tr{
  text-align: center;
}

input[type=text] {
  width: 220px;
  padding: 8px 14px;
  margin: 4px 0;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid #2D353C;
}

input[type=text]:focus {
  outline: none;
  transition: .2s;
  color: #608BCB;
  border-bottom: 3px solid #608BCB;
}

input[type=text]:focus::placeholder {
  color: #608BCB;
  transition: .2s;
}

select:focus {
  color: #4B8ECE;
}

select {
  font-size: 16px;
  font-weight: bold;
  width: 220px;
}

select.active {
  color: #4B8ECE;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {

}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {

}
</style>
