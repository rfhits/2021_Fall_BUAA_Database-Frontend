<template>
  <div class="sidebar-container">
    <el-menu
        router
        :default-active=this.$route.path
        class="el-menu-vertical-demo"
        style="width: 200px"
    >
      <el-menu-item :index=postsUrl
      >
        <div class="menu-item-content">
          <ProfileOutlined/>
          <div>文章</div>
        </div>
      </el-menu-item>

      <el-menu-item :index=commentsUrl>
        <div class="menu-item-content">
          <CommentOutlined/>
          <div>评论</div>
        </div>
      </el-menu-item>

      <el-menu-item :index=followersUrl>
        <div class="menu-item-content">
          <UsergroupAddOutlined/>
          <div>粉丝</div>
        </div>
      </el-menu-item>

      <el-menu-item :index=followingsUrl>
        <div class="menu-item-content">
          <HeartOutlined/>
          <div>关注</div>
        </div>
      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=cartUrl>
        <div class="menu-item-content">
          <ShoppingCartOutlined/>
          <div>购物车</div>
        </div>

      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=boughtUrl>
        <div class="menu-item-content">
          <AccountBookOutlined/>
          <div>已购</div>
        </div>


      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=changePasswordUrl>
        <div class="menu-item-content">
          <EditOutlined/>
          <div>修改密码</div>
        </div>

      </el-menu-item>

      <el-menu-item v-if="isSelf" :index=editUrl>
        <div class="menu-item-content">
          <EditOutlined/>
          <div>编辑资料</div>
        </div>

      </el-menu-item>

      <el-menu-item v-if="isSelf" index="" @click="logout()">
        <div class="menu-item-content">
          <LogoutOutlined/>
          <div>退出登录</div>
        </div>

      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import {
  ProfileOutlined, CommentOutlined, HeartOutlined,
  UsergroupAddOutlined, ShoppingCartOutlined, LogoutOutlined, EditOutlined, AccountBookOutlined
}
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
    EditOutlined,
    AccountBookOutlined
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

.menu-item-content {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.menu-item-content * {
  margin-right: 10px;
}

</style>