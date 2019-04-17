<template>
  <div class="turnShop">
    <Nav></Nav>
    <div class="seek_wrap">
      <div class="seek_box">
        <div class="seek_box1">
          <div class="box_free">
            <h3>免费委托转铺</h3>
            <h5>已有<span>{{turnShopObj}}</span>人成功转店</h5>
            <input type="text" name="" placeholder="请输入手机号,专属顾问5分钟内与您联系" maxlength="11" v-model="telVal">
            <div class="submit_btn" @click="turnBtn()">提交</div>
            <h6>客服电话：400-898-8808</h6>
          </div>
          <div class="seek_right">
            <h2>委托转铺</h2>
            <img src="~/assets/images/turnShop/imgTop.png">
          </div>
        </div>
      </div>

      <!-- 多块好省 -->
      <div class="turnShopTopwrap">
        <div class="turnShopTop">
          <dl>
            <dt><img src="~/assets/images/turnShop/much.png"></dt>
            <dd>
              <p><span>10万+</span>找铺客户</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/fast.png"></dt>
            <dd>
              <p>平均<span>32天</span>成功转出</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/good.png"></dt>
            <dd>
              <p><span>一对一</span>顾问式服务</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/province.png"></dt>
            <dd>
              <p>省时省心<span>更省钱</span></p>
            </dd>
          </dl>
        </div>
      </div>

      <!-- 委托转铺6大安心服务保障  -->
      <div class="sixSecurityWrap">
        <div class="sixSecurity">
          <h2>委托转铺6大安心服务保障</h2>
          <div class="sixSecurityBox" v-for="item in sixSecurityArr">
            <dl>
              <dt>
                <img :src="item.img">
              </dt>
              <dd>
                {{item.msg1}}
              </dd>
            </dl>
            <ul>
              <li>{{item.msg2}}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 委托转铺具体服务流程 -->
      <div class="serviceFlowWrap">
        <h2>委托转铺具体服务流程</h2>
        <div class="serviceFlow">
          <dl v-for="item in serviceFlowArr">
            <dt><img :src="item.img"></dt>
            <dd>
              <h3>{{item.msg1}}</h3>
              <p>{{item.msg2}}</p>
            </dd>
          </dl>
        </div>
      </div>

      <!-- 委托转铺服务收费标准 -->
      <div class="chargeStandard">
        <h2>委托转铺服务收费标准</h2>
        <div class="chargeStandardMain">
          <div class="chargeStandardMainDl" v-for="item in vipArr">
            <dl>
              <dt>
                <h3>{{item.dsc}}</h3>
                <h4>¥{{item.price}}</h4>
              </dt>
              <dd @click="goBuyBtn(item)">立即购买</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="Footer">
      <div class="service">
        <h2>一站式转店服务</h2>
        <div>
          <dl>
            <dt><img src="~/assets/images/turnShop/li1.png"></dt>
            <dd>在线预约</dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/li2.png"></dt>
            <dd>顾问沟通</dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/li3.png"></dt>
            <dd>精准配客</dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/li4.png"></dt>
            <dd>陪同签约</dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/li5.png"></dt>
            <dd>交易担保</dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/turnShop/li6.png"></dt>
            <dd>成功转店</dd>
          </dl>
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
  export default {
    head () {
      return {
        title: '委托转店_快速转店_转店快-优铺网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '商铺转让，店铺转让，旺铺转让，门面转让，转店网，转店平台，租铺宝，优铺网'},
          { hid: 'description', name: 'description', content: '优铺网旗下租铺宝提供高效的店铺出兑、门面转租、旺铺转让、店铺转让等服务，极速转店、无忧转店找优铺。' }
        ]
      }
    },
    components: {
      Nav,
      Footer,
      Navbar
    },
    data (){
      return {
        turnShopObj: null,
        telVal: "",
        // 委托转铺6大安心服务保障
        sixSecurityArr: [
          {
            // img: "https://up-static.oss-cn-beijing.aliyuncs.com/311532749718_.pic.jpg",
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/721532751532_.pic.jpg",
            msg1: "上门实勘 免费评估",
            msg2: "专业商铺顾问上门核实店铺，免费评估费用信息，确保价位合理"},
          // {
          //   img: "https://up-static.oss-cn-beijing.aliyuncs.com/661532751231_.pic.jpg",
          //   msg1: "不成交 退服务费",
          //   msg2: "合作期间未能成功转出店铺，退还服务费，转铺无压力"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/531532750868_.pic.jpg",
            msg1: "全网推广 效果倍增",
            msg2: "优铺自有平台，外部合作平台全覆盖推广，转店效率提升10倍"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/541532750873_.pic.jpg",
            msg1: "精准配客 一对一服务",
            msg2: "大数据匹配系统+专业顾问一对一服务，精准推荐匹配客户，协助店主谈判议价"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/301532749718_.pic.jpg",
            msg1: "全程陪签 规避风险",
            msg2: "专业商铺顾问全程陪同签约，免费提供标准合同，杜绝签约风险"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/691532751316_.pic.jpg",
            msg1: "资金托管 安全交易",
            msg2: "转让费过户监管，免费法律援助，平稳交易更安全"}
        ],
        // 委托转铺具体服务流程
        serviceFlowArr: [
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/181532749710_.pic.jpg",
            msg1: "在线委托",
            msg2: "填写联系电话等待顾问联系"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/191532749714_.pic.jpg",
            msg1: "支付成功",
            msg2: "在线支付付款完成"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/501532750394_.pic.jpg",
            msg1: "匹配顾问",
            msg2: "根据经营业态匹配顾问，一对一服务"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/221532749716_.pic.jpg",
            msg1: "精准配客",
            msg2: "顾问根据店铺需求，精准推荐符合客源"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/231532749717_.pic.jpg",
            msg1: "交易撮合",
            msg2: "顾问免费协助店主与意向客户谈判议价促成交易"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/731532751533_.pic.jpg",
            msg1: "陪同签约",
            msg2: "顾问全程陪同签约，免费提供标准合同，转让费过户监管"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/241532749717_.pic.jpg",
            msg1: "成功转出",
            msg2: "顾问全程协助办理过户交割，店铺成功转出"}
        ],
        // 购买VIP
        vipArr: "",
      }
    },
    mounted(){
      this.init();
      // 接口调用
      this.listData();
      if(localStorage.iphone){
        this.telVal = localStorage.iphone;
      }
    },
    methods:{
      //获取价格
      init(){
        axios({
          url:'/member/selectProductList',
          method: 'post',
          params: {
            cityId: sessionStorage.cityId,
            type: 4
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101) {
            this.vipArr = res.data.productList;
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      // 首页展示
      listData() {
        axios({
          url: '/show/selectNumber',
          method: 'post',
          params:{
            cityId: sessionStorage.cityId
          }
        }).then(res => {
          console.log(res);
          // 委托找铺
          this.turnShopObj = res.data.shopLineNum;
        }).catch(err => {
          console.log(err)
        });
      },
      // 我要委托接口封装
      turnBtn() {
        let _this = this
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.telVal == ""){
          this.$message("请输入手机号码");
        }else if(!reg.test(this.telVal)){
          this.$message("请输入正确手机号");
        }else {
          // 接口调用
          axios({
            url: '/show/addCutomer',
            method: 'post',
            params: {
              account: _this.telVal,
              type: 1,
              source: 2,
              cityId: sessionStorage.cityId,
              provinceId: sessionStorage.provinceId
            }
          }).then(data => {
            // console.log(data);
            if(data.data.code ==101){
              _this.telVal = "";
              this.$message(data.data.msg);
            } else{
              this.$message('系统繁忙，请稍后再试');
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 跳转支付页面
      goBuyBtn(item){
        if(localStorage.token){
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
        }else{
          this.$message("请先登录");
          this.$router.push({path:"/login",query:{url:"turnShop"}})
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/turnShop.less';
</style>
