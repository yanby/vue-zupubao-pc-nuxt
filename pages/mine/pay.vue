<template>
  <div class="pay">
    <Nav></Nav>
    <!-- <div>支付</div> -->
    <div class="payment">
      <div class="payment_nav">
        <img src="~/assets/images/pay/right.png">
        <span>您选择的订单提交成功</span>
      </div>
      <div class="payment_recharge">
        <img src="~/assets/images/pay/recharge.png"><p>待支付<span>{{money}}</span>元</p>
      </div>
      <div class="select_payment">
        <p>请选择支付方式:</p>
        <dl>
          <dt :class="{'on':tab===0}" @click="tab=0"></dt>
          <dd><img src="~/assets/images/pay/alipay.png"></dd>
        </dl>
        <dl>
          <dt :class="{'on':tab===1}" @click="tab=1"></dt>
          <dd><img src="~/assets/images/pay/wechat.png"></dd>
        </dl>
      </div>
      <div class="zhifubao"></div>
      <div class="goPay" @click="goPay()">去支付</div>
      <!-- 微信支付页面 -->
      <div class="wxPayWrap" v-if="wxPayWrap">
        <div class="wxPayBox" v-if="wxPayBox">
          <div class="wxPayTop">
            <div class="closeBtn">
              <img src="~/assets/images/pay/close.png" @click="closeBtn()">
            </div>
          </div>
          <!-- 生成二维码 -->
          <div class="wxCode">
            <canvas id="canvas"></canvas>
          </div>
          <p>请使用<span>微信扫一扫</span>，轻松完成支付</p>
        </div>
      </div>
    </div>
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>
<script>
  import QRCode from 'qrcode';
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Navbar from '~/components/Navbar/Navbar'
  import Footer from '~/components/Footer/Footer';
  export default {
    data () {
      return {
        id: "",
        money: "",
        wxPay:null,
        radio: '1',
        wxPayWrap: false,
        wxPayBox: false,
        // 订单检测定时器
        theLastTime: null,
        tab: 0
      }
    },
    components: {
      Nav,
      Navbar,
      Footer
    },
    methods:{
      closeBtn(){
        this.wxPayWrap = false;
        this.wxPayBox = false;
      },
      init(){
        axios({
          url:'/aliPay/auth/getPayAmount',
          method: 'post',
          params: {
            orderNo: this.id,
            cityId: sessionStorage.cityId
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101){
            this.money = res.data.amount;
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      goPay(){ //选择支付方式
        if(this.tab == 0){ //支付宝
          axios({
            url:'/aliPay/auth/aliPayPC',
            method: 'post',
            params: {
              orderNo: this.id,
              orderSource: 2,
              cityId: sessionStorage.cityId
            }
          }).then(res => {
            console.log(res)
            $(".zhifubao").html(res.data);
          })
          .catch(err =>{
            console.log(err)
          })
          // this.wxTestPayment();
        }else if(this.tab == 1){// 微信
          this.wxPayWrap = true;
          this.wxPayBox = true;
          axios({
            url:'/weChat/auth/wxSaoMaPay',
            method: 'post',
            params: {
              orderNo: this.id,
              orderSource: 2,
              cityId: sessionStorage.cityId
            }
          }).then(res => {
            console.log(res)
            QRCode.toCanvas(document.getElementById('canvas'), res.data.data,
              { toSJISFunc: QRCode.toSJIS ,width: 200, height: 200,}, function (error) {
              if (error) console.error(error)
              console.log('success!');
            })
          })
          .catch(err =>{
            console.log(err)
          })
          this.wxTestPayment();
        }
      },
      // 支付状态检测
      wxTestPayment(){
        let _this = this;
        this.theLastTime = setInterval(function () {
          axios({
            url:'/aliPay/auth/isPay',
            method: 'post',
            params: {
              orderNo: _this.id,
            }
          })
          .then(res => {
            console.log(res);
            if(res.data.status == true){
              clearInterval(_this.theLastTime);
              _this.$router.push({path:"/mine/member"})
            }
          })
          .catch(error => {
            console.log(error);
          });
        },1000)
      },
    },
    mounted() {
      this.id = this.$route.query.id;
      this.init();
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/pay.less';
</style>
