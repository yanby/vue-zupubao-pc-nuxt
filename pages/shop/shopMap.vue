<template>
  <div class="shopMap">
    <Nav></Nav>
    <div class="shopMap w1200">
      <h2><a href="index.html">首页</a>>网站地图</h2>
      <div class="wrap">
        <h3><span></span>{{cityName}}商铺出租/转让热搜词</h3>
        <ul class="clearfix">
          <li><nuxt-link :to="{name:'shop-shopList'}">商铺出租</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">店铺转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">生意转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">饭店生意转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">百货超市转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">美发店生意转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">汽修美容店转让</nuxt-link></li>
          <li><nuxt-link :to="{name:'shop-shopList'}">酒店生意转让</nuxt-link></li>
        </ul>
        <h3><span></span>{{cityName}}各业态商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in yetai" @click="yetaiFun(item)">{{item.name}}商铺出租/转让</li>
        </ul>
        <h3><span></span>{{cityName}}行政区商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in areas" @click="areasFun(item)">{{item.name}}商铺出租/店铺转让</li>
        </ul>
        <div class="all" v-for="(item,index) in areas">
          <h3 v-if="index > 0"><span></span>{{cityName}}{{item.name}}商铺出租/转让</h3>
          <ul class="clearfix">
            <li v-if="index1 > 0" v-for="(item1,index1) in item.childList" @click="otherFun(item1)">{{item1.childName}}商铺出租/店铺转让</li>
          </ul>
        </div>
      </div>
    </div>
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Navbar from '~/components/Navbar/Navbar'
  import Footer from '~/components/Footer/Footer';
  import AboutNav from '~/components/Nav/AboutNav';

  export default {
    name: '',
    data(){
      return{
        cityName:"",//城市
        areas:"",//区域
        yetai: "",//业态
        info:""
      }
    },
    components: {
      Nav,
      Navbar,
      Footer
    },
    asyncData ({ params, error }) {
      return axios({
        method: 'post',
        url: '/shop/getSearchConditon',
        params:{
          cityId: 110100,
        }
      }).then((res) => {
        return { info: res.data}
      })
    },
    mounted(){
      this.cityName = sessionStorage.cityName;
      this.init();
    },
    methods:{
      init(){
        axios({
          url: '/shop/getSearchConditon',
          method: 'post',
          params: {
            cityId: sessionStorage.cityId
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.code==101){
              // 列表商铺展示
              this.areas = res.data.areas;//区域
              this.yetai = res.data.shopBusinessTypes;//业态
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      areasFun(item){//点击区域
        this.$router.push({path:"/shop/shopList",query:{key:"businessCircleId",id:item.id}})
      },
      yetaiFun(item){//点击业态
        this.$router.push({path:"/shop/shopList",query:{key:"businessTypeId",id:item.id}})
      },
      otherFun(item){//点击区域下面的区域
        this.$router.push({path:"/shop/shopList",query:{key:"businessCircleId",childId:item.childId}})
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/shopMap.less';
</style>
