<template>
  <div class="epmsLogin">
      <epms-login-nav :loginBtn="loginBtn" :language="language">
        <span slot="logo-left" class="title">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{$t("business.login.find_password")}}</span>
      </epms-login-nav>
      <div style="height:100px"></div>
      <router-view></router-view>
      <epms-login-footer></epms-login-footer>
  </div>  
</template>

<script>
export default {
  name: 'findPassword',
  data () {
    return {
      loginBtn: true,
      language: true
    }
  }
}
</script>

<style scoped>
span.title{
  font-size: 16px;
  color: #000
}
</style>

