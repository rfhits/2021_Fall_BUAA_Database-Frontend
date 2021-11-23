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

}

.router-view-container {
  width: 800px;
  margin: 20px auto;
}
</style>