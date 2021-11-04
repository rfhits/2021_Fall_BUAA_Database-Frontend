<template>
  <el-card class="card">
    <div class="card-header" @click="goToPage">
      <div class="avatar_container">
        <img :src=cardData.avatarUrl class="avatar_img">
      </div>
      <a style="margin-left: 10px;">{{ cardData.nickname }}</a>
      <p style="font-size: 12px; margin: 0px 10px; color: #999">{{ cardData.time }}</p>
    </div>

    <div class="content">
      {{ cardData.content }}
    </div>

    <div class="footer">

    </div>
  </el-card>

</template>

<script>
export default {
  name: "CommentCard",
  props: {
    cardData: {type: Object, required: true}
  },
  methods: {
    goToPage() {
      this.$router.push("/user/" + this.cardData.username)
    }
  }
}
</script>

<style scoped>


.card {
  width: 600px;
}

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
  color: #999;
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
  flex-direction: row-reverse;
}

.data {
  display: flex;
  font-size: 14px;
  color: #999;
  align-items: center;
  margin: 3px 20px;
}


</style>