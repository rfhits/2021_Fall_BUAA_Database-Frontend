<template>
  <div class="content-container">
<!--    <GoodCard :card-data="this.goodCardData"></GoodCard>-->
    <CartGoodCard :card-data="this.cartGoodCard"></CartGoodCard>
    <div class="footer"></div>

  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard"
import PersonalArticleCard from "@/components/UserArticleCard";
import CommentCard from "@/components/ArticleCommentCard"
import sidebar from "@/components/UserSidebar"
import GoodCard from "@/components/GoodCard";
import CartGoodCard from '@/components/CartGoodCard'

export default {
  name: "DevLjj",
  components :{
    GoodCard, ArticleCard,
    CommentCard,
    PersonalArticleCard,
    sidebar,
    CartGoodCard,
  },

    data() {
      return {
        cartGoodCard: {
          goodId: 233,
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg',
          width: '800px',
          name: 'good-name',
          storeQuantity: 20,
          price: 520,
        },
        goodCardData: {
          goodId: 233,
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg',
          width: '250px',
          name: 'good-name',
          price: 520,
        },
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
            topics: ["keqin", "ninguan","hello", "world"],
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

<style scoped>
.home {
  background-color: #f0f1f5;
}

.carousel-container {
  width: 800px;
  padding-top: 20px;
  margin: 0 auto 20px auto;
}

.el-carousel /deep/ .el-carousel__container {
  height: 200px;
}

.article-cards {
  width: 800px;
  margin: 20px auto;
  background-color: white;
}

.footer {
  height: 200px;
}
</style>