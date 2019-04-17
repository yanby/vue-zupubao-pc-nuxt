<template>
  <div class="coBranding">
    <Nav></Nav>
    <div class="co-Branding">
      <ul class="co-Branding-top">
        <li class="home_btn">首页></li>
        <li>品牌列表</li>
      </ul>
      <div class="co-Branding-box">
        <dl v-for="item in coBrandingArr">
          <dt><img :src="item.img"></dt>
          <dd>
            <h3>{{item.brandName}}</h3>
            <ul>
              <li>业态：<span>{{item.brandType}}</span></li>
              <li>需求面积：<span>{{item.area}}</span></li>
              <li>拓展区域：<span class="overstep">{{item.region}}</span></li>
              <li>合作期限：<span>{{item.cooperation}}</span></li>
            </ul>
            <h4>公司名称：<span>{{item.companyName}}</span></h4>
          </dd>
        </dl>
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="8"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <Footer></Footer>
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
      Footer
    },
    data (){
      return {
        // 分页
        pageSize: 8,
        pageNum: 1,
        total:0,  //接收渲染数据总数的参数
        coBrandingArr: []

      }
    },
    mounted(){
      this.coBrandingData();
    },
    methods:{
      // 合作品牌
      coBrandingData(){
        // 接口调用
        axios({
          url:'/show/getBrandList',
          method: 'post',
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            cityId: sessionStorage.cityId
          }
        }).then(data => {
          console.log(data);
          if(data.data.code == 101){
            this.total = Number(data.data.totalCount);
            this.coBrandingArr = data.data.brandList;
          }else{
            this.$message('系统繁忙，请稍后再试');
          }
        }).catch(err => {
          console.log(err)
        });
      },
      //分页
      handleCurrentChange(val) {
        console.log(val);
        this.pageNum = val;
        this.coBrandingData();
        $('html , body').animate({scrollTop: 100},100);
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/shopPages.less';
  .co-Branding{
    width: 1200px;
    margin: 0 auto;
  }
  .co-Branding-top{
    width: 1182px;
    height: 38px;
    background: #fff;
    margin: 20px auto;
    padding-left: 18px;
    li{
      float: left;
      line-height: 38px;
      color: #898989;
      font-size: 14px;
    }
    .home_btn{
      cursor: pointer;
    }
  }
  .co-Branding-box{
    width: 1200px;
    margin-bottom: 60px;
    overflow: hidden;
    dl{
      width: 550px;
      height: 124px;
      background: #fff;
      margin-top: 14px;
      padding: 15px 20px;
      dt{
        float: left;
        margin-right: 30px;
        img{
          width: 133px;
          height: 96px;
        }
      }
      dd{
        h3{
          color: #224E8F;
          font-size: 14px;
          margin-bottom: 8px;
          span{
            color: #333;
          }
        }

        ul{
          /*height: 54px;*/
          overflow: hidden;
          /*background: red;*/
          li{
            color: #666666;
            float: left;
            font-size: 14px;
            /*margin-bottom: 6px;*/
            line-height: 24px;
            span{
              color: #333;
            }
            .overstep{
              width: 110px;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              /*line-height: 24px;*/
              float: right;
            }
          }
          li:nth-child(odd){
            width: 182px;
          }
          li:nth-child(even){
            width: 165px;
            float: left;
          }
        }

        h4{
          font-size: 14px;
          color: #666;
          line-height: 24px;
          span{
            color: #333;
          }
        }
      }
    }
    dl:nth-child(odd){
      float: left;
    }
    dl:nth-child(even){
      float: right;
    }
  }
  /*分页*/
  .page{
    width: 100%;
    margin: 50px auto;
    text-align: center;
  }
</style>

