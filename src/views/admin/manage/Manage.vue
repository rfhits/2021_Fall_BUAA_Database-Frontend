<template>
  <div class="root">
    <div class="sidebar-container">
      <AdminSidebar/>
    </div>
    <div class="router-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import AdminSidebar from "@/components/AdminSidebar";

export default {
  name: "Manage",
  components: {AdminSidebar,  Header}
}
</script>

<style scoped>
.root {
  display: flex;

}
.sidebar-container {
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 70px;
  width: 200px;
  border-color: #999;
}
</style>