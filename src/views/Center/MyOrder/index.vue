<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table class="order-item" v-for="order in records" :key="order.id">
          <thead>
          <tr>
            <th colspan="5">
                  <span class="ordertitle">{{order.expireTime}}订单编号{{order.outTradeNo}}
                    <span class="pull-right delete">
                      <img src="./images/delete.png">
                    </span>
                  </span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="shop in order.orderDetailList" :key="shop.id">
            <td style="width:60%">
              <div class="typographic">
                <img :src="shop.imgUrl" style="height: 100px;width:100px">
                <a href="#" class="block-text">{{shop.skuName}}</a>
                <span>x{{shop.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
            <td style="width:8%" class="center">{{order.consignee}}</td>
            <td style="width:12%" class="center">
              <ul class="unstyled">
                <li>总金额¥1111.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td style="width:8%" class="center">
              <a href="#" class="btn">{{order.orderStatusName}} </a>
            </td>
            <td style="width:12%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>

              </ul>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="choose-order">
        <div class="pagination">
          <el-pagination layout="prev, pager, next"
                         :total="centerInfo.total"
                         :page-size="page.limit"
                         background
                         v-model:current-page="page.page"
          />
        </div>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike02.png" />
          </div>
          <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, watch,} from 'vue';
import {useStore} from "vuex";
export default defineComponent({
  name: 'MyOrder',
  setup(){
    const store = useStore()
    const page = reactive({page:1,limit:5})
    const centerInfo = computed(()=>store.state.order.centerInfo)
    const records = computed(()=>store.getters["order/records"])
    const getData = async ()=>{
      try {
        await store.dispatch('order/getCenterInfo',page)
      }catch (e) {
        console.log(e.message)
      }
    }
    watch(()=>page.page,(newvalue,oldvalue)=>{
      getData()
    })
    onMounted(()=>{
      getData()
    })
    return{
      records,
      centerInfo,
      page
    }
  }
})
</script>>

