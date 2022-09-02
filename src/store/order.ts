import {getTradeInfo,payment,submitTrade,paySuccess,getCenterInfo} from "@/api";
export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            tradeInfo:{},
            orderId:'',
            paymentInfo:{},
            code:'',
            centerInfo:{}
        }
    },
    mutations: {
        getTradeInfo(state,data){
            state.tradeInfo = data
        },
        submitTrade(state,data){
            state.orderId = data
        },
        payment(state,data){
            state.paymentInfo = data
        },
        paySuccess(state,data){
            state.code = data
        },
        centerInfo(state,data){
            state.centerInfo = data
        }
    },
    actions: {
        async getTradeInfo({commit}){
            const result:any = await getTradeInfo()
            if (result.code==200){
                commit('getTradeInfo',result.data)
            }
            else {
                return Promise.reject('获取失败')
            }
        },
        async submitTrade({commit}, {data, tradeNo}){
            const result:any = await submitTrade(data,tradeNo)
            if (result.code==200){
                commit('submitTrade',result.data)
                return 'ok'
            }
            else {
                return Promise.reject('获取失败')
            }
        },
        async payment({commit},orderId){
            const result:any = await payment(orderId)
            if (result.code==200){
                commit('payment',result.data)
                return 'ok'
            }
            else {
                return Promise.reject('获取失败')
            }
        },
        async paySuccess({commit},orderId){
            // const result:any = await paySuccess(orderId)
            const result:any = await payment(orderId)
            console.log(result)
            commit('paySuccess',result.code)
        },
        async getCenterInfo({commit},{page,limit}){
            const result:any = await getCenterInfo(page,limit)
            if (result.code==200){
                commit('centerInfo',result.data)
                return 'ok'
            }
            else {
                return Promise.reject('获取失败')
            }
        },
    },
    getters: {
        userAddressList(state){
            return state.tradeInfo.userAddressList||[]
        },
        detailArrayList(state){
            return state.tradeInfo.detailArrayList||[]
        },
        records(state){
            return state.centerInfo.records||[]
        }
    }
}
