<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="article.title"
                       class="form-control form-control-lg"
                       placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="article.description"
                       class="form-control"
                       placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          v-model="article.body"
                          placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="article.tagList"
                       class="form-control"
                       placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                      @click="handleCreate"
                      type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { addArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理。多个中间件就是用数组，单个中间件用字符串。
  middleware: 'authenticated',
  name: 'EditorIndex',
  components: {},
  props: [],
  data () {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    };
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async handleCreate () {

      this.article.tagList = this.article.tagList.split(',')
      const { data } = await addArticle(this.article)
      this.$router.go(0)
    }
  }
};
</script>

<style scoped lang="less">
</style>
