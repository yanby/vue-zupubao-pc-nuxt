<template>
  <div class="mine-wrap">
    <Nav></Nav>
    <div class="order-wrap mine clearfix">
      <div class="order-left">
        <Mine></Mine>
      </div>
      <div class="order-right">
        <ul class="order-nav">
          <li class="li1" :class="{'on':tab===0}" @click="allBtn()">全部</li>
          <li :class="{'on':tab===1}" @click="noPaid()">待支付</li>
          <li :class="{'on':tab===2}" @click="paid()">已支付</li>
        </ul>
        <!-- 全部 -->
        <div class="ballWrap" v-if="orderArr == ''">
          <dl>
            <dt><img src="~/assets/images/order/noOrder.png"></dt>
            <dd>暂无订单信息</dd>
          </dl>
        </div>
        <div v-else>
          <div class="order-list" v-show="tab===0" v-for="(item,index) in orderArr">
            <div class="navTime">创建时间：<span>{{item.createTime}}</span></div>
            <div class="order-template">
              <dl class="up_member">
                <!-- 优铺会员 -->
                <dt v-if="item.order_type == 0"><img src="~/assets/images/order/up.png"></dt>
                <!-- 转铺服务 -->
                <dt v-else-if="item.order_type == 3"><img src="~/assets/images/order/zhuanpu.png"></dt>
                <!-- 置顶服务 -->
                <dt v-else><img src="~/assets/images/order/zhiding.png"></dt>

                <dd>{{item.orderType}}</dd>
              </dl>
              <div class="buy">
                <h3>购买产品：<span>{{item.productName}}</span></h3>
                <h4>订单编号：<span>{{item.orderNo}}</span></h4>
              </div>
              <div class="money">
                <h3>消费金额：<span>{{item.fee}}元</span></h3>
                <h4 v-if="item.feeTime">订支付时间：<span>{{item.feeTime}}</span></h4>
              </div>
              <div class="btn">
                <div class="immediate" v-if="item.status == '待支付'" @click="goPay(item.orderNo,item.fee)">立即支付</div>
                <div class="already" v-else>{{item.status}}</div>
              </div>
            </div>
          </div>
          <!-- 待支付 -->
          <div class="order-list" v-show="tab===1" v-for="(item,index) in orderArr">
            <div class="navTime">创建时间：<span>{{item.createTime}}</span></div>
            <div class="order-template">
              <dl class="up_member">
                <!-- 优铺会员 -->
                <dt v-if="item.order_type == 0"><img src="~/assets/images/order/up.png"></dt>
                <!-- 转铺服务 -->
                <dt v-else-if="item.order_type == 3"><img src="~/assets/images/order/zhuanpu.png"></dt>
                <!-- 置顶服务 -->
                <dt v-else><img src="~/assets/images/order/zhiding.png"></dt>

                <dd>{{item.orderType}}</dd>
              </dl>
              <div class="buy">
                <h3>购买产品：<span>{{item.productName}}</span></h3>
                <h4>订单编号：<span>{{item.orderNo}}</span></h4>
              </div>
              <div class="money">
                <h3>消费金额：<span>{{item.fee}}元</span></h3>
              </div>
              <div class="btn">
                <div class="immediate" @click="goPay(item.orderNo,item.fee)">立即支付</div>
              </div>
            </div>
          </div>
          <!-- 已支付 -->
          <div class="order-list" v-show="tab===2" v-for="(item,index) in orderArr">
            <div class="navTime">创建时间：<span>{{item.createTime}}</span></div>
            <div class="order-template">
              <dl class="up_member">
                <!-- 找铺服务 -->
                <dt v-if="item.order_type == 0"><img src="~/assets/images/order/up.png"></dt>
                <!-- 转铺服务 -->
                <dt v-else-if="item.order_type == 3"><img src="~/assets/images/order/zhuanpu.png"></dt>
                <!-- 置顶服务 -->
                <dt v-else><img src="~/assets/images/order/zhiding.png"></dt>

                <dd>{{item.orderType}}</dd>
              </dl>
              <div class="buy">
                <h3>购买产品：<span>{{item.productName}}</span></h3>
                <h4>订单编号：<span>{{item.orderNo}}</span></h4>
              </div>
              <div class="money">
                <h3>消费金额：<span>{{item.fee}}元</span></h3>
                <h4 v-if="item.feeTime">订支付时间：<span>{{item.feeTime}}</span></h4>
              </div>
              <div class="btn">
                <div class="already">已支付</div>
              </div>
            </div>
          </div>
        </div>
        <div class="page" v-if="pageList">
          <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
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
  import {NowTime} from '~/plugins/common.js'
  export default {
    name: 'app',
    data () {
      return {
        tab: 0,
        orderArr: [],
        pageSize: 3,
        pageNum: 1,
        totalCount: 0,
        pageList: true,
        curPage: 1
      }
    },
    components: {
      Nav,
      Navbar,
      Footer,
      Mine
    },
    mounted(){
      this.listData();
    },
    methods:{
      // 全部
      allBtn(){
        this.tab = 0;
        this.curPage = 1;
        this.pageNum = 1;
        this.listData();
      },
      // 未支付 0
      noPaid(){
        this.tab = 1;
        this.curPage = 1;
        this.pageNum = 1;
        this.listData(0);
      },
      // 未支付 1
      paid(){
        this.tab = 2;
        this.curPage = 1;
        this.pageNum = 1;
        this.listData(1);
      },
      // 获取订单接口
      listData(type) {
        axios({
          url: '/member/auth/getMyOrders',
          method: 'post',
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            status: type,
            token: localStorage.token,
          }
        }).then(data => {
          console.log(data);
          this.orderArr = data.data.data;
          this.totalCount = Number(data.data.totalCount);
          this.orderArr.forEach(function (item,index) {
            item.createTime = item.createTime;
            if(!item.feeTime == ""){
              item.feeTime = item.feeTime;
            }
          })
          //分页显示隐藏
          if(this.orderArr.length==0){
            this.pageList = false;
          }else{
            this.pageList = true;
          }
        }).catch(err => {
          console.log(err)
        });
      },
      //分页
      handleCurrentChange(val) {
        console.log(val);
        this.pageNum = val;
        this.curPage = val;
        this.listData();
        $('html , body').animate({scrollTop: 100},100);
      },
      goPay(id,type){
        this.$router.push({path:"/mine/pay",query:{id:id,type:type}});
      },
    },
  }
