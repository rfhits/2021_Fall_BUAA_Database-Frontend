<template>
  <div>
    <el-menu
        router
        :default-active=this.$route.path
        class="el-menu-vertical-demo"
        style="width: 150px"
    >
      <el-menu-item index="/manage/select-course">
        <i class="el-icon-location"></i>
        <span>我要选课</span>
      </el-menu-item >
      <el-menu-item index="/manage/query-course">
        <i class="el-icon-menu" ></i>
          <span>已选课程</span>
      </el-menu-item>
      <el-menu-item index="/manage/user-info">
        <i class="el-icon-user-solid" ></i>
        <span>个人信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
}


</script>

<style scoped>

</style>