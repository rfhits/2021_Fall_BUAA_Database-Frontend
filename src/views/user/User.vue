<template>
  <div class="root">
    <div class="user-card-container">
      <el-card :body-style="{display: 'flex', alignItems: 'center'}">
        <div class="avatar_container">
          <img v-if="isSelf" :src=this.selfAvatarUrl class="avatar_img" alt="alt">
          <img v-else :src=this.avatarUrl class="avatar_img" alt="alt">
        </div>
        <div style="margin-left: 20px">
          <h2 style="font-weight: bold">{{ this.nickname }}</h2>
          <div v-if="this.$store.state.user.username===this.$route.params.username">
            <el-button
                @click="goToEditInfoPage()"
            >
              编辑
            </el-button>
          </div>
          <div v-else>
            <el-button
                v-if="this.followed"
                type="info"
                round
                @click="handleFollow()"
            >
              {{ followState }}
            </el-button>
            <el-button
                v-else
                type="primary"
                round
                @click="handleFollow()"
            >
              {{ followState }}
            </el-button>
          </div>
        </div>

        <div style="width: 550px"></div>

        <div style="display: flex; color: #999">
          <div style="font-size: 20px; margin-right: 20px; display: flex; flex-direction: column; align-items: center">
            <div>{{ this.followers }}</div>
            <span>粉丝</span>
          </div>
          <el-divider direction="vertical" style="height: 50px;"></el-divider>
          <div style="font-size: 20px; margin-left: 20px; display: flex; flex-direction: column; align-items: center">
            <div>{{ posts }}</div>
            <span>文章</span>
          </div>
        </div>

      </el-card>
    </div>

    <div class="action-container">
      <div style="display: flex">
        <div class="sidebar-container">
          <sidebar/>
        </div>

        <div class="router-container">
          <router-view @updataAvatarUrl="updataAvatarUrl"></router-view>
        </div>

      </div>
    </div>

    <div class="footer"></div>
  </div>

</template>

<script>
import Sidebar from "../../components/UserSidebar";
import Header from "../../components/Header";
import request from "@/api/request";

export default {
  name: "User",
  components: {Header, Sidebar},
  data() {
    return {
      followed: false,
      followers: 100,
      posts: 200,
      nickname: "",
      avatarUrl: "",
    }
  },
  computed: {
    buttonFollowType() {
      if (this.followed) {
        return "info"
      } else {
        return "primary"
      }
    },

    followState() {
      if (this.followed === false) {
        return "关注"
      } else {
        return "已关注"
      }
    },
    isSelf() {
      return this.selfUsername === this.viewedUsername
    },
    selfUsername() {
      return this.$store.state.user.username
    },
    viewedUsername() {
      return this.$route.params.username
    },
    selfAvatarUrl() {
      return this.$store.state.user.avatarUrl
    }
  },
  methods: {
    load() {
      // load the viewed user info
      request.post('user/simple-info/', {
        selfUsername: this.selfUsername,
        viewedUsername: this.viewedUsername
      }).then(res => {
        if (res.status === 0) {
          this.nickname = res.data.nickname;
          this.avatarUrl = res.data.avatarUrl;
          this.posts = res.data.posts;
          this.followers = res.data.followers;
          this.followed = res.data.followed
        } else {
          alert("get user info failed")
        }
      })
    },
    handleFollow() {
      console.log(this.$store.state.user.username)
      console.log(this.$store.state.loggedIn)
      console.log(this.$route.params.username)
      if (this.followed) {
        this.followed = false;
        request.post('user/unfollow-user/', {
          selfUsername: this.$store.state.user.username,
          otherUsername: this.$route.params.username
        }).then(res => {
          if (res.status === 0) {
            console.log('unfollow success')
            this.followers--
          } else {
            alert("unfollowe failed")
          }
        })
      } else {
        this.followed = true
        request.post('user/follow-user/', {
          selfUsername: this.$store.state.user.username,
          otherUsername: this.$route.params.username
        }).then(res => {
          if (res.status === 0) {
            console.log('follow success')
            this.followers++
          } else {
            alert("unfollow failed")
          }
        })
      }
    },
    updataAvatarUrl(avatarUrl) {
      this.avatarUrl = avatarUrl
    },
    goToEditInfoPage() {
      this.$router.push("/user/" + this.selfUsername + "/edit-info")
    }
  },

  created() {
    this.load();
  },

}
</script>

<style scoped>
.root {
  background-color: #f0f1f5;
  display: flex;
  flex-direction: column;
  /*height: 100%;*/
}

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
  border: 4px solid #ebebeb;
  vertical-align: top;
}

.action-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f1f5;
}

.sidebar-container {
  margin-top: 10px;
  margin-left: 0;
  margin-right: 40px;
}

.router-container {
  margin-top: 20px;
  width: 770px;
}

.footer {
  height: 30px;
}
</style>