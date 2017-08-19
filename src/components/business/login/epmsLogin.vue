<template>
  <div class="epmsLogin">
      <epms-login-nav :loginBtn="loginBtn"></epms-login-nav>
      <router-view></router-view>
      <epms-login-footer></epms-login-footer>
  </div> 
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginBtn:false
    }
  }
}
</script>
