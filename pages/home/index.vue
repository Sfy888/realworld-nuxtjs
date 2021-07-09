<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduitss</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item"
                  v-if="user">
                <nuxt-link class="nav-link"
                           :class="{active:tab === 'your_feed'}"
                           exact
                           :to="{name:'home',query:{tab:'your_feed'}}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           :class="{active:tab === 'global_feed'}"
                           exact
                           :to="{name:'home',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
              </li>
              <li v-if="tag"
                  class="nav-item">
                <nuxt-link class="nav-link"
                           :class="{active:tab === 'tag'}"
                           :to="{name:'home',query:{tab:'tag',tag:tag}}">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{name: 'profile',params:{username:article.author.username}}"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link class="author"
                           :to="{name: 'profile',params:{username:article.author.username}}">{{ article.author.username }}</nuxt-link>
                <!-- <a href="">Eric Simons</a> -->
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{active:article.favorited}"
                      @click="onFavorite(article)"
                      :disabled="article.favoriteDisabled">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name:'article',
              params: {
                slug:article.slug
              }
            }"
                       class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalpage"
                :key="item">
              <nuxt-link class="page-link"
                         :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag:$route.query.tag,
                      tab:tab
                    }
                  }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{name:'home',query:{ tag:item,tab:'tag' }}"
                         v-for="item in tags"
                         :key="item"
                         class="tag-pill tag-default">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  // 首屏渲染和有利于seo的就用到asyncData
  async asyncData ({ query, store }) {
    // query就是context中的查询字符串的对象
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const { tag } = query
    // const { data } = await
    // // console.log(data);
    const tab = query.tab || 'global_feed'

    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    // const { data: tagData } = await
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag
      }), getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    // 手动添加禁用喜欢按钮状态
    articles.forEach(el => el.favoriteDisabled = false)

    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab

    }
  },
  components: {},
  props: [],
  data () {
    return {

    };
  },
  // 使用该watchQuery键为查询字符串设置观察者。如果定义的字符串发生变化，所有组件方法（asyncData、fetch(context)、validate、layout 等）都将被调用。默认情况下禁用监视以提高性能
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalpage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
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
