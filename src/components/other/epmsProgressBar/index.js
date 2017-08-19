import epmsProgressBar from './epmsProgressBar'

/* istanbul ignore next */
epmsProgressBar.install = function (Vue) {
  Vue.component(epmsProgressBar.name, epmsProgressBar)
}

export default epmsProgressBar
