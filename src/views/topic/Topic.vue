<template>
  <div class="root" >
    <div class="articles">
      <ArticleCard v-for="article in articleList" :card-data="article" :width="'800px'" style="margin: 0 auto"></ArticleCard>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import request from "@/api/request";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";

export default {
  name: "Topic",
  components: {Footer, ArticleCard},
  data() {
    return {
      articleList: [
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
        },{},{}
      ]
    }
  },
  methods: {
    load() {
      request.get('topic/view-articles/', {
        params: {
          topicId: this.$route.params.id
        }
      }).then(res => {
        if (res.status === 0) {
          this.articleList = res.data.articleList
        } else {
          alert('get articles failed')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.load();
  }
}
</script>

<style scoped>

.root {
  background-color: rgb(240, 241, 245);
  padding-top: 40px;
}
.articles {
  width: 900px;
  margin: 0px auto;
  padding: 20px 0;
  background-color: white;
}

</style>