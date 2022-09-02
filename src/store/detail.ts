import {getDetail,addShopCar} from "@/api";

export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            detailData:{}
        }
    },
    mutations: {
        getDetail(state,data){
            state.detailData = data
        }
    },
    actions: {
        async getDetail({commit},skuid){
            const result:any = await getDetail(skuid)
            if (result.code==200){
                commit('getDetail',result.data)
            }
        },
        async addShopCar({commit}, {skuId,skuNum}){
            const result:any = await addShopCar(skuId,skuNum)
            if (result.code==200){
                return 'OK'
            }
            else {
                return Promise.reject(new Error('添加失败'))
            }
        }
    },
    getters: {
        categoryView(state){
            return state.detailData.categoryView||{}
        },
        spuSaleAttrList(state){
            return state.detailData.spuSaleAttrList||[]
        },
        skuInfo(state){
            return state.detailData.skuInfo||{}
        }
    }
}
