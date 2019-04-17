import axios from 'axios' //引入axios模块

// axios 配置
axios.defaults.timeout = 300000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.baseURL = 'http://api.zpb.youpuchina.com'; //中经联盟官网正式
// axios.defaults.baseURL = 'http://test-api.zpb.youpuchina.com'; //中经联盟官网测试
// axios.defaults.baseURL = 'http://192.168.1.138:8080';


if(typeof window !== "undefined"){
  var url ="http://" +  window.location.host;
  axios({
    url: '/show/getOpenedCitiesList',
    method: "post",
  }).then(res => {
    console.log(res)
    res.data.data.forEach(function (item,index) {
      if(item.web_url == url){
        sessionStorage.provinceId = item.province_id;
        sessionStorage.cityId =  item.city_id;
        sessionStorage.cityName = item.city_name;
      }
    })
  }).catch(err => {
    console.log(err)
  });
 //http request 拦截器
  axios.interceptors.request.use(
    config => {
      if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers["token"]  = localStorage.token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

//http response 拦截器
  axios.interceptors.response.use(
    response => {
      if(response.data.code == 201){
        localStorage.clear();
        // window.location = "http://www.yingshangchina.com/login";
        window.location = "http://www.youpuchina.com/login";
        // this.$message("请先登录")
        // router.replace({
        //   path:"login",
        //   query: {redirect: router.currentRoute.fullPath}
        // })
      }else if(response.data.code == 202){
        localStorage.clear();
        // window.location = "http://www.yingshangchina.com/login";
        window.location = "http://www.youpuchina.com/login";
        // this.$message("登录超时，请重新登录")
        // router.replace({
        //   path: 'login',
        //   query: {redirect: router.currentRoute.fullPath}
        // })
      }
      return response;
    },
    error => {
      return Promise.reject(error)   // 返回接口返回的错误信息
    });
}


export default axios;
