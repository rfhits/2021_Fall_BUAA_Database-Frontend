<template>
  <el-card :style="{width: this.cardData.width}">
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

      <el-input-number
          v-model="this.orderQuantity"
          size="mini"
          :min="0"
          :max="this.cardData.storeQuantity"
      >

      </el-input-number>

      <div>库存：{{ this.cardData.storeQuantity }}</div>

      <div style="width: 100px;margin-left: 5px;color: deeppink">
        应付：{{ Number(this.cardData.price) * this.orderQuantity }}元
      </div>

      <div class="action">
        <el-button size="mini" type="primary" style="margin:0 10px" @click="handleOrder()">下单</el-button>
        <el-button size="mini" style="margin:0 10px" @click="handleRemove">不买了</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/api/request";

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

    checkOrder() {
      if (this.orderQuantity === 0) {
        this.$message.error("请输入正确的订单数量")
        return false
      }
      return true
    },

    handleOrder() {
      if (!this.checkOrder()) return false
      request.post('order/add-order/', {
        username: this.$store.state.user.username,
        goodId: this.cardData.id,
        orderQuantity: this.orderQuantity
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("购买成功！")
          this.handleRemove() // after buying, remove from cart

        } else {
          alert("购买失败")
          alert(res.data.statusInfo.message);
        }
      }).catch(err => {
        console.log(err);
      })
    },

    handleRemove() {
      request.post('cart/remove-good/', {
        username: this.$store.state.user.username,
        goodId: this.cardData.id,
      }).then(res => {
        if (res.status === 0) {
          // this.$message.success("移除成功")
          this.$emit("reload")
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
  /*margin: 0 20px;*/
}

.good-name {
  font-size: 16px;
  /*margin: 0 10px;*/
  width: 90px;
}

.price {
  color: deeppink;
  font-size: 16px;
  /*margin: 0 10px;*/
}

</style>