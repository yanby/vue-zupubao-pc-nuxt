<template>
  <div class="mine-wrap">
    <Nav></Nav>
    <Buy v-if="buy===1 || buy===2 || buy===3" :child-buy="buy" @buyFun="myFun()"></Buy>
    <div class="mine w1200 clearfix">
      <Mine></Mine>
      <div class="mine-right right">
        <div class="member-wrap" v-if="member===1">
          <div class="allOrder" v-for="item in list">
            <div class="navTime">购买日：<span>{{item.createTime}}</span></div>
            <div class="order-template">
              <dl class="up_member" v-if="item.memberType === '0'">
                <dt><img src="~/assets/images/mine/huiyuan.png"></dt>
                <dd>找铺会员</dd>
              </dl>
              <dl class="up_member" v-else-if="item.memberType === '1'">
                <dt><img src="~/assets/images/mine/xuanzhi.png"></dt>
                <dd>VIP选址服务</dd>
              </dl>
              <dl class="up_member" v-else-if="item.memberType === '2'">
                <dt><img src="~/assets/images/mine/zhuanpu.png"></dt>
                <dd>VIP转铺服务</dd>
              </dl>
              <dl class="up_member" v-else-if="item.memberType === '3' || item.memberType === '4'">
                <dt><img src="~/assets/images/mine/zhuanpuNew.png"></dt>
                <dd>转铺会员</dd>
              </dl>
              <div class="member-msg">
                <h3>今日特权：<span>您今日还可免费查看<b>{{item.restNum}}套</b>商铺（共{{item.totalNum}}套/日）</span></h3>
                <h4>到 期 日：<span>{{item.endTime}}</span></h4>
              </div>
              <div class="btn">
                <div class="already" v-if="item.memberType === '0'" @click="buy=1">会员延期</div>
                <div class="already" v-if="item.memberType === '1'" @click="buy=3">VIP延期</div>
                <!--<div class="already" v-if="item.memberType === '2'" @click="buy=3"></div>-->
                <div class="already" v-if="item.memberType === '3' || item.memberType === '4'" @click="buy=2">会员延期</div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="member-no" v-if="member===0">
          <div class="img"></div>
          <p>您还不是会员，立即升级会员享受更多服务</p>
          <div class="btn" @click="buy=1">升级会员</div>
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
    name: '',
    components: {
      Nav,
      Buy,
      Footer,
      Navbar,
      Mine
    },
    data (){
      return{
        list: "",
        huiyuan: "",
        vip: "",
        member: '',
        buy: false,
        pageSize: 10,
        pageNum: 1,
        totalCount: 0,
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        axios({
          url:　"/member/auth/getMyMember",
          method: 'post',
          params:{
            pageSize: this.pageSize,
            pageNum: this.pageNum,
          }
        }).then(res => {
          console.log(res)
          this.list = res.data.data;
          this.totalCount = Number(res.data.totalCount);
          try{
            if(this.list.length == 0){
              this.member = 0;
            }else{
              this.member = 1;
            }
          }catch(e){
            console.log(e)
          }
        }).catch(err => {
          console.log(err)
        });
      },
      //分页
      handleCurrentChange(val) {
        //console.log(val);
        this.pageNum = val;
        this.init();
        $('html , body').animate({scrollTop: 100},100);
      },
      myFun(){
        this.buy = false;
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
  @import '../../assets/css/shopPages.less';
</style>
