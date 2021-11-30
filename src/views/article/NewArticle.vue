<template>
  <div style="display: flex; padding-top: 50px; background-color: rgb(240, 241, 245)">
    <div class="page-container">
      <div class="title-input">
        <el-input v-model="article.title" placeholder="标题"></el-input>
      </div>

      <div class="editor">
        <ArticleEditor v-model="article.content"></ArticleEditor>
      </div>

      <div class="cover-upload-container">
        <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
        >
          <img v-if="article.coverB64" :src="article.coverB64" alt="avatar" width="200"/>
          <div v-else>
            <div>
              上传封面
            </div>
          </div>
        </a-upload>
      </div>

      <div class="topic-input">
        <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="mini"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag"
                   size="small"
                   @click="showInput"
                   style="margin-bottom: 10px;"
        >
          输入话题
        </el-button>
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
import {getBase64, trim} from "@/api/utils.js"
import ArticleEditor from "@/components/editor/index"
import {PlusSquareOutlined} from '@ant-design/icons-vue'
import {LikeOutlined, EyeOutlined, CommentOutlined} from '@ant-design/icons-vue'
import request from "../../api/request";

export default {
  name: "NewArticle",
  components: {
    PlusSquareOutlined,
    ArticleEditor,
  },
  data() {
    return {
      article: {
        title: "",
        radio: 1,
        content: "",
        coverB64: null,
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },

  methods: {
    beforeUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.article.coverB64 = imageUrl;
      });
      return false;
    },

    handleChange(info) {
      console.log(info)
      let _this = this;
      this.file = info.file;
      getBase64(info.file, coverUrl => {
        _this.article.coverB64 = coverUrl;
      });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(trim(inputValue))
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    validateArticle() {
      if (this.article.title === "") {
        this.$message.error("少侠，你好像忘记输入标题了")
        return false
      }

      if (this.article.content === "") {
        this.$message.error("少侠，写点什么吧")
        return false
      }
      return true

    },

    post() {
      if (!this.validateArticle()) return;

      let topics = this.dynamicTags.slice()
      if (this.article.radio === 1) {
        topics.push("酒馆")
      } else if (this.article.radio === 2) {
        topics.push("攻略")
      } else {
        topics.push("同人")
      }
      let _this = this
      request.post("/article/post-article/", {
        "username": this.$store.state.user.username,
        "article": _this.article,
        "topics": topics
      }).then((res) => {
        if (res.status === 0) {
          let articleId = res.data.articleId
          this.$router.push("/article/" + articleId)
        } else {
          this.$message.error(res.statusInfo.message);
        }
      }).catch((err) => {
        _this.submitting = false;
        console.log(err);
      })
    }
  },
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

.cover-upload-container {
  /*width: 250px;*/
  margin: 30px 400px 10px 400px;
  text-align: center;
}

.avatar-uploader /deep/ .ant-upload {
  width: 200px;
  height: 200px;
  margin: 20px auto;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.post-button {
  margin: 40px;
}


</style>