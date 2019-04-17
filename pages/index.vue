<template>
    <div class="index">
    <Nav></Nav>
    <!-- 轮播图 -->
    <div class="playImg">
      <el-carousel trigger="click" height="400px" :interval="5000">
        <el-carousel-item v-for="(item,index) in picArr">
          <h3 @click="goNewInfo(item)"><img :src="item.url"></h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 搜索 -->
      <div class="playImg_wrap">
        <div class="playImg_box">
          <div class="playImg_top">
            <input type="text" name="" placeholder="区域/商圈/业态/商铺编号" v-model="searchShop">
            <button @click="searchBtn()">搜索商铺</button>
          </div>
          <div class="playImg_main">
            <dl class="dl1">
              <dt><img src="~/assets/images/index/site.png"></dt>
              <dd>区域</dd>
              <ul>
                <li><span v-for="(item,index) in cityList" v-if="index < 10" @click="goSearch1(item)">{{item.name}}</span></li>
              </ul>
            </dl>

            <dl class="dl2">
              <dt><img src="~/assets/images/index/area.png"></dt>
              <dd>面积</dd>
              <ul>
                <li><span v-for="(item,index) in squareTitleArr" @click="goSearch2(item)">{{item.show_text}}</span></li>
              </ul>
            </dl>

            <dl class="dl3">
              <dt><img src="~/assets/images/index/money.png"></dt>
              <dd>月租</dd>
              <ul>
                <li><span v-for="(item,index) in monthRent" @click="goSearch3(item)">{{item.show_text}}</span></li>
              </ul>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- 我要委托 -->
    <div class="entrust_addBag">
      <div class="head_title">
        <div>
          <i class="line-left"><img src="~/assets/images/index/line-left.png"></i>
          <h2>我要委托</h2>
          <i class="line-right"><img src="~/assets/images/index/line-right.png"></i>
        </div>
        <h4>I WANT TO ENTRUST</h4>
      </div>
      <div class="entrust_wrap">
        <div class="entrust_box">
          <div class="entrust_input">
            <input type="text" name="" placeholder="请输入手机号" maxlength="11" v-model="telVal">
            <img src="~/assets/images/index/phone.png">
          </div>
          <div class="entrust_dl">
            <dl class="dl_left">
              <dt @click="seekBtn">委托找铺</dt>
              <dd>已有<span>{{seekShopObj}}</span>人委托找铺</dd>
            </dl>
            <dl class="dl_right">
              <dt @click="turnBtn">委托转铺</dt>
              <dd>已有<span>{{turnShopObj}}</span>人委托转铺</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- 优选旺铺 -->
    <div class="shoplist_addBag">
      <div class="head_title">
        <div>
          <i class="line-left"><img src="~/assets/images/index/line-left.png"></i>
          <h2>优选旺铺</h2>
          <i class="line-right"><img src="~/assets/images/index/line-right.png"></i>
        </div>
        <h4>OPTIMIZATION WINPORT</h4>
      </div>
      <div class="shoplist_wrap clearfloat">
        <div class="shoplist_dl" v-for="(item,index) in shopListArr" v-if="index < 8" @click="goShop(item)">
          <dl>
            <dt>
              <img :src="item.img" alt="" :onerror="defaultImg">
            </dt>
            <dd>
              <h3>{{item.title}}</h3>
              <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
              <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="more_wrap">
        <div class="more_box" @click="more_box">
          更多<span>在转/在租商铺</span>
        </div>
      </div>
    </div>
    <!--  区域 -->
    <div class="area_wrap">
      <div class="area_nav clearfloat">
        <ul>
          <li :class="{'on1' :tab1 == item.id}" @click="areaShopListFun(item)" v-for="(item,index) in cityList" v-if="index < 6">{{item.name}}
            <div class="caret" v-show="tab1 == item.id">
              <p></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="shoplist_wrap clearfloat">
        <div class="shoplist_dl" v-for="(item,index) in areaShopArr" v-if="index < 4" @click="goShop(item)">
          <dl>
            <dt>
              <img :src="item.img" alt="" :onerror="defaultImg">
            </dt>
            <dd>
              <h3>{{item.title}}</h3>
              <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
              <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
            </dd>
          </dl>
        </div>
      </div>
      <!-- </div> -->
      <div class="more_wrap">
        <div class="more_box" @click="more_box">更多</div>
      </div>
    </div>

    <!-- 面积 -->
    <div class="square_wrap area_wrap">
      <div class="square_nav area_nav">
        <ul>
          <li :class="{'on2' :tab2 == item.id}" v-for="(item,index) in squareTitleArr" @click="squareShopListFun(item)" v-if="index < 6">{{item.show_text}}
            <div class="caret" v-show="tab2 == item.id">
              <p></p>
            </div>
          </li>
        </ul>
      </div>

      <div class="shoplist_wrap clearfloat">
        <div class="shoplist_dl" v-for="(item,index) in squareShopArr" @click="goShop(item)">
          <dl class="dl_shade">
            <dt>
              <img :src="item.img" alt="" :onerror="defaultImg">
            </dt>
            <dd>
              <h3>{{item.title}}</h3>
              <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
              <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="more_wrap square_more_wrap">
      <div class="more_box" @click="more_box">更多</div>
    </div>

    <!-- 投资机构 -->
    <div class="investment_wrap">
      <div class="head_title">
        <div>
          <i class="line-left"><img src="~/assets/images/index/line-left.png"></i>
          <h2>投资机构</h2>
          <i class="line-right"><img src="~/assets/images/index/line-right.png"></i>
        </div>
        <h4>INVESTMENT INSTITUTION</h4>
      </div>
      <div class="investment">
        <ul>
          <li @mouseenter="investment_li1"><img src="~/assets/images/index/one.png"></li>
          <li @mouseenter="investment_li2"><img src="~/assets/images/index/two.png"></li>
          <li @mouseenter="investment_li3"><img src="~/assets/images/index/three.png"></li>
          <li @mouseenter="investment_li4"><img src="~/assets/images/index/four.png"></li>
        </ul>
        <div v-if="investment_info1">
          <p>东方邦信置业有限公司成立于2013年12月27日。东方邦信置业系中国东方资产管理公司的二级子公司，由邦信资产管理有限公司100%控股，为邦信资产的房地产业务主要投资平台。</p>
          <p>公司业务以房地产金融为主，以房地产开发和持有型物业经营管理为辅。打造一体化的房地产金融运作模式，形成封闭的全产业链，具有房地产融资、基金募集管理，住宅、商业、写字楼等地产投资开发，持有物业运营等全产业链运作能力。</p>
        </div>

        <div v-if="investment_info2">
          <p>优享创智（5Lmeet）成立于 2015 年 12 月，由毛大庆博士发起成立。汇集了包括红杉资本中国基金、真格基金、信中利、歌斐资产、新加坡政府投资公司（GIC）、君紫资本、金运电气、领势投资、盛景网联、中融融优、东方华盖、高榕资本、北极光创投、大宏集团、泰合集团、百福嘉、创合汇、三磊设计、光辉建业、开封文投等数十个顶级投资机构及各领域知名企业家, 旗下主打的第一条产品线名称为“共享际”系列。</p>
          <p>基于对中国大城市的城市更新、共享经济发展和地产领域创新这三个投资主题相融合所蕴藏的巨大战略机会的把握，<共></共>享际立志将城市存量资产升级改造为囊括居住、工作、健康、休闲、文化、娱乐等立体内容的一站式空间，由优享创智共享际开创的、继“联合办公”后又一个代表未来趋势的业态——共享生活方式应运而生。截止目前，优享创智已完成 A+轮融资，估值近 30 亿元人民币。</p>
        </div>

        <div v-if="investment_info3">
          <p>北京中投置地投资管理有限公司当前主要从事中国新型城镇化的投资运营管理，通过搭建城镇开发战略资源联盟，共同参与城镇新区的规划、建设和运营，实现“土地、人口、产业、资本”四要素的融合发展，推进中国新型城镇化内涵式、可持续发展。</p>
          <p>北京中投置地投资管理有限公司董事长王军先生为中经联盟第6任轮值主席,庆峰基金合伙人,中海地产营销体系的创建者,中国新型城镇开发领军人物,现担任伟光汇通文化旅游投资有限公司总裁。</p>
        </div>

        <div v-if="investment_info4">
          <p>中经大业资本管理有限公司是依托中经联盟创立的投资基金，专注于扶持房地产高管创业。在房地产公司担任过项目总经理或集团副总裁职务，及在上市公司对外公告名单中的房地产高管，即是中经大业资本重点投资的对象，这些房地产高管具有专业的操盘经验、深厚的人脉资源和对行业的深刻理解，在从职业经理人转型创业的过程中具有非常高的成功率，优客工场毛大庆、高和资本苏鑫、中城新产业刘爱明等就是其中杰出的代表。</p>
        </div>
      </div>
      <div class="ballWrap" v-if="ballWrap">
        <p>{{this.ballWrapTxt}}</p>
      </div>
    </div>

    <!-- 合作品牌 -->
    <div class="co_branding">
      <div class="head_title">
        <div>s
          <i class="line-left"><img src="~/assets/images/index/line-left.png"></i>
          <h2>合作品牌</h2>
          <i class="line-right"><img src="~/assets/images/index/line-right.png"></i>
        </div>
        <h4>COOPERATION BRAND</h4>
        <!-- <h4>CO-BRANDING CO-BRANDS</h4> -->
      </div>
      <ul>
        <li v-for="(item,index) in coBrandingArr" v-if="index < 5">
          <img :src="item.img">
        </li>
      </ul>
      <div class="more_wrap square_more_wrap">
        <div class="more_box" @click="coBranding_more">更多</div>
      </div>
    </div>

    <!-- 大咖推荐 -->
    <div class="big_caffeine">
      <div class="head_title">
        <div>
          <i class="line-left"><img src="~/assets/images/index/line-left.png"></i>
          <h2>大咖推荐</h2>
          <i class="line-right"><img src="~/assets/images/index/line-right.png"></i>
        </div>
        <h4>STAR RECOMMENDATION</h4>
      </div>
      <div class="big_caffeine_wrap">
        <div class="leftBtn" @click="leftBtn()"><img src="~/assets/images/index/left.png"></div>
        <div class="rightBtn" @click="rightBtn()"><img src="~/assets/images/index/right.png"></div>
        <div class="big_caffeine_box">
          <div class="big_caffeine_box_img">
            <dl v-for="item in bigCaffeineArr">
              <dt>
                <img :src="item.Imgaddress">
              </dt>
              <dd>
                <h4>{{item.name}}</h4>
                <h5>{{item.position}}</h5>
              </dd>
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
          title: '商铺出租_商铺转让_门面出租转让网_租铺宝-优铺网',
          meta: [
            { hid: 'description', name: 'description', content: '优铺网旗下租铺宝,整合优质商铺出租、转让信息,为商铺店主、开店创业者、品牌商家群体提供便捷开店选址服务,实现租铺卖铺找优铺。' },
            { hid: 'keywords', name: 'keywords', content: '旺铺出租转让，出租店面，店铺选址，转让店铺，门面出租转让，商铺出租转让，商铺投资，商铺招租，租铺宝，优铺网'}
          ]
        }
      },
      asyncData ({ params, error }) {
        return axios({
          method: 'post',
          url: '/show/showInfoPC',
          params:{
            cityId: 110100
          }
        }).then((res) => {
          return { info: res.data}
        })
      },
        components: {
            Nav,
            Navbar,
            Footer
        },
        data (){
            return {
                defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
                tab1: '',
                tab2: '',
                // 全局地址
                api: "",
                // 旺铺数据
                shopListArr: [],
                // 区域数据
                areaShopArr: [],
                // 面积数据
                squareShopArr: [],
                // 区域表头
                cityList: [],

                // 面积表头数组
                squareTitleArr: [],

                // 合作品牌
                coBrandingArr: [],
                // 大咖推荐
                bigCaffeineArr: [],

                // 投资机构
                investment_info1: true,
                investment_info2: false,
                investment_info3: false,
                investment_info4: false,

                // 月租金标题
                monthRent: [],

                // 轮播图
                picArr: [],

                // 委托找铺
                seekShopObj: null,
                // 委托转铺
                turnShopObj: null,

                // 我要委托电话号码
                telVal: "",

                // 搜索
                searchShop: "",

                // 判断是否为IE
                isIEObj: null,

                // 弹窗
                ballWrap: false,
                // 弹窗文字
                ballWrapTxt: "",
                swiper: "",
                // 大咖推荐
                lbtImgIndex: 0,
                lbtLeftIndex: 0,
                leftRightIndex: -1,
                isOk: true,

            }
        },
        methods:{
            // 全部收据
            init(){
              axios({
                url: '/show/showInfoPC',
                method: 'post',
                params: {
                  cityId: sessionStorage.cityId || 110100
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == 101){
                  // 列表商铺展示
                  this.cityList = res.data.areaList; //区域
                  this.squareTitleArr = res.data.acreageList; //面积
                  this.monthRent = res.data.monthlyList; //月租经
                  this.shopListArr = res.data.djskList; //优选旺铺
                  this.picArr = res.data.imgUrl; // 轮播图
                  this.turnShopObj = res.data.shopLineNum; // 委托转铺
                  this.seekShopObj = res.data.peopleNum; // 委托找铺
                  this.areaShopArr = res.data.areaShopList;// 区域商铺展示
                  this.squareShopArr = res.data.acreageShopList;// 面积商铺展示
                  this.coBrandingArr = res.data.getBrandLogoList;// 合作品牌
                  this.bigCaffeineArr = res.data.higherlist;// 大咖推荐
                }else{
                  this.$message('系统繁忙，请稍后再试');
                }
              }).catch(err => {
                console.log(err)
              });
            },
            // 区域
            areaShopListFun(item) {
              this.tab1 = item.id;
              axios({
                url: "/shop/getShopList",
                method: 'post',
                params: {
                  cityId: sessionStorage.cityId,//市id
                  pageSize:4,//每页数据量
                  pageNum:1,//页码从1开始
                  businessCircleId: item.id,
                  source: 2,//来源
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == 101){
                  this.areaShopArr = res.data.shopList;//商铺列表
                }else{
                  this.$message('系统繁忙，请稍后再试');
                }
              }).catch(err =>{
                console.log(err)
              })
            },
            // 面积列表
            squareShopListFun(item){
              this.tab2 = item.id;
              axios({
                url: "/shop/getShopList",
                method: 'post',
                params: {
                  cityId: sessionStorage.cityId,//市id
                  pageSize:4,//每页数据量
                  pageNum:1,//页码从1开始
                  areaId: item.id,//面积id
                  source: 2
                }
              }).then(res => {
                console.log(res)
                if(res.data.code == 101){
                  this.squareShopArr = res.data.shopList;//商铺列表
                }else{
                  this.$message('系统繁忙，请稍后再试');
                }
              }).catch(err =>{
                console.log(err)
              })
            },
            // 委托找铺
            seekBtn(){
                this.entrust("0");
            },
            // 委托转铺
            turnBtn(){
                this.entrust("1");
            },
            // 我要委托接口封装
            entrust(type) {
                let _this = this
                // 手机号码验证
                // let reg=/^1\d{10}$/;
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.telVal == ""){
                    this.ballWrapTxt = "请输入手机号码";
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                }else if(!reg.test(this.telVal)){
                    this.ballWrapTxt = "请输入正确手机号";
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                }else {
                    // 接口调用
                    axios({
                        url: '/show/addCutomer',
                        method: 'post',
                        params: {
                            account: _this.telVal,
                            type: type,
                            source: "2",
                            cityId: sessionStorage.cityId,
                            provinceId: sessionStorage.provinceId
                        }
                    }).then(data => {
                      console.log(data);
                      if(data.data.code ==101){
                        _this.telVal = "";
                        this.ballWrapTxt = (data.data.msg);
                        this.ballWrap = true;
                        setTimeout(function(){
                          _this.ballWrap = false;
                        }, 3000)
                      } else{
                        this.$message('系统繁忙，请稍后再试');
                      }
                      _this.telVal = "";
                }).catch(err => {
                  console.log(err)
                });
              }
            },
            // 投资机构
            investment_li1(){
                this.investment_info1 = true;
                this.investment_info2 = false;
                this.investment_info3 = false;
                this.investment_info4 = false;
            },
            investment_li2(){
                this.investment_info2 = true;
                this.investment_info1 = false;
                this.investment_info3 = false;
                this.investment_info4 = false;
            },
            investment_li3(){
                this.investment_info3 = true;
                this.investment_info1 = false;
                this.investment_info2 = false;
                this.investment_info4 = false;
            },
            investment_li4(){
                this.investment_info4 = true;
                this.investment_info1 = false;
                this.investment_info2 = false;
                this.investment_info3 = false;
            },

            // 跳转到找店开铺页面
            goSearch1(item){
              this.$router.push({path:"/shop/shopList",query:{key:"businessCircleId",id:item.id}})
            },
            // 面积
            goSearch2(item){
              this.$router.push({path:"/shop/shopList",query:{key:"areaId",id:item.id}})
            },
            // 月租金
            goSearch3(item){
              this.$router.push({path:"/shop/shopList",query:{key:"priceId",id:item.id}})
            },

            // 跳转商铺详情
            goShop(item){
                window.open("/shopDetail/" + item.id);
            },
            // 点击更多
            more_box(){
              this.$router.push({path:"/shop/shopList"})
            },
            // 合作品牌-更多
            coBranding_more(){
               this.$router.push({path:"/brand/coBranding"})
            },
            // 搜索商铺
            searchBtn() {
                let _this = this;
                var reg = /^\s*$/g;
                if(this.searchShop == "") {
                    this.ballWrapTxt = "搜索内容不能为空";
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                } else if(reg.test(this.searchShop)) {
                    this.ballWrapTxt = "搜索内容不能为空";
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                } else{
                  this.$router.push({path:"/shop/shopList",query:{search:this.searchShop}})
                }
            },

            // 点击轮播图 跳转详情页
            goNewInfo(item) {
                if(item.type == true){
                  this.$router.push({path:"/shop/turnShop"})
                }else{
                  window.open("/newsDetail/"+item.artitleId)
                  // this.$router.push({path:"/newsDetail",params:{id:item.artitleId}})
                }
            },
            // 大咖推荐左边按钮
            leftBtn(){
                var _this = this;
                var imgWidth = 210;
                var index = this.lbtLeftIndex++;
                var dlLength = $(".big_caffeine_box_img dl").length;
                var _dlLength = dlLength - dlLength * 2 + 4;
                // 左边
                // console.log(index);
                if(index < 1){
                    $('.big_caffeine_box_img').css('left', index * 210 + 'px');
                }
                if(index == 0 || index > 0 ){
                    this.lbtLeftIndex = 0;
                    _this.leftRightIndex = -1;
                }else if(index > _dlLength){
                    this.leftRightIndex = this.lbtLeftIndex - 2;
                }
            },
            // 大咖推荐右边按钮
            rightBtn(){
                var imgWidth = 210;
                // var index = this.lbtImgIndex--;
                var index = this.leftRightIndex--;
                var dlLength = $(".big_caffeine_box_img dl").length;
                var _dlLength = dlLength - dlLength * 2 + 4;
                if(index == _dlLength){
                    this.leftRightIndex = _dlLength;
                    this.lbtLeftIndex = index + 2;
                }
                if(index > _dlLength){
                    $('.big_caffeine_box_img').css('left', index * 210 + 'px');
                    this.lbtLeftIndex = index + 1;
                }
            },
            //城市定位
            cityFun(){
              var that = this;
              function myFun(result){
                sessionStorage.cityName = result.name;
                axios({
                  url: '/show/changeCity',
                  method: 'post',
                  params: {
                    "cityName": result.name,
                  }
                }).then(res => {
                  console.log(res);
                  if(res.data.code == 101){
                    if(res.data.status == true){
                      sessionStorage.cityId = res.data.cityId;
                      sessionStorage.provinceId = res.data.provinceId;
                      that.sessionCityId = sessionStorage.cityId;
                      that.sessionProvinceId = sessionStorage.provinceId;
                      that.changeCityNameColor = sessionStorage.cityName;
                      // window.location.href = data.data.url;
                    }else if(res.data.status == false){
                      sessionStorage.provinceId = 110000;
                      sessionStorage.cityId = 110100;
                      sessionStorage.cityName = "北京";
                    }
                  }else{
                    sessionStorage.provinceId = 110000;
                    sessionStorage.cityId = 110100;
                    sessionStorage.cityName = "北京";
                  }
                }).catch(err => {
                  console.log(err)
                });
              }
              var myCity = new BMap.LocalCity();
              myCity.get(myFun);
            },
            isLogin(){
              function getCookie(sName){
                var aCookie = document.cookie.split("; ");
                for (var i=0; i < aCookie.length; i++)
                {
                  var aCrumb = aCookie[i].split("=");
                  if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
                }
                return null;
              }
              localStorage.token = getCookie("token") || "";
              localStorage.iphone = getCookie("iphone") || "";
              localStorage.pvCount = getCookie("pvCount") || "";
          }
        },
        mounted() {
          var that = this;
          this.isLogin();
          setTimeout(function () {
            if(sessionStorage.cityId == undefined){
              that.cityFun();
            };
          },100)
          setTimeout(function () {
            that.init();
          },500)
          setTimeout(function () {
            $(".area_nav ul li").eq(0).click();
            $(".square_nav  ul li").eq(0).click();
          },2000)
        },
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../assets/css/index.less';
</style>

<style>
.el-carousel__item h3 {
    margin: 0 auto;
    width: 100%;
    height: 400px;
}
.el-carousel__item h3>img {
    height: 400px;
    position: relative;
    left: 50%;
    margin-left: -960px;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__button {
    width: 12px!important;
    height: 12px!important;
    border-radius: 50%!important;
}
.el-carousel__arrow--right {
    right:  50px!important;
}
</style>
