<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" v-model="search" placeholder="ID(Email) or Name"/>
    </div>
    <div class="itemWrap table-responsive">
      <!-- Item List -->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">이미지</th>
            <th scope="col">아이디</th>
            <th scope="col">이름</th>
            <th scope="col">호칭</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listItemSlice" v-bind:key="item.SEQ" @click="userInfoPop(item)">
            <th scope="row">{{ (pageNum * 10) + index + 1 }}</th>
            <td><img :src="imgUrl+item.PROFILE_IMG" onerror="this.src='/img/default.png'" /></td>
            <td>{{ item.ID }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.TITLE }}</td>
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
      <input type="button" class="btn btn-primary" value="회원생성" @click="userInfoPop(null)" />
    </div>
    <!-- use the modal component, pass in the prop -->
    <user-info v-if="showModal" @close="showModal = false" v-bind:userItem="userItem">
      <!--
        slot : header, body, footer
      -->
      <!-- <div slot="header">{{ userName }}님의 정보</div> -->
    </user-info>
  </div>
</template>

<script>
import { fetchUserList } from '@/api';
import userInfo from './userInfo.vue';

export default {
  data () {
    return {
      search: '',
      listItems: [],
      pageSize: 10,
      pageNum: 0,
      imgUrl: this.$store.state.config.apiUrl,
      showModal: false,
      userItem: []
    };
  },
  components: {
    userInfo
  },
  created () {
    const vm = this;
    fetchUserList()
      .then(response => {
        if (response.data.result) {
          vm.listItems = response.data.data;
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
      let idItems = this.listItems;
      let nameItems = this.listItems;
      idItems = idItems.filter(item => {
        return item.ID.toLowerCase().includes(search.toLowerCase());
      });
      nameItems = nameItems.filter(item => {
        return item.NAME.toLowerCase().includes(search.toLowerCase());
      });
      // Remove Duplicate
      const itemList = new Set(idItems.concat(nameItems));
      return [...itemList];
    },
    /**
     * 페이지네이션을 위한 배열 슬라이스
     */
    listItemSlice () {
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
    userInfoPop (item) {
      if (item === null) {
        item = {
          INFO_TITLE: '회원생성',
          NAME: '',
          ID: '',
          TITLE: '',
          MODE: 'create'
        };
      } else {
        item.INFO_TITLE = item.NAME + '님의 회원정보';
        item.MODE = 'modify';
      }
      // props: userItem
      this.userItem = item;
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
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

.itemWrap > .table img {
  width: 40px;
  height: 40px;
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
