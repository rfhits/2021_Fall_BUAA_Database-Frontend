<template>
  <div>
    <div style="height: 30px"></div>
    <div class="register-root">
      <div class="steps">
        <a-steps :current="currentStep" align-center>
          <a-step title="账号设置"></a-step>
          <a-step title="头像昵称"></a-step>
          <a-step title="完成"></a-step>
        </a-steps>
      </div>
      <div class="register-info">
        <!--          current at 0-->
        <div v-if="currentStep === 0" class="step-0">
          <el-input v-model="registerForm.username"
                    autocomplete="off"
                    placeholder="用户名"
          />

          <el-input v-model="registerForm.pass" type="password" autocomplete="off" placeholder="密码"/>

          <el-input v-model="registerForm.checkPass" type="password" autocomplete="off" placeholder="确认密码"/>

          <div style="display: flex; justify-content: space-between">
            <el-button @click="resetForm('registerForm')">
              重置
            </el-button>
            <el-button type="primary" @click="nextStep()">
              下一步
            </el-button>
          </div>
        </div>

        <!--          nickname and avatar-->
        <div v-if="currentStep === 1" class="step-1">

          <el-input v-model="registerForm.nickname" placeholder="昵称" style="width: 200px"/>

          <el-radio-group v-model="this.registerForm.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">保密</el-radio>
          </el-radio-group>

          <div style="display: flex; align-items: center">
            <div style="margin-right: 10px">年龄</div>
            <el-input-number v-model="registerForm.age" :min="12" :max="100"/>
          </div>


          <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="200"/>
            <div v-else>
              <PlusOutlined/>
              <div class="ant-upload-text">
                上传头像
              </div>
            </div>
          </a-upload>

          <div style="display: flex; justify-content: space-between">
            <el-button type="primary" @click="previousStep()">后退</el-button>
            <el-button type="primary" @click="submitForm(registerForm)">提交</el-button>
          </div>
        </div>
      </div>
      <div class="result" v-if="currentStep === 2">
        <a-result
            status="success"
            title="注册成功~"
            sub-title="欢迎来到原神社区！"
        >
          <template #extra>
            <a-button key="console" type="primary" @click="goToLogin">
              马上登陆
            </a-button>
          </template>
        </a-result>
      </div>
    </div>

  </div>
</template>

<script>
import request from "../api/request";
import {
  PlusOutlined,
  EditOutlined,
  LikeOutlined,
  EyeOutlined,
  CommentOutlined,
  AccountBookOutlined
} from '@ant-design/icons-vue'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "Register",
  components: {
    PlusOutlined
  },
  data() {
    return {
      currentStep: 0,
      registerForm: {
        imgurl: '',
        nickname: '',
        username: '',
        pass: '',
        checkPass: '',
        age: null,
        gender: 0,
      },
      imageUrl: null,
    };
  },
  methods: {
    previousStep() {
      this.currentStep = this.currentStep - 1;
    },
    checkUsername() {
      if (this.registerForm.username === "") {
        this.$message.error("please input username")
        return false
      } else {
        return true
      }
    },
    checkPassword() {
      if (this.registerForm.pass.length < 8) {
        this.$message.error("需要8位以上的密码长度")
        return false
      } else {
        return true
      }
    },
    checkPassTwo() {
      if (this.registerForm.pass !== this.registerForm.checkPass) {
        this.$message.error("两次密码不一致")
        return false
      } else {
        return true
      }
    },
    checkNickname() {
      if (this.registerForm.nickname === "") {
        this.$message.error("请输入昵称哟")
        return false
      } else {
        return true
      }
    },
    checkAvB64() {
      if (!this.imageUrl) {
        this.$message.error("请上传头像呦")
        return false
      } else {
        return true
      }
    },
    nextStep() {
      let passCheck = true
      passCheck = passCheck & this.checkUsername()
      passCheck = passCheck & this.checkPassword()
      passCheck = passCheck & this.checkPassTwo()
      if (passCheck) {
        this.currentStep += 1
      } else {

      }
    },
    submitForm() {
      if (!this.checkNickname()) return false
      if (!this.checkAvB64()) return false
      let _this = this;

      request.post("/user/register/", {
        "user": {
          username: _this.registerForm.username,
          nickname: _this.registerForm.nickname,
          password: _this.registerForm.pass,
          age: _this.registerForm.age,
          gender: _this.registerForm.gender,
          avB: _this.imageUrl,
        }
      }).then((res) => {
        if (res.status === 0) {
          this.currentStep += 1;
        } else {
          this.$message.error(res.statusInfo.message);
        }
      }).catch((err) => {
        _this.submitting = false;
        console.log(err);
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    beforeUpload(file, fileList) {
      let _this = this;
      getBase64(file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
      return false;
    },

    handleChange(info) {
      console.log(info)
      let _this = this;
      this.file = info.file;
      getBase64(info.file, imageUrl => {
        _this.imageUrl = imageUrl;
      });
    },
    goToLogin() {
      this.$router.push("/login");
    },
  }
}
</script>

<style scoped>
.register-root {
  background-color: #fff;
  padding: 32px;
  width: 80%;
  margin: 0 auto;
  text-align: left;
  border-radius: 16px;
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.steps {
  margin: 0 auto;
}

.register-info {
  margin: 30px auto;
  width: 500px;
}

.step-0 {
  width: 300px;
  margin: 0 auto;
}

.step-0 * {
  margin-bottom: 20px;
}

.step-1 {
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-1 * {
  margin-bottom: 10px;
}

.avatar-uploader {
  display: flex;
}

.avatar-uploader /deep/ .ant-upload {
  width: 200px;
  height: 200px;
  margin: 20px auto;
}
</style>
