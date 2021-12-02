<template>
  <div class="page-container">
    <div class="img-container">
      <img src="../static/picture/no-data.png" alt="no-data" style="height: 100%; width: 100%">
    </div>
    <div class="message">{{ this.message}}</div>
  </div>

</template>

<script>
export default {
  name: "NoData",
  props: {
    message:{Type: String}
  }
}
</script>

<style scoped>
.page-container {
  background-color: white;
  width: 770px;
  height: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-container {
  width: 200px;
  /*height: 100px;*/
  margin: 0px auto;
  padding-top: 150px;
}

.message {
  margin-top: 20px;
  color: #999;
  font-size: 16px;
}
</style>