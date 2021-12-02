<template>
  <div class="root">
    <div class="op_on_table">
      <el-input v-model="keyword"
                placeholder="搜索文章"
                @keyup.enter.native="load()"
                style="width: 40%; margin-left: 0"/>
      <el-button type="primary" style="margin-left: 20px" @click="load()">搜索</el-button>
    </div>

    <div class="table-container">
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="username" label="作者"></el-table-column>
        <el-table-column prop="postDate" label="发布时间"></el-table-column>
        <el-table-column prop="link" label="文章链接"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleDrop(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";
import {formatDate} from "@/api/utils";
import {defineComponent, ref} from 'vue'

export default {
  name: "Articles",
  components: {},
  data() {
    return {
      form: {},
      keyword: "",
      articleList: [{
        id: '233',
        title: 'title',
        username: 'username',
        postDate: "2021-00-00",
      }],
    }
  },
  computed: {},
  methods: {

    load() {
      request.get('/article/search/', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          this.articleList = res.data.articleList
          let i = 0, length = this.articleList.length
          for (; i < length; i++) {
            this.articleList[i].link = '/article/' + this.articleList[i].articleId
            this.articleList[i].postDate = formatDate(this.articleList[i].postDate)
          }
        } else {
          alert("search article failed")
        }
      }).catch(err => {
        console.log("err: " + err);
      })
    },
    handleDrop(row) {
      let dropForm = {
        "articleId": row.id
      }
      request.post("/admin/manage/delete-article/", dropForm).then(res => {
        if (res.status === 0) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created() {
    this.load();
  },
}
</script>

<style scoped>

.root {
  display: flex;
  flex-direction: column;
}

.op_on_table {
  margin: 20px 0;
}

.table-container {
  width: 800px;
}
</style>