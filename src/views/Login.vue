<template>
  <div>
    <Header></Header>
    <div class="login-root">
      <div class="form" style="text-align: center; width: 250px; margin: 50px auto; margin-top: 50px">
        <h1>welcome, traveller</h1>
        <el-form ref="form" :model="form" >
          <el-form-item>
            <el-input prefix-icon="el-icon-user-solid" v-model="form.userID"></el-input>
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
import Header from "../components/Header";
import request from "../api/request";


export default {
  components: {
    Header,
  },
  name: "login",
  data() {
    return {
      name: "",
      form:{
        userID: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      request.post("/login/", {
        "user": this.form
      }).then( res=> {
        console.log(res)
        if (res.status === 0) {
          // TODO
          window.sessionStorage.setItem("token", res.data.token)
          this.$store.commit("login", res.data)
          this.$router.push("/manage")
        } else {
          console.log(res.status)
          this.$message.error(res.statusInfo.message)
        }
      }).catch((err)=> { // cant post
        console.log(err)
      })
    }
  }
}


</script>
