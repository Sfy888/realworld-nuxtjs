<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin?'Sign in':'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin"
                       to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else
                       to="/login">Have an account?</nuxt-link>

          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(message,index) in messages"
                  :key="index">{{ field }} {{ message }}</li>
            </template>

          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin"
                      class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     v-model="user.username"
                     placeholder="Your Name"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="email"
                     v-model="user.email"
                     placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     v-model="user.password"
                     type="password"
                     placeholder="Password"
                     minlength="8"
                     required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin?'Sign in':'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { login, register } from '@/api/user'

//  仅在客服端加载 js-cookie 包。 process.client 是nuxt提供的数据，如果是true，就是代表着运行在客户端，false就是运行在服务端
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  components: {},
  props: [],
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    };
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      try {
        // 提交表单，请求登录
        const { data } = this.isLogin ? await login({
          user: this.user
        }) : await register({ user: this.user })
        // console.log(data);
        // TODO 保存用户登录状态
        this.$store.commit('setUser', data.user)
        // 状态持久化
        // js-cookie是一个操作浏览器状态的包，不是操作服务器端的,运行在客服端
        // 为了防止刷新页面数据丢失，需要数据持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        // console.log('请求失败', error);
        // console.dir(error);
        this.errors = error.response.data.errors
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
