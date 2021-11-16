<template>
 <h1>{{ this.keyword }}</h1>
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
    load() {
    }
  },
  created() {
    this.keyword = this.$route.params.keyword
    this.load()
  }
}
</script>

<style scoped>

</style>