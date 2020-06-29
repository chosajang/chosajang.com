<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ boardInfo.INFO_TITLE }}
            </slot>
          </div>

          <div class="modal-body">
            <div class="form-wrap">
              <div class="title">게시판 이름</div>
              <div class="form">
                <input type="text" placeholder="게시판 이름" :class="inputClass.name" v-model="boardInfo.NAME" @keyup="validationName" />
                <span class="error-message">{{ errorMessage.name }}</span>
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">첨부파일사용</div>
              <div class="form">
                <select class="form-control" v-model="boardInfo.ATTACHED_FILE_YN">
                  <option value="Y">사용(Y)</option>
                  <option value="N">미사용(N)</option>
                </select>
              </div>
            </div>
            <div class="form-wrap">
              <div class="title">댓글사용</div>
              <div class="form">
                <select class="form-control" v-model="boardInfo.COMMENT_YN">
                  <option value="Y">사용(Y)</option>
                  <option value="N">미사용(N)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <input type="button" class="btn btn-primary" value="Save" @click="boardSave">
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
import { boardUpdate } from '@/api';

export default {
  props: ['boardItem'],
  data () {
    return {
      infoType: '',
      idInputObj: false,
      boardInfo: this.boardItem,
      tempInfo: {
        NAME: '',
        ATTACHED_FILE_YN: '',
        COMMENT_YN: ''
      },
      errorMessage: {
        name: ''
      },
      inputClass: {
        name: ''
      }
    };
  },
  created () {
    if (this.boardItem.MODE === 'modify') {
      // 수정 취소 시, 롤백 자료
      this.tempInfo.NAME = this.boardItem.NAME;
      this.tempInfo.ATTACHED_FILE_YN = this.boardItem.ATTACHED_FILE_YN;
      this.tempInfo.COMMENT_YN = this.boardItem.COMMENT_YN;
    }
  },
  methods: {
    validationName () {
      validationCheck(this.$store.state.VALID.TEXT, this.boardInfo.NAME, this);
    },
    boardSave () {
      if (this.boardItem.MODE === 'create') {
        this.boardCreate();
      } else {
        this.boardModify();
      }
    },
    boardCreate () {
      const formData = new FormData();
      let mandatoryCheck = false;
      if (validationCheck(this.$store.state.VALID.EMAIL, this.boardInfo.ID, this) && validationCheck(this.$store.state.VALID.TEXT, this.boardInfo.NAME, this) && validationCheck(this.$store.state.VALID.PASSWORD, this.password, this)) {
        formData.append('id', this.boardInfo.ID);
        formData.append('name', this.boardInfo.NAME);
        formData.append('new_password', this.password);
        mandatoryCheck = true;
      }
      if (this.profile_file !== null) {
        formData.append('profile_file', this.profile_file);
      }
      formData.append('title', this.boardInfo.TITLE);

      // eslint-disable-next-line prefer-const
      // for (let key of formData.entries()) {
      //   console.log(`${key}`);
      // }
      if (mandatoryCheck === true) {
        this.$emit('close');
        // boardCreate(formData)
        //   .then(response => {
        //     if (response.data.result === true) {
        //       // const boardInfo = response.data.data;
        //       // 결과메세지
        //       this.$swal({
        //         title: '회원 생성',
        //         text: response.data.message,
        //         icon: 'success'
        //       });
        //     } else {
        //       // 에러가 난 경우, 기존 입력 정보 삭제 후 원래 정보값을 되돌릴 것
        //       this.formReset();
        //       this.$swal({
        //         title: '장애 발생!',
        //         text: response.data.message,
        //         icon: 'error'
        //       });
        //     }
        //   })
        //   .catch(error => {
        //     this.formReset();
        //     this.$swal({
        //       title: '장애 발생!',
        //       text: error,
        //       icon: 'error'
        //     });
        //   });
      }
    },
    boardModify () {
      const formData = new FormData();
      let mandatoryCheck = false;
      if (validationCheck(this.$store.state.VALID.TEXT, this.boardInfo.NAME, this)) {
        formData.append('name', this.boardInfo.NAME);
        mandatoryCheck = true;
      }
      formData.append('board_seq', this.boardInfo.SEQ);
      formData.append('attached_file_yn', this.boardInfo.ATTACHED_FILE_YN);
      formData.append('comment_yn', this.boardInfo.COMMENT_YN);

      // eslint-disable-next-line prefer-const
      // for (let key of formData.entries()) {
      //   console.log(`${key}`);
      // }

      if (mandatoryCheck === true) {
        this.$emit('close');
        boardUpdate(formData)
          .then(response => {
            if (response.data.result === true) {
              // 결과메세지
              this.$swal({
                title: '게시판 정보 수정',
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
      this.boardItem.NAME = this.tempInfo.NAME;
      this.boardItem.ATTACHED_FILE_YN = this.tempInfo.ATTACHED_FILE_YN;
      this.boardItem.COMMENT_YN = this.tempInfo.COMMENT_YN;
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

select:focus {
  color: #4B8ECE;
}

select {
  font-size: 16px;
  font-weight: bold;
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
