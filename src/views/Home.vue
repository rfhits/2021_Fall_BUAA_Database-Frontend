<template>
  <div class="home">
    <Header head_index="1"></Header>
    <h1 style="color: red">我❤BUAA</h1>
    <p>谁来爱我？</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
    name: 'Home',
    components: {
        Header,
    },
  methods:{

  }
}
</script>
