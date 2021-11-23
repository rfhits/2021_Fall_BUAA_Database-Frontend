<template>
  <div class="page-container">
    <div style="height: 40px"></div>

    <div class="article">
      <div class="article-header" align="center">
        <h1>{{ this.article.title }}</h1>
      </div>

      <div class="article-data">
        <div>
          <EyeOutlined></EyeOutlined>
          <span>{{ this.article.clicks }}</span>
        </div>

        <div>
          <LikeOutlined></LikeOutlined>
          <span>{{ this.article.likes }}</span>
        </div>

        <div>
          <CommentOutlined></CommentOutlined>
          <span>{{ this.article.comments }}</span>
        </div>
      </div>

      <div class="article-content">
        <div v-html="this.article.content"></div>
      </div>

      <div class="article-footer">
        <div class="article-action">
          <LikeOutlined :style="{color: articleLikeColor}" @click="like()"/>
        </div>
      </div>
    </div>


    <el-card class="comment-action">
      <div style="display: flex">
        <p style="color: #999">看帖是喜欢，评论才是真爱：</p>
      </div>

      <el-input
          v-model="commentContent"
          :autosize="{ minRows: 4, maxRows: 8 }"
          type="textarea"
          placeholder="请开始你的表演..."
      >
      </el-input>

      <el-button type="primary" style="margin-top: 20px" @click="postComment">
        发表
      </el-button>
    </el-card>

    <div class="comments">
      <comment-card
          v-for="comment in this.comments"
          :card-data="comment">
      </comment-card>
    </div>

    <div class="footer">

    </div>

  </div>
</template>

<script>
import Header from "../../components/Header"
import {LikeOutlined, StarOutlined, EyeOutlined, CommentOutlined} from '@ant-design/icons-vue'
import CommentCard from "../../components/comment/CommentCard";
import request from "@/api/request";

export default {
  name: "ArticleDetail",
  components: {
    CommentCard,
    Header,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    CommentOutlined
  },
  props: {},
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        avatarUrl: "",
      },
      article: {
        postDate: "1926-08-17",
        title: "test_title",
        content: "test_content",
        likes: 233,
        comments: 233,
        clicks: 233,
        topics: [],
        liked: false,
      },
      comments: [
        {
          username: "007",
          nickname: "007",
          avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          date: "1926-08-17",
          commentId: 233,
          content: "comment content test",
          likes: 233,
          liked: true,
          width: '800px',
        },
      ],
      articleId: this.$route.params.articleId,
      articleLikeColor: "#999",
      commentContent: "",
      testUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
    }
  },
  created() {
    this.load()
  },

  methods: {
    load() {
      request.get("article/view-article/", {
        params: {
          username: this.$store.state.user.username,
          articleId: this.articleId,
        }
      }).then(res => {
        if (res.status == 0) {
          console.log(res);
          this.user = res.data.user;
          this.article = res.data.article;
          this.comments = res.data.comments;
          this.articleLikeColor = (this.article.liked)?  "#00c3ff":"#999"
        } else {
          alert("load failed")
        }
      }).catch(err => {
        console.log(err)
      })
    },

    like() {
      if (this.article.liked === false) {
        request.post("/article/like-article/", {
          username: this.$store.state.user.username,
          articleId: this.articleId
        }).then(res => {
          if (res.status === 0) {
            this.article.liked = true;
            this.articleLikeColor = "#00c3ff"
          } else {
            alert("like failed")
          }
        })
      } else {
        request.post("/article/cancel-like-article/", {
          username: this.$store.state.user.username,
          articleId: this.articleId
        }).then(res => {
          if (res.status === 0) {
            this.article.liked = false;
            this.articleLikeColor = '#999'
          } else {
            alert("cancel like failed")
          }
        })
      }
    },

    postComment() {
      request.post("/comment/post/", {
        username: this.$store.state.user.username,
        articleId: this.articleId,
        content: this.commentContent
      }).then(res => {
        if (res.status === 0) {
          this.load()
          this.commentContent = '';
          this.$message.success("评论成功❤")
        } else {
          alert("comment post failed")
        }
      })
    },
  }
}
</script>

<style scoped>
.page-container {
  display: block;

  width: 100%;
  background-color: rgb(240, 241, 245);
}

.article {
  /*display: block;*/
  width: 800px;
  margin: 0px auto;
  background-color: white;
}

.article-header {
  /*margin: 30px;*/
  padding-top: 30px;
  margin: 30px auto;
}

.article-data {
  background-color: #f7f8fc;
  margin: 0 30px;
  height: 30px;
  display: flex;
}

.article-data * {
  color: #999;
  margin-right: 20px;
}

.article-content {
  margin: 30px;
}

.article-footer {
  display: flex;
  align-items: center;
  padding: 40px;
}

.article-action {
  display: flex;
  margin: 0 auto;
}

.article-action * {
  font-size: 30px;
}

.comment-action {
  margin: 20px auto;
  width: 800px;
  padding: 0 40px;
}

.comments {
  width: 800px;
  margin: 20px auto;
}

.footer {
  height: 100px;
}
</style>