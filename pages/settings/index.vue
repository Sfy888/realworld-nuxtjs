<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       v-model="dataForm.image"
                       placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       v-model="dataForm.username"
                       placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          v-model="dataForm.bio"
                          placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="email"
                       v-model="dataForm.email"
                       placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       v-model="dataForm.password"
                       placeholder="Password">
              </fieldset>
              <button type="button"
                      class="btn btn-lg btn-primary pull-xs-right"
                      @click="onUpdate">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger"
                  @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { updateUserInfo } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  name: 'SettingIndex',
  components: {},
  props: [],
  data () {
    return {
      dataForm: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
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
    async onUpdate () {
      const { data } = await updateUserInfo({ "user": this.dataForm })
      this.$router.go(0)
    },
    logout () {
      // 删除Cookie中用户登录状态
      Cookie.remove('user')
      // 删除容器中用户登录状态
      this.$store.commit('setUser', null)
      // 回到首页
      this.$router.push('/')

    }
  }
};
</script>

<style scoped lang="less">
</style>
