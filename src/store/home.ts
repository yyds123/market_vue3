import {getBaseCategoryList,getBannerList,getFloorList} from "@/api";
// 用户信息模块(局部模块)
export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            categoryList:[],
            bannerList:[],
            floorList:[]
        }
    },
    mutations: {
        getCategoryList(state:any,result:[]):void{
            result.pop()
            state.categoryList =  result
        },
        getBannerList(state:any,result:[]):void{
            state.bannerList =  result
        },
        getFloorList(state:any,result:[]):void{
            state.floorList =  result
        },
    },
    actions: {
        async getCategoryList(ctx:any){
            const result:any = await getBaseCategoryList()
            if (result.code==200){
                ctx.commit('getCategoryList',result.data)
            }
        },
        async getBannerList(ctx:any){
            const result:any = await getBannerList()
            if (result.code==200){
                ctx.commit('getBannerList',result.data)
            }
        },
        async getFloorList(ctx:any){
            const result:any = await getFloorList()
            if (result.code==200){
                ctx.commit('getFloorList',result.data)
            }
        }
    },
    getters: {
    }
}
