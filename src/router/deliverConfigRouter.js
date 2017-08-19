import epmsDeliverConfig from '@/components/business/outsourcingPurchase/deleverConfig/epmsDeliverConfig'
import epmsCreateBusinessModel from '@/components/business/outsourcingPurchase/deleverConfig/epmsCreateBusinessModel'
import epmsCostToBusinessModel from '@/components/business/outsourcingPurchase/deleverConfig/epmsCostToBusinessModel'
import epmsCommitReview from '@/components/business/outsourcingPurchase/deleverConfig/epmsCommitReview'
import epmsDeliveryConfigDetail from '@/components/business/outsourcingPurchase/deleverConfig/epmsDeliveryConfigDetail'
import epmsDeliveryConfigReview from '@/components/business/outsourcingPurchase/deleverConfig/epmsDeliveryConfigReview'
import epmsDeliveryConfigReviewDetail from '@/components/business/outsourcingPurchase/deleverConfig/epmsDeliveryConfigReviewDetail'
import index from '@/components/business/outsourcingPurchase/deleverConfig/index'

export default {
    path: 'epmsDeliverConfig',
    component: index,
    children: [
        {
            path: '',
            component: null
        },
        {
            path: 'epmsDeliverConfig/:projectId',
            component: epmsDeliverConfig
        },
        {
            path: 'epmsCreateBusinessModel',
            component: epmsCreateBusinessModel
        },
        {
            path: 'epmsCostToBusinessModel',
            component: epmsCostToBusinessModel
        },
        {
            path: 'epmsCommitReview',
            component: epmsCommitReview
        },
        {
            path: 'epmsDeliveryConfigDetail/:deliveryConfigId',
            component: epmsDeliveryConfigDetail
        },
        {
            path: 'epmsDeliveryConfigReview',
            component: epmsDeliveryConfigReview
        },
        {
            path: 'epmsDeliveryConfigReviewDetail/:deliveryConfigReviewId/:deliveryConfigId',
            component: epmsDeliveryConfigReviewDetail
        }
    ]
}