<template>
    <div class="Footer">
        <div class="service" v-if="isActive">
            <h2>一站式开店服务</h2>
            <div>
                <dl>
                  <dt><img src="~/assets/images/footer/li1.png"></dt>
                  <dd>在线预约</dd>
                </dl>
                <dl>
                  <dt><img src="~/assets/images/footer/li2.png"></dt>
                  <dd>顾问沟通</dd>
                </dl>
                <dl>
                  <dt><img src="~/assets/images/footer/li3.png"></dt>
                  <dd>精准配铺</dd>
                </dl>
                <dl>
                  <dt><img src="~/assets/images/footer/li4.png"></dt>
                  <dd>陪同看铺</dd>
                </dl>
                <dl>
                  <dt><img src="~/assets/images/footer/li5.png"></dt>
                  <dd>交易担保</dd>
                </dl>
                <dl>
                  <dt><img src="~/assets/images/footer/li6.png"></dt>
                  <dd>成功开店</dd>
                </dl>
            </div>
        </div>
        <div class="wrap">
            <div class="wrap_box">
              <ul>
                  <li class="beijinShop">{{cityName}}商铺出租转让:</li>
                  <li v-for="(item,index) in cityList" @click="goShop(item)" v-if="index < 16"><span>{{item.name}}商铺出租转让</span></li>
              </ul>

              <div class="about_up">
                  <nuxt-link :to="{name:'youpu-aboutUp'}">关于优铺</nuxt-link>
                  <nuxt-link :to="{name:'youpu-joinUp'}">加盟优铺</nuxt-link>
                  <nuxt-link :to="{name:'youpu-joinUp'}">优铺商学院</nuxt-link>
                  <a href="http://www.zhongjinglianmeng.com" target="_blank">中经联盟</a>
                  <nuxt-link :to="{name:'youpu-contactUp'}">联系优铺</nuxt-link>
                  <nuxt-link :to="{name:'youpu-recruitUp'}">优铺招聘</nuxt-link>
                  <nuxt-link :to="{name:'shop-shopMap'}">网站地图</nuxt-link>
                  <a href="http://zyss.youpuchina.com" target="_blank">中耀盛世</a>
              </div>
              <div class="product">
                  优铺控股旗下产品:&nbsp;<a href="/module/index.html">租铺宝</a><a href="http://www.youpuglobal.com/" target="_blank">卖铺宝</a><a href="http://college.youpuchina.com" target="_blank">优铺商学院</a>
              </div>

              <div class="youpu_code">
                  <dl>
                      <dt><img src="~/assets/images/footer/zupubao.png"></dt>
                      <dd>优铺-租铺宝</dd>
                  </dl>
                  <dl>
                      <dt><img src="~/assets/images/footer/fuwuhao.png"></dt>
                      <dd>优铺-服务号</dd>
                  </dl>
              </div>

              <div class="copyright">
                  <p>版权所有：北京优铺网络科技有限公司  Copyright 2016 Beijing Youpu Network Technology Co., Ltd</p>
                  <p>京ICP备16035060号 客服电话：4008988808</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '~/plugins/axios.js';
export default {
  name: 'Footer',
  data () {
    return {
      cityList: "",
      isActive: true,
      cityName: ""
    }
  },
  methods:{
    init(){
      axios({
        url: '/show/showInfoPC',
        method: 'post',
        params: {
          cityId: sessionStorage.cityId
        }
      }).then(res => {
        // console.log(res)
        // 列表商铺展示
        this.cityList = res.data.areaList; //区域
      }).catch(err => {
        console.log(err)
      });
    },
    goShop(item){
      this.$router.push({path:"/shop/shopList",query:{key:"businessCircleId",id:item.id}})
    }
  },
  mounted(){
    this.init();
    var filename=window.location.href;
    if(filename.indexOf("turnShop") != -1){
      this.isActive = false;
    }
    if(sessionStorage.cityName){
      this.cityName = sessionStorage.cityName.split("市").join("");;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
  @import '../../assets/css/footer.less';
</style>
