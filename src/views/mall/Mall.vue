<template>
  <div class="root">
    <GoodCard v-for="good in this.goodList" :card-data="good"></GoodCard>
  </div>
</template>

<script>
import request from "@/api/request";
import GoodCard from "@/components/GoodCard";

export default {
  name: "Mall",
  components: {GoodCard},
  data() {
    return {
      goodList: [
        {
          id: 233,
          name: '233',
          price: 233,
          quantity: 251,
          content: "good content",
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg'
        }
      ],
    }
  },
  methods: {
    load() {
      request.get('good/search/', {
        params: {
          keyword: ""
        }
      }).then(res => {
        if (res.status === 0) {
          this.goodList = res.data.goodList;
        } else {
          alert("load page error")
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.load(),
  }
}
</script>

<style scoped>
.root {
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
  padding: 40px;
  border: 1px solid #999;
  border-radius: 10px;
}
</style>