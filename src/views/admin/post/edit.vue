<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" v-model="postInfo.TITLE" :class="postTitle" placeholder="Title" @keyup="titleCheck"/>
    </div>
    <editor
      ref="toastuiEditor"
      v-if="editorRender"
      :initialValue="postInfo.CONTENT"
      :options="editorOptions"
      height="70%"
      initialEditType="markdown"
      @change="onEditorChange"
    />
    <div class="buttonWrap">
      <input type="button" class="btn btn-danger" value="Delete" @click="postDelete" />
      <input type="button" class="btn btn-primary" value="Save" @click="postEdit" />
      <input type="button" class="btn btn-secondary" value="Cancel" @click="postEditCancel" />
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/vue-editor';
import { postRead, postUpdate, postContentFileUpload, postDelete } from '@/api';

export default {
  components: {
    editor: Editor
  },
  data () {
    return {
      postSeq: '',
      editorRender: false,
      postTitle: '',
      postInfo: {
        TITLE: 'Default Title',
        CONTENT: 'Default Content'
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
    this.postSeq = this.$route.params.seq;
    postRead(this.postSeq)
      .then(response => {
        if (response.data.result) {
          vm.postInfo = response.data.article;
          // data-tomark-pass, codeblock 삭제
          // const regex = /data-tomark-pass=""|data-te-codeblock=""/g;
          // vm.postInfo.CONTENT = vm.postInfo.CONTENT.replace(regex, '');
          // Toast UI Editor Render
          vm.editorRender = true;
        } else {
          this.$swal({
            title: '게시물 내용조회 실패',
            text: '삭제된 게시물이거나, 내용조회를 할 수 없습니다',
            icon: 'warning'
          }).then((result) => {
            this.$router.push({ path: '/admin/posts' });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    titleCheck () {
      const title = this.postInfo.TITLE;
      if (title.length === 0) {
        this.postTitle = 'error';
        return false;
      } else {
        this.postTitle = 'active';
        return true;
      }
    },
    postEdit () {
      // 제목 빈값일 때 에러처리
      if (this.titleCheck()) {
        const title = this.postInfo.TITLE;
        const content = this.$refs.toastuiEditor.invoke('getMarkdown');
        const postSeq = this.$route.params.seq;
        const formData = new FormData();

        formData.append('article_seq', postSeq);
        formData.append('title', title);
        formData.append('content', content);
        // const regex = /data-tomark-pass=""|data-te-codeblock=""/g;
        // content = content.replace(regex, '');
        this.$swal({
          title: '저장',
          text: '게시물 내용을 저장하시겠습니까?',
          icon: 'warning',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            postUpdate(formData)
              .then(response => {
                if (response.data.result === true) {
                  // 결과메세지
                  this.$swal({
                    title: '게시판 정보 수정',
                    text: response.data.message,
                    icon: 'success'
                  }).then((result) => {
                    this.$router.push({ path: '/admin/posts/' + postSeq });
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
                this.formReset();
                this.$swal({
                  title: '장애 발생!',
                  text: error,
                  icon: 'error'
                });
              });
          }
        });
      } else {
        this.$swal({
          title: '',
          text: '게시물 제목을 입력하세요',
          icon: 'warning'
        });
      }
    },
    postEditCancel () {
      this.$swal({
        title: '편집 취소',
        text: '게시물 편집을 취소하시겠습니까?',
        confirmButtonText: 'Yes, Cancel it!',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          // 게시판 목록으로 리턴
          const postSeq = this.$route.params.seq;
          this.$router.push({ path: '/admin/posts/' + postSeq });
        }
      });
    },
    postDelete () {
      this.$swal({
        title: '게시물 삭제',
        text: '해당 게시물을 삭제하시겠습니까?',
        confirmButtonText: 'Yes, Delete it!',
        confirmButtonColor: '#d33',
        icon: 'error',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          const formData = new FormData();
          formData.append('article_seq', this.postSeq);
          postDelete(formData)
            .then(response => {
              if (response.data.result) {
                this.$swal({
                  title: '게시물 삭제 완료',
                  text: response.data.message,
                  icon: 'success'
                }).then((result) => {
                  this.$router.push({ path: '/admin/posts' });
                });
              } else {
                this.$swal({
                  title: '게시물 삭제 실패',
                  text: response.data.message,
                  icon: 'error'
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    onEditorChange () {
      console.log('onEditorChange');
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
