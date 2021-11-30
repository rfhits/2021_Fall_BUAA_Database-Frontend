<template>
  <div class="page-container" style="; text-align:center">
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
        style="padding-top: 120px; margin: 0 auto 0 auto; width: 300px"

    >
      <el-form-item label="" prop="originPass">
        <el-input
            v-model="ruleForm.originPass"
            type="password"
            placeholder="旧密码"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="pass">
        <el-input
            v-model="ruleForm.pass"
            placeholder="新密码"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            placeholder="再输入新密码"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <div style="display: flex; justify-content: space-between">
        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
import request from "../../api/request";

export default {
  name: "Edit",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 8) {
        callback(new Error('密码至少应为8位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        originPass: '',
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        originPass: [{ validator: validatePass, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/user/change-password/", {
            "user": {
              "username": _this.$store.state.user.username,
              "originPassword": _this.ruleForm.originPass,
              "password": _this.ruleForm.pass,
            }
          }).then((res) => {
            if (res.status === 0) {
             this.$message.success("密码修改成功❤")
              this.ruleForm = {}
            } else {
              this.$message.error(res.statusInfo.message);
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          alert("两次输入密码不一致")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped>

.page-container {
  background-color: white;
  height: 508px;
}
</style>