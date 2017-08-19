<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="个人资料" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="中文名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="enName">
          <el-input v-model="ruleForm.enName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="移动电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="我的项目" name="second">我的项目</el-tab-pane>
    <el-tab-pane label="菜单设置" name="third">菜单设置</el-tab-pane>
    <el-tab-pane label="语言设置" name="fourth">语言设置</el-tab-pane>
    <el-tab-pane label="我要吐槽" name="fivth">我要吐槽</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: this.$route.params ? this.$route.params.tab : 'first',
        ruleForm: {
          name: '',
          enName: '',
          email: '',
          tel: '',
          phone: ''
        },
        rules: {
          name: [
            { required: true, message: this.$t('app.doc'), trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'change' }
          ]
        }
      };
    },
    watch: {
      '$route' (to, from) {
        this.activeName2 = this.$route.params.tab;
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>