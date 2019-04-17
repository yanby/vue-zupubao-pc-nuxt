<template>
  <div class="youpu">
    <Nav></Nav>
    <div class="aboutUp w1200">
      <div class="crumbs">首页-联系优铺</div>
      <div class="about-content clearfix">
        <AboutNav></AboutNav>
        <div class="about-right right">
          <ul class="about-right-ul">
            <li class="contact-cur">
              <h3><b></b>联系优铺</h3>
              <div class="address">
                <div class="img"></div>
              </div>
            </li>
          </ul>
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
  import AboutNav from '~/components/Nav/AboutNav';

  export default {
    head () {
      return {
        title: '联系优铺-优铺网'
      }
    },
    data(){
      return{
        id : ""
      }
    },
    components: {
      Nav,
      Navbar,
      Footer,
      AboutNav
    },
    mounted(){

    },
    updated(){


    },
    methods:{

    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutUp.less';
</style>
