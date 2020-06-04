<template>
  <div class="contentWrap">
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
        <div class="list">list</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
/**
 * common
 */
.functionWrap {

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
