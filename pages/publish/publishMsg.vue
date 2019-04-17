<template>
  <div class="publishMsg">
    <Nav></Nav>
    <div class="postMessage">
    </div>
    <Footer></Footer>
    <Navbar></Navbar>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Navbar from '~/components/Navbar/Navbar'
  import Footer from '~/components/Footer/Footer';
  export default {
    name: 'app',
    components: {
      Nav,
      Footer,
      Navbar
    },
    data (){
      return {}
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/publishMsg.less';
</style>
