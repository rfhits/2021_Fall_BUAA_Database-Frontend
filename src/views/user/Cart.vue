<template>
  <CartGoodCard
      v-for="good in this.goodList"
      :card-data="good"
      @reload="load"
  ></CartGoodCard>
  <NoData v-if="goodList.length=== 0" :message="'购物车是空的呢'"></NoData>
</template>

<script>
import CartGoodCard from "@/components/CartGoodCard";
import request from "@/api/request";
import NoData from "@/components/UserNoData";

export default {
  name: "Cart",
  components: {NoData, CartGoodCard},
  data() {
    return {
      goodList: [

      ],
      fakeData: [
        {
          id: 0,
          name: "goodNameTest",
          price: 520,
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg',
          storeQuantity: 20,
        }
      ]
    }
  },
  methods: {
    load() {
      request.get('cart/query-cart/', {
        params: {
          username: this.$store.state.user.username,
        }
      }).then(res => {
        if (res.status === 0) {
          this.goodList = res.data.goodList;
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