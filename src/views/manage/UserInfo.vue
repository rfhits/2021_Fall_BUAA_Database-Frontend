<template>
  <div class="_form" style="padding: 100px 550px 100px 200px; text-align:center">
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"

    >
      <el-form-item label="旧密码" prop="originPass">
        <el-input
            v-model="ruleForm.originPass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>


<script>
import request from "../../api/request";

export default {
  name: "UserInfo",
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
          request.post("/change_password/", {
            "user": {
              "userID": _this.$store.state.user.userID,
              "originPassword": _this.ruleForm.originPass,
              "password": _this.ruleForm.pass,
            }
          }).then((res) => {
            if (res.status === 0) {
             this.$message.success("修改成功❤")
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

/*._form /deep/ .el-input__inner {*/
/*  width: 200px;*/
/*}*/

</style>