<template>
  <Header head_index="1"></Header>
  <div style="display: flex; padding-top: 50px; background-color: rgb(240, 241, 245)">
    <div class="page-container">
      <div class="title-input">
        <el-input v-model="article.title" placeholder="标题"></el-input>
      </div>

      <div class="editor">
        <ArticleEditor v-model="article.content"></ArticleEditor>
      </div>

      <el-radio-group v-model="article.radio">
        <el-radio :label="1">酒馆</el-radio>
        <el-radio :label="2">攻略</el-radio>
        <el-radio :label="3">同人</el-radio>
      </el-radio-group>

      <div class="post-button" @click="post()">
        <el-button type="primary">
          发布文章
        </el-button>
      </div>

      <div class="footer"></div>
    </div>
  </div>


</template>

<script>
import Header from "../../views/Home"
import ArticleEditor from "../../components/editor/index"
export default {
  name: "NewArticle",
  components: {
    Header,
    ArticleEditor,
  },
  data() {
    return {
      article: {
        title : "",
        radio: 1,
        content: "hello"
      }

    }
  },
  methods: {
    post() {
      console.log(this.article)
    }
  }
}
</script>

<style scoped>
.page-container {
  text-align: center;
  margin: auto;
  width: 1000px;
  background-color: white;
}

.title-input {
  width: 700px;
  margin: 40px auto 40px auto;
}

.editor {
  width: 700px;
  margin: 20px auto;
}

.post-button {
  margin: 40px;
}
</style>