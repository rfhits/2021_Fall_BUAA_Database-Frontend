<template>
  <div>
    <Header/>
  </div>
  <div style="display: flex">
    <Sidebar/>
    <router-view style="flex: 1" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default {
  name: "Manage",
  components: {Sidebar, Header}
}
</script>

<style scoped>

</style>