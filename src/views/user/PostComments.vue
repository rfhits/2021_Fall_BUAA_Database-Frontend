<template>
  <div class="page-container">
    <PersonalCommentCard
        v-for="comment in this.comments"
        :card-data="comment"
        :card-width="this.cardWidth"
    >
    </PersonalCommentCard>
  </div>
</template>

<script>
import PersonalCommentCard from "../../components/comment/PersonalCommentCard"
import request from "../../api/request";

export default {
  name: "PostComments",
  components: {
    PersonalCommentCard
  },
  data() {
    return {
      cardWidth: "500px",
      comments: [
        {
          articleId: 233,
          articleTitle: "Hello World",
          commentId: 233,
          date: "1926-08-17",
          content: "comment content",
          likes: 100,
          liked: true,
        },
      ],
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get("/user/comments/", {
        params: {
          viewedUsername: this.$route.params.username,
          selfUsername: this.$store.state.user.username
        }
      }).then(res => {
        console.log(res);
        this.commentList = res.data.comments;
      })
    },
  },


}
</script>

<style scoped>

</style>