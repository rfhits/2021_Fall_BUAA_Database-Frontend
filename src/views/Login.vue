<template>
  <div>
    <div class="login-root">
      <div class="form" style="text-align: center; width: 250px; margin: 50px auto; margin-top: 50px">
        <h1>Welcome, traveller</h1>
        <el-form ref="form" :model="form" >
          <el-form-item>
            <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div>
              <el-button  type="primary" @click="login">登陆</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../api/request";


export default {
  components: {

  },
  name: "login",
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
    login() {
      let isValidAccount = this.form.password.length >= 8 && this.form.username !== ''
      if (isValidAccount) {
        request.post("/user/login/", {
          "user": this.form
        }).then( res=> {
          if (res.status === 0) {
            window.localStorage.setItem("token", res.data.token)
            this.$store.commit("login", res.data)
            this.$router.push("/home")
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
