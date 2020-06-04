<template>
  <div class="lnbWrap">
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
export default {

};
</script>

<style scoped>
/**
 * common
 */
.lnbWrap {
  position: fixed;
  overflow: hidden;
  left: 0px;
  width: 200px;
  height: 100vh;
  background-color: #2D353C;
  transition: .2s;
}

.lnbWrap ul {
  color: #FFF;
  list-style: none;
  padding-left: 0px;
}

.lnbWrap ul li.title {
  font-size: 12px;
  font-weight: bold;
  padding: 10px 10px 10px 15px;
}

.lnbWrap ul li.title span {
  display: flex;
  flex-basis: 100%;
  align-items: center;
}
.lnbWrap ul li.title span::after {
  content: "";
  flex-grow: 1;
  background: #FFF;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 10px;
}

.lnbWrap ul li.item {
  font-size: 14px;
  padding: 10px 0px 10px 20px;
  transition: .2s;
}

.lnbWrap ul li.item:hover, .lnbWrap ul li.router-link-active:hover {
  color: #FFF;
  background-color: #608BCB;
  cursor: pointer;
  transition: .1s;
}

.lnbWrap ul li.router-link-active {
  background-color: #465461;
  color: #FFF;
  cursor: default;
}

.lnbWrap ul li.item i {
  text-align: center;
  font-size: 16px;
  width: 30px;
  margin-right: 10px;
}

/**
 * Mobile
 */
@media all and (max-width:768px) {
  .lnbWrap {
    left: -200px;
    transition: .2s;
  }
}
/**
 * Tablet & Desktop
 */
@media all and (min-width:768px) {

}
</style>
