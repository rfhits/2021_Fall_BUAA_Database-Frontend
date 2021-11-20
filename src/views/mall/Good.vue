<template>
  <div class="root">
    <div class="content">
      <div class="img-container">
        <img :src="this.good.imgUrl" alt="img of good" width="100%">
      </div>
      <div class="good-info">
        <div class="good-name">{{ this.good.name }}</div>
        <div class="good-price">￥{{ this.good.price }}</div>
        <div class="good-quantity">
          <el-input-number v-model="this.orderQuantity" :min="1" :max="this.stockQuantity"/>

          <span style="margin-left: 20px; color: #999">库存：{{this.storeQuantity}}</span>
        </div>
        <div class="good-action">
          <el-button type="danger" @click="handleOrder()" style="width: 140px">立即购买</el-button>
          <el-button type="danger" @click="addToCart()">加入购物车</el-button>
        </div>
      </div>
    </div>
    <div class="comments">
      <GoodCommentCard v-for="comment in this.commentList" :card-data="comment"></GoodCommentCard>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import request from "@/api/request";
import GoodCommentCard from '@/components/GoodCommentCard'

export default {
  name: "Good",
  components: {
    GoodCommentCard,
  },
  data() {
    return{
      good: {
        name: "毛绒玩具",
        price: 30,
        storeQuantity: 200,
        imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg'
      },
      orderQuantity: 0,
      commentList: [
        {
          username: "username000",
          nickname: "nickname000",
          avatarUrl: 'https://img-static.mihoyo.com/communityweb/upload/6961459d4637f5c23f166e12c4da6660.png',
          date: "10-15",
          time: "7hours ago",
          content: "Hu Tao will rerun I love hutao, I lllllllllllllllllove hutao",
          likes: 100,
          liked: true,
          width: "960px",
        }
      ]
    }
  },
  computed: {},
  methods: {
    load() {
      let goodId = this.$route.params.id;
      this.goodId = goodId;
    },
    handleOrder() {
      if (this.$store.state.loggedIn) {
        request.post('/good/order', {
          goodId: this.goodId,
          orderQuantity: this.orderQuantity,
        }).then(res => {
          if (res.status === 0) {
            // todo: pop a img, my wechat
            this.$message.success("支付成功")
          } else {
            alert("order failed")
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        alert("请先登录")
      }
    },
    addToCart() {
      if (this.$store.state.loggedIn) {
        request.post("good/add-to-cart", {
          goodId: this.goodId,
        }).then(res => {
          if (res.status === 0) {
            this.$message.success("添加成功")
          } else {
            alert('添加失败')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        alert("请先登录")
      }
    }
  }

}
</script>

<style scoped>
.root {
  display: block;
  background-color: rgb(243, 243, 244);
}

.content {
  display: flex;
  width: 1000px;
  padding: 20px;
  margin: 0px auto;
  background-color: white;
}

.img-container {
  width: 450px;

}

.img-container img {
  width: 100%;
  height: auto;
}

.good-info {
  width: 100%;
  display: block;
  margin-left: 30px;
}

.good-name {
  font-size: 30px;
  font-weight: normal;
  text-align: center;
}

.good-price {
  background-color: rgb(250, 250, 250);
  font-size: 30px;
  color: deeppink;
  font-weight: bold;
  margin: 20px auto;
  padding: 5px;
  width: 300px;
}

.good-quantity {
  width: 300px;
  margin: 20px auto;
}

.good-action {
  width: 300px;
  margin: 20px auto;
}

.comments {
  width: 1000px;
  margin: 20px auto;
  background-color: white;
  padding: 20px;

}

.footer {
  height: 200px;
}
</style>