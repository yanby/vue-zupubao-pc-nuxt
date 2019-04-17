<template>
  <div class="mine-wrap">
    <Nav></Nav>
    <div class="mine w1200 clearfix">
      <Mine></Mine>
      <div class="mine-right right">
        <div class="noCollect" v-show="collect===0">
          <div class="wrap">
            <div class="img"></div>
            <div class="txt">您还没有收藏过任何商铺！ <br><nuxt-link :to="{name:'shop-shopList'}">去抢旺铺</nuxt-link></div>
          </div>
        </div>
        <div class="collect" v-show="collect===1">
          <h3>共 <span>{{totalCount}}</span> 套收藏铺源</h3>
          <ul class="shop-left shop-collect">
            <li v-for="item in shopList" @click="goShopDetail(item)">
              <div class="img">
                <div v-if="item.onlineStatus==0" class="xiajia">已下架</div>
                <img :src="item.img" alt="" :onerror="defaultImg">
              </div>
              <div class="txt">
                <h5>{{item.title}}</h5>
                <p>{{item.shopName}}</p>
                <div class="tag">
                  <span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span>
                </div>
              </div>
              <div class="price">
                <p><span>{{item.monthlyRent}}</span> <b>{{item.unit}}</b></p>
                <div>转让费: <span>{{item.transferFee}}{{item.unitTransFerfee}}</span></div>
                <div class="cancel" @click.stop="cancelCollect(item)"><span></span>取消收藏</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
          </el-pagination>
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
  import Buy from '~/components/Buy/buy';
  import Mine  from '~/components/Mine/Mine';
  export default {
    components: {
      Nav,
      Footer,
      Navbar,
      Mine
    },
    data (){
      return {
        defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
        iphone: "",//手机号好
        collect: "",//判断有没有收藏
        shopList: "",//收藏列表
        shopCollId: "",//收藏烌ID
        totalCount: 0,//总条数
        page: "",
        pageSize: 10,
        pageNum: 1,
      }
    },
    mounted(){
      this.init();//收藏列表
    },
    methods:{
      init(){//收藏列表
        axios({
          url: '/member/auth/selectCollectionList',
          method: 'post',
          params:{
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code == 101){
            this.shopList = res.data.shopCollections;
            this.totalCount = Number(res.data.totalCount);
            if(this.totalCount == 0){
              this.collect = 0;
            }else{
              this.collect = 1;
            }
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      cancelCollect(item){//取消收藏
        var that = this;
        axios({
          url: '/member/auth/cancelCollection',
          method: 'post',
          params: {
            shopId : item.id
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.code == 101){
              this.$message("取消收藏")
              that.init();
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      goShopDetail(item){//跳转到详情页面
        if(item.onlineStatus != 0){
          window.open("/shopDetail/" + item.id);
        }else{
          this.$message("该商铺已下架~");
        }

      },
      //分页
      handleCurrentChange(val) {
        //console.log(val);
        this.pageNum = val;
        this.init();
        $('html , body').animate({scrollTop: 100},100);
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
  @import '../../assets/css/shopMsg.less';
  @import '../../assets/css/shopPages.less';
  .collect{
    .img{
      position: relative;
      .xiajia{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        padding: 5px 10px;
        background: #f00;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
  }

</style>
