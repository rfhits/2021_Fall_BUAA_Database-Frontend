<template>
  <div v-if="loading">
    加载中，请稍后
  </div>
  <div v-else class="article-cards">
    <ArticleCard v-for="articleCard in this.articleList"
                 :card-data="articleCard"
    >
    </ArticleCard>
    <ArticleNoData></ArticleNoData>
    <NoData v-if="this.articleList.length === 0"
            :message="'换个关键词试试吧'"
    >
    </NoData>
  </div>

</template>

<script>
import request from "@/api/request";
import ArticleCard from '@/components/ArticleCard'
import NoData from "@/components/UserNoData";
import ArticleNoData from "@/components/ArticleNoData";
import Footer from "@/components/Footer";

export default {
  name: "Article",
  components: {
    Footer,
    ArticleNoData,
    NoData,
    ArticleCard
  },
  data() {
    return {
      loading: true,
      keyword: "",
      articleList: [
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
          keyword: this.routeKeyword
        }
      }).then(res => {
        if (res.status === 0) {
          this.articleList = res.data.articleList
          this.loading = false
        } else {
          alert("search article failed")
        }
      }).catch(err => {
        console.log("err: " + err)
      })
    }
  },
  created() {
    this.load();
  }
}
</script>

<style scoped>

.article-cards {
  width: 800px;
}

</style>