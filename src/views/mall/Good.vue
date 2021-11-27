<template>
  <div class="root">
    <div class="content">
      <div class="img-container">
        <img :src="this.good.imgUrl" alt="img of good" width="100%">
      </div>
      <div class="good-info">
        <div class="good-name">{{ this.good.name }}</div>
        <div class="good-content"> {{ this.good.content}}</div>
        <div class="good-price">￥{{ this.good.price }}</div>
        <div class="good-quantity">
          <el-input-number v-model="this.orderQuantity" :min="1" :max="this.good.quantity"/>

          <span style="margin-left: 20px; color: #999">库存：{{this.good.quantity}}</span>
        </div>
        <div class="good-action">
          <el-button type="danger" @click="handleOrder()" style="width: 140px">立即购买</el-button>
          <el-button type="danger" @click="addToCart()">加入购物车</el-button>
        </div>
      </div>
    </div>
    <div class="comments">
      <GoodCommentCard v-for="comment in this.commentList"
                       :card-data="comment"
                       :width="'800px'"
      >

      </GoodCommentCard>
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
        id: 0,
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
          content: "Hu Tao will rerun I love hutao, I lllllllllllllllllove hutao",
          width: "960px",
        }
      ]
    }
  },
  computed: {},
  methods: {
    load() {
      request.get('good/view-good/', {
        params: {
          goodId: this.$route.params.id
        }
      }).then(res => {
        if (res.status === 0) {
          this.good = res.data.good
          this.commentList = res.data.commentList
        } else {
          alert('get good info failed')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleOrder() {
      if (this.$store.state.loggedIn) {
        request.post('/order/add-order', {
          goodId: this.good.id,
          orderQuantity: this.orderQuantity,
        }).then(res => {
          if (res.status === 0) {
            // todo: pop a img, my wechat
            this.$message.success("支付成功")
          } else {
            alert(res.statusInfo.message)
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
        request.post("cart/add-good/", {
          username: this.$store.state.user.username,
          goodId: this.good.id,
        }).then(res => {
          if (res.status === 0) {
            this.$message.success("在购物车等着亲呢❤")
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
  },
  created() {
    this.load()
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
  width: 800px;
  padding: 20px;
  margin: 0px auto;
  background-color: white;
}

.img-container {
  margin-left: 50px;
  width: 600px;

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

.good-content {
  background-color: rgb(250, 250, 250);
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  margin: 20px auto;
  padding: 5px;
  width: 300px;
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
  width: 800px;
  margin: 20px auto;
  background-color: white;
  /*padding: 20px;*/

}

.footer {
  height: 200px;
}
</style>