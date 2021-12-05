<template>
  <div class="root">
    <div v-if=this.loading>
      <Loading></Loading>
    </div>
    <div v-else style="display: flex; flex-direction: column; align-items: center">
      <ArticleCard v-for="article in articleList" :card-data="article" :width="'800px'"></ArticleCard>
      <ArticleNoData :width="'800px'"></ArticleNoData>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import request from "@/api/request";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import ArticleNoData from "@/components/ArticleNoData";
import Loading from "@/components/Loading";

export default {
  name: "Topic",
  components: {Loading, ArticleNoData, Footer, ArticleCard},
  data() {
    return {
      loading: true,
      articleList: []
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
          this.loading=false
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