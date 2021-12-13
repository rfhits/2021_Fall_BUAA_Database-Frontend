<template>
  <div class="root">
    <GoodCard v-for="good in this.goodList" :card-data="good" :width="'22.3%'"></GoodCard>
  </div>
</template>

<script>
import request from "@/api/request";
import GoodCard from "@/components/GoodCard";
import Loading from "@/components/Loading";

export default {
  name: "Mall",
  components: {Loading, GoodCard},
  data() {
    return {
      goodList: [
      ],
      fakeData: [
        {
          id: 233,
          name: '加载中',
          price: 233,
          quantity: 251,
          content: "加载中",
          imgUrl: 'https://webstatic.mihoyo.com/upload/op-public/2021/08/02/11393d35f0be591824df8312276f08c5_570823078454353351.jpeg'
        }
      ]
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
    this.load()
  }
}
</script>

<style scoped>
.root {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5px;
  padding: 40px;
  border: 1px solid #999;
  border-radius: 10px;
}

.root * {
  margin: 15px;
}
</style>