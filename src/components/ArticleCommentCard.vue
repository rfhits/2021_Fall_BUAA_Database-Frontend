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
      <div class="comment-time" style="color: #999">
        {{ this.formatedDate }}
      </div>
      <div style="display: flex; align-items: center; font-size: 16px">
        <LikeOutlined :style="{color:likeColor}" @click="like()"></LikeOutlined>
        <span style="color: #999; margin-left: 5px">{{ cardData.likes }}</span>
      </div>

    </div>
  </el-card>

</template>

<script>
import request from "@/api/request";
import {formatDate} from "@/api/utils";
import {LikeOutlined} from '@ant-design/icons-vue'

export default {
  name: "ArticleCommentCard",
  components: {
    LikeOutlined,
  },
  props: {
    cardData: {type: Object, required: true}
  },
  computed: {
    likeColor() {
      if (this.cardData.liked) {
        return "#05c4ff"
      } else {
        return "#999"
      }
    },
    formatedDate() {
      return formatDate(this.cardData.date)
    }
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
            alert("post dislike failed")
          }
        }).catch(err => {
          console.log(err)
        })
      }
      // like a comment
      else {
        request.post("/comment/like/", {
          username: this.$store.state.user.username,
          commentId: this.cardData.commentId
        }).then(res => {
          if (res.status === 0) {
            this.cardData.liked = true
            this.cardData.likes += 1
          } else {
            alert("post dislike failed")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },

}
</script>

<style scoped>

.card-header {
  margin: 0 3% 0 3%;
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
  margin: 20px 5% 0 5%;
}

.footer {
  margin: 10px 5% 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.data {
  display: flex;
  font-size: 14px;
  color: #999;
  align-items: center;
  margin: 3px 20px;
}
</style>