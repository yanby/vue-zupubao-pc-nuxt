<template>
  <div class="mine-left left">
    <div class="mine-msg">
      <div class="img"></div>
      <p><b>{{iphone}}</b><span></span></p>
      <div class="txt">
        今日已查看<span class="red">{{pvCount - numIndex}}</span>套铺源<br>(共{{pvCount}}套/日)
      </div>
    </div>
    <div class="mine-list">
      <ul>
        <li><nuxt-link :to="{name:'mine-member'}">会员服务</nuxt-link></li>
        <li><nuxt-link :to="{name:'mine-order'}">我的订单</nuxt-link></li>
        <li><nuxt-link :to="{name:'mine-collect'}">我的收藏</nuxt-link></li>
        <li @click="btn()"><a href="javascript:;">退出登录</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
export default {
  name: '',
  data () {
   return{
     numIndex: "",
     pvCount: "",//次数总数
     iphone: "",
     cookieUserTel: "",
   }
  },
  mounted(){
    this.init()
    this.iphoneFun()
    this.activeUrl()
  },

  methods:{
    init(){//次数
      axios({
        url: '/shop/shopCheckedRecords',
        method: 'post',
        params: {
          shopId: 0,
          type: "1",
          roof: 1,
          cityId: sessionStorage.cityId
        }
      })
      .then(res => {
        console.log(res)
        if(res.data.code == 101){
          this.pvCount = Number(res.data.pvCount);
          this.numIndex = Number(res.data.count);
        }else{
          this.$message('系统繁忙，请稍后再试');
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    iphoneFun(){
      var str = localStorage.iphone;
      this.iphone = str.substr(0,3)+"****"+str.substr(7);
    },
    activeUrl(){
      var filename=window.location.href;
      if(filename.indexOf("member") != -1){
        $(".mine-list ul li").eq(0).addClass("cur").siblings().removeClass("cur");
      }
      else if(filename.indexOf("order") != -1){
        $(".mine-list ul li").eq(1).addClass("cur").siblings().removeClass("cur");
      }
      else if(filename.indexOf("mine") != -1){
        $(".mine-list ul li").eq(2).addClass("cur").siblings().removeClass("cur");
      }
    },
    btn(){
      var that = this;
      this.$confirm('确认要退出登录么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        localStorage.clear();
        this.$router.push({path:'/'})
        function clearCookie() {
          var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
          if (keys) {
            for (var i = keys.length; i--;) {
              // document.cookie = keys[i] + '=0;path=/;domain=.yingshangchina.com;expires=' + new Date(0).toUTCString();
              document.cookie = keys[i] + '=0;path=/;domain=.youpuchina.com;expires=' + new Date(0).toUTCString();
            }
          }
        }
        clearCookie();
        that.$message('退出成功');
      }).catch(() => {
        that.$message("已取消")
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>
