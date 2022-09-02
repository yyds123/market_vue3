import { createStore } from 'vuex'
import home from "@/store/home";
import search from "@/store/search";
import detail from "@/store/detail";
import shopcar from "@/store/shopcar";
import user from "@/store/user";
import order from "@/store/order";
export default createStore({
  modules:{home,search,detail,shopcar,user,order}
})
