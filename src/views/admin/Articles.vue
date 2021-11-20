<template>
  <div class="root">
    <div class="op_on_table">
      <el-input v-model="keyword" placeholder="搜索文章" style="width: 40%; margin-left: 0"></el-input>
      <el-button type="primary" style="margin-left: 20px" @click="load()">search</el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column label="链接"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleDrop(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
          style="margin: 10px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";
import {defineComponent, ref} from 'vue'

export default {
  name: "Articles",
  components: {},
  data() {
    return {
      form: {},
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableData: [{
        id: 'articleId',
        title: 'title',
        authorName: 'authorName',
        date: "date:2021",
      }],
    }
  },
  computed: {},
  methods: {
    load() {
      console.log(this.keyword)
      request.get("/article/search/", {
        params: {
          keyword: this.keyword,
          pageNumber: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          this.tableData = res.data.articleList
          this.total = res.data.articleList.length
          let i = 0, length = this.tableData.length
          for (; i < length; i++) {
            this.tableData[i].link = '/article/' + this.tableData[i].id
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
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.load()
    },
    handleEdit(row) {
      this.editTableVisible = true
      this.editUser = row
      this.editUser.gender = row.gender.toString()
      this.editUser.refGender = ref(this.editUser.gender)
    },
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