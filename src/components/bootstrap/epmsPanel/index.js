import epmsPanel from './epmsPanel'

/* istanbul ignore next */
epmsPanel.install = function (Vue) {
  Vue.component(epmsPanel.name, epmsPanel)
}

export default epmsPanel
