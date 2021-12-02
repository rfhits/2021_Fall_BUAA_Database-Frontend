<template>
  <el-card>
    <div class="card-container">
      <div class="avatar_container">
        <img :src='this.user.avatarUrl' class="avatar_img">
      </div>
      <el-link
          style="margin-left: 15px;"
          :href="'/user/' + this.user.username"
      >
        {{ this.user.nickname }}
      </el-link>

      <div class="follow-action" style="margin-left: 460px">
        <el-button v-if="this.user.followed"
            type="info"
            round
            @click="handleFollow()">
          {{followText(user.followed)}}
        </el-button>
        <el-button v-else
                   type="primary"
                   round
                   @click="handleFollow()">
          {{followText(user.followed)}}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/api/request";

export default {
  name: "UserFollowingCard",
  props: {
    user: {type: Object, required: true}
  },
  data() {
  },
  computed: {
    followText() {
      return function (followed) {
        if (followed) {
          return "已关注"
        } else {
          return "关注"
        }
      }
    },

    buttonFollowType() {
      if (this.user.followed) {
        return "info";
      } else {
        return "primary"
      }
    },

  },
  methods: {
    goTo(url) {
      this.$router.push(url)
    },

    checkFollow() {
      if (this.user.username === this.$store.state.user.username) {
        this.$message.error("您不能关注自己")
        return false
      }
      return true
    },

    handleFollow() {
      if(!this.checkFollow()) return false
      let url = (this.user.followed)? "/user/unfollow-user/": "/user/follow-user/";
      request.post(url, {
        "selfUsername": this.$store.state.user.username,
        "otherUsername": this.user.username
      }).then( res=> {
        if (res.status === 0) {
          this.user.followed = !this.user.followed
        } else {
          console.log(res.status)
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err)=> { // cant post
        console.log(err)
      })
    },

  },
}
</script>

<style scoped>

.card-container {
  display: flex;
  align-items: center;
}

.avatar_container {
  width: 60px;
  height: 60px;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #ebebeb;
  vertical-align: top;
}

</style>