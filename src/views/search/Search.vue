<template>
  <div class="root">
    <div class="router-view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
    }
  },
  methods: {

  },
  created() {
    this.keyword = this.$route.params.keyword
  }
}
</script>

<style scoped>
.root {
  background-color: rgb(240, 241, 245);
}

.router-view-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px auto;
  background-color: rgb(240, 241, 245);
}
</style>