<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="showItem" @mouseleave="noItem">
        <h2 class="all" >全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(item1,index) in categoryList" :key="item1.categoryId" :class="{cur:index==currentIndex}">
                <h3 @mouseenter="changeIndex(index)">
                  <a href="javaScript:;" :data-categoryname="item1.categoryName" :data-category1id="item1.categoryId">{{item1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a href="javaScript:;" :data-categoryname="item2.categoryName" :data-category2id="item2.categoryId">{{item2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a href="javaScript:;" :data-categoryname="item3.categoryName" :data-category3id="item3.categoryId">{{item3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,computed,ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import _ from 'lodash'
export default defineComponent({
  name: 'TypeNav',
  setup(){
    const store = useStore()//vuex
    const router = useRouter()//路由
    let show = ref(true)
    let currentIndex = ref<number>(-1)//一级导航栏的当前索引

    const categoryList = computed(() => store.state.home.categoryList);//获取vuex中的state数据
    //节流操作，变更一级导航栏的位置
    const changeIndex = _.throttle((index:number)=>{
      currentIndex.value = index
    },50)
    //点击三级导航栏跳转到search界面
    const goSearch = (event:HTMLAnchorElement) => {
      const element:any = event.target
      let {categoryname,category1id,category2id,category3id} = element.dataset
      if (categoryname){
        let location:any = {name:'search'}
        let query:any = {categoryName:categoryname}
        if (router.currentRoute.value.params){
          location.params = router.currentRoute.value.params
        }
        if(category1id){
          query.category1Id = category1id
        }
        else if(category2id){
          query.category2Id = category2id
        }
        else if(category3id){
          query.category3Id = category3id
        }
        location.query = query
        router.push(location)
      }
    }
    const showItem = ()=>{
      show.value = true
    }
    const noItem = ()=>{
      currentIndex.value = -1
      if (router.currentRoute.value.path!='/'){
        show.value = false
      }
    }
    //界面挂载结束后向后台请求三级导航栏的数据
    onMounted(()=>{
      if (router.currentRoute.value.path!='/'){
        show.value = false
      }
    })

    return{
      categoryList,
      currentIndex,
      changeIndex,
      goSearch,
      show,
      showItem,
      noItem
    }
  }
});
</script>
<style scoped lang="less">
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
          .cur{
            background-color: skyblue;
          }
        }
      }
      .sort-enter-from{
        height: 0px;
      }
      .sort-enter-to{
        height: 461px;
      }
      .sort-enter-active{
        transition: all .5s linear;
      }
    }
  }
</style>
