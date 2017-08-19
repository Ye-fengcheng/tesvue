import epmsFrameNav from './epmsFrameNav'

/* istanbul ignore next */
epmsFrameNav.install = function (Vue) {
  Vue.component(epmsFrameNav.name, epmsFrameNav)
}

export default epmsFrameNav
