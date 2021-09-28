<template>
  <div>
    <div class="op_on_table" style="margin: 20px">
      <el-input v-model="searchText" placeholder="搜索课程名称" style="width: 20%; margin-left: 0"></el-input>
      <el-button type="primary" style="margin-left: 20px" @click="load()">search</el-button>
    </div>

    <el-table :data="tableData" border >
      <el-table-column prop="courseID" label="课程ID" sortable> </el-table-column>
      <el-table-column prop="courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="teacher" label="授课教师"> </el-table-column>
      <el-table-column prop="courseHours" label="课程学时"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button @click="handleSelect(scope.row)" type="text" size="small">选课</el-button>
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
// @ is an alias to /src
import request from "../../api/request";

export default {
  name: 'SelectCourse',
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
      request.get("/manage/select-course/search-course/" , {
        params: {
          "searchText": this.searchText
        }
      }).then(res=>{
        console.log(res);
        this.tableData = res.data.courseTable
      })
    },

    handleSelect(row) {
      let selectForm = {
        "userID": this.$store.user.userID,
        "courseID": row.courseID,
      }
      request.post("/manage/select-course/select/", selectForm).then(res=>{
        if (res.status === 0) {
          this.$message.success("选课成功")
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
