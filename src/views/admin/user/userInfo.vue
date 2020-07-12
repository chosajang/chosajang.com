<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ userInfo.INFO_TITLE }}
            </slot>
          </div>

          <div class="modal-body">
            <div class="form-wrap">
              <div class="title">ID(Email)</div>
              <div class="form">
                <input type="text" placeholder="ID(Email)" v-model="userInfo.ID" @keyup="validationID" :disabled="idDisabled === true"/>
                <span class="error-message">{{ errorMessage.id }}</span>
              </div>
            </div>
            <div class="form-wrap image-form">
              <div class="imagePreview">
                <img v-if="imagePreview" :src="imagePreview" @error="imagePreview=null"/>
              </div>
              <div class="btn-groups">
                <label class="btn btn-primary btn-image-custom">Upload<input type="file" class="uploadFile img" v-if="uploadReady" ref="fileUpload" @change="onChangeImages"></label>
                <input type="button" class="btn btn-danger btn-delete-custom" value="Delete" @click="imageDelete">
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Name</div>
              <div class="form">
                <input type="text" placeholder="이름" :class="inputClass.name" v-model="userInfo.NAME" @keyup="validationName" />
                <span class="error-message">{{ errorMessage.name }}</span>
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Title</div>
              <div class="form">
                <input type="text" placeholder="호칭" v-model="userInfo.TITLE" />
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">Password</div>
              <div class="form">
                <input type="password" placeholder="비밀번호" :class="inputClass.password" v-model="password" @keyup="validationPassword" />
                <span class="error-message">{{ errorMessage.password }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <input type="button" class="btn btn-primary" value="Save" @click="userSave">
              <input type="button" class="btn btn-secondary" value="Cancel" @click="formReset">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { validationCheck } from '@/utils/common.js';
import { userUpdate, userCreate } from '@/api';

export default {
  props: ['userItem'],
  data () {
    return {
      userInfo: this.userItem,
      password: '',
      uploadReady: true,
      imagePreview: null,
      profile_file: null,
      tempInfo: {
        NAME: '',
        ID: '',
        TITLE: '',
        PROFILE_IMG: ''
      },
      errorMessage: {
        id: '',
        password: '',
        name: '',
        title: ''
      },
      inputClass: {
        id: '',
        password: '',
        name: '',
        title: ''
      }
    };
  },
  created () {
    if (this.userItem.MODE === 'modify') {
      this.tempInfo.NAME = this.userItem.NAME;
      this.tempInfo.ID = this.userItem.ID;
      this.tempInfo.TITLE = this.userItem.TITLE;
      this.tempInfo.PROFILE_IMG = this.userInfo.PROFILE_IMG;
      // 프로필 이미지 출력
      this.imagePreview = this.$store.state.config.apiUrl + this.tempInfo.PROFILE_IMG;
      this.idDisabled = true;
    } else {
      this.idDisabled = false;
    }
  },
  methods: {
    onChangeImages (e) {
      // TODO : 이미지 파일만(jpg, gif, png) 업로드 될 수 있도록 수정
      const file = e.target.files[0];
      this.profile_file = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    imageDelete () {
      this.imagePreview = null;
      this.profile_file = null;
      this.uploadReady = false;
      this.$nextTick(() => {
        this.uploadReady = true;
      });
    },
    validationID () {
      validationCheck(this.$store.state.VALID.EMAIL, this.userInfo.ID, this);
    },
    validationName () {
      validationCheck(this.$store.state.VALID.TEXT, this.userInfo.NAME, this);
    },
    validationPassword () {
      validationCheck(this.$store.state.VALID.PASSWORD, this.password, this, true);
    },
    userSave () {
      if (this.userItem.MODE === 'create') {
        this.userCreate();
      } else {
        this.userUpdate();
      }
    },
    userCreate () {
      const formData = new FormData();
      let mandatoryCheck = false;
      if (validationCheck(this.$store.state.VALID.EMAIL, this.userInfo.ID, this) && validationCheck(this.$store.state.VALID.TEXT, this.userInfo.NAME, this) && validationCheck(this.$store.state.VALID.PASSWORD, this.password, this)) {
        formData.append('id', this.userInfo.ID);
        formData.append('name', this.userInfo.NAME);
        formData.append('new_password', this.password);
        mandatoryCheck = true;
      }
      if (this.profile_file !== null) {
        formData.append('profile_file', this.profile_file);
      }
      formData.append('title', this.userInfo.TITLE);

      // eslint-disable-next-line prefer-const
      // for (let key of formData.entries()) {
      //   console.log(`${key}`);
      // }
      if (mandatoryCheck === true) {
        this.$emit('close');
        userCreate(formData)
          .then(response => {
            if (response.data.result === true) {
              // const userInfo = response.data.data;
              // 결과메세지
              this.$swal({
                title: '회원 생성',
                text: response.data.message,
                icon: 'success'
              });
            } else {
              // 에러가 난 경우, 기존 입력 정보 삭제 후 원래 정보값을 되돌릴 것
              this.formReset();
              this.$swal({
                title: '장애 발생!',
                text: response.data.message,
                icon: 'error'
              });
            }
          })
          .catch(error => {
            this.formReset();
            this.$swal({
              title: '장애 발생!',
              text: error,
              icon: 'error'
            });
          });
      }
    },
    userUpdate () {
      const formData = new FormData();
      let mandatoryCheck = false;
      if (validationCheck(this.$store.state.VALID.TEXT, this.userInfo.NAME, this)) {
        formData.append('name', this.userInfo.NAME);
        mandatoryCheck = true;
      }
      if (this.profile_file !== null) {
        formData.append('profile_file', this.profile_file);
      }
      if (this.password.length > 0) {
        if (validationCheck(this.$store.state.VALID.PASSWORD, this.password, this)) {
          formData.append('new_password', this.password);
        } else {
          mandatoryCheck = false;
        }
      }
      formData.append('id', this.userInfo.ID);
      formData.append('req_member_seq', this.userInfo.SEQ);
      formData.append('title', this.userInfo.TITLE);

      if (mandatoryCheck === true) {
        this.$emit('close');
        userUpdate(formData)
          .then(response => {
            if (response.data.result === true) {
              const userInfo = response.data.data;
              if (userInfo.PROFILE_FILE_INFO !== null) {
                this.userInfo.PROFILE_IMG = userInfo.PROFILE_FILE_INFO.PATH + userInfo.PROFILE_FILE_INFO.PHYSICAL_NAME;
              }
              // 결과메세지
              this.$swal({
                title: '회원정보수정',
                text: response.data.message,
                icon: 'success'
              });
            } else {
              // 에러가 난 경우, 기존 입력 정보 삭제 후 원래 정보값을 되돌릴 것
              this.formReset();
              this.$swal({
                title: '장애 발생!',
                text: response.data.message,
                icon: 'error'
              });
            }
          })
          .catch(error => {
            this.formReset();
            this.$swal({
              title: '장애 발생!',
              text: error,
              icon: 'error'
            });
          });
      }
    },
    formReset () {
      this.userItem.NAME = this.tempInfo.NAME;
      this.userItem.ID = this.tempInfo.ID;
      this.userItem.TITLE = this.tempInfo.TITLE;
      this.userInfo.PROFILE_IMG = this.tempInfo.PROFILE_IMG;
      this.$emit('close');
    }
  }
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
  padding: 30px 30px 0 30px;
}

.modal-body .form-wrap {
  width: 340px;
  height: 100px;
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
  height: 190px !important;
}

.image-form .imagePreview {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-position: center center;
  background-color:#f3f3f3;
  background-size: cover;
  background-repeat:no-repeat;
  display: inline-block;
}

.image-form .imagePreview img {
  width: 120px;
  height: 120px;
  background-color:#FFF;
  border-radius: 5px;
}

.image-form .btn-groups {
  margin-top: 10px;
}

.image-form .btn-image-custom {
  margin-bottom: 0px;
}

.image-form .btn-image-custom input{
  width: 0px;height: 0px;overflow: hidden;
}

.image-form .btn-delete-custom {
  height: 41px;
  margin-left: 10px;
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
  height: 20px;
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
