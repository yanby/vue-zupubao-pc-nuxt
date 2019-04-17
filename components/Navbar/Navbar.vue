<template>
  <div class="navbar">
    <ul>
      <li><nuxt-link :to="{name:'shop-seekShop'}"></nuxt-link></li>
      <li><nuxt-link :to="{name:'shop-turnShop'}"></nuxt-link></li>
      <li>
        <div class="tel-msg">
          <p>咨询热线</p>
          <p>4008988808</p>
        </div>
      </li>
      <li>
        <div class="code-msg"><p></p></div>
      </li>
      <li class="top"></li>
    </ul>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
export default {
  data () {
    return {
        tel: false
    }
  },
  mounted(){
    $(".navbar ul li.top").on("click",function () {
      $('html , body').animate({scrollTop: 0},300);
    })
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
  @import '../../assets/css/navbar.less';
</style>
