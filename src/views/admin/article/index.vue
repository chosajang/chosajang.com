<template>
  <div class="content">
    <p>Admin / Article</p>
    <ul>
      <li>글 쓰기 / 수정 / 삭제</li>
    </ul>
    <editor />
    <input type="button" class="btn btn-primary" value="Save" @click="createAction" />
    <Viewer v-if="content != null" :initialValue="content" />
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/vue-editor';

export default {
  components: {
    Editor,
    Viewer
  },
  data () {
    return {
      content: null
    };
  },
  methods: {
    createAction () {
      this.content = this.$refs.toastuiEditor.invoke('getMarkdown'); // content를 저장하는 액션 처리
    }
  }
};
</script>

<style>

</style>
