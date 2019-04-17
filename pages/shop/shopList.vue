<template>
  <div class="shop">
    <Nav></Nav>
    <div class="shopList w1200">
      <h2><span>首页><b @click="allRemove()">{{cityName}}</b><i v-if="quyu">>{{quyu}}</i><i v-if="quyuChild">>{{quyuChild}}</i></span>
        <div class="search">
          <input type="text" placeholder="区域/商圈/业态/商铺编号" v-model="search" @keyup.enter="searchFun()"><button @click="searchFun()"></button>
        </div>
      </h2>
      <div class="search-list">
        <ul class="one">
          <li class="oneArea">
            <span>区<b>域</b></span>
            <div id="areasChildren" class="two">
              <b @click="areasFun($event,item)" v-for="item in areas">{{item.name}}</b>
            </div>
            <div class="three threeArea clearfix" id="areasChildrens">
              <i v-for="item in areaChild.childList" @click="areaChildFun($event,item)">{{item.childName}}</i>
            </div>
          </li>
          <li>
            <span>适合经营</span>
            <div class="two" id="yetai">
              <b @click="yetaiFun($event,item)" v-for="item in yetai">{{item.name}}</b>
            </div>
            <div class="three threeYetai clearfix" id="yetaiChild">
              <i v-for="item in yetaiChild.childList" @click="yetaiChildFun($event,item)">{{item.childName}}</i>
            </div>
          </li>
          <li class="mianji">
            <span>面<b>积</b></span>
            <div id="mianjiChildren" class="two">
              <b @click="mianjiFun($event,item)" v-for="item in mianji">{{item.show_text}}</b>
            </div>
          </li>
          <li>
            <span>月<i>租</i><i>金</i></span>
            <div class="two" id="monthChildren">
              <b @click="monthFun($event,item)" v-for="item in month">{{item.show_text}}</b>
            </div>
          </li>
          <div class="search-hide" v-show="packUp">
            <li>
              <span>转<i>让</i><i>费</i></span>
              <div class="two" id="transferChildren">
                <b @click="transferFun($event,item)" v-for="item in transfer">{{item.show_text}}</b>
              </div>
            </li>
          </div>
          <div class="search-click" @click="searchClick()">
            更多选项 <span></span>
          </div>
        </ul>
      </div>
      <div class="shop-list">
        <h3 v-if="allClick">
          <div class="list">
            <span>已选条件：</span>
            <span class="select" v-for="item in areasParent">{{item}}<b @click="areasParentRemove()"></b></span>
            <span class="select" v-for="item in areasName">{{item}}<b @click="areaRemove()"></b></span>
            <span class="select" v-for="item in yetaiParent">{{item}}<b @click="yetaiParentRemove()"></b></span>
            <span class="select" v-for="item in yetaiName">{{item}}<b @click="yetaiRemove()"></b></span>
            <span class="select" v-for="item in mianjiName">{{item}}<b @click="mianjiRemove()"></b></span>
            <span class="select" v-for="item in monthName">{{item}}<b @click="monthRemove()"></b></span>
            <span class="select" v-for="item in transferName">{{item}}<b @click="transferRemove()"></b></span>
          </div>
          <div class="clear">
            <b></b><i @click="allRemove()">清空</i>
          </div>
        </h3>
        <h4 v-if="tatolList===1">共 <span class="red">{{tatolNumber}}</span> 套铺源</h4>
        <div class="shop-msg clearfix">
          <ul class="shop-left left">
            <li v-for="item in shopList" @click="goShopDetail(item)">
              <div class="img">
                <img :src="item.img" alt="" :onerror="defaultImg">
                <div v-if="item.type==1" class="xinshang"></div>
                <div v-else-if="item.type==2" class="remeng"></div>
                <div v-else-if="item.type==3" class="chengjiao"></div>
                <div v-else-if="item.type==4" class="jingxuan"></div>
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
              </div>
            </li>
          </ul>
          <div class="shop-right right">
            <a href="appDownload.html"></a>
          </div>
        </div>
      </div>
      <div class="page" v-show="pageList">
        <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
        </el-pagination>
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
  import { Loading } from 'element-ui';

  export default {
    head () {
      return {
        title: '商铺出租_商铺转让_门面出租转让网_租铺宝-优铺网',
        meta: [
          { hid: 'description', name: 'description', content: '优铺网旗下租铺宝铺源覆盖北京各个区域、业态、面积，并通过互联网大数据为业主和开店人提供快速选址开店、精准匹配和极速转店等多种服务，五大品质服务保障助您开店无忧！' },
          { hid: 'keywords', name: 'keywords', content: '门面出租，店面转让，北京店铺转让，商铺转让，北京门面出租，生意转让，租铺宝，优铺网'}
        ]
      }
    },
    data(){
      return{
        cityName: "",//城市名称
        defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
        areas : '',//区域
        areaChild: '',//区域子级
        yetai: '',//业态
        yetaiChild: '',//业态子级
        mianji: '',//面积
        prices: '',//价格
        month: "",//月租金
        transfer: "",//转让费
        packUp: false,//选项收起
        shopList:"",//商铺列表
        next: "",//下一页
        page: 0,//第几页
        pageList: true,//分页显示
        search: "",//搜索
        shopDetailSearch: "",//商铺详情
        key:"",//首页传递的keyt
        id:"",//首页传递过来的Id
        childId: "",//地图页面传过来的子ID
        quyu: "",//区域显示字段
        quyuChild: "",//区域显示字段
        name: "",//首页点击区域名称
        areasId: "",//区域ID
        areasParentId: "",//区域ID
        yetaiId: "",//业态ID
        yetaiParentId: "",//业态ID
        mianjiId: "",//面积ID
        monthId: "",//月租金ID
        transferId: "",//转让费ID
        areasParent: [],//区域名称
        areasName: [],//区域字级名称
        yetaiName: [],//业态名称
        yetaiParent: [],//业态父级
        mianjiName: [],//面积名称
        monthName: [],//月租金名称
        transferName: [],//转让费名称
        allClick: false,//已选区域显示
        totalCount: 0,//铺源总数
        shopTags: "",//特色标签
        curPage: 1,
        myTitle: "朝阳区",
        Keywords: "",
        monthlyRent: "",
        tatolNumber: "",//总套数假的
        tatolList:1,//总套数假的控制显示隐藏
        pageSize: 10,//显示几套
        pageNum:1,//第几页
      }
    },
    components: {
      Nav,
      Navbar,
      Footer
    },

    mounted(){
      // Loading.service({
      //   lock: true,
      //   text: '加载中……',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      var that = this;
      this.key = this.$route.query.key;//首页点击区域跳转过来
      this.id = this.$route.query.id;
      this.childId = this.$route.query.childId;
      this.search = this.$route.query.search;
      if(sessionStorage.cityName){
        this.cityName = sessionStorage.cityName.split("市").join("");;
      }
      //判断从其他页面进来点击的是啥
      this.idFun();
      //区域列表
      this.list();
      //页面初始化
      this.init();
      //判断那从跳过来的后显示对象的区域
      setTimeout(function () {
        that.select();
      },800)
    },
    methods: {
      select(){
        var that = this;
        if(that.key == "areaId"){
          that.mianji.forEach(function (item,index) {
            if(item.id == that.id){
              $("#mianjiChildren b").eq(index).click();
            }
          })
        }else if(that.key == "priceId"){
          that.month.forEach(function (item,index) {
            if(item.id == that.id){
              $("#monthChildren b").eq(index).click();
            }
          })
        }else if(that.key == "businessCircleId"){
          that.areas.forEach(function (item,index) {
            if(that.childId){
              item.childList.forEach(function (item1,index1) {
                if(item1.childId == that.childId){
                  $("#areasChildren b").eq(index).click();
                  setTimeout(function () {
                    $("#areasChildrens i").eq(index1).click();
                  },200)
                }
              })
            }else{
              if(item.id == that.id){
                $("#areasChildren b").eq(index).click();
                setTimeout(function () {
                  $("#areasChildrens i").eq(0).click();
                },200)
              }
            }
          })
        }else if(that.key == "businessTypeId"){
          that.yetai.forEach(function (item,index) {
            if(item.id == that.id){
              $("#yetai b").eq(index).click();
              setTimeout(function () {
                $("#yetaiChild i").eq(0).click();
              },200)
            }
          })
        }
      },
      idFun(){
        if(this.key == "areaId"){
          this.mianjiId = this.id;
        }else if(this.key == "priceId"){
          this.monthId = this.id;
        }else if(this.key == "businessCircleId"){
          this.areasId = this.id;
        }else if(this.key == "businessTypeId"){
          this.yetaiId = this.id;
        }
      },
      init(){
        axios({
          url: "/shop/getShopList",
          method: 'post',
          params: {
            cityId: sessionStorage.cityId,//市id
            pageSize:this.pageSize,//每页数据量
            pageNum:this.pageNum,//页码从1开始
            businessCircleId: this.areasId || this.areasParentId,//区域id
            businessTypeId : this.yetaiId || this.yetaiParentId,//业态id
            areaId: this.mianjiId,//面积id
            monthlyId: this.monthId,//月租金id
            transfeeId: this.transferId,//转让费id
            search: this.search,//搜索内容
            source: 2,//来源
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code==101){
            this.tatolNumber = Number(res.data.shopLineNum);//假的铺源总数
            this.shopList = res.data.shopList;//商铺列表
            this.totalCount = Number(res.data.totalCount); //总铺源数

            if(this.shopList.length == 0){
              this.pageList = false;
              $(".shop-left").css({"background":"#fff"})
            }else{
              $(".shop-left").css({"background":"none"})
            }
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      list(){
        var that = this;
        axios({
          url: '/shop/getSearchConditon',
          method: 'post',
          params: {
            cityId: sessionStorage.cityId
          }
        }).then(res => {
          console.log(res)
          if(res.data.code==101){
            // 列表商铺展示
            this.areas = res.data.areas;//区域
            this.yetai = res.data.shopBusinessTypes;//业态
            this.mianji = res.data.acreageList;//面积
            this.month = res.data.monthlyList;//月租金
            this.transfer = res.data.transferList;//转让费
            // loading.close();
            setTimeout(function () {
              $("#areasChildren b").eq(0).addClass("cur");
              $("#yetai b").eq(0).addClass("cur");
              $("#mianjiChildren b").eq(0).addClass("cur");
              $("#monthChildren b").eq(0).addClass("cur");
              $("#transferChildren b").eq(0).addClass("cur");
            },100)
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        }).catch(err => {
          console.log(err)
        });
      },
      searchFun(){//搜索
        this.tatolList = 0;
        var reg = /^\s*$/g;
        if(reg.test(this.search) || this.search == null || this.search == ""){
          this.$message("搜索内容不能为空")
        }else{
          // this.areasId ="";
          // this.areasParentId ="";
          // this.areasParent.length=0;
          // this.areasParent.push(this.search);
          this.init();
        }
      },
      areasFun(e,item){ //区域
        this.search = "";
        this.tatolList = 0;
        this.areasParentId = "";
        this.areasId = "";
        this.areasName = [];
        this.quyuChild = "";

        this.curPage = "";
        this.areaChild = item;
        this.quyu = item.name;
        this.areasParent = [];

        this.areasParentId = item.id;
        if(item.name == "不限"){
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.areasParent.push(item.name);
          this.allClick = true;
          $(".threeArea").show();
        }

        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.tatolList = 1;
        }
        this.init();
        setTimeout(function () {
          $("#areasChildrens i").eq(0).addClass("cur").siblings().removeClass("cur");
        },100)
      },
      areaChildFun(e,item){//区域字级点击
        this.tatolList = 0;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.areasId = item.childId;
        this.quyuChild = item.childName;
        this.areasName = [];
        this.allClick = true;
        this.curPage = 1;
        this.areasName.push(item.childName);

        this.init();
      },
      yetaiChildFun(e,item){//业态字级点击
        this.tatolList = 0;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.yetaiId = item.childId;
        this.yetaiName = [];
        this.allClick = true;
        this.curPage = 1;
        this.yetaiName.push(item.childName);

        this.init();
      },
      yetaiFun(e,item){//业态一级点击
        this.search = "";
        this.tatolList = 0;
        this.curPage = 1;
        this.yetaiParent = [];
        this.yetaiName = [];
        this.yetaiChild = item;
        this.yetaiParentId = item.id;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");

        if(item.name == "不限"){
          this.allClick = false;
          $(".threeYetai").hide();
        }else{
          this.allClick = true;
          $(".threeYetai").show();
          this.yetaiParent.push(item.name);
        }
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.tatolList = 1;
        }
        this.init();
        setTimeout(function () {
          $("#yetaiChild i").eq(0).addClass("cur").siblings().removeClass("cur");
        },100)
      },
      mianjiFun(e,item){//面积一级点击;
        this.tatolList = 0;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.mianjiId = item.id;
        this.mianjiName = [];
        this.curPage = 1;

        if(item.show_text == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.mianjiName.push(item.show_text);
        }
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.tatolList = 1;
        }
        this.init();
      },
      monthFun(e,item){//月租金点击
        this.search = "";
        this.tatolList = 0;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.monthId = item.id;
        this.monthName = [];
        this.curPage = 1;

        if(item.show_text == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.monthName.push(item.show_text);
        }
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.tatolList = 1;
        }
        this.init();
      },
      transferFun(e,item){//转让费点击
        this.search = "";
        this.tatolList = 0;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.transferId = item.id;
        this.transferName = [];
        this.curPage = 1;

        if(item.show_text == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.transferName.push(item.show_text);
        }

        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.tatolList = 1;
        }
        this.init();
      },
      areasParentRemove(){//已选区域父级
        this.areasParentId = "";
        this.areasId = "";
        this.areasParent = [];
        this.areasName = [];
        this.curPage = 1;
        this.search = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        this.init();
        $("#areasChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        $("#areasChildrens").hide()
        $("#areasChildrens i").removeClass("cur");

      },
      areaRemove(){//已选区域删除
        this.areasId = "";
        this.areasName = [];
        this.curPage = 1;
        this.quyuChild = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        this.init();
        $("#areasChildrens i").eq(0).addClass("cur").siblings().removeClass("cur");
      },
      yetaiParentRemove(){//已选区域父级
        this.yetaiParentId = "";
        this.yetaiParent = [];
        this.yetaiId = "";
        this.yetaiName = [];
        this.curPage = 1;
        this.search = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        this.init();
        $("#yetai b").eq(0).addClass("cur").siblings().removeClass("cur");

        $("#yetaiChild i").removeClass("cur");
        $("#yetaiChild").hide();
      },
      yetaiRemove(){
        this.curPage = 1;
        this.yetaiId = "";
        this.yetaiName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        $("#yetaiChild i").eq(0).addClass("cur").siblings().removeClass("cur");

        this.init();
      },
      mianjiRemove(){
        this.curPage = 1;
        this.mianjiId = "";
        this.mianjiName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        $("#mianjiChildren b").eq(0).addClass("cur").siblings().removeClass("cur");

        this.init();

      },
      monthRemove(){
        this.curPage = 1;
        this.monthId = "";
        this.monthName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        $("#monthChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.init();
      },
      transferRemove(){
        this.curPage = 1;
        this.transferId = "";
        this.transferName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
          this.tatolList = 1;
        }
        $("#transferChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.init();
      },
      allRemove(){
        this.tatolList = 1;
        this.curPage = 1;
        //选择的数组滞空
        this.areasParent = [];
        this.yetaiParent = [];
        this.areasName=[];//区域名称
        this.yetaiName=[];//业态名称
        this.mianjiName=[];//面积名称
        this.monthName=[];//月租金名称
        //筛选烌条件滞空
        this.quyu = "";
        this.quyuChild = "";
        this.areasId = "";
        this.areasParentId = "";
        this.yetaiId = "";
        this.yetaiParentId = "";
        this.mianjiId = "";
        this.monthId = "";
        this.transferId = "";
        this.search = "";
        this.allClick = false;//已选择的html不显示

        $("#areasChildren b").removeClass("cur");
        $("#areasChildrens i").removeClass("cur");
        $("#yetai b").removeClass("cur");
        $("#yetaiChild i").removeClass("cur");
        $("#mianjiChildren b").removeClass("cur");
        $("#monthChildren b").removeClass("cur");
        $("#transferChildren b").removeClass("cur");

        $("#areasChildren b").eq(0).addClass("cur");
        $("#yetai b").eq(0).addClass("cur");
        $("#mianjiChildren b").eq(0).addClass("cur");
        $("#monthChildren b").eq(0).addClass("cur");
        $("#transferChildren b").eq(0).addClass("cur");

        $("#yetaiChild").hide();
        $("#areasChildrens").hide();
        this.init();
      },
      searchClick(){//收起选项
        this.packUp = !this.packUp;
        if($(".search-click span").hasClass("cur")){
          $(".search-click").html("更多选项 <span></span>");
        }else{
          $(".search-click").html("收起选项 <span class='cur'></span>");
        }
      },
      //分页
      handleCurrentChange(val) {
        //console.log(val);
        this.pageNum = val;
        this.init();
        $('html , body').animate({scrollTop: 100},100);
      },
      goShopDetail(item){//跳转到详情页面
        window.open("/shopDetail/" + item.id);
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/shopList.less';
  @import '../../assets/css/shopMsg.less';
  @import '../../assets/css/shopPages.less';
</style>
