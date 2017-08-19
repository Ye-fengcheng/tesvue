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
      <div class="container" style="width:330px;text-align: center">
        <form class="form-signin">
            <span style="font-size:100px" class="glyphicon glyphicon-ok-sign"></span>
            <br/>
            <h3>重置密码成功</h3>
            <br>
            <button  @click="$router.push({ path: '/epmsLogin' })"  class="btn btn-lg btn-primary btn-block" type="button">立刻登录 <span class="glyphicon glyphicon-chevron-right"></span></button>
        </form>
      </div>
  </div>  
</template>

<script>
export default {
  name: 'step4',
  data () {
    return {
      active: 4
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
