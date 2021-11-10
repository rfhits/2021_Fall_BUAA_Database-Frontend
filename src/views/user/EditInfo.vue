<template>
  <div class="page_container">

    <div class="avatar_editor">
      <div class="avatar_container">
        <img class="avatar_img" :src="this.$store.state.user.avatarUrl">
        <el-link style="margin-top: 15px">修改头像</el-link>
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
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
      </div>

      <el-button @click="submitForm()">保存</el-button>
    </div>

    <div class="footer" style="height: 30px">

    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default {
  name: "EditInfo",
  data() {
    return {
      infoForm: {
        nickname: 'hello',
        gender: ref('0'),
      },
    }
  },
  methods: {
    // todo: submit change, including avatar and info
    submitForm() {

    }
  },
  setup() {
    return {}
  },
}
</script>

<style scoped>

.page_container {
  background-color: #ffffff;
}

.avatar_editor {
  padding: 20px;
}

.avatar_container {
  width: 160px;
  height: 160px;
  margin: 20px auto;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #ebebeb;
  vertical-align: top;
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