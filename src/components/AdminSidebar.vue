<template>

  <el-menu
      router
      :default-active=this.$route.path
      class="el-menu-vertical-demo"
  >

    <el-menu-item :index=usersUrl>
      <div class="menu-item-content">
        <UserOutlined/>
        <span>用户</span>
      </div>

    </el-menu-item>

    <el-menu-item index="/admin/manage/articles">
      <div class="menu-item-content">
        <ProfileOutlined/>
        <span>文章</span>
      </div>

    </el-menu-item>

    <el-menu-item index="/admin/manage/goods">
      <div class="menu-item-content">
        <ShoppingCartOutlined/>
        <span>商品</span>
      </div>

    </el-menu-item>

    <el-menu-item @click="logout()" index="">
      <div class="menu-item-content">
        <LogoutOutlined/>
        <span>退出登录</span>

      </div>

    </el-menu-item>

  </el-menu>

</template>

<script>
import {
  ProfileOutlined, CommentOutlined, HeartOutlined, UserOutlined,
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
.el-menu-vertical-demo {
  width: 180px;
  position: fixed;
  border-color: white;
  background-color: rgb(250, 250, 250);
  border-radius: 5px
}

.menu-item-content {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.menu-item-content * {
  margin-right: 10px;
}
</style>