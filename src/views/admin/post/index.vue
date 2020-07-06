<template>
  <div class="content">
    <div class="functionWrap">
      <input type="text" v-model="postInfo.TITLE" placeholder="Title"/>
    </div>
    <editor
      ref="toastuiEditor"
      :initialValue="postInfo.CONTENT"
      height="500px"
      initialEditType="wysiwyg"
    />
    <input type="button" class="btn btn-primary" value="Save" @click="createAction" />
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

import { postInfo } from '@/api';

export default {
  components: {
    editor: Editor
  },
  data () {
    return {
      content: null,
      postInfo: ''
    };
  },
  created () {
    const vm = this;
    const postSeq = this.$route.params.seq;
    postInfo(postSeq)
      .then(response => {
        if (response.data.result) {
          vm.postInfo = response.data.article;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    createAction () {
      this.content = this.$refs.toastuiEditor.invoke('getMarkdown'); // content를 저장하는 액션 처리
    }
  }
};
</script>

<style scoped>
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

.itemWrap > table > thead tr, tbody tr{
  text-align: center;
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
