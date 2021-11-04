<template>
  <div class="home">
    <Header head_index="1"></Header>
<!--    <ArticleCard :cardData="this.cardData"></ArticleCard>-->
    <CommentCard :cardData="this.commentCardData"></CommentCard>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ArticleCard from "./article/ArticleCard";
import CommentCard from "@/components/comment/CommentCard"

export default {
  name: 'Home',
  components: {
    Header,
    ArticleCard,
    CommentCard,
  },
  data() {
    return {
      cardData: {
        username: "username000",
        nickname: "nickname000",
        time: "7hours ago",
        title: "Hello, Hu Tao",
        brief: "Hu Tao will rerun",
        likes: 100,
        comments: 200,
        clicks: 50,
        coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        avatarUrl: "https://img-static.mihoyo.com/avatar/avatar10014.png"
      },
      commentCardData: {
        username: "username000",
        nickname: "nickname000",
        time: "7hours ago",
        title: "Hello, Hu Tao",
        content: "Hu Tao will rerun",
        likes: 100,
        comments: 200,
        clicks: 50,
        coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
        avatarUrl: "https://img-static.mihoyo.com/avatar/avatar10014.png"
      }
    }
  },
  methods: {}
}
</script>
