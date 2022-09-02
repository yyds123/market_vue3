import { v4 as uuidv4 } from 'uuid';
export const uuid_token = ()=>{
    let uuid = localStorage.getItem('uuid_token')
    if(!uuid){
        uuid = uuidv4()
        localStorage.setItem('uuid_token',uuid)
    }
    return uuid
}
export const setToken = (token)=>{
    localStorage.setItem('token',token)
}
export const removeToken = ()=>{
    localStorage.removeItem('token')
}
