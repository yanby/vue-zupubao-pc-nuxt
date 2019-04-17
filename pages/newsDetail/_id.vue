<template>
  <div class="newsDetail">
    <Nav></Nav>
    <div class="wrap">
      <h1 title="文章"></h1>
      <h2>{{this.newTitle}}</h2>
      <h5>发布时间{{this.newTime}}</h5>
      <div class="wrap_box" v-html="newMain">
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

    data(){
      return{
        api: "",
        id: "",
        newMain: "",
        newTitle: "",
        newTime: "",
        titleObj: "文章 文章",
        info: "",//预渲染
      }},
    components: {
      Nav,
      Footer,
      Navbar
    },
    asyncData ({ params, error }) {
      return axios({
        method: 'post',
        url: '/show/getMediaList',
        params:{
          titleId: params.id,
        }
      }).then((res) => {
        return { info: res.data.info}
      })
    },
    mounted(){
    // 保存全局地址
      this.id = this.$route.params.id;
      this.listData();
    },
    methods:{
      listData() {
        axios({
          url: '/show/getMediaList',
          method: 'post',
          params: {
            titleId: this.id,
          }
        }).then(data => {
          // console.log(data);
          if(data.data.code==101){
            this.newTitle = data.data.info.title;
            this.newTime = data.data.info.date;
            this.newMain = data.data.info.content;
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        }).catch(err => {
          console.log(err)
        });
      },
    },
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/newsDetail.less';
</style>

