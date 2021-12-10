<template>
  <div style="display: block; height: 100%">
    <div v-if="headerVisiable" class="header-container">
      <Header
        :head_index="this.headerIndex"
      ></Header>
    </div>
    <div v-if="headerVisiable" style="height: 70px; background-color: rgb(243, 243, 244)"></div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {Header},
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  computed: {
    headerVisiable() {
      let visiable = true
      if (this.$route.path.indexOf("/admin") !== -1) return false
      if (this.$route.path.indexOf("login") !== -1) return false
      return visiable
    },
    headerIndex() {
      if (this.$route.path.indexOf("/home") !== -1) return "1"
      if (this.$route.path.indexOf("/topic") !== -1) return "2"
      if (this.$route.path.indexOf("/mall") !== -1) return "3"
    }
  }
}
</script>


<style>
.header-container {
  width: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
}

html,body,#app{

  height: 100%;

}
</style>
