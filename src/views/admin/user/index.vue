<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" placeholder="ID(Email) or Name"/>
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
    <div class="itemWrap">
      <div class="title">title</div>
      <div class="list">
        <ul class="item-list">
          <li v-for="item in listItems" v-bind:key="item.SEQ">
            {{ item.ID }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserList } from '@/api';

export default {
  data () {
    return {
      listItems: []
    };
  },
  created () {
    const vm = this;
    fetchUserList()
      .then(response => {
        console.log('fetUserList');
        if (response.data.result) {
          vm.listItems = response.data.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
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
  color: #45BEAC;
  border-bottom: 3px solid #45BEAC;
}

input[type=text]:focus::placeholder {
  color: #45BEAC;
  transition: .2s;
}

.item-list {
  list-style:none;
  padding-left:0px;
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
