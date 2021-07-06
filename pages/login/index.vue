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
export default {
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
        console.log(data);
        // TODO 保存用户登录状态

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
