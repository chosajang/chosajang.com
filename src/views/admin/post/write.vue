<template>
  <div class="content">
    <div class="functionWrap">
      <select class="form-control" v-model="post.board">
        <option disabled value="">Select Board</option>
        <option v-for="board in boardList" :key="board.SEQ" :value="board.SEQ">
          {{ board.NAME }}
        </option>
      </select>
      <input type="text" v-model="post.title" :class="postTitle" placeholder="Post Title" @keyup="titleCheck"/>
    </div>
    <editor
      ref="toastuiEditor"
      :options="editorOptions"
      height="500px"
      initialEditType="wysiwyg"
    />
    <div class="buttonWrap">
      <input type="button" class="btn btn-primary" value="Save" @click="postSave" />
      <input type="button" class="btn btn-secondary" value="Cancel" @click="postEditCancel" />
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/vue-editor';
import { boardList, postWrite, postContentFileUpload } from '@/api';

export default {
  components: {
    editor: Editor
  },
  data () {
    return {
      boardList: [],
      selectBoard: '',
      postSeq: '',
      postTitle: '',
      post: {
        board: '',
        title: ''
      },
      editorOptions: {
        language: 'ko',
        hooks: {
          addImageBlobHook: function (blob, callback) {
            const formData = new FormData();
            formData.append('file', blob);
            // 파일 업로드 API
            postContentFileUpload(formData)
              .then(response => {
                if (response.data.result) {
                  const fileInfo = response.data.data[0];
                  const uploadedImageURL = 'http://api.chosajang.com/' + fileInfo.PATH + fileInfo.PHYSICAL_NAME;
                  callback(uploadedImageURL, fileInfo.LOGICAL_NAME);
                } else {
                  console.log('[' + response.data.error_code + ']' + response.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
            return false;
          }
        }
      }
    };
  },
  created () {
    const vm = this;
    boardList()
      .then(response => {
        if (response.data.result) {
          vm.boardList = response.data.board_list;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    validationCheck () {
      const board = this.post.board;
      if (board === '') {
        this.$swal({
          text: '게시판을 선택하세요',
          icon: 'warning'
        });
        return false;
      } else if (this.titleCheck() === false) {
        this.$swal({
          text: '제목을 입력하세요',
          icon: 'warning'
        });
        return false;
      } else {
        this.postTitle = 'active';
        return true;
      }
    },
    titleCheck () {
      const title = this.post.title;
      if (title.length === 0) {
        this.postTitle = 'error';
        return false;
      } else {
        this.postTitle = 'active';
        return true;
      }
    },
    postSave () {
      // 제목 빈값일 때 에러처리
      if (this.validationCheck()) {
        const board = this.post.board;
        const title = this.post.title;
        const content = this.$refs.toastuiEditor.invoke('getMarkdown');

        const formData = new FormData();
        formData.append('board_seq', board);
        formData.append('title', title);
        formData.append('content', content);
        console.log(content);
        this.$swal({
          title: '저장',
          text: '내용을 저장하시겠습니까?',
          icon: 'warning',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            postWrite(formData)
              .then(response => {
                if (response.data.result === true) {
                  // 결과메세지
                  this.$swal({
                    title: '글쓰기 완료',
                    text: response.data.message,
                    icon: 'success'
                  }).then((result) => {
                    this.$router.push({ path: '/admin/posts' });
                  });
                } else {
                  this.$swal({
                    title: '장애 발생!',
                    text: response.data.message,
                    icon: 'error'
                  });
                }
              })
              .catch(error => {
                this.$swal({
                  title: '장애 발생!',
                  text: error,
                  icon: 'error'
                });
              });
          }
        });
      }
    },
    postEditCancel () {
      this.$swal({
        title: '글쓰기 취소',
        text: '글쓰기를 취소하시겠습니까?',
        confirmButtonText: 'Yes, Cancel it!',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.$router.push({ path: '/admin/posts' });
        }
      });
    }
  }
};
</script>

<style scoped>
/**
 * common
 */
.functionWrap {
  padding: 20px 0px 10px 0px;
  width: 100%;
}

.buttonWrap {
  text-align: right;
  padding-top: 20px;
}

.buttonWrap .btn {
  margin: .25rem;
}

.buttonWrap .btn-danger {
  float: left;
}

select:focus {
  color: #4B8ECE;
}

select {
  font-size: 16px;
  font-weight: bold;
  width: 220px !important;
}

select.active {
  color: #4B8ECE;
}

input[type=text] {
  width: 100%;
  padding: 8px 14px;
  margin: 4px 0;
  font-size: 20px;
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

input[type=text].error, input[type=password].error {
  color: #FF0000;
  border-bottom: 3px solid #FF0000;
}

input[type=text].active, input[type=password].active {
  color: #4B8ECE;
  border-bottom: 3px solid #4B8ECE;
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
