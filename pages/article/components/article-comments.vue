<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control"
                  placeholder="Write a comment..."
                  v-model="content"
                  rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="image"
             class="comment-author-img" />
        <button type="button"
                class="btn btn-sm btn-primary"
                @click="addclickComments(article)">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card"
         v-for="comment in comments"
         :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name:'profile',
          params:{
            username:comment.author.username
          }
        }"
                   class="comment-author">
          <img :src="comment.author.image"
               class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name:'profile',
          params:{
            username:comment.author.username
          }
        }"
                   class="comment-author">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options"
              @click="deleteArticleComments(comment,article)">
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from '@/api/article'
export default {
  name: 'ArticleComments',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [],   // 文章列表
      image: null,
      content: null
    };
  },
  computed: {},
  watch: {},
  created () {

  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
    const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg'
    const user = this.$store.state.user
    this.image = user.image || defaultImage


  },
  methods: {
    // 添加评论
    async addclickComments (article) {
      const { data } = await addComments(article.slug, {
        "comment": {
          "body": this.content
        }
      })
      this.$router.go(0)
    },
    // 删除评论
    async deleteArticleComments (comment, article) {
      try {
        const { data } = await deleteComments(article.slug, comment.id)
        this.$router.go(0)
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
