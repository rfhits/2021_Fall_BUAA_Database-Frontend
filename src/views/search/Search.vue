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
  height: 100%;
}

.router-view-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(240, 241, 245);
}
</style>