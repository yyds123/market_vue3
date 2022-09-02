<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue';
import {useStore} from "vuex";
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default defineComponent({
  name: 'App',
  components: {
    Header,Footer
  },
  setup(){
    const store = useStore()
    onMounted(()=>{
      store.dispatch('home/getCategoryList')
    })
  }
});
</script>
