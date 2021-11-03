<template>
  <div style="height: 1000px; width: 800px">
    <QuillEditor :toolbar=this.bar theme="snow" />
  </div>

</template>

<script>

export default {
  name: "",
  components: {
    QuillEditor
  },
  data() {
    return {
      bar: toolbarOptions
    }

  }
}
</script>