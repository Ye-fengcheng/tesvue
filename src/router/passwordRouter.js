import epmsFindPassword from '@/components/business/login/epmsFindPassword'
import epmsFindPasswordStep1 from '@/components/business/login/epmsFindPasswordStep/step1'
import epmsFindPasswordStep2 from '@/components/business/login/epmsFindPasswordStep/step2'
import epmsFindPasswordStep3 from '@/components/business/login/epmsFindPasswordStep/step3'
import epmsFindPasswordStep4 from '@/components/business/login/epmsFindPasswordStep/step4'

export default {
    path: '/epmsFindPassword',
    name: 'epmsFindPassword',
    component: epmsFindPassword,
    children: [
        {
            path: '',
            component: epmsFindPasswordStep1
        },
        {
            path: 'step1',
            component: epmsFindPasswordStep1
        },
        {
            path: 'step2',
            component: epmsFindPasswordStep2
        },
        {
            path: 'step3',
            component: epmsFindPasswordStep3
        },
        {
            path: 'step4',
            component: epmsFindPasswordStep4
        }
    ]
}