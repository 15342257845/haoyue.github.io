//去除vue警告
Vue.config.productionTip = false;

//sad
var vue = new Vue({
    el: '#LoginCenter',
    data: {
        username: '',
        password: '',
    },

    methods: {
        loginuser: function () {
            layer.open({
                title: '验证',
                type: 1,
                content: $('#slideBar'), //这里content是一个dom对象
                //宽高
                area: ['400px', '300px'],
                //关闭触发回调函数
                cancel: function (index, layero) {
                    var silde = document.getElementById('slideBar');
                    silde.style.display = "none";
                }
            });
        },

    }

})

// 下划线的动画
var usertext = document.getElementById("usertext");
var password = document.getElementById("passtext");
var textline = document.getElementById("textline");
var passline = document.getElementById("passline");
usertext.onfocus = function () {
    textline.style.width = 0 + 'px';
    usertext.style.border = "1px solid gray"
};
usertext.onblur = function () {

    textline.style.width = 200 + 'px';
    usertext.style.border = "1px solid rgba(200,200,200,0.1)"
};
password.onfocus = function () {
    passline.style.width = 0 + 'px';
    password.style.border = "1px solid gray"
};
password.onblur = function () {
    passline.style.width = 200 + 'px';
    password.style.border = "1px solid rgba(200,200,200,0.1)"
};


//滑动验证
var dataList = ["0", "1"];

var options = {
    dataList: dataList,

    //验证码成功了触发回调函数
    success: function () {

        axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=managelogin',
            "username=" + vue.username + "&password=" + vue.password + "")
            .then(res => {
                if (res.data.message == '0') {
                    console.log(res.data);

                    var session = window.sessionStorage;
                    session['id'] = res.data.isuserpassres.id;
                    session['username'] = res.data.isuserpassres.username;
                    session['password'] = res.data.isuserpassres.password;
                    session['name'] = res.data.isuserpassres.name;
                    session['sex'] = res.data.isuserpassres.sex;

                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>登陆成功！</div>",
                        //宽高
                        area: ['300px', '200px'],
                    });

                    setTimeout(() => {
                        window.location.href = 'manage.html';
                    }, 1000);
                }
                else {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:25px';><span style='color: red'>用户名或密码不正确!</span></br>请重新输入</div>",
                        //宽高
                        area: ['300px', '200px'],
                        time: 2000
                    });
                    setTimeout(() => {
                        window.location.href = 'managelogin.html';
                    }, 2100);
                }
            })
    },
    //验证码失败了触发回调函数
    fail: function () { }


};
SliderBar("slideBar", options);
