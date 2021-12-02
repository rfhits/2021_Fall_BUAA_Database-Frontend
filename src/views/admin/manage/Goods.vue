<template>
  <div class="root">
    <div class="op_on_table">
      <el-button type="primary" style="margin-right: 20px" @click="showAddForm">新增商品</el-button>
      <div>
        <el-input v-model="keyword" placeholder="搜索商品" style="width: 66%;" @keyup.enter.native="load()"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="load()">搜索</el-button>
      </div>

    </div>

    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="库存"></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-popconfirm title="确认删除吗？" @confirm="deleteGood(scope.row)">
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
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
          style="margin: 10px"
      >
      </el-pagination>
    </div>

    <!--    add a good-->
    <el-dialog v-model="this.newGoodFormVisible" title="新增商品">
      <div class="new-good-form">
        <div class="upload-container">
          <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <div v-if="this.newGoodForm.imgB64" class="upload-img-container">
              <img :src="this.newGoodForm.imgB64" alt="avatar" class="avatar_img"/>
            </div>
            <div v-else style=" width: 200px; height: 200px; margin: 0 auto;">
              <PlusOutlined :style="{fontSize: '30px', color: '#08c', marginTop: '75px'}"/>
            </div>
          </a-upload>
        </div>

        <el-input v-model="newGoodForm.name" placeholder="商品名称"></el-input>
        <el-input v-model="newGoodForm.price" placeholder="商品单价"></el-input>
        <el-input v-model="newGoodForm.quantity" placeholder="商品库存"></el-input>
        <el-input
            v-model="newGoodForm.content"
            placeholder="商品描述"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            style="width: 400px; margin: 0 auto 10px auto;"
        ></el-input>
        <div style="display: flex; justify-content: space-between; width: 70%">
          <el-button @click="cancelNewGood()">取消</el-button>
          <el-button type="primary" @click="saveNewGood()">保存</el-button>
        </div>

      </div>
    </el-dialog>

    <!--    编辑商品-->
    <el-dialog v-model="this.editGoodFormVisible" title="编辑商品">
      <div class="new-good-form">
        <el-input v-model="editGoodForm.name" placeholder="商品名称"></el-input>
        <el-input v-model="editGoodForm.price" placeholder="商品单价"></el-input>
        <el-input v-model="editGoodForm.quantity" placeholder="商品库存"></el-input>
        <el-input
            v-model="editGoodForm.content"
            placeholder="商品描述"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            style="width: 400px; margin: 0 auto 10px auto;"
        ></el-input>
        <div style="display: flex; justify-content: space-between">
          <el-button @click="cancelEditGood()">取消</el-button>
          <el-button type="primary" @click="saveEditGood()">保存</el-button>

        </div>

      </div>
    </el-dialog>
  </div>


</template>

<script>
import request from "@/api/request";
import {getBase64} from "@/api/utils";
import {PlusOutlined} from '@ant-design/icons-vue'

export default {
  name: "Goods",
  components: {PlusOutlined},
  data() {
    return {
      keyword: "",
      newGoodFormVisible: false,
      newGoodForm: {
        name: "",
        imgB64: "",
        price: "",
        quantity: "",
        content: "",
      },
      editGoodFormVisible: false,
      editGoodForm: {
        name: "",
        imgB64: "",
        price: "",
        quantity: "",
        content: "",
      },
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableData: [
        {
          id: 233,
          name: "fury toy",
          price: 251,
          quantity: 233,
          imgUrl: "",
          content: "good content"
        }
      ],
    }
  },
  computed: {},
  methods: {
    load() {
      request.get("/good/search/", {
        params: {
          keyword: this.keyword,
        }
      }).then(res => {
        console.log(res);
        if (res.status === 0) {
          this.tableData = res.data.goodList
          this.total = res.data.goodList.length
          let i = 0, length = this.tableData.length
        } else {
          alert("search good failed")
        }
      }).catch(err => {
        console.log("err: " + err);
      })
    },
    handleDrop(row) {
      request.post("/admin/manage/delete-good/", {
        id: row.id,
      }).then(res => {
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
      this.editGoodFormVisible = true
      this.editGoodForm = row
    },
    showAddForm() {
      this.newGoodFormVisible = true
    },
    beforeUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.newGoodForm.imgB64 = imageUrl;
      });
      return false;
    },
    handleChange(info) {
      console.log(info)
      let _this = this;
      this.file = info.file;
      getBase64(info.file, imageUrl => {
        _this.uploadB64 = imageUrl;
      });
    },
    cancelNewGood() {
      this.newGoodForm = {}
      this.newGoodFormVisible = false
    },

    saveNewGood() {
      request.post('/admin/manage/post-good/', {
        good: this.newGoodForm
      }).then(res => {
        if (res.status === 0) {
          this.$message.success('商品发布成功')
          this.load()
        } else {
          alert("good add failed")
        }
      }).catch(err => {
        console.log(err)
      })
      this.newGoodForm = {}
      this.newGoodFormVisible = false
    },

    saveEditGood() {
      request.post('/admin/manage/edit-good/', {
        good: this.editGoodForm
      }).then(res => {
        if (res.status === 0) {
          this.$message.success('商品编辑成功')
          this.load()
        } else {
          alert("good edit failed")
        }
      }).catch(err => {
        console.log(err)
      })
      this.editGoodForm = {}
      this.editGoodFormVisible = false
    },

    cancelEditGood() {
      this.editGoodForm = {}
      this.editGoodFormVisible = false
    },
    deleteGood(row) {
      request.post('/admin/manage/delete-good', {
        id: row.id
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("delete success")
          this.load()
        } else {
          alert("delete failed")
        }
      }).catch(err => {
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
  display: block;
}

.op_on_table {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.table-container {
  width: 700px;
}

.new-good-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0px auto;
}


.avatar_img {
  width: 100%;
  height: 100%;
  border: 3px solid #ebebeb;
  vertical-align: top;
}


.upload-img-container {
  width: 150px;
  height: 150px;
  margin: 20px auto;
  background-color: white;
}

.new-good-form .el-input {
  margin: 0 auto 10px auto;
  width: 400px;
}

</style>