<template>
  <el-card>
    <div class="card-container">
      <div class="avatar_container">
        <img :src='this.cardData.imgUrl' class="avatar_img">
      </div>
      <el-link style="margin-left: 15px;" :href="'/topic/' + cardData.id">{{ cardData.name }}</el-link>
      <div class="follow-action" style="margin-left: 460px">
        <el-button
            type="primary"
            round
            @click="goTo(this.topicUrl)">
          进入话题
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/api/request";

export default {
  name: "TopicCard",
  props: {
    cardData: {type: Object, required: true}
  },
  computed: {
    topicUrl() {
      return '/topic/'+ this.cardData.id;
    }
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    }
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