<template>
<section style="position: fixed; top: 0; left: 0; right: 0; bottom: 0">
  <div id="detail" class="login-con box-shadow clearfix" style="left: 50%; top: 50%; margin-left: -325px; margin-top: -175px">
    <div id="userinfo" class="login-left left">
      <div class="photos">
        <i class="iconfont icon-user" style="font-size: 64px !important"></i>
      </div>
      <div class="username"></div>
    </div>
    <div id="content" class="login-right right">
      <form action="">
        <h1>IT技术分享互动社区管理中心</h1>
        <ul>
          <li>
            <i class="iconfont icon-magnifier"></i><input  v-model="detail.username" type="text" placeholder="用户名/账号/邮箱" class="input-sm">
          </li>
          <li style="margin-bottom: 5px">
            <i class="iconfont icon-dot-more"></i><input v-model="detail.password" type="password" placeholder="密码" class="input-sm">
          </li>
          <li class="message"></li>
          <li style="margin-top: 5px">
            <input @click="login"  type="button" class="btn btn-default" value="登录">
          </li>
        </ul>
      </form>
      <div class="agreement font12">
        登录即表示您同意并遵守
        <a href="/user-agreement.html " target="_blank " rel="nofollow">《用户协议》</a>
      </div>
      <div style="position: absolute; bottom: 30px">
        <a href="/api/login.php" class="cl-5bc0de" target="_blank"><i class="iconfont icon-qq font16 cl-5bc0de"></i> QQ登录</a>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  useRouter
} from '@/utils'
export default defineComponent({
  name: 'LoginView',
  
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const detail: any = ref({
      username: '',
      password: '',
    })

    function login() {
      const {
        username,
        password
      } = detail.value
      store.dispatch('user/Login', {
        username,
        password
      }).then((res) => {
        if (res.ifSuccess === 1) {
          sessionStorage.setItem("menuList", JSON.stringify(res.result.menuList))
          localStorage.setItem("token", res.result.token)
          document.cookie = `token=${res.result.token}; path=/`
          router.push(`/admin`)
        }
      });
    }
    return {
      detail,
      login
    }
  }
})
</script>

<style lang="less">
body {
  background: url("../../assets/image/bg_login.jpg");
  background-size: cover;
}
</style>
