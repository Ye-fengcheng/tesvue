<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <bsButton type="primary" :title="$t('app.switch_lan_btn')" @bsClick="siwtchLan"></bsButton>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">{{$t('app.doc')}}</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">{{$t('app.forum')}}</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">{{$t('app.gitter_chat')}}</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">{{$t('app.twitter')}}</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">{{$t('app.temp_doc')}}</a></li>
    </ul>
    <h2>{{$t('app.ecosystem')}}</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">{{$t('app.vue_router')}}</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">{{$t('app.vuex')}}</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">{{$t('app.vue_loader')}}</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">{{$t('app.awesome_vue')}}</a></li>
    </ul>
  </div>  
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    siwtchLan () {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
