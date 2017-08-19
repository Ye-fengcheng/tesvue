<template>
  <nav class="navbar navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <h3>{{$t("business.login.project_name")}}<slot name="logo-left"></slot></h3>
        </div>
        <div id="navbar" class="navbar-collapse collapse navbar-right">
          <ul class="nav navbar-nav" v-if="loginBtn">
            <li class="dropdown" @click="$router.push({ path: '/epmsLogin' })">
              <a role="button" >{{$t("business.login.btn_name")}} <span class="glyphicon glyphicon-chevron-right"></span></a>
            </li>
          </ul>
          <el-dropdown class="siwtchLan"  v-if="language" trigger="click" @command="siwtchLan">
            <span class="el-dropdown-link">
              {{$t("app.switch_lan_btn")}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>中文</el-dropdown-item>
              <el-dropdown-item>English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    name: 'epmsLoginNav',
    props: {
      language: {
        type: Boolean,
        default: true
      },
      loginBtn: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      siwtchLan () {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
      }
    }
  }
</script>

<style scoped>
.siwtchLan{
  padding: 15px 0 0 0;
}
</style>

