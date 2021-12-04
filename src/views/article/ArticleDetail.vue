<template>
  <div class="page-container">
    <div style="display:flex; justify-content:space-between; width: 1000px; margin: 0 auto">
      <div class="left-side">
        <div class="article">
          <div class="article-header" align="center">
            <h1>{{ this.article.title }}</h1>
          </div>

          <div class="article-data">
            <div>
              发布时间：{{ this.formatedDate }}
            </div>
            <div class="three-data">
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
          <ArticleCommentCard
              v-for="comment in this.comments"
              :card-data="comment">
          </ArticleCommentCard>
        </div>
      </div>
      <div class="right-side" style="width: 250px">
        <el-card>
          <div style="display: flex; align-items: center">
            <div class="avatar-container">
              <img class="avatar-img" :src="this.author.avatarUrl" alt="avatar">
            </div>
            <div style="margin-left: 20px; display: flex; flex-direction: column; align-items: center">
              <a :href=authorPageUrl style="font-size: 25px;font-weight: bold; color: black; margin-bottom: 5px">
                {{ this.author.nickname }}
              </a>

              <div v-if="this.$store.state.user.username===this.author.username">
                <el-button @click="goToAuthorPage">
                  编辑
                </el-button>
              </div>
              <div v-else>
                <el-button
                    v-if="this.author.followed"
                    @click="handleFollow()"
                    style="width: 80px"
                    type="info"
                    round
                >
                  {{ followState }}
                </el-button>
                <el-button
                    v-else
                    round
                    @click="handleFollow()"
                    style="width: 80px"
                    type="primary"
                >
                  {{ followState }}
                </el-button>
              </div>
            </div>
          </div>

          <div class="author-data">
            <div style="display: flex; flex-direction: column; align-items: center; font-weight: bold">
              <a :href=authorFollowersPageUrl style="color: black">粉丝</a>
              <div>{{ this.author.followers }}</div>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center;font-weight: bold">
              <a :href=authorPageUrl style="color: black">文章</a>
              {{ this.author.posts }}
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <el-backtop right="180"/>
  </div>
</template>

<script>
import request from "@/api/request";
import {formatDate} from "@/api/utils"
import {LikeOutlined, StarOutlined, EyeOutlined, CommentOutlined} from '@ant-design/icons-vue'
import ArticleCommentCard from "@/components/ArticleCommentCard";

export default {
  name: "ArticleDetail",
  components: {
    ArticleCommentCard,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    CommentOutlined
  },
  props: {},
  data() {
    return {
      author: {
        username: "",
        nickname: "",
        avatarUrl: "",
        posts: "",
        followers: "",
        followed: "true"
      },
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
  computed: {
    followState() {
      if (this.author.followed === false) {
        return "关注"
      } else {
        return "已关注"
      }
    },

    authorPageUrl() {
      return "/user/" + this.author.username + "/posts"
    },

    authorFollowersPageUrl() {
      return "/user/" + this.author.username + "/followers"
    },

    formatedDate() {
      return formatDate(this.article.postDate)
    }

  },
  mounted() {
    // handleScroll为页面滚动的监听回调
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    getAuthorInfo() {
      request.post('/user/simple-info/', {
        selfUsername: this.$store.state.user.username,
        viewedUsername: this.author.username
      }).then(res => {
        if (res.status === 0) {
          this.author = res.data
        } else {
          alert("get author data failed")
        }
      }).catch(err => {
        console.log(err)
      })
    },

    load() {
      request.get("article/view-article/", {
        params: {
          username: this.$store.state.user.username,
          articleId: this.articleId,
        }
      }).then(res => {
        if (res.status === 0) {
          console.log(res);
          this.user = res.data.user;
          this.author.username = res.data.user.username
          this.getAuthorInfo()
          this.article = res.data.article;
          this.comments = res.data.comments;
          this.articleLikeColor = (this.article.liked) ? "#00c3ff" : "#999"
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

    checkComment() {
      if (this.commentContent === "") {
        this.$message.error("评论的内容不能为空哟")
        return false
      }
    },

    postComment() {
      if (!this.checkComment()) return false
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

    handleFollow() {
      console.log(this.$store.state.user.username)
      console.log(this.$store.state.loggedIn)
      console.log(this.$route.params.username)
      if (this.author.followed) {
        request.post('user/unfollow-user/', {
          selfUsername: this.$store.state.user.username,
          otherUsername: this.author.username
        }).then(res => {
          if (res.status === 0) {
            console.log('unfollow success')
            this.author.followed = false;
            this.author.followers--
          } else {
            alert("unfollowe failed")
          }
        })
      } else {
        request.post('user/follow-user/', {
          selfUsername: this.$store.state.user.username,
          otherUsername: this.author.username
        }).then(res => {
          if (res.status === 0) {
            console.log('follow success')
            this.author.followed = true;
            this.author.followers++
          } else {
            alert("unfollow failed")
          }
        })
      }
    },

    goToAuthorPage() {
      this.$router.push(this.authorPageUrl)
    }
  },

  created() {
    this.load()
  },
}
</script>

<style scoped>
.page-container {
  width: 100%;
  background-color: rgb(240, 241, 245);

}

.left-side {
  width: 730px;
}

.article {
  margin: 0px auto 0 auto;
  background-color: white;
}

.article-header {
  margin: 0px auto;
  padding-top: 10px;
}

.article-data {
  background-color: #f7f8fc;
  color: #999;
  margin: 0 30px;
  height: 30px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.three-data {
  display: flex;
}

.three-data * {
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
  padding: 0 40px;
}

.comments {
  margin: 20px auto;
}

.avatar-container {
  height: 100px;
  width: 100px;

}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #ebebeb;
  vertical-align: top;
}

.author-data {
  display: flex;
  font-size: 20px;
  color: black;
  justify-content: space-between;
  margin: 20px 20px 0px 20px;
}

.footer {
  height: 100px;
}
</style>