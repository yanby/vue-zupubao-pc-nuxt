<template>
  <div class="seekShop">
    <Nav></Nav>
    <div class="seek_wrap">
      <div class="seek_box">
        <div class="seek_box1">
          <div class="box_free">
            <h3>免费委托找铺</h3>
            <h5>已有<span>{{seekShopObj}}</span>人成功开店</h5>
            <input type="text" name="" placeholder="请输入手机号,专属顾问5分钟内与您联系" maxlength="11" v-model="telVal">
            <div class="submit_btn" @click="seekBtn">提交</div>
            <h6>客服电话：400-898-8808</h6>
          </div>
          <div class="seek_right">
            <h2>委托找铺</h2>
            <img src="~/assets/images/seekShop/imgTop.png">
          </div>
        </div>
      </div>

      <!-- 多块好省 -->
      <div class="turnShopTopwrap">
        <div class="turnShopTop">
          <dl>
            <dt><img src="~/assets/images/seekShop/much.png"></dt>
            <dd>
              <p><span>10万+</span>套真铺源</p>
              <p>日更新<span>1000+</span>套</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/seekShop/fast.png"></dt>
            <dd>
              <p>最快<span>48小时</span>成交</p>
              <p>平均<span>28天</span>成功开店</p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/seekShop/good.png"></dt>
            <dd>
              <p>一对一顾问式服务</p>
              <p>不成交<span>不收费</span></p>
            </dd>
          </dl>
          <dl>
            <dt><img src="~/assets/images/seekShop/province.png"></dt>
            <dd>
              <p>收费仅为中介<span>1/10</span></p>
              <p>省时省心更省钱</p>
            </dd>
          </dl>
        </div>
      </div>
      <!-- 委托找铺6大安心服务承诺  -->
      <div class="sixSecurityWrap">
        <div class="sixSecurity">
          <h2>委托找铺6大安心服务承诺</h2>
          <div class="sixSecurityBox" v-for="item in sixSecurityData">
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

      <!-- 委托找铺具体服务流程 -->
      <div class="serviceFlowWrap">
        <h2>委托找铺具体服务流程</h2>
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
      <!-- 委托找铺服务收费标准 -->
      <div class="chargeStandard">
        <h2>委托找铺服务收费标准</h2>
        <div class="chargeStandardMain">
          <div class="chargeStandardMainDl" v-for="item in vipArr">
            <dl>
              <p>{{item.dsc}}</p>
              <dt>
                <h4>{{item.price}}<span>元</span></h4>
                <h5><span>服务期3个月</span></h5>
              </dt>
              <dd @click="goBuyBtn(item)">立即购买</dd>
            </dl>
          </div>
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
        title: '找店铺_找店面_找店网_找店快_快速找店-优铺网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '大数据匹配，无中介费用，找店铺的网站，租铺宝，优铺网'},
          { hid: 'description', name: 'description', content: '优铺网旗下租铺宝提供快速找店铺、找门面、求租临街门面等多项找铺服务。十年经验商铺选址顾问全程一对一服务，行业首家承诺“不成交不收费”的商铺交易平台。' }
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
        seekShopObj: null,
        telVal: "",
        // 委托找铺6大安心服务承诺
        sixSecurityData: [
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/251532749717_.pic.jpg",
            msg1: "100%真铺源 精准匹配商铺",
            msg2: "铺源100%人工核验，证照、产权审核确保合规，按需精准配铺，拒绝低效找铺方式"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/661532751231_.pic.jpg",
            msg1: "不成交 退服务费",
            msg2: "合作期间未能成功找到满意店铺，退还服务费，找铺无压力"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/281532749717_.pic.jpg",
            msg1: "实价保障 差价赔付",
            msg2: "专业选址顾问协助谈判议价，转让费平均砍掉3成，如高出个人谈判价格，赔差价"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/291532749718_.pic.jpg",
            msg1: "拆迁担保 10倍赔付",
            msg2: "权威机构拆迁风险评估，如一年内遇拆迁，保障资金10倍赔付"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/301532749718_.pic.jpg",
            msg1: "全程陪签 规避风险",
            msg2: "专业选址顾问全程陪同签约，免费提供标准合同，零风险交付"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/311532749718_.pic.jpg",
            msg1: "交易托管 安全可靠",
            msg2: "转让费过户监管，免费法律援助，平稳交易更安全"}
        ],
        // 委托找铺具体服务流程
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
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/201532749715_.pic.jpg",
            msg1: "匹配顾问",
            msg2: "根据经营业态匹配顾问，一对一服务"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/221532749716_.pic.jpg",
            msg1: "精准配铺",
            msg2: "顾问根据选址需求，精准推荐符合铺源"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/231532749717_.pic.jpg",
            msg1: "谈判议价",
            msg2: "意向店铺顾问免费协助谈判议价，确保实价杜绝虚高"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/261532749717_.pic.jpg",
            msg1: "陪同签约",
            msg2: "顾问全程陪同签约，免费提供标准合同，转让费过户监管"},
          {
            img: "https://up-static.oss-cn-beijing.aliyuncs.com/241532749717_.pic.jpg",
            msg1: "成功开店",
            msg2: "店铺签约成功，提供代办证照、金融贷款等延伸服务"}
        ],
        // 购买VIP
        vipArr: "",
      }
    },
    mounted(){
      this.init();
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
            type: 1
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
          this.seekShopObj = res.data.peopleNum;
        }).catch(err => {
          console.log(err)
        });
      },
      // 我要委托接口封装
      seekBtn() {
        let _this = this
        // 手机号码验证
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
              type: 0,
              source: 2,
              cityId: sessionStorage.cityId,
              provinceId: sessionStorage.provinceId
            }
          }).then(data => {
            console.log(data);
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
      // 获取订单接口调用
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
          this.$router.push({path:"/login",query:{url:"seekShop"}})
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/seekShop.less';
</style>
