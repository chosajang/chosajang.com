<template>
  <div class="postWrap">
    <div class="post">
      <div class="title">
        <h1>{{ postInfo.TITLE }}</h1>
      </div>
      <div class="postInfo">
        <i class="far fa-calendar-alt"></i>
        {{$moment(postInfo.ADD_DATE).format('YYYY.MM.DD')}}
      </div>
      <viewer
        v-if="viewerRender"
        :initialValue="postInfo.CONTENT"
      />
      <div class="function">
        <input type="button" class="btn btn-secondary" value="List" @click="postList" />
      </div>
      <div class="comment">
        <vue-disqus-embed
          :identifier="identifier"
          :url="url"
          :title="TEST"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';
import { servicePostRead } from '@/api';

export default {
  components: {
    viewer: Viewer
  },
  data () {
    return {
      postSeq: '',
      viewerRender: false,
      postTitle: '',
      postInfo: {
        TITLE: '',
        CONTENT: ''
      },
      identifier: this.$route.params.seq,
      // 도메인 변경 필요
      url: 'http://chosajang.com/blog/' + this.$route.params.seq
    };
  },
  created () {
    const vm = this;
    this.postSeq = this.$route.params.seq;
    console.log(this.postSeq);
    servicePostRead(this.postSeq)
      .then(response => {
        console.log(response);
        if (response.data.result) {
          vm.postInfo = response.data.article;
          // Toast UI Editor Render
          vm.viewerRender = true;
        } else {
          this.$swal({
            title: '게시물 내용조회 실패',
            text: '삭제된 게시물이거나, 내용조회를 할 수 없습니다',
            icon: 'warning'
          }).then((result) => {
            this.$router.push({ path: '/blog' });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    postList () {
      this.$router.push({ path: '/blog' });
    }
  }
};
</script>

<style scoped>
/**
 * common
 */
.postWrap {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  margin: 0 20px;
  width: 100%;
}

.postWrap > .post {
  max-width: 900px;
}

.title {
  padding: 30px 0 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #EEE;
}

.postInfo {
  margin: 20px 0 20px 0;
  color:#1A2229;
}

.postInfo i {
  margin-right: 6px;
}

.function {
  text-align: right;
  padding-top: 20px;
  border-top: 1px solid #EEE;
}

.disqus {
  width: 100%;
  max-width: 30rem;
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
