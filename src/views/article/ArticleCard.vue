<template>
  <el-card class="card">
    <div class="card-header">
      <div class="avatar_container">
        <img src="https://img-static.mihoyo.com/avatar/avatar10014.png" class="avatar_img">
      </div>
      <a style="margin-left: 10px;" href="">user_000</a>
      <p style="font-size: 12px; margin: 0px 10px; ">7小时前·官方</p>
    </div>
    <a class="card-content" style="display: block">
      <div style="display: flex">
        <h3 style="margin: 10px 0px; color: #333; font-weight: bold">Hello, Hu Tao</h3>
      </div>
      <div class="brief">
        活动期间，旅行者可以在活动祈愿中获得更多角色与武器，组建强大的队伍！
        〓祈愿介绍〓●活动期间，限定五星角色「雪霁梅香·胡桃(火)」的祈愿获取概率将大幅提升！●活动期间，四星角色「渡来介者·托马
      </div>
      <div class="preview" style="display: flex;">
        <img style="border-radius: 6px" src="https://upload-bbs.mihoyo.com/upload/2021/10/29/75276539/58f93aa54eeb06c327e159d1ed8b3bea_1303088191273586996.jpg?x-oss-process=image/resize,s_300/quality,q_80/auto-orient,0/interlace,1/format,jpg">
      </div>
    </a>
    <div class="footer">
      <div class="data">
        <LikeOutlined />
        <span>10+</span>
      </div>

      <div class="data">
        <CommentOutlined/>
        <span>10+</span>
      </div>

      <div class="data">
        <EyeOutlined />
        <span>10+</span>
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
  }
}


</script>

<style scoped>


.card {
  width: 700px;
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
}
.preview {
  margin: 10px 0px;
  height: 120px;
  width: 120px;
  ;
}

.footer {
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