<template>
  <div class="sidebar-container">
    <el-menu
        router
        :default-active=this.$route.path
        class="el-menu-vertical-demo"
        style="width: 200px"
    >
      <el-menu-item :index=postsUrl>
        <ProfileOutlined/>
        <span>发帖</span>
      </el-menu-item>

      <el-menu-item :index=commentsUrl>
        <CommentOutlined/>
        <span>评论</span>
      </el-menu-item>

      <el-menu-item :index=followersUrl>
        <UsergroupAddOutlined/>
        <span>粉丝</span>
      </el-menu-item>

      <el-menu-item :index=followingsUrl>
        <HeartOutlined/>
        <span>关注</span>
      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=cartUrl>
        <ShoppingCartOutlined />
        <span>购物车</span>
      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=boughtUrl>
        <i class="el-icon-user-solid"></i>
        <span>已购</span>
      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=changePasswordUrl>
        <EditOutlined />
        <span>修改密码</span>
      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=editUrl>
        <EditOutlined />
        <span>编辑资料</span>
      </el-menu-item>

      <el-menu-item v-if="isSelf" @click="logout()">
        <LogoutOutlined />
        <span>退出登录</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import {ProfileOutlined, CommentOutlined, HeartOutlined,
  UsergroupAddOutlined, ShoppingCartOutlined, LogoutOutlined, EditOutlined}
  from '@ant-design/icons-vue'

export default {
  name: "Sidebar",
  components: {
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
      return "/user/" + this.$route.params.username + "/posts"
    },
    commentsUrl() {
      return "/user/" + this.$route.params.username + "/comments"
    },
    followersUrl() {
      return "/user/" + this.$route.params.username + "/followers"
    },
    followingsUrl() {
      return "/user/" + this.$route.params.username + "/followings"
    },
    cartUrl() {
      return "/user/" + this.$route.params.username + "/cart"
    },
    boughtUrl() {
      return "/user/" + this.$route.params.username + "/bought"
    },
    editUrl() {
      return "/user/" + this.$route.params.username + "/edit-info"
    },
    changePasswordUrl() {
      return "/user/" + this.$route.params.username + "/change-password"
    },
    isSelf() {
      return this.$store.state.user.username == this.$route.params.username
    }
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
  border: 1px solid #e6e6e6;
  width: 151px;
  /*height*/
}
</style>