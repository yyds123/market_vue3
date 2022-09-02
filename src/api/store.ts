//封装vue2中的mapGetters,mapActions,mapState
import { computed } from "vue"
import { useStore,mapGetters,mapState,createNamespacedHelpers } from "vuex"
// 组合mapState和mapGetters
const useMapper = function(data, mapFn) {
    const store = useStore()
    const storeGettersFns = mapFn(data)
    const storeGetters = {}
    Object.keys(storeGettersFns).forEach( fnkey => {
        const fn = storeGettersFns[fnkey].bind({$store: store})
        storeGetters[fnkey] = computed(fn)
    })
    return storeGetters
}
export const useGetters = function (name, getters) {
    let mapFn = mapGetters
    if (typeof name === 'string' && name.length > 0) {
        mapFn = createNamespacedHelpers(name).mapGetters
    }
    return useMapper(getters, mapFn)
}
export const useState = function (name, states) {
    let mapFn = mapState
    if(typeof name === 'string' && name.length > 0 ) {
        mapFn = createNamespacedHelpers(name).mapState
    }
    return useMapper(states, mapFn)
}

