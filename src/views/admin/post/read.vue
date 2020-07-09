<template>
  <div class="content">
    <div class="titleWrap">
      <h1>{{ postInfo.TITLE }}</h1>
    </div>
    <div class="postInfoWrap">
      {{ postInfo.ADD_DATE }}
    </div>
    <viewer
      v-if="editorRender"
      :initialValue="postInfo.CONTENT"
    />
    <div class="buttonWrap">
      <input type="button" class="btn btn-primary" value="Edit" @click="postEdit" />
      <input type="button" class="btn btn-secondary" value="List" @click="postList" />
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';
import { postRead } from '@/api';

export default {
  components: {
    viewer: Viewer
  },
  data () {
    return {
      postSeq: '',
      editorRender: false,
      postTitle: '',
      postInfo: {
        TITLE: 'Default Title',
        CONTENT: 'Default Content'
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
    postEdit () {
      this.$router.push({ path: '/admin/posts/' + this.postSeq + '/edit' });
    },
    postList () {
      this.$router.push({ path: '/admin/posts' });
    }
  }
};
</script>

<style scoped>
/**
 * common
 */
.titleWrap {
  padding: 30px 0px 10px 0px;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #EEE;
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
