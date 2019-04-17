<template>
  <div class="shopDetail">
    <Nav></Nav>
    <Buy v-if="buy===1 || buy===2" :child-buy="buy" @buyFun="myFun()"></Buy>
    <div class="model-wrap" v-if="modelPu===1">
      <div class="model">
        <h2>在线委托 &nbsp;&nbsp; 多快好省</h2>
        <div class="input"><input maxlength="11" v-model="modelTxt" type="text" placeholder="输入手机号，专家免费帮您找铺"><span>*请输入手机号</span></div>
        <div class="btn"><span @click="zhaoFun()">委托找铺</span><b @click="zhuanFun()">委托转铺</b></div>
        <div class="close" @click="modelPu=0"></div>
      </div>
    </div>
    <div class="huiyuan-model" v-if="huiyuanModel">
      <div class="model">
        <h2>温馨提示</h2>
        <h3>此商铺为热门商铺 仅限找铺会员查看</h3>
        <h3>升级找铺会员独享最新热门铺源</h3>
        <p>同时享有8项专属服务</p>
        <div class="btn"><span @click="huiyuanModel=false">我知道了</span><b @click="buy=1">升级找铺会员</b></div>
        <div class="close" @click="huiyuanModel=false"></div>
      </div>
    </div>
    <div class="model-login" v-if="modelLogin===1">
      <div class="model">
        <h2>登录</h2>
        <ul>
          <li><span>手机号码</span><input type="text" maxlength="11" v-model="tel" class="tel" placeholder="请输入手机号" @blur="telFun()"><b class="cur" :disabled="disabled" v-if="sendClass===0" @click="sendFun()">{{send}}</b><b class="sendColor" v-else-if="sendClass===1">重新发送 ({{this.time}})</b></li>
          <li><span>手机验证码</span><input type="text" v-model="code" class="code" placeholder="请输入验证码"></li>
        </ul>
        <div class="btn" @click="loginFun()">提交</div>
        <div class="close" @click="modelLogin=0"></div>
      </div>
    </div>
    <div class="model-down" v-if="modelDown===1">
      <div class="model">
        <h2>温馨提示</h2>
        <p>您今日<span>3次</span>看铺机会已用完，可下载app享受更多查看次数，也可开通会员继续查看</p>
        <div class="btn"><span><nuxt-link :to="{name:'downLoad-appDownload'}">APP下载</nuxt-link></span><b @click="buy=1">立即开通</b></div>
        <div class="close" @click="modelDown=0"></div>
      </div>
    </div>
    <div class="model-mianfei" v-if="modelMianfei===1">
      <div class="model">
        <h2>温馨提示</h2>
        <p>您今日还可免费查看<span>{{numIndex}}套</span>商铺(共{{pvCount}}套/日)</p>
        <div class="btn" @click="modelMianfei=0">确定</div>
        <div class="close" @click="modelMianfei=0"></div>
      </div>
    </div>
    <div class="model-over" v-if="modelOver===1">
      <div class="model">
        <h2>温馨提示</h2>
        <p>您今日<span>{{pvCount}}次</span>看铺机会已用完，可明天再来哦~</p>
        <div class="btn"><span @click="modelOver=0">明天再来</span><b @click="buy=1">立即开通</b></div>
        <div class="close" @click="modelOver=0"></div>
      </div>
    </div>
    <div class="model-inner" v-if="modelSuccee===1">
      <div class="model">
        <p>委托成功,优铺客服会在<span>24小时内</span>与您联系， 请保持手机畅通！</p>
        <div @click="modelSuccee=0">我知道了</div>
      </div>
    </div>
    <div class="shopDetail w1200">
      <h2><span>首页>{{cityName}}>{{shopDetail.areaName}}>{{businessAreaName}}>商铺详情</span>
        <div class="search">
          <input type="text" placeholder="区域/商圈/业态/商铺编号" v-model="search" @keyup.enter="searchFun()"><button @click="searchFun()"></button>
        </div>
      </h2>
      <div class="shopDetail-msg">
        <div class="shop-banner clearfix">
          <div class="shop-left left">
            <div class="big">
              <div class="prev"></div>
              <div class="next"></div>
              <ul>
                <li v-for="item in imgs"><img :src="item" alt="" :onerror="defaultImg"></li>
              </ul>
            </div>
            <div class="small">
              <ol>
                <li v-for="item in imgs"><img :src="item" alt="" :onerror="defaultImg"></li>
              </ol>
            </div>
          </div>
          <div class="shop-right right">
            <h3>{{shopName}}</h3>
            <div class="bianhao">
              <span>商铺编号：{{shopNumber}}</span>
              <div class="shoucang" @click="shoucang($event)">
                收藏
              </div>
            </div>
            <ul class="price">
              <li>
                <p><span>{{monthlyRent}} </span><i>{{unitMonthRent}}</i> <s>{{dailyRent}} {{unitDailyRent}}</s></p>
                <p>月租金</p>
                <div class="line"></div>
              </li>
              <li>
                <p><span>{{useArea}}</span> <b>m²</b></p>
                <p>面积</p>
                <div class="line"></div>
              </li>
              <li>
                <p><span>{{shopDetail.transferFee}}</span> <b>{{shopDetail.unitTransFerfee}}</b></p>
                <p>转让费</p>
              </li>
            </ul>
            <div class="tag">
              <span v-for="item in shopTags">{{item}}</span>
            </div>
            <div class="address">
              <div v-if="shopType==3" class="clearfix"><span>地址：</span><b>{{shopDetail.road}} &nbsp;附近</b><i class="cur">查看详细地址</i></div>
              <div v-else-if="add===1 && shopType!=3" class="clearfix"><span>地址：</span><b>{{shopDetail.road}} &nbsp;附近</b><i @click="address()">查看详细地址</i><a href="javascript:;"><em></em><s @click="mapBtn()">查看地图</s></a></div>
              <div v-else-if="add===2 && shopType!=3" class="look clearfix"><span>地址：</span><b>{{shopDetail.areaName}}{{shopDetail.road}}{{realAddress}}</b><a href="javascript:;"><em></em><s @click="mapBtn()">查看地图</s></a></div>
            </div>
            <div v-if="shopType==3" class="telPhone cur">
              查看店主电话
            </div>
            <div v-else-if="telphone===1 && shopType!=3" class="telPhone" @click="telPhone()">
              <span></span><b>查看店主电话</b>
              <div @click.stop="" class="telPhone-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
            </div>
            <div v-else-if="telphone===2 && shopType!=3" class="telPhone">
              <span></span><b>{{iphone}}</b>
              <div @click.stop="" class="telPhone-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
            </div>
          </div>
        </div>
        <div class="title-list">
          <div class="title">
            <span class="cur">配套设施</span>
            <span>经营状态</span>
            <span>物业信息</span>
            <span>费用信息</span>
            <span class="m0">位置信息</span>
          </div>
        </div>
        <div class="shop-msg clearfix">
          <div class="shopMsg-left left">

            <div class="sheshi" id="sheshi">
              <h3><span></span>配套设施</h3>
              <div class="list clearfix">
                <dl>
                  <dt class="yan"></dt>
                  <dd>烟管道</dd>
                </dl>
                <dl>
                  <dt class="xia"></dt>
                  <dd>下水</dd>
                </dl>
                <dl>
                  <dt class="wai"></dt>
                  <dd>外摆区</dd>
                </dl>
                <dl>
                  <dt class="ting"></dt>
                  <dd>停车位</dd>
                </dl>
                <dl>
                  <dt class="tian"></dt>
                  <dd>天然气</dd>
                </dl>
                <dl>
                  <dt class="shang"></dt>
                  <dd>上水</dd>
                </dl>
                <dl>
                  <dt class="ming"></dt>
                  <dd>明火</dd>
                </dl>
                <dl>
                  <dt class="pai"></dt>
                  <dd>排污管道</dd>
                </dl>
                <dl>
                  <dt class="mei"></dt>
                  <dd>煤气</dd>
                </dl>
                <dl>
                  <dt class="dian"></dt>
                  <dd>380伏</dd>
                </dl>
              </div>
            </div>
            <div class="jingying" id="jingyin">
              <h3><span></span>经营状态</h3>
              <ul class="clearfix">
                <li v-show="manageType"><span>当前经营：</span><b class="manageType" :title="manageType">{{manageType1}}</b></li>
                <li v-show="license"><span><b>证</b>照：</span><b>{{license}}</b></li>
                <li class="cur" v-show="shopPapers.length > 0"><span>已有证件：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopPapers">{{item}} &nbsp;</b><b v-if="shopPapers.length > 1">等{{shopPapers.length}}项 &nbsp;</b><a
                  href="javascript:;" class="blue" @click="certificateFun()" v-if="shopPapers.length > 2">详情</a>
                  <div class="look" v-if="certificate"><b v-for="(item,index) in shopPapers">{{item}} &nbsp;</b><s @click="delcertificateFun()"></s></div>
                </li>
                <li v-show="shopDetail.manageStatus"><span>经营状态：</span><b>{{shopDetail.manageStatus}}</b></li>
                <!--<li v-show="shopAdvantages.length > 0"><span>本店优势：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopAdvantages">{{item}} &nbsp;</b><b v-if="shopAdvantages.length > 1">等{{shopAdvantages.length}}项 &nbsp;</b><a-->
                  <!--href="javascript:;" class="blue" @click="advantageFun()" v-if="shopAdvantages.length > 2">详情</a>-->
                  <!--<div class="look" v-if="advantage"><b v-for="(item,index) in shopAdvantages">{{item}}</b><s @click="deladvantageFun()"></s></div>-->
                <!--</li>-->
                <!--<li v-show="shopDetail.brandStatus"><span>品牌情况：</span><b v-for="item in shopDetail.brandStatus">{{item}}</b></li>-->
                <!--<li v-show="shopDetail.noManageType" class="m0"><span>不可经营业态：</span><b>{{shopDetail.noManageType}}</b></li>-->
                <!--<div class="transfer" v-show="shopIssues.length > 0"><span>过往经营最的大问题：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopIssues">{{item}} &nbsp;</b><b v-if="shopIssues.length > 1">等{{shopIssues.length}}项 &nbsp;</b><a-->
                  <!--href="javascript:;" class="blue" @click="issueFun()" v-if="shopIssues.length > 2">详情</a>-->
                  <!--<div class="look lookBig" v-if="issue"><b v-for="(item,index) in shopIssues">{{item}} &nbsp;</b><s @click="delissueFun()"></s></div>-->
                <!--</div>-->
              </ul>
            </div>
            <div class="jingying wuye" id="wuye">
              <h3><span></span>物业信息</h3>
              <ul class="clearfix">
                <li v-show="shopDetail.typeName"><span>商铺类型：</span><b>{{shopDetail.typeName}}</b></li>
                <!--<li v-show="shopDetail.buildArea"><span>建筑面积：</span><b>{{shopDetail.buildArea}}m²</b></li>-->
                <li v-show="useArea"><span>建筑面积：</span><b>{{useArea}}m²</b></li>
                <li v-show="shopDetail.floor"><span><b>楼</b>层：</span><b>{{shopDetail.floor}}</b></li>
                <li v-show="shopDetail.spearate"><span>是否分隔：</span><b>{{shopDetail.spearate}}</b></li>
                <li v-show="shopDetail.froutage"><span>临主干道：</span><b>{{shopDetail.froutage}}</b></li>
                <li v-show="shopDetail.floorHeight"><span><b>层</b>高：</span><b>{{shopDetail.floorHeight}}m</b></li>
                <li v-show="shopDetail.faceWidth"><span><b>面</b>宽：</span><b>{{shopDetail.faceWidth}}m</b></li>
                <li v-show="shopDetail.depth"><span><b>进</b>深：</span><b>{{shopDetail.depth}}m</b></li>
                <li v-show="shopDetail.orientation"><span><b>朝</b>向：</span><b>{{shopDetail.orientation}}</b></li>
                <li v-show="shopDetail.propertyName"><span><b>产</b>权：</span><b>{{shopDetail.propertyName}}</b></li>
                <li v-show="" class="m0"><span>其他产权：</span><b>{{}}</b></li>
              </ul>
            </div>
            <div class="jingying zuyue" id="feiyong">
              <h3><span></span>费用信息</h3>
              <ul class="clearfix">
                <li v-show="monthlyRent"><span><i>月</i><i>租</i>金：</span><b>{{monthlyRent}}{{unitMonthRent}}</b></li>
                <li v-show="shopDetail.pledgeCash"><span><b>押</b>金：</span><b>{{shopDetail.pledgeCash}}</b></li>
                <li v-show="shopDetail.payType"><span>支付方式：</span><b>{{shopDetail.payType}}</b></li>
                <li v-show="shopDetail.timeRent"><span>分时出租：</span><b>{{shopDetail.timeRent}}</b></li>
                <li v-show="shopDetail.maxLease"><span>最长租约：</span><b>{{shopDetail.maxLease}}个月</b></li>
                <li v-show="shopDetail.currLease"><span>当前租约：</span><b>{{shopDetail.currLease}}个月</b></li>
                <li v-show="shopDetail.residue"><span><i>还</i><i>剩</i>余：</span><b>{{shopDetail.residue}}个月</b></li>
                <li v-show="shopDetail.leaseCase" class="m0"><span>续约情况：</span><b>{{shopDetail.leaseCase}}</b></li>
                <li><span><i>转</i><i>让</i>费：</span><b>{{shopDetail.transferFee}}{{shopDetail.unitTransFerfee}}</b></li>
              </ul>
            </div>
          </div>
          <div class="shopMsg-right right">
            <a href="appDownload.html"></a>
          </div>
        </div>
        <div class="weizhi w1200" id="map">
          <h3><span></span>位置信息</h3>
          <div id="allmap"></div>
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

  export default {
    head () {
      return {
        title: '商铺转租/生意转让-优铺网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '生意转让，生意转让，租金，面积，转让费，租铺宝，优铺网'},
          { hid: 'description', name: 'description', content: '商铺转租/生意转让，您联系店主时，请告知是在优铺网旗下租铺宝上看到的，方便您和店主更好地沟通，交易有保障。' }
        ]
      }
    },
    data(){
      return{
        defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
        cityName:"",//城市名称
        shopDetail: "",//商铺详情
        huiyuanModel: false,//购买弹窗
        shopName:"",//店铺标题
        modelMianfei: "",//免费次数弹窗
        tel:"",//登录手机号
        code: "",//登录验证吗
        time: 60,
        send: "获取验证码",
        disabled:false,//验证码店家
        sendClass: 0,//验证码颜色
        modelLogin: "",//登录弹窗
        modelDown: "",//次数用完弹窗
        modelOver: "",//次数用完关闭弹窗
        buy: false,//立即开通会员
        pvCount: "",//查看次数
        browseCount: "",//浏览次数
        modelTxt: "",//委托手机号
        modelSuccee:"",//委托成功
        modelPu: "",//找铺转铺
        certificate: false,//证件显示
        advantage: false,//本店优势显示
        issue: false,//过往经营最大问题显示
        shopId: "",//商铺id
        imgs: '',//商铺图片
        telphone: 1,
        add: 1,//控制查看详细地址按钮
        monthlyRent: "",//月租金
        dailyRent: "",//日租金
        shopTags:"",//标签集合
        realAddress: "",//真实地址
        shopPapers: "",//已有证件
        license: "",//证照
        manageType: "",//当前经营全部
        manageType1: "",//当前经营短的
        shopNumber: "",//商铺编号
        shopSupportings: "",// 配套设施
        useArea: "",//建筑面积
        shopIssues: "",//过往经营最大问题
        shopAdvantages: "",//本店优势
        brandStatus: "",//品牌情况
        iphone: "",//手机号
        rentType: "",//租售类型
        businessAreaName: "",//商圈名称
        fenxiangID: "",//分享ID
        unitDailyRent: "",//日租金单位
        unitMonthRent: "",//月租金单位
        unitTransFerfee: "",//装让费单位
        numIndex: "",  // 查看商铺次数
        bolClick: true,  // 是否点击
        shopIdObj: "", // 判断是否收藏id
        checkedLook: false, // 判断此商铺是否被查看过
        countNum: false, //
        search:"",//搜索字段
        shopType:"",//1 ：新上2 ：热门3 ：成交4 ：精选
      }
    },
    components: {
      Nav,
      Buy,
      Navbar,
      Footer
    },
    watch:{
      tel(){
        let reg = isPoneAvailable(this.tel)
        if(reg == false){
          $(".model-login .cur").css({"background":"#ccc"})
        }else{
          $(".model-login .cur").css({"background":"#64ABFF"})
        }
      }
    },
    mounted(){
      if(sessionStorage.cityName){
        this.cityName = sessionStorage.cityName.split("市").join("");;
      }
      this.shopId = this.$route.params.id;
      this.init();//初始化信息
      this.dataPost();//判断有没有查看过该商铺
    },
    updated(){
      this.map();//地图
      this.banner();//图片功能
      this.navTop();//导航栏功能
      var manageType =  $(".manageType").text();
      if(manageType.length >= 10){
        this.manageType1 =  manageType.substring(0,10)+"...";
      }
    },
    methods: {
      loginFun(){
        var that = this;
        if(this.telFun() == true && this.code != ""){
          axios({
            url: '/login',
            method: 'post',
            params:
              {
                account: this.tel,
                password: this.code,
              }
          }).then(data => {
            console.log(data);
            if(data.data.code == 101){
              this.modelLogin = 0;
              this.modelSuccee = 1;
              localStorage.token = data.data.token;
              localStorage.iphone = data.data.phone;
              setTimeout(function () {
                window.location.reload()
              },2000)

            }else if(data.data.code == 500){
              that.$layer.msg("请输入正确验证码")
            } else{
              that.$layer.msg("登录失败")
            }
          }).catch(err => {
            console.log(err)
          });
        }else if(this.code == ""){
          that.$layer.msg("请输入验证码")
        }
      },
      telFun(){//验证手机号
        var that = this;
        let reg = isPoneAvailable(this.tel)
        if(this.tel==''){
          that.$layer.msg("请输入手机号")
          this.disabled = false;
        }else if(reg == false){
          that.$layer.msg("请输入正确的手机号")
          this.disabled = false;
        }else{
          return true;
        }
      },//验证手机号
      sendFun(){//发送验证码
        if(this.telFun() == true){
          axios({
            url: '/user/sendsms',
            method: 'post',
            params: {
              phoneNumber: this.tel
            }
          }).then(data => {
            console.log(data);
            this.time = 60;
            this.sendClass = 1;
            this.timer();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.sendClass = 0;
          this.send = "重新获取";
        }
      },
      myFun(){
        this.buy = false;
      },
      zhaoFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          axios(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '1',
              source: "3"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              this.tel = this.modelTxt;
              this.modelLogin = 1;
              this.sendFun()
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      zhuanFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          axios(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '2',
              source: "3"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              this.tel = this.modelTxt;
              this.modelLogin = 1;
              this.sendFun()
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      certificateFun(){ //已有证件点击详情
        this.certificate = true;
      },
      delcertificateFun(){
        this.certificate = false;
      },
      advantageFun(){ //本店优势点击详情
        this.advantage = true;
      },
      deladvantageFun(){
        this.advantage = false;
      },
      issueFun(){ //过往经营最大问题点击详情
        this.issue = true;
      },
      delissueFun(){
        this.issue = false;
      },
      init(){
        axios({
          url: '/shop/getShopDetail',
          method: 'post',
          params: {
            shopId : this.shopId
          }
        })
          .then(res => {
            console.log(res)
            this.shopDetail = res.data.shopDetail;
            this.lng = res.data.shopDetail.lng;//纬度
            this.lat = res.data.shopDetail.lat;//经度
            this.imgs = res.data.shopDetail.imgs;//图片
            this.shopName = res.data.shopDetail.shopName;//店铺标题
            this.browseCount = res.data.shopDetail.browseCount;//浏览次数
            this.dailyRent = res.data.shopDetail.dailyRent;//日租金
            this.monthlyRent = res.data.shopDetail.monthlyRent;//月租金
            this.shopTags = res.data.shopDetail.shopTags;//标签
            this.realAddress = res.data.shopDetail.realAddress;//真实地址
            this.shopPapers = res.data.shopDetail.shopPapers;//已有证件
            this.useArea = res.data.shopDetail.buildArea;//建筑面积
            this.license = res.data.shopDetail.license;//证照
            this.manageType = res.data.shopDetail.manageType;//当前经营
            this.manageType1 = res.data.shopDetail.manageType;
            this.shopNumber = res.data.shopDetail.shopNumber;//商铺编号
            this.shopSupportings = res.data.shopDetail.shopSupportings;// 配套设施
            this.rentType = res.data.shopDetail.rentType;//租售类型
            this.businessAreaName = res.data.shopDetail.businessAreaName;//商圈名称
            this.unitMonthRent = res.data.shopDetail.unitMonthRent;//月租金单位
            this.unitDailyRent = res.data.shopDetail.unitDailyRent;//日租金单位
            this.unitTransFerfee = res.data.shopDetail.unitTransFerfee;//转让费单位
            this.shopType = res.data.shopDetail.shopType;//商铺状态
            // this.shopIssues = res.data.shopDetail.shopIssues;
            // this.shopAdvantages = res.data.shopDetail.shopAdvantages;
            // this.brandStatus = res.data.shopDetail.brandStatus;
            // this.iphone = res.data.phone;//手机号

            //配套设施
            try{
              this.shopSupportings.forEach(function (item,index) {
                $(".list dl").each(function (index1,item1) {
                  if(item == index1+1){
                    $(item1).addClass("cur");
                  }
                })
              })
            }catch(e){
              console.log(e)
            }
            if( this.shopTags.length > 5){
              $(".telPhone").css({"margin":"30px auto 0"})
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      dataPost(){
        var that = this;
        axios({
          url: '/shop/shopCheckedRecords',
          method: 'post',
          params: {
            shopId: this.shopId,
            type: "0",
            roof: 1,
            cityId: sessionStorage.cityId
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.code == 101){
              this.shopIdObj = res.data.shopId;
              this.pvCount = res.data.pvCount;
              // 'true' 查看过  false 没有查看过
              if(res.data.checkedStatus == 'true'){
                this.add = 2;
                this.checkedLook = true;
              }
              if(res.data.count == 1){
                this.countNum = shopId;
              }
              if(res.data.collectionStatus == 'true') {
                $(".shoucang").addClass("cur");
              }
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      searchFun(){//搜索
        var reg = /^\s*$/g;
        if(reg.test(this.search) || this.search == null || this.search == ""){
          this.$message("搜索内容不能为空")
        }else{
          this.$router.push({path:"/shop/shopList",query:{search:this.search}})
        }
      },
      banner(){
        var that = this;
        var index = 0;
        var num = 0;
        var len = this.imgs.length;

        $(".big ul li").eq(0).show().siblings().hide();
        $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
        $(".small ol li").on("click",function () {
          index = $(this).index();
          $(this).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
          console.log(index+"---")
        })
        $(".big .prev").on("click",function () {
          if(index == 0){
            index = 0;
            that.$layer.msg("已经是第一张了")
          }
          else{
            index--;
            if(index <= 3){
              var small = index - 4;
              $(".small ol li:lt("+small+")").show();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
        $(".big .next").on("click",function () {
          if(index == that.imgs.length-1){
            index = that.imgs.length-1;
            that.$layer.msg("已经是最后一张了")
          }else{
            index++;
            num++;

            if(index >= 4){
              var small = index - 3;
              var big = index + 1;
              $(".small ol li:lt("+small+")").hide();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
      },
      map(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.lat,this.lng);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : this.shopDetail.areaName+"-"+this.businessAreaName , // 信息窗口标题
          enableMessage:true,//设置允许信息窗发送短息
          message:""
        }
        var infoWindow = "";
        if(this.checkedLook == false){ //没看过
          infoWindow = new BMap.InfoWindow(this.shopDetail.road + "附近", opts);  // 次数用完
        }else{
          infoWindow = new BMap.InfoWindow(this.shopDetail.areaName+this.shopDetail.road+this.realAddress, opts);  // 次数还没用完
        }
        //var infoWindow = new BMap.InfoWindow(this.shopDetail.areaName+this.shopDetail.road+this.realAddress, opts);  // 次数还没用完
        map.openInfoWindow(infoWindow,point); //开启信息窗口
      },
      //直播店主电话，查看详细地址，地图
      threeFun(fun){
        let that = this;
        if(localStorage.token){
          axios({
            url: '/shop/shopCheckedRecords',
            method: 'post',
            params:
              {
                shopId: this.shopId,
                type: "1",
                roof: 1,
                cityId: sessionStorage.cityId
              },
          }).then(res => {
            console.log(res)
            if(res.data.code==101){
              this.numIndex = res.data.count;//剩余套数
              this.pvCount = res.data.pvCount;//总套数
              if(res.data.isHot == true){//是否能查看热门商铺
                if(this.checkedLook == true){ //已经看过
                  this.lookFun(fun)
                }else{
                  if(res.data.countStatus == false){//已经看了10次了
                    this.modelOver = 1;
                  }else {
                    if(res.data.memberType == "2"){ //不是会员
                      if (res.data.PClimitCountStatus == false) {//表示三套已经看完
                        this.modelDown = 1;
                      } else {
                        if (this.bolClick) {
                          this.modelMianfei = 1;
                          this.bolClick = false;
                        }
                        this.checkedLook = true;
                        this.lookFun(fun)
                      }
                    }else{//会员
                      if (this.bolClick) {
                        this.modelMianfei = 1;
                        this.bolClick = false;
                      }
                      this.checkedLook = true;
                      this.lookFun(fun)
                    }
                  }
                }
              }else{
                this.huiyuanModel = true;
              }
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          }).catch(err => {
            console.log(err)
          });
        }else{
          this.$message("请先登录");
          this.$router.push({path:"/login",query:{url:"shopDetail"}})
        }
      },
      lookFun(fun){
        var that = this;
        if(fun == "tel"){
          axios({
            url: '/shop/auth/selectPhone',
            method: 'post',
            params: {
              shopId: this.shopId,
              type: "0"
            }
          })
            .then(res => {
              console.log(res)
              if(res.data.code == 101){
                this.telphone = 2;
                this.iphone = res.data.phone;
              }else{
                this.$message('系统繁忙，请稍后再试');
              }
            })
            .catch(err =>{
              console.log(err)
            })

        }else if(fun == "map"){
          var top =  $("#map").offset().top -80;
          console.log(top)
          $('html,body').animate({scrollTop:top}, 100);
          this.map();
        }else if(fun == "adr"){
          this.add = 2;
        }
      },
      // 直播店主电话
      telPhone(){
        let fun = "tel";
        this.threeFun(fun)
      },

      // 点击查看详细地址
      address(){
        let fun = "adr";
        this.threeFun(fun)
      },
      // 点击地图
      mapBtn(){
        let fun = "map";
        this.threeFun(fun)
      },
      navTop(){
        var navTop = $(".title").offset().top;
        var allTop = [
          $("#sheshi").offset().top -80,
          $("#jingyin").offset().top -80,
          $("#wuye").offset().top -80,
          $("#feiyong").offset().top -80,
          $("#map").offset().top -80,
          0
        ]

        $(window).scroll(function() {
          var winTop = $(window).scrollTop();
          if( winTop >= navTop){
            $(".title").addClass("cur");
          }else{
            $(".title").removeClass("cur");
          }

          if(winTop < allTop[1]){
            $(".title span").eq(0).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[2]){
            $(".title span").eq(1).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[3]){
            $(".title span").eq(2).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[4]){
            $(".title span").eq(3).addClass("cur").siblings().removeClass("cur")
          }else{
            $(".title span").eq(4).addClass("cur").siblings().removeClass("cur")
          }
        })

        $(".title span").on("click",function () {
          var index = $(this).index();
          $('html,body').animate({scrollTop:allTop[index]}, 100);
        })
      },
      shoucang(e){
        var that = this;
        if(localStorage.token){
          if($(e.srcElement).hasClass("cur")){
            axios({
              url: '/member/auth/cancelCollection',
              method: 'post',
              params: {
                shopId: this.shopId,
              }
            })
              .then(res => {
                console.log(res)
                if(res.data.code==101){
                  $(e.srcElement).removeClass("cur");
                  this.$message("取消收藏");
                }else{
                  this.$message('系统繁忙，请稍后再试');
                }
              })
              .catch(err =>{
                console.log(err)
              })
          }else{

            axios({
              url: '/member/auth/saveCollection',
              method: 'post',
              params: {
                shopId: this.shopId
              }
            })
              .then(res => {
                console.log(res)
                if(res.data.code==101){
                  that.shopIdObj = res.data.shopCollId;
                  $(e.srcElement).addClass("cur");
                  this.$message("收藏成功");
                }else{
                  this.$message('系统繁忙，请稍后再试');
                }
              })
              .catch(err =>{
                console.log(err)
              })
          }
        }else{
          this.$message("请先登录");
          this.$router.push({path:"/login",query:{url:"shopDetail"}})
        }
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/shopDetail.less';
</style>
