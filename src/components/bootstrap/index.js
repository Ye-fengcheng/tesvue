// 基于boostarp 3.3.7的UI组件
import epmsLoginNav from './epmsLoginNav/index.js'
import epmsLoginFooter from './epmsLoginFooter/index.js'
import epmsFrameNav from './epmsFrameNav/index.js'
import epmsPanel from './epmsPanel/index.js'

const components = [epmsLoginNav, epmsLoginFooter, epmsFrameNav, epmsPanel]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {install}
