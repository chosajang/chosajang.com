<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              회원 정보
            </slot>
          </div>

          <div class="modal-body">
            <div class="form-wrap">
              <div class="title">ID(Email)</div>
              <div class="form">
                <input type="text" placeholder="ID(Email)"/>
                <span class="error-message">errorMessage</span>
              </div>
            </div>
            <div class="form-wrap image-form">
              <div class="imagePreview"></div>
              <div>
                <label class="btn btn-primary img-btn">Upload<input type="file" class="uploadFile img" value="Upload Photo" ></label>
                <input type="button" class="btn btn-danger" value="Delete">
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Name</div>
              <div class="form">
                <input type="text" placeholder="이름"/>
                <span class="error-message">errorMessage</span>
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Title</div>
              <div class="form">
                <input type="text" placeholder="칭호"/>
                <span class="error-message">errorMessage</span>
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Password</div>
              <div class="form">
                <input type="password" placeholder="비밀번호를 입력하세요"/>
                <span class="error-message">errorMessage</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
            </slot>
            <p><button class="modal-default-button" @click="$emit('close')">OK</button></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .2s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  height: 50px;
  width: 100%;
  border-radius: 3px 3px 0 0;
  background-color: #608BCB;
  color: #FFF;
  justify-content: center;
  align-content: center;
}

.modal-body {
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
}

.modal-body .form-wrap {
  width: 340px;
  padding-top: 10px;
}

.form-wrap .title {
  font-size: 14px;
  font-weight: bold;
  color: #2D353C;
}

.image-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-form .imagePreview {
  width: 120px;
  height: 120px;
  background-position: center center;
  background:url('/img/default.png');
  background-color:#fff;
  background-size: cover;
  background-repeat:no-repeat;
  display: inline-block;
}

.image-form .img-btn {
  margin-bottom: 0px;
}

.image-form .img-btn input{
  width: 0px;height: 0px;overflow: hidden;
}

input[type=text]:focus, input[type=password]:focus {
  outline: none;
  transition: .2s;
  color: #4B8ECE;
  border-bottom: 3px solid #4B8ECE;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 8px 14px;
  margin: 4px 0;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid #2D353C;
}

input[type=password] {
  letter-spacing: 3px;
}

input[type=text].error, input[type=password].error {
  color: #FF0000;
  border-bottom: 3px solid #FF0000;
}

input[type=text].active, input[type=password].active {
  color: #4B8ECE;
  border-bottom: 3px solid #4B8ECE;
}

input::placeholder {
  color: #B6B6B6;
}

.form .error-message {
  float: left;
  color: #FF0000;
  font-size: 12px;
  font-weight: bold;
  visibility: hidden;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>