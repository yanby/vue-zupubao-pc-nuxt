<template>
  <div class="appDownload">
    <Nav></Nav>
    <div>
      <div class="app_code">
        <dl>
          <dt><img src="~/assets/images/appDownload/zupubao.png"></dt>
          <dd>
            <p class="p1">扫描下载</p>
            <p>租铺宝客户端</p>
          </dd>
        </dl>
      </div>
      <el-carousel trigger="click" height="888px">
        <el-carousel-item v-for="(item,index) in picArr">
          <h3>
            <img :src="item.img">
            <div class="app_img">
              <div class="img_left">
                <img :src="item.tel">
              </div>
              <div class="img_right">
                <div class="img_right_top"><img :src="item.txt"></div>
                <div class="img_right_bttom">
                  <!-- <p class="img1" @click="android_app"></p>
                  <p class="img2" @click="ipone_app"></p> -->

                  <div class="img1" @click="android_app">
                    <li></li>
                    <p>Android市场下载</p>
                  </div>
                  <div class="img2" @click="ipone_app">
                    <li></li>
                    <p>AppStore下载</p>
                  </div>

                </div>
              </div>
            </div>
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Footer></Footer>
    <navbar></navbar>
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
        title: 'APP下载-优铺网`',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '门面网，租门面，找门面，好旺铺，门脸房，商铺网，租商铺，找商铺，门面出租转让，商铺求租信息，旺铺出租转让，店铺转让出租，租铺宝，优铺网'},
          { hid: 'description', name: 'description', content: '优铺网旗下租铺宝youpuchina.com作为中国首席商铺租售O2O平台，整合优质商铺出租转让、门面出租转让、旺铺出租出售、门脸出租、找门脸等信息，大数据选址、一对一开店指导、租铺卖铺找优铺。' }
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
        picArr: [
          {
            'id': '0',
            'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
            'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/1.png',
            'tel': 'https://up-static.oss-cn-beijing.aliyuncs.com/Config/11551064376_.pic_hd.jpg'
          }, {
            'id': '1',
            'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
            'txt': 'https://up-static.oss-cn-beijing.aliyuncs.com/Config/101539596231_.pic.jpg',
            'tel': 'https://up-static.oss-cn-beijing.aliyuncs.com/Config/31551064387_.pic_hd.jpg'
          }, {
            'id': '2',
            'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
            'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/3.png',
            'tel': 'https://up-static.oss-cn-beijing.aliyuncs.com/Config/61551064641_.pic_hd.jpg'
          }, {
            'id': '3',
            'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
            'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/4.png',
            'tel': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/tel_4.png'
          }],
      }
    },
    mounted(){

    },
    methods:{
      android_app(){
        window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao");
      },
      ipone_app(){
        window.open("https://itunes.apple.com/cn/app/%E7%A7%9F%E9%93%BA%E5%AE%9D-%E4%B8%93%E4%B8%9A%E5%95%86%E9%93%BA%E5%87%BA%E7%A7%9F%E8%BD%AC%E8%AE%A9%E5%B9%B3%E5%8F%B0/id1371978896?mt=8");
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/appDownload.less';
</style>
<style>
  .el-carousel__item h3 {
    width: 100%;
    margin: 0 auto;
    /*text-align: center;*/
    position: relative;
    /*vertical-align:middle;*/
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

  .el-carousel__arrow{
    font-size: 26px!important;
  }
  .el-carousel__arrow--right {
    width:  60px!important;
    height: 60px!important;
  }
  .el-carousel__arrow--left {
    width:  60px!important;
    height: 60px!important;
  }

</style>
