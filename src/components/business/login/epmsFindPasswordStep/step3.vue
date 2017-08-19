<template>
  <div class="epmsProgressBar center-block">
      <div class="container" style="width:350px">
        <el-steps :space="100" :active="active" finish-status="success">
          <el-step title="输入账号"></el-step>
          <el-step title="验证身份"></el-step>
          <el-step title="重置密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <br/>
      <br/>
      <div class="container" style="width:330px">
        <form class="form-signin">
            <label for="password1" class="sr-only">Email address</label>
            <input type="password" id="password1" class="form-control" placeholder="请输入新的密码" required="" autofocus="">
            <br>
            <label for="password2" class="sr-only">Email address</label>
            <input type="password" id="password2" class="form-control" placeholder="请输入新的密码" required="" autofocus="">
            <br>
            <button  @click="$router.push({ path: '/epmsFindPassword/step4' })"  class="btn btn-lg btn-primary btn-block" type="button">下一步</button>
        </form>
      </div>
  </div>  
</template>

<script>
export default {
  name: 'step3',
  data () {
    return {
      active: 2
    }
  }
}
</script>

<style>
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;  
  width: 1000px;
}
</style>
