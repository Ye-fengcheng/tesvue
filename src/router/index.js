import Vue from 'vue'
import Router from 'vue-router'

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
export default router;