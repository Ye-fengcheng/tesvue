<template>
  <nav class="navbar navbar-dark navbar-fixed-top">
      <div class="container-fluid">
        <div :class="logoName">
        <span style="margin-top:15px">epms</span>
        </div>
        <div class="navbar-header" style="margin:0px 0px 0px 0px">    
          <el-menu class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" theme="dark">                    
              <el-menu-item index="1">
                  <i class="glyphicon glyphicon-menu-hamburger is-active"></i>
                  <span slot="title">{{menuTootip}}</span>
              </el-menu-item>
          </el-menu>
        </div>
        <div class="navbar-header">       
          <h5>当前项目：EPMS 000_D001&nbsp;&nbsp;&nbsp;&nbsp;<slot name="project-left"></slot></h5>
        </div>
        <div class="navbar-collapse collapse navbar-right">
          <div style="float:left;margin-right:20px;margin-top:8px">
          <el-button>使用旧版</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="../../../assets/vuejs.png" width="40" height="40"  class="img-circle">
          </div>
          <div style="float:right;padding-top:18px;">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link white">
                {{userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personInfo">个人资料</el-dropdown-item>
                <el-dropdown-item command="myProject">我的项目</el-dropdown-item>
                <el-dropdown-item command="menuSetting">菜单设置</el-dropdown-item>
                <el-dropdown-item command="langSwitch">语言切换</el-dropdown-item>
                <el-dropdown-item command="toSay">我要吐槽</el-dropdown-item>              
                <el-dropdown-item command="out" divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
  let userName = !!window.epmsUser ? window.epmsUser.userName : '';
  export default {
    name: 'epmsFrameNav',
    data() {
      return {
        logoName:'logo',
        isCollapse: true,
        menuTootip:this.$t('business.common.menuTootip')
      }
    },
    props: {
      language: {
        type: Boolean,
        default: true
      },
      loginBtn: {
        type: Boolean,
        default: false
      },
      userName: {
        type: String,
        default: userName
      }
    },
    methods: {
      handleCommand(command) {
        switch(command){
          case "personInfo":
            this.$router.push({ path: '/epmsFrame/epmsPersonInfo/first' });
          break;
          case "myProject":
            this.$router.push({ path: '/epmsFrame/epmsPersonInfo/second' });
          break;
          case "menuSetting":
            this.$router.push({ path: '/epmsFrame/epmsPersonInfo/third' });
          break;
          case "langSwitch":
            this.$router.push({ path: '/epmsFrame/epmsPersonInfo/fourth' });
          break;
          case "toSay":
            this.$router.push({ path: '/epmsFrame/epmsPersonInfo/fivth' });
          break;
          case "out":
            this.$router.push({ path: '/epmsLogin' });
          break;
        }
      },
      handleSelect(key, keyPath) {
        this.toggleLeft();
      },
      siwtchLan () {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
      },
      toggleLeft () {
        this.$store.state.isCollapse = this.$store.state.isCollapse === true ? false : true
        this.menuTootip = this.$store.state.isCollapse === true ? this.$t('business.common.menuTootipOpen'):this.$t('business.common.menuTootip')
      }
    },
    watch: {
      '$store.state.isCollapse' : function (val){
        if(val)
          this.logoName = 'logo64';
        else
          this.logoName = 'logo';
      }
    }
  }
</script>

<style scoped>
.white{
  color: #fff;
}
.is-active{
  color: #fff
}
.logo64{
  padding-top: 18px;
  float:left;
  width:64px; 
  margin-left:-15px;
  font-size: 12px;
  background-color:#0E1A2B;
  height:56px;
  text-align:center
}
.logo{
  padding-top: 15px;
  float:left;
  width:180px; 
  margin-left:-15px;
  background-color:#0E1A2B;
  height:56px;
  text-align:center
}
.logo span{
  font-size: 20px
}
a{
  color: #fff;
}
a:hover
{ 
  background: #000
}
.navbar-dark{
    background-color: #324157;
    border-color: #324157;
    color: #fff
}
</style>
