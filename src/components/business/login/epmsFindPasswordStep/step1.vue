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
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" id="inputEmail" class="form-control" placeholder="请输入你的账号" required="" autofocus="">
            <br>
            <button  @click="$router.push({ path: '/epmsFindPassword/step2' })"  class="btn btn-lg btn-primary btn-block" type="button">下一步</button>
        </form>
      </div>
  </div>  
</template>

<script>

export default {
  name: 'step1',
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    this.$http({url: 'http://10.5.6.42/api/zte-cms-system-management/v1/hello', method: 'GET'}).then(function (response) {
      console.log(response)
    })
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
