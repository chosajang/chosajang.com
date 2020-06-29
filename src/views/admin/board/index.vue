<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" v-model="search" placeholder="Board Name"/>
    </div>
    <div class="itemWrap table-responsive">
      <!-- Item List -->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">게시판 이름</th>
            <th scope="col">첨부파일사용</th>
            <th scope="col">댓글사용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemListSlice" v-bind:key="item.SEQ" @click="boardInfoPop(item)">
            <th scope="row">{{ (pageNum * 10) + index + 1 }}</th>
            <td>{{ item.NAME }}</td>
            <td>{{ item.ATTACHED_FILE_YN }}</td>
            <td>{{ item.COMMENT_YN }}</td>
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
      <input type="button" class="btn btn-primary" value="게시판 생성" @click="boardInfoPop(null)" />
    </div>
    <!-- use the modal component, pass in the prop -->
    <board-info v-if="showModal" @close="showModal = false" v-bind:boardItem="boardItem" v-bind:itemList="itemList">
      <!--
        slot : header, body, footer
      -->
      <!-- <div slot="header">{{ userName }}님의 정보</div> -->
    </board-info>
  </div>
</template>

<script>
import { boardList } from '@/api';
import boardInfo from './boardInfo';

export default {
  components: {
    boardInfo
  },
  data () {
    return {
      search: '',
      itemList: [],
      pageSize: 10,
      pageNum: 0,
      showModal: false,
      boardItem: []
    };
  },
  created () {
    const vm = this;
    boardList()
      .then(response => {
        if (response.data.result) {
          vm.itemList = response.data.board_list;
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
      const search = (this.search).replace(/ /gi, '');
      // List Filter
      return this.itemList.filter(item => {
        return item.NAME.toLowerCase().includes(search.toLowerCase());
      });
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
