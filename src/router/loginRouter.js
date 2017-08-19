import epmsLogin from '@/components/business/login/epmsLogin'
import epmsLoginForm from '@/components/business/login/epmsLoginForm'
import epmsLoginChoose from '@/components/business/login/epmsLoginChoose'

export default {
    path: '/epmsLogin',
    name: 'epmsLogin',
    component: epmsLogin,
    children: [
        {
            // 当 /login匹配成功，
            // epmsLoginForm 会被渲染在 epmsLogin 的 <router-view> 中
            path: 'epmsLoginForm',
            component: epmsLoginForm
        },
        {
            path: '',
            component: epmsLoginChoose
        },
        {
            path: 'epmsLoginChoose',
            component: epmsLoginChoose
        }
    ]
}