</script>
<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
  @import '../../assets/css/shopPages.less';
  .order-wrap{
    width: 1200px;
    margin: 20px auto 60px;
  }
  .order-left{
    width: 230px;
    height: 440px;
    float: left;
    background: #fff;
  }
  .order-right{
    width: 940px;
    min-height: 430px;
    float: right;
    padding: 30px 40px 90px;
    background: #fff;
    border: 1px solid #EAEAEA;
    position: relative;
    ul{
      height: 40px;
      background: #F7F8FA;
      li{
        list-style-type: none;
        float: left;
        width: 100px;
        color: #333333;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &.on{
          background: #224E8F;
          color: #fff;
        }
      }
    }
  }
  .order-list{
    height: 155px;
    width: 100%;
    border: 1px solid #EAEAEA;
    margin-top: 20px;
    width: 860px;
    .navTime{
      color: #888888;
      background: #F7F8FA;
      border-bottom: 1px solid #EAEAEA;
      line-height: 40px;
      width: 858px;
      padding-left: 35px;
      padding-right: 35px;
      span{
        margin-right: 10px;
      }
    }
    .order-template{
      height: 75px;
      padding: 20px 30px;
      .up_member{
        float: left;
        width: 92px;
        dt{
          margin-bottom: 10px;
          img{
            width: 50px;
            height: 50px
          }
        }
        dd{
          color: #333333;
          font-size: 14px;
        }
        .vipClass{
          position: relative;
          left: -14px;
        }
      }
      .buy{
        float: left;
        width: 295px;
        h3{
          font-size: 14px;
          color: #898989;
          margin-bottom: 20px;
          margin-top: 12px;
          span{
            color: #333333;
          }
        }
        h4{
          font-size: 14px;
          color: #898989;
          span{
            color: #333333;
          }
        }
      }
      .money{
        float: left;
        h3{
          font-size: 14px;
          color: #898989;
          margin-bottom: 20px;
          margin-top: 12px;
          span{
            color: #E8584F;
          }
        }
        h4{
          font-size: 14px;
          color: #898989;
        }
      }
      .btn{
        width: 120px;
        line-height: 35px;
        border-radius: 4px;
        float: right;
        color: #666666;
        background: #D7D7D7;
        font-size: 14px;
        margin-top: 18px;
        text-align: center;
      }
      .immediate{
        background: #E8584F;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  /*弹窗*/
  .ballWrap{
    width: 860px;
    dl{
      width: 115px;
      height: 85px;
      position: absolute;
      left: 50%;
      margin-left: -62px;
      margin-top: 78px;
      dt{
        width: 74px;
        height: 58px;
      }
      dd{
        color: #333333;
        margin-top: 20px
      }
    }
  }
</style>
