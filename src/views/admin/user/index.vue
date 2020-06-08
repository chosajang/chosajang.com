<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" placeholder="ID(Email) or Name"/>
    </div>
    <div class="itemWrap table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Title</th>
            <th scope="col">Grade</th>
            <th scope="col">Status</th>
            <th scope="col">Entry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listItems" v-bind:key="item.SEQ">
            <th scope="row">1</th>
            <td><img :src="imgUrl+item.PROFILE_IMG" onerror="this.src='/img/default.jpg'" /></td>
            <td>{{ item.ID }}</td>
            <td>{{ item.NAME }}</td>
            <td>{{ item.MEMBER_TITLE_NAME }}</td>
            <td>{{ item.MEMBER_GRADE_NAME }}</td>
            <td>{{ item.MEMBER_STATUS_NAME }}</td>
            <td>{{ item.ENTRY_DATE }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchUserList } from '@/api';

export default {
  data () {
    return {
      listItems: [],
      imgUrl: this.$store.state.config.apiUrl,
      errorImg: '/assets/default.png'
    };
  },
  created () {
    console.log(this.$store.state.config.apiUrl);
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
  methods: {
    imgUrlAlt (event) {
      console.log('imgUrlAlt');
      this.src = this.errorImg;
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
