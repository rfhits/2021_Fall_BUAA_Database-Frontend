<!-- props:
 {
   width,
   title
   nickname,
   username,
   avatarUrl,

 }-->


<template>
  <el-card :style="{width: cardData.width}">
    <div class="card-header" @click="goToPage">
      <div class="avatar_container">
        <img :src=cardData.avatarUrl class="avatar_img">
      </div>
      <a style="margin-left: 10px;">{{ cardData.nickname }}</a>
      <p style="font-size: 12px; margin: 0px 10px; color: #999">{{ cardData.time }}</p>
    </div>

    <a class="card-content" style="display: block">
      <div style="display: flex">
        <el-link
            :href="articleUrl"
            :underline="false"
            style="font-weight: bold; font-size: 18px"
        >{{ cardData.title }}
        </el-link>
      </div>
      <div class="brief">
        {{ cardData.brief }}
      </div>
      <div class="preview" style="display: flex;">
        <img style="border-radius: 6px" :src=cardData.coverUrl>
      </div>
    </a>
    <div class="footer">
      <div class="tags">
        <el-check-tag v-for="topic in tagSlice"
                      checked
                      size="small"
                      style="margin-right: 8px">{{ topic }}
        </el-check-tag>
      </div>

      <div class="datas">
        <div class="data">
          <LikeOutlined/>
          <span>{{ cardData.likes }}</span>
        </div>

        <div class="data">
          <CommentOutlined/>
          <span>{{ cardData.comments }}</span>
        </div>

        <div class="data">
          <EyeOutlined/>
          <span>{{ cardData.clicks }}</span>
        </div>
      </div>

    </div>
  </el-card>

</template>

<script>
import {LikeOutlined, EyeOutlined, CommentOutlined} from '@ant-design/icons-vue'

export default {
  name: "ArticleCard",
  components: {
    LikeOutlined,
    EyeOutlined,
    CommentOutlined
  },
  props: {
    cardData: {type: Object, required: true}
  },
  computed: {
    articleUrl() {
      return "/article/" + this.cardData.articleId;
    },
    tagSlice() {
      if (this.cardData.topics) {
        return this.cardData.topics.slice(0, 3)
      } else {

      }
    }
  },
  created() {


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
  width: 24px;
  height: 24px;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.brief {
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
  display: flex;
}

.preview {
  margin: 10px 0px;
  height: 120px;
  width: 120px;;
}

.footer {
  margin-top: 15px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  /*flex-direction: row-reverse;*/
}

.tags {
  width: 400px;
}

.datas {
  display: flex;
  width: 100%;
  /*align-items: center;*/
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