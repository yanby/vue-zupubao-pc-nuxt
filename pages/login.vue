<template>
  <div class="login">
    <Nav></Nav>
    <div class="login_bg">
      <div class="login_box">
        <ul>
          <li><a href="index.html">首页</a>></li>
          <li>用户登录</li>
        </ul>
        <div class="login_wrap">
          <table>
            <tr>
              <td class="td1">手机号码</td>
              <td><input type="" name="" class="login_tel" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="11" @blur="blur_tel()" @focus="gotFocus()">
                <!-- <span class="get_code" style="background: #ccc;" v-if="showCode">获得验证码</span> -->
                <button type="button" :disabled="disabled" @click="sendcode"  class="get_code">{{btntxt}}</button>
              </td>
            </tr>
            <tr>
              <td class="td1"></td>
              <!-- <td class="text_verify">请输入手机号</td> -->
              <td class="text_verify">{{text_tel}}</td>
            </tr>
            <tr>
              <td class="td1">手机验证码</td>
              <td><input type="" name="" class="login_code" v-model="securityCode" placeholder="请输入验证码" maxlength="6" @blur="blur_code()"></td>
            </tr>
            <tr>
              <td class="td1"></td>
              <!-- <td class="text_verify">请输入验证码</td> -->
              <td class="text_verify">{{text_code}}</td>
            </tr>
            <tr>
              <td class="td1"></td>
              <!-- <td><span class="text_promp">无需注册，输入手机号即可登录</span></td> -->
            </tr>
            <tr>
              <td class="td1"></td>
              <td><div class="login_btn" @click="loginBtn($event)">登录</div></td>
            </tr>
            <!--<tr>-->
              <!--<td class="td1"></td>-->
              <!--<td class="prompt"><p>温馨提示：租铺宝目前仅开通<span>北京、</span><span>青岛</span>地区服务，其他城市即刻开通，请持续关注</p></td>-->
            <!--</tr>-->
          </table>

          <div class="imgs-box">
            <img src="~/assets/images/login/youpu.png">
          </div>
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
  export default {
    name: '',
    components: {
      Nav,
      Footer,
      Navbar
    },
    data (){
      return {
        // 全局地址
        api: "",
        phoneVal: '', // 手机号码
        securityCode: '', // 验证码
        disabled:false,
        time:0,
        btntxt:"获取验证码",
        text_tel: "",
        text_code: "",
        showCode: true,
        urlId: "",
        urlType: ""
      }
    },
    mounted(){
      // this.urlId = request['payId'];
      // this.urlType = request['payType'];
    },
    methods:{
      //获取验证码
      sendcode() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phoneVal==''){
          this.text_tel = '请输入手机号'
        }else if(!reg.test(this.phoneVal)){
          this.text_tel = '请输入正确的手机号'
        }else{
          // 接口调用
          let str = this.phoneVal;
          let num = str.replace(/[^0-9]/ig,"");
          // console.log(num);
          axios({
            url:'/sendsms',
            method: 'post',
            params: {
              phoneNumber: num,
              cityId: sessionStorage.cityId || 110100
            }
          }).then(data => {
            // console.log(data);
            if(data.data.code = 101){
              this.text_tel = "";
              this.time=60;
              this.disabled=true;
              this.timer();
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 倒计时
      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntxt= "重新获取(" + this.time + ")";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntxt="获取验证码";
          this.disabled=false;
        }
      },
      // 点击登录按钮
      loginBtn() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let _this = this;
        if(this.phoneVal==''){
          this.text_tel = '请输入手机号'
        }else if(!reg.test(this.phoneVal)){
          this.text_tel = '请输入正确的手机号'
        }else if(this.securityCode == ""){
          this.text_code = '请输入验证码'
        }else{
          this.text_code = "";
          this.text_tel = "";
          let str = _this.phoneVal;
          let num = str.replace(/[^0-9]/ig,"");
          axios({
            url: '/login',
            method: 'post',
            params:
              {
                account: num,
                password: _this.securityCode,
                channel: 2,
                cityId: sessionStorage.cityId,
                provinceId: sessionStorage.provinceId
              }
          }).then(data => {
            console.log(data);
            if(data.data.code == 101){
              localStorage.token = data.data.token;
              localStorage.iphone = data.data.phone;
              localStorage.pvCount = data.data.pvCount;
              // document.cookie="token="+localStorage.token+";path=/;domain=.yingshangchina.com";
              document.cookie="token="+localStorage.token+";path=/;domain=.youpuchina.com";
              // document.cookie="iphone="+localStorage.iphone+";path=/;domain=.yingshangchina.com";
              document.cookie="iphone="+localStorage.iphone+";path=/;domain=.youpuchina.com";
              if(this.$route.query.url){
                this.$router.go(-1)
              }else{
                this.$router.push({path:"/"})
              }

            }else if(data.data.code == 103){
              this.$message('验证码错误');
            }else{
              this.$message('系统繁忙，请稍后再试');
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 电话号码失去焦点
      blur_tel() {
        if(this.phoneVal.length == 11){
          this.showCode = false;
        }
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let _this = this;
        if(this.phoneVal==''){
          this.text_tel = '请输入手机号'
        }else if(!reg.test(this.phoneVal)){
          this.text_tel = '请输入正确的手机号'
        }else{
          this.text_tel = ''
        }
      },
      // 验证码失去焦点
      blur_code() {
        let codeReg = /\d{6}/;
        let _this = this;
        if(this.securityCode == ""){
          this.text_code = '请输入验证码'
        }else if(!codeReg.test(this.securityCode)){
          this.text_code = '请输入正确验证码'
        }else{
          this.text_code = ''
        }
      },
      // 获得焦点
      gotFocus(){
        if(this.phoneVal.length == 11){
          this.showCode = false;
        }
      }
    },
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../assets/css/login.less';
</style>
