import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en_us'
import zhCN from './zh_cn'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    en: enUS,
    zh: zhCN
  }
})

export {i18n}
