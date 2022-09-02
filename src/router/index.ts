import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home/index.vue'),
    meta:{show:true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta:{show:false}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/index.vue'),
    meta:{show:false}
  },
  {
    path:'/search',
    name:'search',
    component:()=> import('../views/Search/index.vue')
  },
  {
    path:'/detail/:skuid',
    name:'detail',
    component:()=> import('../views/Detail/index.vue')
  },
  {
    path:'/addcartsuccess',
    name:'addcartsuccess',
    component:()=> import('../views/AddCartSuccess/index.vue')
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component:()=> import('../views/ShopCart/index.vue')
  },
  {
    path:'/trade',
    name:'trade',
    component:()=> import('../views/Trade/index.vue'),
    beforeEnter(to,from,next){
      if (from.path=='/shopcart'){
        next()
      }
      else {
        next(from)
      }
    }
  },
  {
    path:'/pay',
    name:'pay',
    component:()=> import('../views/Pay/index.vue'),
    beforeEnter(to,from,next){
      if (from.path.indexOf('trade')!=-1){
        next()
      }
      else {
        next(from)
      }
    }
  },
  {
    path:'/paysuccess',
    name:'paysuccess',
    component:()=> import('../views/PaySuccess/index.vue'),
    beforeEnter(to,from,next){
      if (from.path.indexOf('pay')!=-1){
        next()
      }
      else {
        next(from)
      }
    }
  },
  {
    path:'/center',
    component:()=> import('../views/Center/index.vue'),
    children:[
      {
        path:'myorder',
        component:()=> import('../views/Center/MyOrder/index.vue')
      },
      {
        path:'tradeorder',
        component:()=> import('../views/Center/TradeOrder/index.vue')
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {top:0}
  }
})
router.beforeEach(async (to,from,next)=>{
  const token = localStorage.getItem('token')
  const state = store.state as any
  const name = state.user.userInfo.name
  if (token){
    if (to.path=='/login'||to.path=='/register'){
      next('/')
    }
    else {
      if (name){
        next()
      }
      else {
        try {
          await store.dispatch('user/getUserInfo')
          next()
        }catch (e) {
          await store.dispatch('user/logout')
          next('/login')
        }
      }
    }
  }
  else {
    const toPath = to.path
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1||toPath.indexOf('/shop')!=-1||toPath.indexOf('/add')!=-1){
      next('/login?redirect='+toPath)
    }
    else {
      next()
    }
  }
})

export default router
