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
  <el-card :body-style="{width: 'this.cardWidth'}">
    <div class="comment-time" style="color: #999">
      <ClockCircleOutlined />
      {{ cardData.date }}
    </div>

    <div class="content">
      {{ cardData.content }}
    </div>

    <div class="reply-article">
      回复帖子：{{this.cardData.articleTitle}}
    </div>

    <div style="display: flex; align-items: center; font-size: 16px">
      <LikeOutlined :style="{color:likeColor}" @click="like()"></LikeOutlined>

      <span style="color: #999; margin-left: 5px">{{ cardData.likes }}</span>
    </div>

  </el-card>

</template>

<script>
import {LikeOutlined, ClockCircleOutlined} from '@ant-design/icons-vue'
import request from "../../api/request";

export default {
  name: "PersonalCommentCard",
  components: {
    LikeOutlined,
    ClockCircleOutlined
  },
  props: {
    cardData: {type: Object, required: true},
    cardWidth: {type: Object, required: true}
  },
  methods: {
    goToPage() {
      this.$router.push("/user/" + this.cardData.username)
    },
    like() {
      if (this.cardData.liked) {
        request.get("/comment/dislike/", {
          params: {
            username: this.$store.state.user.username,
            commentId:  this.cardData.commentId
          }
        }).then(res => {

        })
        this.cardData.liked = false;
        this.cardData.likes -= 1;
      } else {
        request.get("/comment/like/", {
          params: {
            username: this.$store.state.user.username,
            commentId:  this.cardData.commentId
          }
        }).then(res => {
          console.log(res)
        })
        this.cardData.liked = true
        this.cardData.likes += 1;
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

.content {
  display: flex;
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}

.comment-time {
  text-align: left;
}

.reply-article {
  text-align: left;
  background-color: #f7f8fc;
  color: #999;
  margin: 10px 0;
  padding: 10px;
}

</style>