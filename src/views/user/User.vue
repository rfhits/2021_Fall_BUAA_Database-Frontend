<template>
  <Header></Header>
  <div class="root" style="background-color: #f0f1f5; display: block">
    <div class="user-card-container">
      <el-card :body-style="{display: 'flex', alignItems: 'center'}">
        <div class="avatar_container">
          <img :src=this.avatarUrl class="avatar_img">
        </div>

        <div style="margin-left: 20px">
          <h2 style="font-weight: bold">{{this.nickname}}</h2>
          <div v-if="this.$store.state.user.username===this.$route.params.username">
            <el-button>
              编辑
            </el-button>
          </div>
          <div v-else>
            <el-button @click="handleFollow()">
              {{ followState }}
            </el-button>
          </div>
        </div>

        <div style="width: 550px"></div>

        <div style="display: flex; color: #999">
          <div style="font-size: 20px; margin-right: 20px">
            <span>{{followers}}</span>
            <br>
            <span>粉丝</span>
          </div>
          <el-divider direction="vertical" style="height: 50px"></el-divider>
          <div style="font-size: 20px; margin-left: 20px">
            <span>{{posts}}</span>
            <br>
            <span>文章</span>
          </div>
        </div>

      </el-card>
    </div>
    <div style="display: flex">
      <div class="sidebar-container">
        <sidebar/>
      </div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default {
  name: "User",
  components: {Header, Sidebar},
  data() {
    return {
      nickname: "nickname0",
      avatarUrl: "https://img-static.mihoyo.com/avatar/avatar10014.png",
      followed: false,
      followers: 100,
      posts: 200,
    }
  },
  methods: {
    handleFollow() {
      console.log(this.$store.state.user.username)
      console.log(this.$store.state.loggedIn)
      console.log(this.$route.params.username)
      if (this.followed) {
        // todo: post not follow
        this.followed = false;
      } else {
        // todo: post follow
        this.followed = true
      }
    }
  },
  computed: {
    followState() {
      if (this.followed === false) {
        return "关注"
      } else {
        return "已关注"
      }
    }
  }
}
</script>

<style scoped>
.user-card-container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 30px;
}

.avatar_container {
  width: 100px;
  height: 100px;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.sidebar-container {
  margin-top: 20px;
  margin-left: 30px;
}
</style>