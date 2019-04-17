<template>
  <div class="buy-wrap" @click="closeFun()"  v-if="buy===1 || buy===2 || buy===3">
    <div class="buy" @click.stop="">
      <div class="close" @click="closeFun()"></div>
      <div class="buy-title">
        <span :class="{'cur':tab===0}" @click="zhaopuTab()">找铺会员</span>
        <span :class="{'cur':tab===1}" @click="zhuanpuTab()">转铺服务</span>
        <span :class="{'cur':tab===2}" @click="xuanzhiTab()">VIP选址服务</span>
      </div>
      <div class="tab">
        <div class="huiyuan" v-if="tab===0">
          <div class="jieshao">
            <p>升级找铺会员，开店速度提升 <span>5</span> 倍</p>
            <p>已有 <span>18376</span> 位用户成功升级</p>
          </div>
          <div class="price">
            <div class="price-list clearfix" v-for="(item,index) in zhaopu">
              <div class="yuan">
                <span>{{item.dsc}}</span>
                <b>{{item.price}}<i>元</i></b>
              </div>
              <div class="btn" @click="goPrice(item)">购买</div>
            </div>
          </div>
          <div class="yiwen"></div>
        </div>
        <div class="xuanzhi" v-if="tab===2">
          <div class="xuanzhi-title"></div>
          <div class="price">
            <div class="price-list clearfix" v-for="(item,index) in fuwu">
              <div class="yuan">
                <span>{{item.dsc}}</span>
                <b>{{item.price}}<s>元</s></b>
                <i>服务期3个月</i>
              </div>
              <div class="btn" @click="goPrice(item)">购买</div>
            </div>
          </div>
          <div class="xuanzhi-msg"></div>
        </div>
        <div class="zhuanpu" v-if="tab===1">
          <div class="zhuanpu-title"></div>
          <div class="price clearfix">
            <div class="price-list" v-for="(item,index) in zhuanpu">
              <div class="yuan">
                <span>{{item.dsc}}</span>
                <b>{{item.price}}<em>元</em></b>
              </div>
              <div class="btn" @click="goPrice(item)">购买</div>
            </div>
          </div>
          <div class="zhuanpu-msg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  export default {
    data () {
      return {
        buy: this.childBuy,
        tab:0,
        type: "",
        zhaopu: "",
        fuwu: "",
        zhuanpu: "",
      }
    },
    props: ['childBuy'],
    mounted(){
      if(this.childBuy == 1){//找铺会员
        this.tab = 0;
        this.type = 0;
      }else if(this.childBuy == 2){//转铺服务
        this.tab = 1;
        this.type = 4;
      }else if(this.childBuy == 3){//VIP选址服务
        this.tab = 2;
        this.type = 1;
      }
      this.init();
    },
    methods:{
      goPrice(item){
        axios({
          url:'/aliPay/auth/createPCOrder',
          method: 'post',
          params: {
            id : item.id,
            orderSource: 2,
            cityId: sessionStorage.cityId
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101){
            this.$router.push({path:"/mine/pay",query:{id:res.data.orderNo}})
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      closeFun(){ //点击关闭
        this.buy = false;
        this.$emit('buyFun','false');
      },
      init(){
        axios({
          url:'/member/selectProductList',
          method: 'post',
          params: {
            cityId: sessionStorage.cityId,
            type: this.type
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101){
            if(this.tab == 0){//找铺会员
              this.zhaopu = res.data.productList;
            }else if(this.tab == 1){//转铺服务
              this.zhuanpu = res.data.productList;
            }else{//VIP选址服务
              this.fuwu = res.data.productList;
            }
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      zhaopuTab(){
        this.tab = 0;
        this.type = 0;
        this.init();
      },
      zhuanpuTab(){
        this.tab = 1;
        this.type = 4;
        this.init();
      },
      xuanzhiTab(){
        this.tab = 2;
        this.type = 1;
        this.init();
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/buy.less';
</style>
