<template>
  <div class="content-container">
    <el-button @click="newUser()">new many user</el-button>
    <el-button @click="newArticles()">new many articles for the loggined user</el-button>
    <el-button @click="constructFollowReleation()">construct many relations</el-button>
    <el-button @click="newGoods()">new many goods</el-button>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard"
import PersonalArticleCard from "@/components/UserArticleCard";
import CommentCard from "@/components/ArticleCommentCard"
import sidebar from "@/components/UserSidebar"
import GoodCard from "@/components/GoodCard";
import CartGoodCard from '@/components/CartGoodCard'
import request from "@/api/request";

export default {
  name: "DevLjj",
  components: {
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
          topics: ["keqin", "ninguan", "hello", "world"],
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
      },


    }
  },
  methods: {
    goTo() {
    },
    newUser() {
      for (let i = 100; i < 200; i++) {
        request.post("/user/register/", {
          "user": {
            username: "tName" + i,
            nickname: "tName" + i,
            password: "11111111",
            age: 18,
            gender: 1,
            avB: '',
          }
        }).then((res) => {
          if (res.status === 0) {
            this.currentStep += 1;
          } else {
            this.$message.error(res.statusInfo.message);
          }
        }).catch((err) => {
          _this.submitting = false;
          console.log(err);
        })
      }
    },
    newArticles() {
      for (let i = 500; i < 600; i++) {
        request.post("/article/post-article/", {
          "username": this.$store.state.user.username,
          "article": {
            title: "testTitle" + i,
            content: "<div class=\"ql-image\">\n" +
                "<div class=\"ql-image-box\">甘雨生日快乐！！</div>\n" +
                "<div class=\"ql-image-box\">甘雨生日快乐！！</div>\n" +
                "<div class=\"ql-image-box\">甘雨生日快乐！！</div>\n" +
                "<div class=\"ql-image-box\">&nbsp;</div>\n" +
                "<div class=\"ql-image-box\"><img src=\"https://upload-bbs.mihoyo.com/upload/2021/12/02/76387920/9e9649a80d8c690385829dc5186482d4_5643875097112365846.png?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,png\" data-pswp-uid=\"1\" data-w=\"2500\" data-h=\"2500\" /></div>\n" +
                "</div>\n" +
                "<p>欸？我&hellip;我又睡着了吗&hellip;？谢谢你把我叫醒。</p>\n" +
                "<p>难得见到这样的花丛，很漂亮对吧？</p>\n" +
                "<p>只要在这里稍作休息，思绪也会跟着平静下来&hellip;结果不小心又睡着了。</p>\n" +
                "<p>接下来还有工作&hellip;我们小坐片刻，就动身吧。</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>感谢画师：hou&nbsp;绘制贺图</p>",
            coverB64: "",

          },
          "topics": ["酒馆", "测试"]
        }).then((res) => {
          if (res.status === 0) {
            let articleId = res.data.articleId
            // this.$router.push("/article/" + articleId)
          } else {
            this.$message.error(res.statusInfo.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      }

    },
    constructFollowReleation() {
      for (let i = 0; i < 100; i++) {
        let selfUsername = "tuName" + this.randomNum(100, 200)
        let otherUsername = "tuName" + this.randomNum(500, 600)
        request.post("/user/follow-user/", {
          "selfUsername": selfUsername,
          "otherUsername": otherUsername
        }).then(res => {
          if (res.status === 0) {

          } else {
            console.log(res.status)
            this.$message.error(res.statusInfo.message)
          }
        }).catch((err) => { // cant post
          console.log(err)
        })
      }

    },
    newGoods() {

      let newGoodForm = {
        name: "甘雨立牌摆件Genshin",
        imgB64: "",
        price: 520.00,
        quantity: 1314,
        content: "循循守月——甘雨"
      }
      for (let i = 0; i < 100; i++) {
        request.post('/admin/manage/post-good/', {
          good: newGoodForm
        }).then(res => {
          if (res.status === 0) {
            // this.$message.success('商品发布成功')
            this.load()
          } else {
            alert("good add failed")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    }


  }
}
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
}
</style>