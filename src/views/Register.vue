<template>
  <div>
    <div style="margin-bottom: 50px">
      <Header></Header>
    </div>
    <div class="register-root">
      <div class="steps">
        <a-steps :current="currentStep" align-center>
          <a-step title="账号设置"></a-step>
          <a-step title="头像昵称"></a-step>
          <a-step title="完成"></a-step>
        </a-steps>
      </div>
      <div class="register-info">
        <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="rules"
            label-width="120px"
            status-icon
        >
<!--          current at 0-->
          <div v-if="currentStep === 0">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="registerForm.pass" type="password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="registerForm.checkPass" type="password" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
              <el-button type="primary" @click="nextStep()">下一步</el-button>
            </el-form-item>
          </div>

<!--          nickname and avatar-->
          <template v-if="currentStep === 1">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="registerForm.nickname"/>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
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
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="previousStep()">上一步</el-button>
              <el-button type="primary" @click="submitForm(registerForm)">提交</el-button>
            </el-form-item>
          </template>

        </el-form>
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

// import axios_service from "../../../api/request"
import Header from "@/components/Header";
import request from "../api/request";


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "Register",
  components: {
    Header,
  },
  data: function () {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户ID'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 8) {
        callback(new Error('密码至少应为8位'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    return {
      currentStep: 0,
      registerForm: {
        imgurl: '',
        nickname: '',
        username: '',
        pass: '',
        checkPass: '',
      },
      imageUrl: null,
      rules: {
        username: [{validator: validateUsername, trigger: 'change'}],
        pass: [{validator: validatePass, trigger: 'change'}],
        checkPass: [{validator: validatePass2, trigger: 'change'}],
      }
    };
  },
  methods: {
    previousStep() {
      this.currentStep = this.currentStep-1;
    },
    nextStep() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.currentStep += 1;
        } else {
          return false;
        }
      });
    },
    submitForm() {
      let _this = this;
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          request.post("/user/register/", {
            "user": {
              username: _this.registerForm.username,
              nickname: _this.registerForm.nickname,
              password: _this.registerForm.pass,
              avB: _this.imageUrl,
            }
          }).then((res) => {
              if (res.status === 0) {
                _this.currentStep++;
              } else {
                this.$message.error(res.statusInfo.message);
              }
          }).catch((err) => {
              _this.submitting = false;
              console.log(err);
          })
        } else {
          return false;
        }
      });
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
.s-skin-container {
  position: fixed;
  _position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  min-width: 1000px;
  z-index: -10;
  background-color: #cfe8fc;
  background-position: center 0;
  background-repeat: repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;
  animation: anim 25s linear infinite;
}
@keyframes anim {
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.register-root {
  background-color: #fff;
  padding: 32px;
  width: 80%;
  margin: 0 auto;
  text-align: left;
  border-radius: 16px;
  /*border-color: hsv(0, 0, 85%);*/
  border-width: 1px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.steps {
  margin: 0 auto;
}

.register-info {
  margin: 32px auto;
  width: 60%;
}

.button-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.button {
  margin: 0px 0px 0px 16px;
}

</style>
