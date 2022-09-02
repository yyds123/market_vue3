import {getCode,register,login,getUserInfo,logout} from "@/api";
import {setToken,removeToken} from "@/api/uuid_token";
export default {
    namespaced: true, // 开启命名空间
    state ():any {
        return{
            code:'',
            userInfo:{}
        }
    },
    mutations: {
        getCode(state,data){
            state.code = data
        },
        getUserInfo(state,data){
            state.userInfo = data
        },
        logout(state){
            state.userInfo = {}
        }
    },
    actions: {
        async getCode({commit},phone){
            const result:any = await getCode(phone)
            if (result.code==200){
                commit('getCode',result.data)
            }
            else {
                return Promise.reject('获取验证码失败')
            }
        },
        async register({commit},data){
            const result:any = await register(data)
            if (result.code==200){
                console.log('注册成功')
            }
            else {
                return Promise.reject(new Error(result.message))
            }
        },
        async login({commit},data){
            const result:any = await login(data)
            console.log(result)
            if (result.code==200){
                setToken(result.data.token)
                return 'ok'
            }
            else {
                return Promise.reject(new Error(result.message))
            }
        },
        async getUserInfo({commit}){
            const result:any = await getUserInfo()
            if (result.code==200){
                commit('getUserInfo',result.data)
                return 'ok'
            }
            else {
                return Promise.reject('fail')
            }
        },
        async logout({commit}){
            const result:any = await logout()
            if (result.code==200){
                removeToken()
                commit('logout')
            }
            else {
                return Promise.reject('fail')
            }
        }
    },
    getters: {
    }
}
