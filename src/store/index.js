import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    //左侧菜单状态
    isCollapse: false,
    //内容滚动区域高度
    scrollHeight: 0,
    //当前正在查看的交付配置bo
    deliverConfigBo:{
        deliveryConfigId:'',
        deliveryConfigNo:'',
        version:'',
        //状态(0:编辑中;1:待评审;2:评审中;3:已生效)
        status:0,
        projId:'',
        seqNum:'',
        enableFlag:'',
        createUser:'',
        createDate:'',
        updateUser:'',
        updateDate:'',
        deleteUser:'',
        deleteDate:null
    }
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    },
    setSeliverConfigBo(state,bo){
      state.deliverConfigBo = bo.data;
    },
    setDeliverConfigBoItem(state,data){
      state.deliverConfigBo[data.data.key] = data.data.value;
    }
  },
  getters: {
    filterThanTwo (state) {
      if (state.count > 5) {
        return state.count
      }
      return 0
    },
    modTwo (state, getters) {
      return getters.filterThanTwo % 2 === 0
    }
  }
})

export {store}
