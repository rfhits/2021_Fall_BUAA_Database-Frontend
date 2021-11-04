<template>
  <Header></Header>
  <div class="page-container">
    <div style="height: 40px"></div>

    <div class="article">
      <div class="article-header">
        <h1>Hello</h1>
      </div>

      <div class="article-content">

      </div>

      <div class="article-footer">
        <div class="article-action">
          <LikeOutlined :style="{color: likeColor}" @click="like()"/>
        </div>

      </div>

    </div>


    <el-card class="comment">
      <div style="display: flex">
        <p style="color: #999">看帖是喜欢，评论才是真爱：</p>
      </div>

      <el-input
          v-model="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          type="textarea"
          placeholder="请开始你的表演..."
      >
      </el-input>

      <el-button type="primary" style="margin-top: 20px" @click="postComment">
        发表
      </el-button>
    </el-card>

  </div>
</template>

<script>
import Header from "../../components/Header"
import {LikeOutlined, StarOutlined, EyeOutlined, CommentOutlined} from '@ant-design/icons-vue'


export default {
  name: "ArticleDetail",
  components: {
    Header,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    CommentOutlined
  },
  data() {
    return {
      liked: false,
      likeColor: "#999",
      textarea: ""
    }
  },
  methods: {
    like() {
      if (this.liked === false) {
        this.liked = true;
        this.likeColor = "#00c3ff"
      } else {
        this.liked = false;
        this.likeColor = '#999'
      }
    },

    postComment() {
      alert("post")
    }
  }
}
</script>

<style scoped>
.page-container {
  display: block;
  height: 1000px;
  width: 100%;
  background-color: rgb(240, 241, 245);
}

.article {
  /*display: block;*/
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: white;
}

.article-header {
  /*margin: 30px;*/
  padding-top: 30px;
}

.article-content {
  height: 300px;
}

.article-footer {
  display: flex;
  align-items: center;

}

.article-action {
  display: flex;
  margin: 0 auto;
}

.article-action * {
  font-size: 30px;
}

.comment {
  margin: 20px auto;
  width: 800px;
  padding: 0 40px;
}
</style>