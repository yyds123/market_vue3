import request from './request'
import requestMock from "@/api/requestMock";
import {AxiosPromise} from "axios";
export const getBaseCategoryList = ():AxiosPromise=>{
    return request({url:'/product/getBaseCategoryList',method:'get'})
}
export const getList = (data={}):AxiosPromise=>{
    return request({url:'/list',method:'post',data:data})
}
export const getDetail = (skuid:string):AxiosPromise=>{
    return request({url:`/item/${skuid}`,method:'get'})
}
export const addShopCar = (skuId:string,skuNum:string|number):AxiosPromise=>{
    return request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
export const getShopCarList = ():AxiosPromise=>{
    return request({url:'/cart/cartList',method:'get'})
}
export const deleteShopCar = (skuId:string):AxiosPromise=>{
    return request({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
export const changeChecked = (skuId:string,isChecked:boolean):AxiosPromise=>{
    return request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
export const getCode = (phone:string):AxiosPromise=>{
    return request({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
export const register = (data={}):AxiosPromise=>{
    return request({url:'/user/passport/register',method:'post',data:data})
}
export const login = (data={}):AxiosPromise=>{
    return request({url:'/user/passport/login',method:'post',data:data})
}
export const getUserInfo = ():AxiosPromise=>{
    return request({url:'/user/passport/auth/getUserInfo',method:'get'})
}
export const logout = ():AxiosPromise=>{
    return request({url:'/user/passport/logout',method:'get'})
}
export const getTradeInfo = ():AxiosPromise=>{
    return request({url:'/order/auth/trade',method:'get'})
}
export const submitTrade = (data={},tradeNo:string):AxiosPromise=>{
    return request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data:data})
}
export const payment = (orderId:string):AxiosPromise=>{
    return request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
export const paySuccess = (orderId:string):AxiosPromise=>{
    return request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
export const getCenterInfo = (page:string|number,limit:string|number):AxiosPromise=>{
    return request({url:`/order/auth/${page}/${limit}`,method:'get'})
}
//mock仿真
export const getBannerList = ():AxiosPromise=>{
    return requestMock({url:'/banner'})
}
export const getFloorList = ():AxiosPromise=>{
    return requestMock({url:'/floor'})
}
