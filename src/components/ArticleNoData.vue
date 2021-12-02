<template>
  <div class="root"

       :style="{width: this.width, textAlign: 'center', backgroundColor: 'white', paddingBottom: '30px', fontSize: '16px'}"
  >
    没有更多数据了
  </div>
</template>

<script>
export default {
  name: "ArticleNoData",
  props: {
    width: {type: String}
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.root {
  color: #999;
  background-color: white;
}
</style>