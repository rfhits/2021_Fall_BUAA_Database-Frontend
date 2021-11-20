<template>
  <div class="root">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div>
      <router-view style="flex: 1"/>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import Sidebar from "@/components/AdminSidebar";
export default {
  name: "Manage",
  components: {Sidebar, Header}
}
</script>

<style scoped>
.root {
  display: flex;
}
.sidebar-container {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 40px;
  width: 202px;
  border-color: #999;
}
</style>