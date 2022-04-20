/*
  请求地址:http://wthrcdn.etouch.cn/weather_mini
  请求方法:get
  请求参数:city(城市名)
  响应内容:天气信息

  1. 点击回车
  2. 查询数据
  3. 渲染数据
  */
Vue.config.productionTip = false;
var app = new Vue({
    el: ".background",
    data: {
        city: '',
        weatherList: [],
        city: "武汉",
        forecastList: [],
        hotCitys: ["北京", "上海", "广州", "深圳"],
        id: '18',
        name: '周诚',
        referenceid: '',
        cebianlanistrue: true,
    },
    methods: {
        //这是侧边栏的滑动效果
        cebianlan: function () {
            app.cebianlanistrue = !(app.cebianlanistrue);
            console.log(app.cebianlanistrue);
            app.cebianlanistrue == false ? app.$refs.cebianlan.style.left = '0px' : app.$refs.cebianlan.style.left = '-120px'
        },
        searchWeather: function () {
            //  console.log('天气查询');
            //  console.log(this.city);
            // 调用接口
            // 保存this
            var that = this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
                .then(function (response) {
                    // console.log(response);
                    console.log(response.data.data.forecast);
                    that.weatherList = response.data.data.forecast
                })
                .catch(function (err) { })
        },
        queryWeather() {
          //  this.forecastList = [];

          //  axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
             //   .then(res => {
            //        console.log(res);
                    this.forecastList =  [
             {
                 type: '多云',
                 low: '低温16℃',
                 high: '高温25℃',
                 date: '1日星期一'
             },
             {
                 type: '晴',
                 low: '低温20℃',
                 high: '高温30℃',
                 date: '2日星期二'
             },
             {
                 type: '小雨',
                 low: '低温15℃',
                 high: '高温20℃',
                 date: '3日星期三'
             },
             {
                type: '阴',
                 low: '低温13℃',
                 high: '高温20℃',
                 date: '4日星期四'
             },
             {
                 type: '多云',
                 low: '低温16℃',
                 high: '高温25℃',
                 date: '5日星期五'
             },
         ];;
             //   })
             //   .catch(err => {
            //       console.log(err);
            //    })
            //    .finally(() => { });
        },

       
        clickSearch(city) {
            this.city = city;
            this.queryWeather();
        }
    },
})


// window.onload = function () {
//     if (window.sessionStorage.length == 0) {
//         window.location.href = 'Login.html';
//     }
//     else {
//         //把登录页传过来的值赋值给相对应的字段
//         app.id = window.sessionStorage.id;
//         app.name = window.sessionStorage.name;
//         app.referenceid = window.sessionStorage.id;
//         console.log(window.sessionStorage);
//     }
// }

//鼠标划过显示天气背景

function getinfo(e) {


    switch (e.children[0].children[0].innerText) {
        case '小雨':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/rain.gif')";
            break;
        case '中雨':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/rain.gif')";
            break;
        case '大雨':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/rain.gif')";
            break;
        case '暴雨':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/rain.gif')";
            break;
        case '阴':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/yintian.gif') no-repeat";
            wrap.style.backgroundSize = "100% 100%";
            break;
        case '多云':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/duoyun.gif') no-repeat";
            wrap.style.backgroundSize = "100% 100%";
            break;
        case '晴':
            var wrap = document.getElementById('wrap');
            wrap.style.background = "url('img/qingtian.gif') no-repeat";
            wrap.style.backgroundSize = "100% 100%";
            break;

    }
}
