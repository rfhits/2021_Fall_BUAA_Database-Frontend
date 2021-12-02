<template>
  <div>
    <div class="login-root">
      <div class="form" style="text-align: center; width: 250px; margin: 50px auto; margin-top: 50px">
        <h1>Administrator Register</h1>
        <el-form ref="form" :model="form" >
          <el-form-item>
            <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div>
              <el-button  type="primary" @click="register">注册</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";

export default {
  components: {

  },
  name: "Register",
  data() {
    return {
      name: "",
      form:{
        username: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      let isValidAccount = this.form.password.length >= 8 && this.form.username !== ''
      if (isValidAccount) {
        request.post("/admin/register/", {
          "user": this.form
        }).then( res=> {
          if (res.status === 0) {
            this.$router.push("/admin/login/")
          } else {
            console.log(res.status)
            this.$message.error(res.statusInfo.message)
          }
        }).catch((err)=> { // cant post
          console.log(err)
        })
      } else {
        this.$message.error("不合法的用户名或密码")
      }
    }
  }
}
</script>
