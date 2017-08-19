import epmsInputOutSourceAdjustInfo from '@/components/business/outsourcingPurchase/siteDeliveryConfiguration/epmsInputOutSourceAdjustInfo'
import epmsOutSourceAdjustSearch from '@/components/business/outsourcingPurchase/siteDeliveryConfiguration/epmsOutSourceAdjustSearch'
import epmsSiteDeliverConfigInfo from '@/components/business/outsourcingPurchase/siteDeliveryConfiguration/epmsSiteDeliverConfigInfo'
import epmsSiteDeliverConfigReview from '@/components/business/outsourcingPurchase/siteDeliveryConfiguration/epmsSiteDeliverConfigReview'
import index from '@/components/business/outsourcingPurchase/siteDeliveryConfiguration/index'

export default {
    path: 'epmsSiteDeliverConfig',
    component: index,
    children: [
        {
            path: 'epmsSiteDeliverConfigReview',
            component: epmsSiteDeliverConfigReview
        },
        {
            path: 'epmsSiteDeliverConfigInfo',
            component: epmsSiteDeliverConfigInfo
        },
        {
            path: 'epmsOutSourceAdjustSearch',
            component: epmsOutSourceAdjustSearch
        }, 
        {
            path: 'epmsInputOutSourceAdjustInfo',
            component: epmsInputOutSourceAdjustInfo
        }
    ]
}