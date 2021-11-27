<template>
  <div class="article-cards">
    <ArticleCard v-for="articleCard in this.articleList"
                 :card-data="articleCard"
    >
    </ArticleCard>
  </div>
</template>

<script>
import request from "@/api/request";
import ArticleCard from '@/components/ArticleCard'

export default {
  name: "Article",
  components: {
    ArticleCard
  },
  data() {
    return {
      keyword: "",
      articleList: [
        {
          username: "username000",
          nickname: "nickname000",
          postDate: "7hours ago",
          articleId: 100,
          title: "Hello, Hu Tao",
          brief: "Hu Tao will rerun",
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
          width: "800px"
        },
      ],
    }
  },
  computed: {
    routeKeyword() {
      return this.$route.query.keyword
    }
  },
  methods: {
    load() {
      request.get('/article/search/', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        if (res.status === 0) {
          this.articleList = res.data.articleList
        } else {
          alert("search article failed")
        }
      }).catch(err => {
        console.log("err: " + err)
      })
    }
  },
  created() {
    this.keyword = this.routeKeyword;
    this.load();
  }
}
</script>

<style scoped>

.article-cards {

}

</style>