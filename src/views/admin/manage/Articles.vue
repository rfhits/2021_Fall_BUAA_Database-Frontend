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
        <el-table-column label="文章链接">
          <template #default="scope">
            <el-link
                :href="articleIdToLink(scope.row.articleId)"
                target="_blank"
            >
              {{ articleIdToLink(scope.row.articleId) }}
            </el-link>
          </template>

        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-popconfirm title="确认删除吗？此操作将不可撤回" @confirm="handleDrop(scope.row)">
              <template #reference>
                <el-button type="danger" size="mini">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[7, 10, 20, 30]"
          :page-size="this.pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="this.total"
          style="margin: 10px"
      >
      </el-pagination>
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
      currentPage: 1,
      pageSize: 7,
      total: 0,
      keyword: "",
      articleList: [
        {
          id: '233',
          title: 'title',
          username: 'username',
          postDate: "2021-00-00",
        }
      ],
      deleteAlert: "line1 \ " +
          "line2"
    }
  },
  computed: {
    articleIdToLink() {
      return function (articleId) {
        return "/article/" + articleId
      }
    },

  },
  methods: {
    load() {
      request.get('admin/manage/article/search/', {
        params: {
          keyword: this.keyword,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          this.articleList = res.data.articleList
          this.total = res.data.total
          let i = 0
          let length = this.articleList.length
          for (; i < length; i++) {
            this.articleList[i].link = '/article/' + this.articleList[i].articleId
            this.articleList[i].postDate = formatDate(this.articleList[i].postDate)
          }
        } else {
          this.$message.error(res.statusInfo.message)
        }
      }).catch(err => {
        console.log("err: " + err);
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.load()
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