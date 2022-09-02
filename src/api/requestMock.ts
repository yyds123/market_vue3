import axios from 'axios'
import noprogrss from 'nprogress'
import 'nprogress/nprogress.css'
/*
    对axios进行二次封装
 */
const request = axios.create({
    baseURL:'/mock',
    timeout:5000
})

//请求拦截器
request.interceptors.request.use((config)=>{
    //config为配置对象，里面包含请求的各种信息，比如请求头等
    noprogrss.start()
    return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
    //res为响应成功后返回的内容，其中data对象为后端返回的数据
    noprogrss.done()
    return res.data
},(err)=>{
    //err为响应失败后返回的err对象
    return err.message
})

export default request
