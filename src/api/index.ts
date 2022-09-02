import request from './request'
import requestMock from "@/api/requestMock";
export const getBaseCategoryList = ()=>{
    return request({url:'/product/getBaseCategoryList',method:'get'})
}
export const getList = (data={})=>{
    return request({url:'/list',method:'post',data:data})
}
export const getDetail = (skuid)=>{
    return request({url:`/item/${skuid}`,method:'get'})
}
export const addShopCar = (skuId,skuNum)=>{
    return request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
export const getShopCarList = ()=>{
    return request({url:'/cart/cartList',method:'get'})
}
export const deleteShopCar = (skuId)=>{
    return request({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
export const changeChecked = (skuId,isChecked)=>{
    return request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
export const getCode = (phone)=>{
    return request({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
export const register = (data={})=>{
    return request({url:'/user/passport/register',method:'post',data:data})
}
export const login = (data={})=>{
    return request({url:'/user/passport/login',method:'post',data:data})
}
export const getUserInfo = ()=>{
    return request({url:'/user/passport/auth/getUserInfo',method:'get'})
}
export const logout = ()=>{
    return request({url:'/user/passport/logout',method:'get'})
}
export const getTradeInfo = ()=>{
    return request({url:'/order/auth/trade',method:'get'})
}
export const submitTrade = (data={},tradeNo)=>{
    return request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data:data})
}
export const payment = (orderId)=>{
    return request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
export const paySuccess = (orderId)=>{
    return request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
export const getCenterInfo = (page,limit)=>{
    return request({url:`/order/auth/${page}/${limit}`,method:'get'})
}
export const getBannerList = ()=>{
    return requestMock({url:'/banner'})
}
export const getFloorList = ()=>{
    return requestMock({url:'/floor'})
}
