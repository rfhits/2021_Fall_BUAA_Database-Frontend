<template>
  <el-card :style="{width: cardData.width}" shadow="hover" @click="goToGoodPage()">
    <div class="img-container">
      <img :src="cardData.imgUrl" style="width:100%" alt="imgCard">
    </div>

    <el-divider></el-divider>

    <div class="good-name">
      {{ cardData.name }}
    </div>
    <div class="price">
      ￥{{ cardData.price }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "GoodCard",
  props: {
    cardData: {type: Object, required: true}
  },
  methods: {
    goToGoodPage() {
      this.$router.push("/mall/good/" + this.cardData.goodId)
    }
  }
}
</script>

<style scoped>

.img-container {
  width: 200px;
}

.good-name {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.price {
  color: deeppink;
  font-size: 25px;
  font-weight: bold;
}

</style>