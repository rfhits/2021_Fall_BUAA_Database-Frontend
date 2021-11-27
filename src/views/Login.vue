<template>
  <div class="form">
    <h1>欢迎你，旅行者</h1>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input prefix-icon="el-icon-user-solid"
                  v-model="form.username"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-lock"
                  show-password
                  v-model="form.password"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button type="primary" @click="login">登陆</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>

  <video style="width: 100%; z-index: -99" autoplay loop>
    <source src="../static/videos/kong.mp4">

  </video>
</template>

<script>
import request from "../api/request";

export default {
  components: {},
  name: "login",
  data() {
    return {
      name: "",
      form: {
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
        }).then(res => {
          if (res.status === 0) {
            window.localStorage.setItem("token", res.data.token)
            this.$store.commit("login", res.data)
            this.$router.push("/home")
          } else {
            console.log(res.status)
            this.$message.error(res.statusInfo.message)
          }
        }).catch((err) => { // cant post
          console.log(err)
        })
      } else {
        this.$message.error("不合法的用户名或密码")
      }
    }
  }
}
</script>

<style scoped>

.form {
  position: fixed;
  background-color: rgba(0, 0, 0, -1);
  z-index: 3;
  text-align: center;
  width: 250px;
  left: 900px;
  top: 200px;
}
</style>
