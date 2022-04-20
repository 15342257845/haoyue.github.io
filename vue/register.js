
//去除vue警告
Vue.config.productionTip = false;

//vue的数据
var vue = new Vue({
    el: '.RegCenter',
    data: {
        username: '',
        //usernamebool: 0,
        password: '',
        // passwordbool: 0,
        againpassword: '',
        //againpasswordbool: 0,
        //sex: '',
        name: '',
        //namebool: 0,
        random: ['可爱的小花', '勤劳的蜜蜂', '有趣的马儿', '今年暴富', '老实工作者', '光荣退休者', '努力加油', 'coolajax', 'express', 'vueisgod', '我爱特斯拉'],

    },

    methods: {

        //随机一个名字
        randomname: function () {
            var randomnumber = (Math.random() * 10).toFixed();
            this.name = this.random[randomnumber];
            document.getElementById('name').focus();
        },

        //注册按钮
        RegButton: function () {
            var man = document.getElementById('man');
            // (man.checked) ? vue.sex = '1' : vue.sex = '0';
            //找到四个验证的数据框, 如果他们的值都为1, 则弹出验证框
            // if (vue.usernamebool == 1 && vue.passwordbool == 1 && vue.againpasswordbool == 1 && vue.namebool == 1) {
            layer.open({
                title: '验证',
                type: 1,
                content: $('#slideBar'), //这里content是一个dom对象，触发滑块
                //宽高
                area: ['400px', '300px'],
                //关闭触发回调函数
                cancel: function (index, layero) {
                    var silde = document.getElementById('slideBar');
                    silde.style.display = "none";
                }
            });
            //  }

        }
    }

});



//判断用户名正确性
function usernameistrue() {
    againpasswordistrue();

    function yes() {

        vue.$refs.userreg.innerHTML = '&nbsp;&nbsp;<i class="layui-icon layui-icon-ok-circle "  style="font-size:30px;color:green"></i>';

        vue.$refs.username.style.border = "1px solid slategrey";
        // vue.usernamebool = 1;

    }
    function no() {

        vue.$refs.userreg.innerHTML = '<span style="color:red">请填写正确的电话号码</span>';

        vue.$refs.username.style.border = "2px solid red";
        //vue.usernamebool = 0;
    }
    (/^1(3|4|5|6|7|8|9)\d{9}$/.test(vue.username)) ? yes() : no()
};



//判断密码的正确性
function passwordistrue() {
    againpasswordistrue();
    function yes() {

        vue.$refs.passreg.innerHTML = '&nbsp;&nbsp;<i class="layui-icon layui-icon-ok-circle "  style="font-size:30px;color:green"></i>';

        vue.$refs.password.style.border = "1px solid slategrey";
        //vue.passwordbool = 1;
    }
    function no() {

        vue.$refs.passreg.innerHTML = '<span style="color:red">必须包含数字、英文字母且大于7小于21位</span>';

        vue.$refs.password.style.border = "2px solid red";
        // vue.passwordbool = 0;
    }
    (/^(?![0-9]+$)[a-z0-9]{8,20}$/.test(vue.password)) ? yes() : no()
};


//再次输入密码
function againpasswordistrue() {

    function yes() {

        vue.$refs.againpassreg.innerHTML = '&nbsp;&nbsp;<i class="layui-icon layui-icon-ok-circle "  style="font-size:30px;color:green"></i>';

        vue.$refs.againpassword.style.border = "1px solid slategrey";
        // vue.againpasswordbool = 1;
    }
    function no() {

        vue.$refs.againpassreg.innerHTML = '<span style="color:red;line-height:42px">必须和密码一致</span>';

        vue.$refs.againpassword.style.border = "2px solid red";
        // vue.againpasswordbool = 0;
    }
    (/^(?![0-9]+$)[a-z0-9]{8,20}$/.test(vue.againpassword) && (vue.password == vue.againpassword)) ? yes() : no()
};


//昵称不为空
function nameistrue() {
    function yes() {
        var namereg = document.getElementById('namereg');
        namereg.innerHTML = '&nbsp;&nbsp;<i class="layui-icon layui-icon-ok-circle "  style="font-size:30px;color:green;"></i>';
        var name = document.getElementById('name');
        name.style.border = "1px solid slategrey";
        // vue.namebool = 1;
    }
    function no() {
        var namereg = document.getElementById('namereg');
        namereg.innerHTML = '<span style="color:red;line-height:42px">不能为空</span>';
        var name = document.getElementById('name');
        name.style.border = "2px solid red";
        // vue.namebool = 0;
    }
    (vue.name != "") ? yes() : no();
};

//滑动验证
var dataList = ["0", "1"];

var options = {
    dataList: dataList,

    //验证码成功了触发回调函数
    success: function () {

        layer.open({
            title: '提示',
            content: '<div style="text-align:center;">注册成功！</br>3秒后即将跳转登录页面</div>',
            //宽高
            area: ['200px', '200px'],
        });
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 3000);


        //原项目代码--注册
        // axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=register', "username=" + vue.username + "&password=" + vue.password + "&name=" + vue.name + "&sex=" + vue.sex + "")
        //     .then(res => {
        //         //如果成功了，继续进行数据添加
        //         //如果message等于1
        //         if (res.data.message == 1) {
        //             layer.open({
        //                 title: '提示',
        //                 content: '注册成功！3秒后即将跳转登录页面',
        //                 //宽高
        //                 area: ['200px', '200px'],
        //             });
        //             setTimeout(() => {
        //                 window.location.href = 'Login.html';
        //             }, 3000);
        //         }

        //         //如果message等于2 
        //         if (res.data.message == 2) {
        //             layer.open({
        //                 title: '提示',
        //                 content: '用户名已被占用！请重新输入',
        //                 //宽高
        //                 area: ['200px', '200px'],
        //             });
        //         }


    },
    //验证码失败了触发回调函数
    fail: function () { }


};
SliderBar("slideBar", options);



