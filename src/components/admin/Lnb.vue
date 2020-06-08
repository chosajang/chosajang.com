<template>
  <div class="lnb">
    <div class="profile">
      <div class="img"><img :src="userInfo.img"/></div>
      <div class="info">
        <div class="name">{{ userInfo.name }}</div>
        <div class="title">{{ userInfo.title }}</div>
      </div>
    </div>
    <ul>
      <li class="title"><span>Management</span></li>
      <router-link to="/admin/user" tag="li" class="item"><i class="fas fa-user-edit"></i>User</router-link>
      <router-link to="/admin/group" tag="li" class="item"><i class="fas fa-users-cog"></i>Group</router-link>
      <li class="title"><span>Blog</span></li>
      <router-link to="/admin/board" tag="li" class="item"><i class="fas fa-clipboard-list"></i>Board</router-link>
      <router-link to="/admin/post" tag="li" class="item"><i class="fas fa-pencil-alt"></i>Post</router-link>
      <li class="title"><span>Project</span></li>
    </ul>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/common.js';

export default {
  data () {
    return {
      userInfo: {
        img: '',
        name: '',
        title: ''
      }
    };
  },
  created () {
    const userInfo = getUserInfo();
    this.userInfo.img = this.$store.state.config.apiUrl + userInfo.PROFILE_FILE_INFO.PATH + userInfo.PROFILE_FILE_INFO.PHYSICAL_NAME;
    this.userInfo.name = userInfo.NAME;
    this.userInfo.title = userInfo.MEMBER_TITLE_NAME;
  }
};
</script>

<style scoped>
/**
 * common
 */
.lnb {
  width: 200px;
  color: #FFF;
  background-color: #2D353C;
}

.lnb .profile {
  display: inline-flex;
  width: 100%;
  height: 60px;
  background-color: #1A2229;
}

.lnb .profile .img img {
  width: 60px;
  height: 60px;
}

.lnb .profile .info div {
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lnb .profile .info .name {
  padding: 8px 0 0 10px;
  font-size: 14px;
}

.lnb .profile .info .title {
  padding: 4px 0 0 10px;
  font-size: 12px;
  color: #C2C2C2;
}

.lnb ul {
  list-style: none;
  padding-left: 0px;
}

.lnb ul li.title {
  font-size: 12px;
  font-weight: bold;
  padding: 10px 10px 10px 15px;
  color: #A8ACB1;
}

.lnb ul li.title span {
  display: flex;
  flex-basis: 100%;
  align-items: center;
}
.lnb ul li.title span::after {
  content: "";
  flex-grow: 1;
  background: #A8ACB1;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 10px;
}

.lnb ul li.item {
  font-size: 14px;
  padding: 10px 0px 10px 20px;
  transition: .2s;
}

.lnb ul li.item:hover, .lnb ul li.router-link-active:hover {
  background-color: #608BCB;
  cursor: pointer;
  transition: .1s;
}

.lnb ul li.router-link-active {
  background-color: #465461;
  cursor: default;
}

.lnb ul li.item i {
  text-align: center;
  font-size: 16px;
  width: 30px;
  margin-right: 10px;
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
