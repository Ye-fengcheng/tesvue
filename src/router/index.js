import Vue from 'vue'
import Router from 'vue-router'


import epmsFrame from '@/components/business/common/epmsFrame'
import epmsPersonInfo from '@/components/business/setting/epmsPersonInfo'
//登录路由
import loginRouter from './loginRouter'
//密码路由
import passwordRouter from './passwordRouter'
//交付配置的路由
import deliverConfigRouter from './deliverConfigRouter'
//站点交付配置的路由
import siteDeliverConfigRouter from './siteDeliverConfigRouter'
//示例的demo路由 
import demo from './demo'
import { store } from '../store'
Vue.use(Router)

let mainRouter = {
    path: '/epmsFrame',
    name: 'epmsFrame',
    component: epmsFrame,
    children: [
        {
            path: 'epmsPersonInfo/:tab',
            component: epmsPersonInfo
        },
        deliverConfigRouter,
        siteDeliverConfigRouter
    ]
};
let router = new Router({
    routes: [
        loginRouter,
        passwordRouter,
        mainRouter,
        demo
    ]
})
router.beforeEach((to, from, next) => {
    if(to.fullPath=='/'){
        router.push({ path : '/epmsLogin'})
    }
    next();
    store.state.scrollHeight = 300; //先清除原先菜单高度
    setTimeout(function() {
        store.state.scrollHeight = document.body.scrollHeight - 50;
    })
});
export default router;