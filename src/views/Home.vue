<template>
  <div class="home">
    <div style="width: 80%; margin: 0 auto; display: flex; justify-content: space-between">
      <div class="content-container">
        <div class="carousel-container">
          <el-carousel :interval="4000" type="card" class="el-carousel">
            <el-carousel-item
                v-for="article in officialArticles"
                :key="article.articleId"
            >
              <div style="height: 220px">
                <img
                    :src="article.coverUrl"
                    style="height: 100%; width: 100%; border-radius: 10px"
                    @click="goToArticle(article.id)">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="article-cards">
          <ArticleCard v-for="articleCard in this.articleCards"
                       :card-data="articleCard"
                       :width="'100%'"
          >
          </ArticleCard>
          <ArticleNoData :width="'100%'"></ArticleNoData>
        </div>

        <div class="footer"></div>
      </div>
      <div class="right-side">
        <div class="user-action">
          <div
              style="font-size: 25px;
            font-weight: bold;
            width: 100px;
            margin: 20px auto 0 auto;
            text-align: center"
          >
            我  要
          </div>
          <el-divider></el-divider>
          <el-button
              style="width: 200px; height: 50px; margin: 10px auto; color: black; font-size: 20px; font-weight: bold"
              color="#ffe14c"
              @click="goToPostArticle()"
          >
            <EditOutlined/>
            发篇文章
            <RightOutlined />
          </el-button>
          <el-button
              color="#ffe14c"
              style="width: 200px; height: 50px; margin: 10px auto 40px auto;
            color: black; font-size: 20px; font-weight: bold"
              @click="goTo('/mall')">
            <AccountBookOutlined/>
            逛逛商城
            <RightOutlined />
          </el-button>
        </div>
        <div class="official-info">
          <div
              style="width:200px; font-size: 20px; font-weight: bold; margin: 10px auto;  text-align: center"
          >
            newest info
          </div>
          <div v-for="article in this.articleCards"
               style="font-size: 17px; margin-left: 60px;"
          >
            <a :href="articleIdToLink(article.articleId)">{{ article.title }}</a>
          </div>
        </div>
        <el-backtop :right="230"/>

      </div>
    </div>

  </div>
</template>

<script>
import request from "@/api/request";
import {RightOutlined, EditOutlined, LikeOutlined, EyeOutlined, CommentOutlined, AccountBookOutlined} from '@ant-design/icons-vue'
import ArticleCard from "../components/ArticleCard";
import sidebar from "@/components/UserSidebar"
import ArticleNoData from "@/components/ArticleNoData";

export default {
  name: 'Home',
  components: {
    ArticleNoData,
    ArticleCard,
    sidebar,
    EditOutlined,
    RightOutlined,
    AccountBookOutlined
  },
  data() {
    return {
      officialArticles: [
        {
          id: 23,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        },
        {
          id: 24,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        },
        {
          id: 25,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        },
      ],
      articleCards: [
        {
          username: "username000",
          nickname: "nickname000",
          postDate: "2021-11-23 13:46:13.660181",
          articleId: 100,
          title: "Hello, Hu Tao",
          brief: "<p>在哪个tag中</p>",
          likes: 100,
          comments: 200,
          clicks: 50,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
          avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          topics: [
            {
              id: 233,
              name: "刻晴",
            }, {
              id: 233,
              name: "申鹤"
            }
          ],
        },
        {}
      ],
    }
  },
  computed: {},

  methods: {
    getOfficialArticles() {
      request.get("/article/get-official-articles", {
        params: {}
      }).then(res => {
        if (res.status === 0) {
          this.officialArticles = res.data.officialArticles
        } else {
          alert("get official articles failed")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goToArticle(articleId) {
      this.$router.push("/article/" + articleId)
    },
    goToPostArticle() {
      if (this.$store.state.loggedIn) {
        this.$router.push("/new-article")
      } else {
        this.$message.error("login first")
      }
    },

    goTo(url) {
      this.$router.push(url)
    },
    articleIdToLink(articleId) {
      return '/article/' + articleId
    }
  },
  created() {
    this.getOfficialArticles()
    request.get('/article/search/', {
      params: {
        keyword: "",
      }
    }).then(res => {
      if (res.status === 0) {
        console.log(res);
        this.articleCards = res.data.articleList;
      } else {
        alert("get articles failed")
      }
    })
  }
}
</script>

<style scoped>
.home {
  background-color: #f0f1f5;
}

.content-container {
  width: 70%;
}

.carousel-container {
  width: 100%;
  height: 7.2%;
  padding-top: 20px;
  margin: 0 auto 20px auto;
}

.el-carousel /deep/ .el-carousel__container {
  height: 230px;
  /*height: 100%;*/
}

.article-cards {
  width: 100%;
  margin: 20px auto;
}

.right-side {
  width: 27%;
}

.user-action {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.official-info {
  display: flex;
  flex-direction: column;
  background-color: white;
}

.footer {
  height: 200px;
}
</style>