<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuInfo.skuImageList" :key="img.id" @click="changeImg(index)">
        <img :src="img.imgUrl" :class="{active:index==curImg}">
      </div>
    </div>
    <div class="swiper-button-next" @click="nextImg"> > </div>
    <div class="swiper-button-prev" @click="preImg">&lt;</div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed} from 'vue';
import {useStore} from "vuex";
export default defineComponent({
  name: 'ImageList',
  props:['changeImg','nextImg','preImg','curImg'],
  setup(){
    const store = useStore()
    const skuInfo = computed(()=>store.getters["detail/skuInfo"])
    return{
      skuInfo
    }
  }
});
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 402px;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
    .swiper-slide {
      width: 56px;
      height: 56px;
      float: left;
      margin-right: 5px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
    .swiper-wrapper{
      overflow: hidden;
      left: 20px;
    }
    .swiper-button-next {
      position: absolute;
      right: 0;
    }
    .swiper-button-prev {
      position: absolute;
      left: 0;
    }

    .swiper-button-next,
    .swiper-button-prev {
      cursor: pointer;
      box-sizing: border-box;
      width: 20px;
      height: 56px;
      line-height: 56px;
      font-size: 20px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      text-align: center;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
