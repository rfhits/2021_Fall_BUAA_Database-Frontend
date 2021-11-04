<template>
  <Editor :init="init"></Editor>
</template>

<script>
import request from "../../api/request";
import Editor from "@tinymce/tinymce-vue";
import tinymce from './tinymce.min.js'
import './icons/default/icons.min.js'
import './themes/silver/theme.min.js'
import './langs/zh_CN'
import './plugins/preview/plugin.min.js'
import './plugins/paste/plugin.min.js'
import './plugins/wordcount/plugin.min.js'
import './plugins/code/plugin.min.js'
import './plugins/image/plugin.min.js'
import './plugins/imagetools/plugin.min.js'
import './plugins/textcolor/plugin.min.js'
import './plugins/autoresize/plugin.min.js'

export default {
  name: "ArticleEditor",
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      init: {
        content: this.value,
        plugins: 'preview paste code image imagetools textcolor wordcount',
        language: 'zh_CN',
        height:'600',
        width: '700',
        branding: false,
        menubar: false,
        toolbar: ['image imagetools |formatselect | bold italic underline textcolor| ' +
                  'alignleft aligncenter alignright | preview paste code wordcount'],

        images_upload_handler: async (blobInfo, succFun, failFun) => {
          // let formData = new FormData();
          // formData.append('file', blobInfo.blob(), blobInfo.name());//此处与源文档不一样
          let pngBase64 = "data:"+ blobInfo.blob().type + ";base64," + blobInfo.base64();
          console.log("type as follow")
          console.log(blobInfo.blob().type)
          console.log(blobInfo.blob().name)
          request.post("/image_host/", {
            base64: pngBase64,
            filename: blobInfo.name()
          }).then((res) => {
            if (res.status === 0) {
              succFun(res.data.imageUrl)
            } else {
              this.$message.error(res.statusInfo.message);
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      },
    }
  },
  watch: {
    value(newV) {
        this.content = newV
    },
    content(newV) {
      this.$emit('input', newV)
    }
  }
}
</script>

<style scoped>
@import url('./skins/ui/oxide/skin.min.css');
</style>