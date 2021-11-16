<template>
  <div class="root">
    <Sidebar style="margin: 20px"/>
    <router-view style="flex: 1" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sidebar from "@/components/admin/Sidebar";
export default {
  name: "Manage",
  components: {Sidebar, Header}
}
</script>

<style scoped>

</style>