<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name:'profile',params:{username:article.author.username}
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
      name:'profile',params:{username:article.author.username}
    }"
                 class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary"
            :class="{ active:article.author.following}"
            :disabled="article.author.isDisabled"
            @click="onFollow(article)">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{article.author.following?'UnFollow':'Follow'}} {{ article.author.username }} <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
            :class="{ active:article.favorited}"
            :disabled="article.favoriteDisabled"
            @click="onFavorite(article)">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>

</template>

<script>
import { followUser, UnfollowUser } from '@/api/profile'
import { addFavorite, deleteFavorite } from '@/api/article'

export default {
  name: 'ArticleMeta',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    };
  },
  computed: {},
  watch: {},
  created () {
    // console.log(33333333, this.article);
    this.article.author.isDisabled = false
    this.article.favoriteDisabled = false
  },
  mounted () {

  },
  methods: {
    // 关注用户
    async onFollow (article) {
      this.article.author.isDisabled = true
      console.log(article.author.username);
      if (article.author.following) {
        // 取消关注用户
        const { data } = await UnfollowUser(article.author.username)
        article.author.following = false
      } else {
        // 关注用户

        const { data } = await followUser(article.author.username)
        article.author.following = true
      }
      this.article.author.isDisabled = false
    },

    // 添加喜欢 
    async onFavorite (article) {
      // 开启按钮禁用状态
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      // 关闭按钮禁用状态
      article.favoriteDisabled = false
    }
  }
};
</script>

<style scoped lang="less">
</style>
