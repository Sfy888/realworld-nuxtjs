<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12"
             v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article" />

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { getArticleDetail } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue';

export default {
  name: 'ArticleIndex',
  components: { ArticleMeta, ArticleComments },
  props: [],
  async asyncData ({ params }) {
    const { data } = await getArticleDetail(params.slug)
    const { article } = data
    // console.log(article);
    // 把Markdown数据转换为HTML数据
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  data () {
    return {

    };
  },
  head () {
    return {
      title: `${this.article.title} - Realworld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description  // 文章的摘要
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
</style>
