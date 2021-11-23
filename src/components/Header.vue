<template>
  <div class="headerParent">
    <a-row
        type="flex"
        align="middle"
        class="myHeader"
        style="background: #fff"
    >
      <a-col :span="1"></a-col>
      <a-col :span="3">
        <router-link to="/">
          <div class="logo">BBS</div>
        </router-link>
      </a-col>

      <a-col :span="6">
        <a-layout-header style="padding: 0; height: 50px; background: #fff">
          <a-menu
              id="gtcbml"
              theme="light"
              mode="horizontal"
              :default-selected-keys="[head_index]"
              :style="{ lineHeight: '50px', borderBottom: 'none' }"
          >
            <a-menu-item
                key="1"
                class="menu-font"
            >
              <router-link to="/home">首页</router-link>
            </a-menu-item>
            <a-menu-item
                key="2"
                class="menu-font"
            >
              <router-link to="/topic/2">酒馆</router-link>
            </a-menu-item>
            <a-menu-item
                key="3"
                class="menu-font"
            >
              <router-link to="/mall">商城</router-link>
            </a-menu-item>
          </a-menu>
        </a-layout-header>
      </a-col>


      <!--search-->
      <a-col span="5">
        <a-input-search
            v-if="true"
            placeholder="search keyword"
            style="width: 400px; color: #f5f5f5;"
            @search="onSearch"
        />
      </a-col>

      <a-col span="4"></a-col>

      <!--          userdata on header-->
      <a-col span="3">
        <!--              avater, popmenu-->
        <div v-if=this.$store.state.loggedIn>
          <a-popover
              trigger="click"
          >
            <template #content>
              <el-link icon="el-icon-s-home" @click="goToPage('/home')">首页</el-link>
              <br>
              <el-link icon="el-icon-edit" @click="goToPage('/new-article/')">写文章</el-link>
              <br>
              <el-link icon="el-icon-switch-button" @click="logout()">退出</el-link>
              <br>
              <el-link icon="el-icon-edit-outline" @click="goToPage('/user/' + this.username)">个人中心</el-link>
            </template>
            <a-avatar :src=this.$store.state.user.avatarUrl />
          </a-popover>
        </div>

        <!--              gonna sign in or login in button-->
        <div v-else>
          <a-menu
              id="gtcbml"
              theme="light"
              mode="horizontal"
              :default-selected-keys="[head_index]"
              :style="{ lineHeight: '50px', borderBottom: 'none' }"
          >
            <a-menu-item
                key="1"
                class="menu-font"
                style="padding: 0 10px;"
            >
              <router-link to="/login">登陆</router-link>
            </a-menu-item>
            <a-menu-item
                key="2"
                class="menu-font"
                style="padding: 0 10px;"
            >
              <router-link to="/register">注册</router-link>
            </a-menu-item>
          </a-menu>

        </div>
      </a-col>

      <!--          loggedIn user actions-->
      <a-col :span="4">
        <div v-if="false">
          <a-layout-header style="padding: 0; height: 50px; background: #fff">
            <a-menu
                id="person"
                theme="light"
                mode="horizontal"
                :default-selected-keys="[head_index]"
                :style="{
                                lineHeight: '50px',
                                borderBottom: 'none',
                            }"
            >
              <a-menu-item
                  key="5"
                  class="menu-font"
                  style="padding: 0 10px"
              >
                <router-link to="/manage">收藏</router-link>
              </a-menu-item>
              <a-menu-item
                  key="6"
                  class="menu-font"
                  style="padding: 0 10px"
              >
                <router-link to="/manage">订单</router-link>
              </a-menu-item>
              <a-menu-item
                  key="7"
                  class="menu-font"
                  style="padding: 0 10px"
              >
                <router-link to="/market/create"
                ><b>发布</b></router-link
                >
              </a-menu-item>
            </a-menu>
          </a-layout-header>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    head_index: String,
  },
  data() {
    return {
      visible: false,
      nickName: '',
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username
    }
  },
  methods: {
    onSearch(value) {
      if (value == null || value == "") {
        value = "Fate";
      }
      // this.$store.commit('commitSearch', value);
      this.$router.push({
        path: '/search/article/',
        query: {
          keyword: value
        }
      });
    },
    hide() {
      this.$router.push('/home');
      this.visible = false;
    },
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login');
      window.localStorage.removeItem('token');
      this.$message.success("退出成功");
    },
    user() {
      this.$router.push('/user/' + this.$store.state.user.username);
      this.visible = false;
    },
    editUserInfo() {


    },
    goToPage(link) {
      this.$router.push(link)
    },

    goToLoginPage() {
      this.$router.push('/login');
    },
    goToRegisterPage() {
      this.$router.push('/register');
    },
  },
}
</script>


<style scoped>
@font-face {
  font-family: myFont;
  src: url('../static/fonts/Attractype Reborn.otf') format('opentype');
}


.headerParent /deep/ .ant-menu-item-selected {
  font-weight: bold;
  border-bottom: 0px;
}

.headerParent /deep/ .ant-menu-item-active {
  font-weight: bold;
  border-bottom: 2px solid #fb7299;
}

.myHeader {
  padding: 0px;
  height: 50px;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(18, 18, 18, 0.1);
  box-shadow: 0 4px 8px 0 #0001;
  /*box-shadow: #0002 0 1px 4px 1px;*/
  z-index: 10;
  max-width: 100%;
}

/*box-shadow: 0 1px 1px rgba(18, 18, 18, 0.1);*/
/*box-shadow: #0001 0 1px 1px 1px;*/

#gtcbml {
  height: 50px;
  background-color: #fff;
}

.menu-font {
  height: 50px;
  width: 80px;
  text-align: center;
  margin: 0px 50px;
}

.userdata {
  margin-left: 20px;
  color: #fb7299;
  font-size: small;
}

.logo {
  margin-left: 20px;
  font-size: 25px;
  font-family: myFont, Impact, Haettenschweiler, 'Arial Narrow Bold',
  sans-serif;
  color: rgb(0, 195, 255);
  width: 100%;
}

</style>
