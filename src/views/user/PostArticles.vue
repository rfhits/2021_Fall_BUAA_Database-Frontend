<template>
  <div class="page-container">
    <PersonalArticleCard
        v-for="article in this.articleList"
        :card-data="article">
    </PersonalArticleCard>
  </div>
</template>

<script>
import request from "../../api/request";
import PersonalArticleCard from "../article/PersonalArticleCard";

export default {
  name: "PostArticles",
  components: {PersonalArticleCard},
  data() {
    return {
      articleList: [
        {
          username: "username000",
          nickname: "nickname000",
          avatarUrl: "the url of the user",
          articleId: 233,
          postDate: "",
          title: "Hello World",
          brief: "article brief", // 截取文章的前<=30个字即可
          likes: 100,
          comments: 200,
          clicks: 50,
          coverUrl: "https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg",
          topics: ["t1", "t2"],
          width: '760px',
        },
      ],
    }
  },
  methods: {
    getPosts() {
      request.get("/user/posts-info/", {
        params: {
          username: this.$store.state.user.username
        }
      }).then(res => {
        this.articleList = res.data.articleList;
      })
    },
  },
  created() {
    this.getPosts()
  }
}
</script>

<style scoped>
</style>