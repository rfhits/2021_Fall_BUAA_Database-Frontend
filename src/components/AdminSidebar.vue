<template>
  <div class="sidebar-container">
    <el-menu
        router
        :default-active=this.$route.path
        class="el-menu-vertical-demo"
        style="width: 180px"
    >

      <el-menu-item :index=usersUrl>
        <UserOutlined />
        <span>用户</span>
      </el-menu-item>

      <el-menu-item index="/admin/manage/articles">
        <ProfileOutlined/>
        <span>文章</span>
      </el-menu-item>

      <el-menu-item index="/admin/manage/goods">
        <ShoppingCartOutlined/>
        <span>商品</span>
      </el-menu-item>

      <el-menu-item v-if="false" index="/admin/manage/comments">
        <CommentOutlined/>
        <span>评论</span>
      </el-menu-item>

      <el-menu-item @click="logout()">
        <LogoutOutlined/>
        <span>退出登录</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import {
  ProfileOutlined, CommentOutlined, HeartOutlined,UserOutlined,
  UsergroupAddOutlined, ShoppingCartOutlined, LogoutOutlined, EditOutlined
}
  from '@ant-design/icons-vue'

export default {
  name: "AdminSidebar",
  components: {
    UserOutlined,
    ProfileOutlined,
    CommentOutlined,
    HeartOutlined,
    UsergroupAddOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    EditOutlined

  },
  computed: {
    postsUrl() {
      return "/user/" + this.$route.params.username + "/articles"
    },
    commentsUrl() {
      return "/user/" + this.$route.params.username + "/comments"
    },
    usersUrl() {
      return "/admin/manage/users"
    },
  },
  methods: {
    logout() {
      this.$router.push('/home');
      this.$store.commit('logout')
    }
  }
}


</script>

<style scoped>
.sidebar-container {

}
</style>