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
          <div class="row">
            <div class="col-md-8">
              <h5>zhang.san@zte.com.cn</h5>
            </div>
            <div class="col-md-4">
              <button class="btn btn-default disabled" type="button">55秒重发</button>
            </div>
          </div>
          <br/>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="text" id="inputEmail" class="form-control" placeholder="请输入邮箱收到的验证码" required="" autofocus="">
          <br>
          <button  @click="$router.push({ path: '/epmsFindPassword/step3' })"  class="btn btn-lg btn-primary btn-block" type="button">下一步</button>
        </form>
      </div>
  </div>  
</template>

<script>
export default {
  name: 'step2',
  data () {
    return {
      active: 1
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
