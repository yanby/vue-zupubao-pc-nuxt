<template>
  <div class="about-left left">
    <ul>
      <li class="cur"><nuxt-link :to="{name:'youpu-aboutUp'}"><b></b>关于优铺</nuxt-link></li>
      <li><nuxt-link :to="{name:'youpu-joinUp'}"><b></b>加盟优铺</nuxt-link></li>
      <li><nuxt-link :to="{name:'youpu-collegeUp'}"><b></b>优铺商学院</nuxt-link></li>
      <li><nuxt-link :to="{name:'youpu-contactUp'}"><b></b>联系优铺</nuxt-link></li>
      <li><nuxt-link :to="{name:'youpu-recruitUp'}"><b></b>优铺招聘</nuxt-link></li>
      <li><a href="http://zyss.youpuchina.com"><b></b>中耀盛世</a></li>
    </ul>
  </div>
</template>

<script>
    export default {
      data(){
        return {}
      },
      mounted(){
        this.activeUrl();
        //左边栏浮动
        window.onscroll = function(){
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if(scrollTop >= 121){
            $(".about-left").addClass("cur");
          }else{
            $(".about-left").removeClass("cur");
          }
        }
      },
      methods:{
        activeUrl(){
          var filename=window.location.href;
          if(filename.indexOf("aboutUp") != -1){
            $(".about-left ul li").eq(0).addClass("cur").siblings().removeClass("cur");
          }
          else if(filename.indexOf("joinUp") != -1){
            $(".about-left ul li").eq(1).addClass("cur").siblings().removeClass("cur");
          }
          else if(filename.indexOf("collegeUp") != -1){
            $(".about-left ul li").eq(2).addClass("cur").siblings().removeClass("cur");
          }
          else if(filename.indexOf("contactUp") != -1){
            $(".about-left ul li").eq(3).addClass("cur").siblings().removeClass("cur");
          }
          else if(filename.indexOf("recruitUp") != -1){
            $(".about-left ul li").eq(4).addClass("cur").siblings().removeClass("cur");
          }
        },
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutUp.less';
</style>
