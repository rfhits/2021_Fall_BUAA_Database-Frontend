<template>
  <el-card :style="{width: cardData.width}">
    <div class="root">
      <div class="img-container">
        <img :src=cardData.imgUrl style="width: 100%">
      </div>

      <div class="good-name">
        {{ cardData.name }}
      </div>

      <div>买了：{{ this.cardData.quantity }} 个</div>

      <div class="price">付了：{{ cardData.price }} 元</div>

      <div class="action">
        <el-button v-if="cardData.hasReceived" size="mini" style="margin:0 10px" @click="handleComment()">撰写评论
        </el-button>
        <el-button v-else size="mini" style="margin:0 10px" @click="handleConfirm">确认收货</el-button>
      </div>
    </div>
  </el-card>

  <el-dialog v-model="this.commentFormVisible">
    <div>
      <el-input
          v-model="this.comment"
          :autosize="{ minRows: 5, maxRows: 10 }"
          type="textarea"
      ></el-input>
    </div>
    <el-button @click="handlePost" style="margin-top: 20px">发表评论</el-button>
  </el-dialog>
</template>

<script>
import request from "@/api/request";

export default {
  name: "OrderCard",
  props: {
    cardData: {type: Object, required: true},
  },
  data() {
    return {
      commentFormVisible: false,
      comment: "",
    }
  },
  methods: {
    handleComment() {
      this.commentFormVisible = true;
    },
    handleConfirm() {
      this.cardData.hasReceived = true;
      request.post('/order/confirm-receiving/', {
        orderId: this.cardData.orderId
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("确认成功")
        } else {
          alert("确认失败")
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handlePost() {
      request.post('/good/comment/', {
        username: this.$store.state.user.username,
        goodId: this.cardData.goodId,
        comment: this.comment
      }).then(res => {
        if (res.status === 0) {
          this.$message.success("评论发表成功")
        }else {
          alert("评论发表失败")
        }
      }).catch(err => {
        console.log(err)
      })
      this.commentFormVisible = false;
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