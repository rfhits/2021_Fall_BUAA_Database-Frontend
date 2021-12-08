<template>
  <div class="root">
    <div class="sidebar-container">
      <AdminSidebar/>
    </div>
    <div class="router-container">
      <router-view style="width: 900px; margin: 0 auto"/>
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
  background-color: #f0f1f5;

}
.sidebar-container {
  margin-top: 10%;
  margin-right: 70px;
  border-radius: 5px;
  width: 200px;
  border-color: #999;
}

.router-container {

}
</style>