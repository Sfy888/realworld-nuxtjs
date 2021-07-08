<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image"
                 class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link :to="{ name: 'settings'}"
                       class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ isUser?'Edit Profile Settings':(profile.following?`Unfollow ${profile.username}`:`Unfollow ${profile.username}`) }}
            </nuxt-link>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <!-- <a class="nav-link active"
                   href=""></a> -->
                <nuxt-link class="nav-link"
                           :class="{active1:tab === 'myArticle' }"
                           :to="{name:'profile',params:{ username:profile.username,tab:'myArticle' }}">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link"
                   href="">Favorited Articles</a> -->
                <nuxt-link class="nav-link"
                           :class="{active1:tab ==='favoritedArticle' }"
                           :to="{name:'profile',params:{ username:profile.username,favorited:profile.username,tab:'favoritedArticle' }}">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{ name:'profile', params:{username:article.author.username}}"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <a href=""
                   class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.author.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href=""
               class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.slug }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li v-for="tag in article.tagList"
                    class="tag-default tag-pill tag-outline">{{ tag.name }}</li>
              </ul>
            </a>
          </div>

          <!-- <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href=""
                   class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href=""
               class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              
            </a>
          </div> -->

        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { getUserInfo } from '@/api/profile'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  components: {},
  props: [],
  data () {
    return {
      isUser: false
    };
  },
  async asyncData ({ params, query }) {
    // const { data } = await getUserInfo(params.username)
    // const { data: mydata } = await getArticles({ author: params.username })
    const tab = params.tab || 'myArticle'
    console.log(tab, '---------', params.tab, params);
    const [data, mydata] = await Promise.all([
      getUserInfo(params.username),
      getArticles({ author: params.username, favorited: (params.favorited || null) })
    ])

    const { profile } = data.data
    const { articles } = mydata.data
    console.log(articles);

    return {
      profile,
      articles,
      tab
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    console.log(this.profile, '0000000000', this.user);
    this.isUser = this.profile.username === this.user.username
  },
  mounted () {
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
</style>
