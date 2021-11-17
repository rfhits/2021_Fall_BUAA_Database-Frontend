<template>
  <h1 align="center"> {{ this.keyword}}</h1>
  <TopicCard v-for="topic in this.topicList" :card-data="topic"></TopicCard>
</template>

<script>
import TopicCard from '@/components/TopicCard'
import request from "@/api/request";

export default {
  name: "Topic",
  components: {
    TopicCard
  },
  data() {
    return {
      keyword: "",
      topicList: [
        {
          name: 'topicName1',
          id: '1',
          imgUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          clicks: 233,
        }
      ]
    }
  },
  computed: {
    routeKeyword() {
      return this.$route.query.keyword
    }
  },
  methods: {
    load() {
      request.get('/search/topic/', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        if (res.status === 0) {
          this.topicList = res.data.topicList
        } else {
          alert("search topic failed")
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

</style>