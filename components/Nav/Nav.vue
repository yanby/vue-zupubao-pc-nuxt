<template>
<div class="nav">
    <div class="nav_top">
        <dl>
            <dt><img src="~/assets/images/nav/up1.png" alt="优铺租铺宝" class="upImg1"><img src="~/assets/images/nav/up2.png" class="upImg2"></dt>
            <dd><span @click="cityLocationBtn()">{{cityName}}</span><img src="~/assets/images/nav/locating.png">
                <div class="selectCity" v-if="showCityLocation">
                    <p v-for='(item,index) in cityArr' @click="cityLocationList(item,index)">{{item.city_name}}</p>
                </div>
            </dd>
        </dl>
        <ul>
          <li><nuxt-link :class="{active: isActive1}" :to="{name:'index'}">首页</nuxt-link></li>
          <li><nuxt-link :class="{active: isActive2}" :to="{name:'shop-shopList'}">找铺开店</nuxt-link></li>
          <li><nuxt-link :class="{active: isActive3}" :to="{name:'shop-seekShop'}">委托找铺</nuxt-link></li>
          <li><nuxt-link :class="{active: isActive4}" :to="{name:'shop-turnShop'}">委托转铺</nuxt-link></li>
          <li><nuxt-link :class="{active: isActive5}" :to="{name:'news-newsList'}">行业资讯</nuxt-link></li>
          <li class="hoverLi">
            <nuxt-link :class="{active: isActive7}" :to="{name:'publish-publishMsg'}">发布信息</nuxt-link>
          </li>
          <li><img src="~/assets/images/nav/phone.png"><nuxt-link :class="{active: isActive6}" :to="{name:'downLoad-appDownload'}">APP下载</nuxt-link></li>
        </ul>
        <div class="user_login">
            <p v-if="cookieUserTel"><img src="~/assets/images/nav/user.png"><nuxt-link :to="{name:'mine-member'}">我的优铺</nuxt-link><i></i></p>
            <p v-else><img src="~/assets/images/nav/user.png"><nuxt-link :class="{active: isActive7}" :to="{name:'login'}">用户登录</nuxt-link><i></i></p>
            <div class="info_tel"><img src="~/assets/images/nav/tel.png">咨询热线4008988808<i></i></div>
            <span><a href="http://www.youpuglobal.com/" target="_blank" style="color: #224E8F; font-weight: 500;">卖铺宝</a></span>
        </div>
    </div>
</div>
</template>

<script>
  import {IsPC} from '~/plugins/common.js';
  import axios from '~/plugins/axios.js';
export default {
  name: 'hello',
  data () {
    return {
        url: "",
        token: null,
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        isActive7: false,
        // isActive8: false,
        showCityLocation: false,
        cityArr: [],
        cityName: "",//城市
        cookieUserTel: "", // 储存cookie里的电话
    }
  },
  methods:{
    // 获取页面路径
    achieveUrl(){
        var filename=window.location.href;
        if(filename.indexOf("shopList") != -1){
            this.isActive2 = true;
        } else if(filename.indexOf("seekShop") != -1){
            this.isActive3 = true;
        } else if(filename.indexOf("turnShop") != -1){
            this.isActive4 = true;
        } else if(filename.indexOf("news") != -1){
            this.isActive5 = true;
        } else if(filename.indexOf("appDownload") != -1){
            this.isActive6 = true;
        } else if(filename.indexOf("shopDetail") != -1){
            this.isActive2 = true;
        } else if(filename.indexOf("newsDetail") != -1){
            this.isActive5 = true;
        }else if(filename.indexOf("login") != -1){
          this.isActive1 = false;
        } else if(filename.indexOf("publishMsg") != -1){
            this.isActive7 = true;
        } else if(filename.indexOf("mine") != -1){
            this.isActive1 = false;
        } else if(filename.indexOf("shopMap") != -1){
            this.isActive1 = false;
        } else if(filename.indexOf("aboutUp") != -1){
            this.isActive1 = false;
        } else if(filename.indexOf("joinUp") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("collegeUp") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("contactUp") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("recruitUp") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("order") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("member") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("mine") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("pay") != -1){
          this.isActive1 = false;
        }else if(filename.indexOf("coBranding") != -1){
          this.isActive1 = false;
        }else {
            this.isActive1 = true;
        }
    },
    // 点击城市定位
    cityLocationBtn(){
        this.showCityLocation = true;
    },
    // 城市列表
    cityListFun(){
      axios({
        url: '/show/getOpenedCitiesList',
        method: 'post'
      }).then(res => {
        console.log(res)
        // 列表商铺展示
        if(res.data.code == 101){
          this.cityArr = res.data.data;
          this.cityArr.forEach(function (item,index) {
            item.city_name = item.city_name.split("市").join("");
          })
        }else{
          this.$message('系统繁忙，请稍后再试');
        }
      }).catch(err => {
        console.log(err)
      });
    },
    // 选择城市
    cityLocationList(item,index) {
      console.log(item)
      this.showCityLocation = false;
      window.location.href = item.web_url;
    }
  },
  mounted(){
    if (!IsPC()) {
      window.location.href = "http://m.youpuchina.com";
    }
    var that = this;
    setTimeout(function () {
      that.cookieUserTel = localStorage.token;
      if(sessionStorage.cityName){
        that.cityName = sessionStorage.cityName.split("市").join("");
      }
    },500)
    // 城市列表
    this.cityListFun();
    // 调用获取页面路径方法
    this.achieveUrl();
  }
}
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/nav.less';
</style>
