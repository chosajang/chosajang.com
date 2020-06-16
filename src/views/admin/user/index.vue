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
            <th scope="col">Image</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Entry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listItemSlice" v-bind:key="item.SEQ" @click="showModal = true">
            <th scope="row">{{ (pageNum * 10) + index + 1 }}</th>
            <td><img :src="imgUrl+item.PROFILE_IMG" onerror="this.src='/img/default.jpg'" /></td>
            <td>{{ item.ID }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.MEMBER_TITLE_NAME }}</td>
            <td>{{ item.MEMBER_STATUS_NAME }}</td>
            <td>{{ item.ENTRY_DATE }}</td>
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
    </div>
    <!-- use the modal component, pass in the prop -->
    <user-info v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">회원 정보</h3>
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
      showModal: false
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

.itemWrap > table > tbody img {
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
