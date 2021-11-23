<template>
  <div class="root">
    <div class="op_on_table">
      <el-input v-model="searchText" placeholder="搜索用户" style="width: 40%; margin-left: 0"></el-input>
      <el-button type="primary" style="margin-left: 20px" @click="load()">search</el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="genderStr" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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

    <div class="dialog-container">
      <el-dialog
          v-model="this.editTableVisible"
          title="Tips"
          width="30%"
      >
        <el-form
            ref="ruleForm"
            :model="this.editUser"
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item label="username" prop="username">
            <el-input v-model="editUser.username" ></el-input>
          </el-form-item>

          <el-form-item label="nickname" prop="nickname">
            <el-input v-model="editUser.nickname"></el-input>
          </el-form-item>

          <el-form-item label="gender" prop="gender">
            <el-radio-group v-model=editUser.refGender>
              <el-radio label='0'>male</el-radio>
              <el-radio label="1">female</el-radio>
              <el-radio label="2">secret</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <el-button @click="editTableVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm()">Confirm
        </el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";
import { defineComponent, ref } from 'vue'

export default {
  name: "Users",
  components: {},
  data() {
    return {
      form: {},
      searchText: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableData: [{
        username: 'username',
        nickname: 'nickname',
        gender: 2,
        age: 16,
      }],
      editTableVisible: false,
      editUser: {
        username: "",
        nickname: "",
        gender: "",
        refGender: "",
        age: "",
      }
    }
  },
  computed: {

  },
  methods: {
    refGender(gender) {
      return ref(gender);
    },
    genderInt2Str(gender) {
      if (gender === 0) {
        return "male";
      } else if (gender === 1) {
        return "female"
      } else {
        return "secret"
      }
    },
    load() {
      console.log(this.searchText)
      request.get("/admin/manage/users/", {
        params: {
          keyword: this.searchText,
          pageNumber: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          this.tableData = res.data.userList
          this.total = res.data.userList.length
          let i = 0, length = this.tableData.length
          for (; i < length; i++) {
            this.tableData[i].genderStr = this.genderInt2Str(this.tableData[i].gender)
          }
        } else {
          alert("search user failed")
        }
      }).catch(err => {
        console.log("err: " + err);
      })
    },
    handleDrop(row) {
      let dropForm = {
        "username": row.username,
      }
      request.post("/admin/manage/delete-user/", dropForm).then(res => {
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
    handleConfirm() {
      console.log(this.editUser);
      this.editTableVisible = false
      request.post('@/admin/manage/user/', {
        username: this.editUser.username,
        nickname: this.editUser.nickname,
        age: this.editUser.age,
        gender: this.editUser.gender
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("修改成功❤")
          this.load()
        } else {
          alert("修改失败")
        }
      }).catch(err => {
        console.log("err: " + err);
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
  display: block;
}

.op_on_table {
  margin: 20px 0;
}

.table-container {
  width: 800px;
}
</style>