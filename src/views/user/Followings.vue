<template>
  <el-card
      v-for="follower in this.followers"
  >
    <div class="card-container">
      <div class="avatar_container">
        <img :src='follower.avatarUrl' class="avatar_img">
      </div>
      <el-link style="margin-left: 15px;" :href="'/user/' + follower.username">{{ follower.nickname }}</el-link>
      <div class="follow-action" style="margin-left: 460px">
        <!--        todo: followed and follow switch-->
        <el-button
            :type="buttonFollowType(follower.followed)"
            round
            @click="handleFollow(follower)">
          {{followText(follower.followed)}}
        </el-button>
      </div>
    </div>
  </el-card>

</template>

<script>
import request from "../../api/request";

export default {
  name: "Followings",
  data() {
    return {
      followers: [
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
      return function (followed) {
        if (followed) {
          return "info"
        } else {
          return "primary"
        }
      }

    }
  },
  methods: {
    goTo(url) {
      this.$router.push(url)
    },
    handleFollow(follower) {
      let url = (follower.followed)? "/user/unfollow-user": "/user/follow-user";
      follower.followed = !follower.followed
      request.post(url, {
        "selfUsername": this.$store.state.user.username,
        "otherUsername": follower.username
      }).then( res=> {
        if (res.status === 0) {

        } else {
          console.log(res.status)
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err)=> { // cant post
        console.log(err)
      })
    },

  }
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