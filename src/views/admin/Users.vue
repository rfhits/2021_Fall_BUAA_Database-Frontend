<template>
  <div>
    <div class="op_on_table" style="margin: 20px">
      <el-input v-model="searchText" placeholder="搜索用户" style="width: 40%; margin-left: 0"></el-input>
      <el-button type="primary" style="margin-left: 20px" @click="load()">search</el-button>
    </div>

    <el-table :data="tableData" border >
      <el-table-column prop="username" label="用户名" sortable> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button @click="handleDrop(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleDrop(scope.row)" type="text" size="small">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
        style="margin: 10px"
    >
    </el-pagination>
  </div>
</template>

<script>
import request from "@/api/request";

export default {
  name: "Users",
  data() {
    return {
      form: {

      },
      searchText: "",
      tableData: [

      ],
      currentPage: 1,
    }
  },
  created() {
    this.load();
  },

  methods: {
    load() {
      console.log(this.searchText)
      request.get("/admin/manage/users/" , {
        params: {
          searchText: this.searchText
        }
      }).then(res=>{
        console.log(res);
        this.tableData = res.data.courseTable
      })
    },

    handleDrop(row) {
      let dropForm = {
        "userID": this.$store.userID,
        "courseID": row.courseID,
      }
      request.post("/admin/manage/delete-user/", dropForm).then(res=>{
        if (res.status === 0) {
          this.$message.success("退课成功")
          this.load()
        } else {
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err)=> {
        console.log(err)
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},

  },
  components: {

  },




}
</script>

<style scoped>

</style>