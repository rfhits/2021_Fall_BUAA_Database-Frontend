<template>
  <div class="page_container">
    <div class="avatar_editor">
      <div class="avatar_container">
        <img class="avatar_img" :src=this.$store.state.user.avatarUrl>
        <div style="width: 80px; margin: 0 auto">
          <el-link style="margin-top: 15px" @click="dialogVisible = true">修改头像</el-link>
        </div>

      </div>

    </div>
    <div class="text-editor">
      <div class="nickname-editor">
        <div style="margin-right: 20px">昵称</div>
        <el-col :span="16">
          <el-input
              v-model="infoForm.nickname"
          ></el-input>
        </el-col>
      </div>

      <div class="gender-selector">
        <div style="padding-right: 20px">性别</div>
        <el-radio-group v-model="this.infoForm.gender">
          <el-radio label='0'>男</el-radio>
          <el-radio label='1'>女</el-radio>
          <el-radio label='2'>保密</el-radio>
        </el-radio-group>
      </div>

      <div style="width: 100px; margin:0 auto">
        <el-button @click="submitInfo()">保存</el-button>
      </div>

    </div>
  </div>

<!--  avatar uploader-->
  <el-dialog v-model="dialogVisible" title="上传头像" >
    <div style="display: flex; flex-direction: column; align-items: center">
      <div class="upload-container">
        <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
        >
          <div v-if="uploadB64" class="upload-img-container">
            <img :src="uploadB64" alt="avatar" class="avatar_img"/>
          </div>
          <div v-else style=" width: 200px; height: 200px; margin: 0 auto">
            <PlusOutlined :style="{fontSize: '30px', color: '#08c', marginTop:'80px'}"/>
          </div>
        </a-upload>
      </div>
      <el-button @click="saveNewAvatar()">保存头像</el-button>
    </div>

  </el-dialog>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {getBase64} from "../../api/utils";
import request from "../../api/request";
import {PlusOutlined} from '@ant-design/icons-vue'

export default {
  name: "EditInfo",
  components: {
    PlusOutlined
  },
  data() {
    return {
      dialogVisible: false,
      uploadB64: null,
      infoForm: {
        nickname: "",
        genderIndex: '',
        gender: this.$store.state.user.gender
      },
    }
  },
  computed: {
    copiedNickname() {
      return this.$store.state.user.nickname
    },

  },
  methods: {
    beforeUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.uploadB64 = imageUrl;
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
    saveNewAvatar() {
      request.post("/user/change-avatar/", {
        "user": {
          username: this.$store.state.user.username,
          avatarB64: this.uploadB64,
        }
      }).then((res) => {
        if (res.status === 0) {
          this.$store.commit('setAvatarUrl', res.data);
          this.dialogVisible = false;
          this.$message.success("save success")
          console.log("responds avatarUrl is " + res.data.avatarUrl)
          console.log("the store avatar url is " + this.$store.state.user.avatarUrl)
        } else {
          this.$message.error(res.statusInfo.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },

    submitInfo() {
      request.post("/user/edit-info/", {
        "user": {
          username: this.$store.state.user.username,
          nickname: this.infoForm.nickname,
          gender: this.infoForm.gender
        }
      }).then((res) => {
        if (res.status === 0) {
          this.$store.commit('setInfo', {
            nickname: this.infoForm.nickname,
            gender: this.infoForm.gender
          });
          this.$message.success("个人信息修改成功❤")
        } else {
          this.$message.error(res.statusInfo.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  created() {
    this.infoForm.nickname = this.$store.state.user.nickname;
    this.genderIndex = this.$store.state.user.gender;
  }
}
</script>

<style scoped>

.page_container {
  background-color: #ffffff;
  height: 508px;
  padding-top: 30px;
}

.avatar_editor {
  padding: 20px;
}

.avatar_container {
  width: 160px;
  height: 160px;
  margin: 20px auto;
  display: block;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #ebebeb;
  vertical-align: top;
}

.upload-container /deep/ .ant-upload-picture-card-wrapper {
  display: flex;
}

.avatar-uploader /deep/ .ant-upload {
  width: 160px;
  height: 160px;
  margin: 20px auto;
}

.upload-img-container {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  background-color: white;
}


.text-editor {
  margin: 20px;
}

.nickname-editor {
  display: flex;
  width: 300px;
  margin: 20px auto;
  align-items: center;
}

.gender-selector {
  display: flex;
  width: 300px;
  margin: 20px auto;
  align-items: center;
}
</style>