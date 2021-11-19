<template>
  <el-card :style="{width: cardData.width}">
    <div class="root">
      <div class="img-container">
        <img :src=cardData.imgUrl style="width: 100%">
      </div>

      <div class="good-name">
        {{ cardData.name }}
      </div>

      <div class="price">
        ￥{{ cardData.price }}
      </div>

      <el-input-number v-model="this.orderQuantity" size="mini" style="margin:0 10px"></el-input-number>

      <div>库存：{{ this.cardData.storeQuantity }}</div>

      <div>应付：{{ this.cardData.price * orderQuantity }}</div>

      <div class="action">
        <el-button size="mini" style="margin:0 10px" @click="handleOrder()">下单</el-button>
        <el-button size="mini" style="margin:0 10px" @click="handleRemove">不买了</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CartGoodCard",
  props: {
    cardData: {type: Object, required: true}
  },
  data() {
    return {
      orderQuantity: 0,
    }
  },
  methods: {
    handleOrder() {
      request.post('order/add-order/', {
        username: this.$store.state.user.username,
        goodId: this.cardData.goodId,
        orderQuantity: this.orderQuantity
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("购买成功！")
        } else {
          alert("购买失败")
          alert(res.data.statusInfo.message);
        }
      }).catch(err => {
        console.log(err);
      })
      this.handleRemove();
    },
    handleRemove() {
      request.post('cart/remove-good/', {
        username: this.$store.state.user.username,
        goodId: this.cardData.goodId,
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("移除成功")
        } else {
          alert("移除失败");
        }
      }).catch(err => {
        console.log(err);
      })
      // todo: 触发页面重新刷新
    }
  }
}
</script>

<style scoped>

.root {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.img-container {
  width: 50px;
  margin: 0 20px;
}

.good-name {
  font-size: 16px;
  margin: 0 10px;
  width: 90px;
}

.price {
  color: deeppink;
  font-size: 16px;
  margin: 0 10px;
}

</style>