import {getList} from "@/api";

export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            list:{}
        }
    },
    mutations: {
        getList(state,data){
            state.list = data
        }
    },
    actions: {
        async getList({commit},data){
            const result:any = await getList(data)
            if (result.code==200){
                commit('getList',result.data)
            }
        }
    },
    getters: {
        trademarkList(state){
            return state.list.trademarkList||[]
        },
        goodsList(state){
            return state.list.goodsList||[]
        },
        attrsList(state){
            return state.list.attrsList||[]
        }
    }
}
