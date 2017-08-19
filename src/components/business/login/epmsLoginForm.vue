<template>
  <div class="epmsLoginForm" style="margin-top:150px;margin-bottom:220px;">
    <div class="container" style="width:330px">
      <el-form :model="loginForm" :rules="rules" label-position="top"  ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="userId">
          <el-input type="text" placeholder="账号" v-model="loginForm.userId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <button class="btn btn-lg btn-primary btn-block" @click.stop="login" type="button">{{$t('business.login.btn_name')}}</button>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'epmsLoginForm',
  data () {
    return {
      loginForm: {
        userId: '',
        password: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(){
      debugger
      let thiz = this;
      this.$epmsDeliveryConfig(this,'00011','/zte-crm-epmssysmanagement-deliveryconfig/deliveryconfig/update','PUT',{ deliveryConfigId : "20170727112314", version: "2.1"}).then(response=>{
        debugger
        console.log(response)
      },response=>{
        debugger
      });
      /* let httpClient = new baseHttp(this,'00011','api/zte-crm-epmssysmanagement-user/v1/login','GET',{userId : thiz.loginForm.userId});
      httpClient.getPromise().then(response=>{
        debugger
        console.log(response)
      },response=>{
        debugger
      }); */
      /* this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          thiz.$http.post('http://10.5.6.42/api/zte-crm-epmssysmanagement-user/v1/login', {userId : thiz.loginForm.userId}).then( response => {
              debugger
              console.log(response)
              if(response.body.code.code === '0000'){
                window.epmsUser = response.body.bo;
                thiz.$router.push({path : '/epmsFrame'});
              }
              else
              {
                Vue.$message({
                  showClose: true,
                  message: response.body.code.msg,
                  type: 'error',
                  duration: 2000
                });
              }              
            },response =>{
              debugger
              thiz.$message({
                showClose: true,
                message: '请求出错',
                type: 'error',
                duration: 2000
              });  
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });    */ 
    }
  }
}
</script>

<style scoped>

</style>
