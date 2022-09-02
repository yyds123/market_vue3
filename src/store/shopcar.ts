import {getShopCarList,deleteShopCar,changeChecked} from "@/api";

export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            shopCarList:[]
        }
    },
    mutations: {
        getShopCarList(state,data){
            state.shopCarList = data[0]
        }
    },
    actions: {
        async getShopCarList({commit}){
            const result:any = await getShopCarList()
            if (result.code==200){
                commit('getShopCarList',result.data)
            }
            else {
                return Promise.reject('获取购物车列表失败')
            }
        },
        async deleteShopCar({commit},skuId){
            const result:any = await deleteShopCar(skuId)
            if (result.code==200){
                console.log('删除成功')
            }
            else {
                return Promise.reject('删除失败')
            }
        },
        async changeChecked({commit},{skuId,isChecked}){
            const result:any = await changeChecked(skuId,isChecked)
            if (result.code==200){
                console.log('更改成功')
            }
            else {
                return Promise.reject('更改失败')
            }
        }
    },
    getters: {
        cartInfoList(state){
            if(state.shopCarList){
                return state.shopCarList.cartInfoList||[]
            }
            else {
                return []
            }
        }
    }
}
