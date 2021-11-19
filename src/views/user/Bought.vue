<template>
  <div class="root">
    <OrderCard v-for="order in this.orderList" :card-data="order"></OrderCard>
  </div>
</template>

<script>
import CartGoodCard from "@/components/CartGoodCard";
import OrderCard from '@/components/OrderCard'
export default {
  name: "Bought",
  components: {CartGoodCard, OrderCard},
  data () {
    return {
      orderList: [
        {
          orderId: 233,
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg',
          width: '700px',
          name: 'good-name',
          quantity: 20,
          price: 520,
          hasReceived: false,
        },{
          orderId: 233,
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg',
          width: '700px',
          name: 'good-name',
          quantity: 20,
          price: 520,
          hasReceived: true,
        }
      ]
    }
  },
  methods: {
    load() {
      request.get('order/query-orders/' ,{
        params: {
          username: this.$store.state.user.username,
        }
      }).then(res => {
        if (res.status === 0) {
          this.orderList = res.data.orderList;
        } else {
          alert("获取购物车商品失败")
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.load();
  }
}
</script>

<style scoped>
.root {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>