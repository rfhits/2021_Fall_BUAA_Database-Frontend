<template>
  <h1 align="center">{{ this.keyword }}</h1>
  <div class="users-container">
    <UserCard v-for="user in userList" :card-data="user"></UserCard>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import request from "@/api/request";

export default {
  name: "User",
  components: {UserCard},
  data() {
    return {
      keyword: "",
      userList: [
        {
          username: "233",
          nickname: "nickname007",
          avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          followed: true,
        }
      ]
    }
  },
  computed: {
    routeKeyword() {
      return this.$route.query.keyword
    },
  },
  methods: {
    load() {
      request.get('/user/search/', {
        params: {}
      }).then(res => {
        if (res.status === 0) {
          this.userList = res.data.userList
        } else {
          alert("search users failed")
        }
      }).catch(err =>{

      })
    }
  },
  created() {
    this.keyword = this.routeKeyword
    this.load();
  }
}
</script>

<style scoped>

</style>