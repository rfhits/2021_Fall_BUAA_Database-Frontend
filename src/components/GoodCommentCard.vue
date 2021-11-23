<!--
data: {
  avataUrl,
  nickname,
  content,
  date,
  likes
}
-->
<template>
  <el-card :style="{width: this.cardData.width}">
    <div class="card-header" @click="goToPage">
      <div class="avatar_container">
        <img :src=cardData.avatarUrl class="avatar_img">
      </div>
      <a style="margin-left: 10px;">{{ cardData.nickname }}</a>
    </div>

    <div class="content">
      {{ cardData.content }}
    </div>

    <div class="footer">
      <div style="color: #999; float: left; width: 70px">
        {{ cardData.date }}
      </div>
    </div>
  </el-card>

</template>

<script>
import request from "@/api/request";
import {LikeOutlined} from '@ant-design/icons-vue'

export default {
  name: "GoodCommentCard",
  components: {
    LikeOutlined,
  },
  props: {
    cardData: {type: Object, required: true}
  },
  methods: {
    goToPage() {
      this.$router.push("/user/" + this.cardData.username)
    },
    like() {
      if (this.cardData.liked) {
        request.post("/comment/dislike/", {
          username: this.$store.state.user.username,
          commentId: this.cardData.commentId
        }).then(res => {
          if (res.status === 0) {
            this.cardData.liked = false;
            this.cardData.likes -= 1;
          } else {
            alert("like failed")
          }
        }).catch(err => {
          console.log(err)
        })
      }
      // not liked
      else {
        request.post("/comment/like/", {
          username: this.$store.state.user.username,
          commentId: this.cardData.commentId
        }).then(res => {
            if (res.status === 0) {
              this.cardData.liked = true
              this.cardData.likes += 1;
            } else {
              alert("like failed")
            }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  computed: {
    likeColor() {
      if (this.cardData.liked) {
        return "#05c4ff"
      } else {
        return "#999"
      }
    },
  }
}
</script>

<style scoped>

.card-header {
  display: flex;
  align-items: center;
}

.avatar_container {
  width: 35px;
  height: 35px;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.content {
  display: flex;
  margin-top: 20px;
}

.preview {
  margin: 10px 0px;
  height: 120px;
  width: 120px;;
}

.footer {
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.data {
  display: flex;
  font-size: 14px;
  color: #999;
  align-items: center;
  margin: 3px 20px;
}
</style>