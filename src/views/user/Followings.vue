<template>
  <UserFollowingCard v-for="user in this.followings" :user="user"></UserFollowingCard>
  <NoData v-if="this.followings.length === 0" :message="'还没有关注呢'"></NoData>

</template>

<script>
import request from "@/api/request";
import NoData from "@/components/UserNoData"
import UserFollowingCard from "@/components/UserFollowingCard";

export default {
  name: "Followings",
  components: {UserFollowingCard, NoData},
  data() {
    return {
      followings: [

      ],
      fakeData: [
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

  },
  methods: {
    buttonFollowType() {
      return function (followed) {
        if (followed) {
          return "info"
        } else {
          return "primary"
        }
      }
    },
    load() {
      request.post('user/view-leaders/', {
        selfUsername: this.$store.state.user.username,
        viewedUsername: this.$route.params.username
      }).then(res => {
        if (res.status === 0) {
          this.followings = res.data.leaders
        } else {
          alert("get followings failed")
        }
      })
    },
    goTo(url) {
      this.$router.push(url)
    },
    handleFollow(follower) {
      let url = (follower.followed)? "/user/unfollow-user/": "/user/follow-user/";
      request.post(url, {
        "selfUsername": this.$store.state.user.username,
        "otherUsername": follower.username
      }).then( res=> {
        if (res.status === 0) {
          follower.followed = !follower.followed
        } else {
          console.log(res.status)
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err)=> { // cant post
        console.log(err)
      })
    },

  },
  created() {
    this.load()
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