<template>
  <div class="content">
    <p>Admin / Article</p>
    <ul>
      <li>글 쓰기 / 수정 / 삭제</li>
    </ul>
    <editor />
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
  components: {
    Editor
  },
  methods: {
    createAction () {
      var content = this.$refs.toastuiEditor.invoke('getMarkdown'); // content를 저장하는 액션 처리
      console.log(content);
    }
  }
};
</script>

<style>

</style>
