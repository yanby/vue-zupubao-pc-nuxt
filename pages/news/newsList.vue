<template>
  <div class="newsList">
    <Nav></Nav>
    <!-- 轮播图 -->
    <div class="playImg">
      <img src="~/assets/images/news/newsBg.png">
    </div>

    <!-- 新闻列表展示 -->
    <div class="news_list" v-for="(item,index) in newArr" @click="goNews(item)">
      <dl>
        <img :src="item.url">
        <dt>
          <h3>{{item.title}}</h3>
          <div>
            <h5>{{item.content}}</h5>
          </div>
        </dt>
        <dd>
          <h2>{{item.time}}</h2>
          <h4>{{item.date}}</h4>
        </dd>
      </dl>
    </div>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="5"
        :total="total">
      </el-pagination>

      <!-- <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="10" :total="totalCount" @current-change="handleCurrentChange"> -->
      <!-- </el-pagination> -->
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
        title: '行业资讯-优铺网',
        meta: [
          { hid: 'keywords', name: 'keywords', content: '行业资讯'},
          { hid: 'description', name: 'description', content: '优铺网旗下租铺宝行业资讯频道，为您展现行业新闻，分享店铺经营指南，成功案例。' }
        ]
      }
    },
    data () {
      return {
        // 轮播图数组
        picArr: [],
        // 新闻数组
        newArr: [],
        // 全局地址
        api: "",
        // 分页
        pageSize: 8,
        pageNum: 1,
        total:0,  //接收渲染数据总数的参数
      }
    },
    components: {
      Nav,
      Navbar,
      Footer
    },
    mounted(){
      // 接口调用
      this.listData();
    },
    methods:{
      //分页
      handleCurrentChange(val) {
        //console.log(val);
        this.pageNum = val;
        this.listData();
        $('html , body').animate({scrollTop: 100},100);
      },
      // 新闻展示
      listData() {
        axios({
          url: '/show/getAticleList',
          method: 'post',
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            cityId: sessionStorage.cityId
          }
        }).then(data => {
          console.log(data);
          // 新闻列表
          if(data.data.code==101){
            this.newArr = data.data.articleList;
            this.total = Number(data.data.totalCount);
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        }).catch(err => {
          console.log(err)
        });
      },
      goNews(item){
        window.open("/newsDetail/"+item.id)
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/newsList.less';
</style>
