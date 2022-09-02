<template>
  <div class="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import {useStore} from "vuex";
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
export default defineComponent({
  name: 'Home',
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  setup(){
    const store = useStore()
    const floorList = computed(()=>store.state.home.floorList)
    onMounted(()=>{
      store.dispatch('home/getFloorList')
    })
    return{
      floorList
    }
  }
});
</script>
