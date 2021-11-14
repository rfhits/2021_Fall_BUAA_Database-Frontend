<template>
  <div class="home">
    <Header head_index="1"></Header>
    <div class="content-container">
      <div class="carousel-container">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="imgUrl in carouselImg" :key="imgUrl" class="carousel-item">
              <img
                  :src="imgUrl"
                  style="height: 100%; width: 100%; border-radius: 10px"
                  @click="goTo()">

          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="article-cards">
        <ArticleCard v-for="articleCard in this.articleCards" :card-data="articleCard" style="margin: 0">
        </ArticleCard>
      </div>
    </div>
  </div>

  <!--    <ArticleCard :cardData="this.cardData"></ArticleCard>-->
  <!--    <CommentCard :cardData="this.commentCardData"></CommentCard>-->
  <!--    <PersonalArticleCard :cardData="this.cardData"></PersonalArticleCard>-->
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ArticleCard from "./article/ArticleCard";
import PersonalArticleCard from "./article/PersonalArticleCard";
import CommentCard from "@/components/comment/CommentCard"
import sidebar from "@/components/Sidebar"

export default {
  name: 'Home',
  components: {
    Header,
    ArticleCard,
    CommentCard,
    PersonalArticleCard,
    sidebar,
  },
  data() {
    return {
      carouselImg: [
        "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
      ],
      articleCards: [
        {
          username: "username000",
          nickname: "nickname000",
          time: "7hours ago",
          articleId: 100,
          title: "Hello, Hu Tao",
          brief: "Hu Tao will rerun",
          likes: 100,
          comments: 200,
          clicks: 50,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
          avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          width: "800px"
        },
        {}
      ],
      cardData: {
        username: "username000",
        nickname: "nickname000",
        time: "7hours ago",
        articleId: 100,
        title: "Hello, Hu Tao",
        brief: "Hu Tao will rerun",
        likes: 100,
        comments: 200,
        clicks: 50,
        coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
        width: "800px"
      },
      commentCardData: {
        username: "username000",
        nickname: "nickname000",
        avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
        date: "10-15",
        time: "7hours ago",
        content: "Hu Tao will rerun I love hutao, I lllllllllllllllllove hutao",
        likes: 100,
        liked: true,
        width: "600px",
      }
    }
  },
  methods: {
    goTo() {

    }

  }
}
</script>

<style>
.home {
  background-color: #f0f1f5;
}
.carousel-container {
  width: 800px;
  margin: 20px auto 20px auto;
}

.carousel-item {
  height: 400px;
  width: 600px;
}

.article-cards {
  width: 800px;
  margin: 20px auto;
  background-color: white;
}
</style>