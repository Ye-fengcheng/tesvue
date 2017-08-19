<template>
  <div class="epmsLoginChoose" style="margin-top:150px;margin-bottom:220px;">
    <div class="container" style="width:500px">
      <form class="form-signin">
        <h2 class="form-signin-heading">{{$t("business.login.choose")}}</h2>
        <br>
        <div class="row">
          <div class="col-md-6">
            <button @click="gotoUac" class="btn btn-lg btn-primary btn-block" type="submit">{{$t('business.login.zteEmployer')}}</button>
          </div>
          <div class="col-md-6">
            <button @click="login" class="btn btn-lg btn-primary btn-block" type="button">{{$t('business.login.form_name')}}</button>
          </div>
        </div>
      </form>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'epmsLoginChoose',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
    console.log(this);
  },
  methods:{
    gotoUac(){
      //单点认证
      uac.cookie.delCookie("PORTALSSOCookie");
      uac.cookie.addCookie("Internal",1,24);
      zte.ajax.sso();
    },
    login(){
      uac.cookie.delCookie("PORTALSSOCookie");
      uac.cookie.addCookie("Internal",0,24);
      this.$router.push({ path: '/epmsLogin/epmsLoginForm' })
    }
  }
}
</script>

<style scoped>

</style>
