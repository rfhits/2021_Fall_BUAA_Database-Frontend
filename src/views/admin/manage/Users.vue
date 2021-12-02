<template>
  <div class="root">
    <div class="op_on_table">
      <el-input v-model="searchText"
                placeholder="搜索用户"
                @keyup.enter.native="load()"
                style="width: 40%; margin-left: 0"></el-input>
      <el-button type="primary" style="margin-left: 20px"
                 @click="load()"
      >
        搜索
      </el-button>
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

<!--    edit user-->
    <div class="dialog-container">
      <el-dialog
          v-model="this.editTableVisible"
          title="编辑用户信息"
          width="30%"
      >
        <el-form
            ref="ruleForm"
            :model="this.editUser"
            label-width="80px"
            class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUser.username" ></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editUser.nickname"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model=editUser.gender>
              <el-radio label='0'>男</el-radio>
              <el-radio label="1">女</el-radio>
              <el-radio label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: space-between; margin: 0 30px">
          <el-button @click="editTableVisible = false">
            取消
          </el-button>

          <el-button type="primary" @click="handleConfirm()">
            确认
          </el-button>
        </div>

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
        return "男";
      } else if (gender === 1) {
        return "女"
      } else {
        return "保密"
      }
    },
    load() {
      console.log(this.searchText)
      request.get("/admin/manage/search-users/", {
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
          this.$message.error(res.statusInfo.message)
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
      request.post('/admin/manage/edit-user/', {
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