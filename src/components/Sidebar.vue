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

      <el-menu-item :index=cartUrl>
        <ShoppingCartOutlined />
        <span>购物车</span>
      </el-menu-item>

      <el-menu-item :index=boughtUrl>
        <i class="el-icon-user-solid"></i>
        <span>已购</span>
      </el-menu-item>

      <el-menu-item :index=editUrl>
        <EditOutlined />
        <span>编辑资料</span>
      </el-menu-item>

      <el-menu-item @click="logout()">
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
      return "/user/" + this.$route.params.username + "/edit"
    },
  },
  methods: {
    logout() {

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