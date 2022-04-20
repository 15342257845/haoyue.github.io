//去除vue警告
Vue.config.productionTip = false;


var vue = new Vue({
    el: '#LoginCenter',
    data: {
        username: '',
        password: '',
    },

    methods: {

        //点击登录按钮，触发登录方法
        loginuser: function () {

            //弹出一个登陆成功的弹框
            layer.open({
                title: '提示',
                type: 1,
                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>登陆成功！</div>",
                //宽高
                area: ['300px', '200px'],
            });

            setTimeout(() => {
                window.location.href = 'Navigation.html';
            }, 1000);



            //原项目请求代码
            // axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=login',
            //     "username=" + vue.username + "&password=" + vue.password + "")
            //     .then(res => {
            //         if (res.data.message == '0') {
            //             var session = window.sessionStorage;
            //             session['id'] = res.data.isuserpassres.id;
            //             session['username'] = res.data.isuserpassres.username;
            //             session['password'] = res.data.isuserpassres.password;
            //             session['name'] = res.data.isuserpassres.name;
            //             session['sex'] = res.data.isuserpassres.sex;

            //             //弹出一个登陆成功的弹框
            //             layer.open({
            //                 title: '提示',
            //                 type: 1,
            //                 content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>登陆成功！</div>",
            //                 //宽高
            //                 area: ['300px', '200px'],
            //             });

            //             setTimeout(() => {
            //                 window.location.href = 'Navigation.html';
            //             }, 1000);
            //         }
            //         else {
            //            
            //            vue.$refs.loginmessage.innerHTML = '用户名或密码不正确!';
            //         }

            //     })
        }
    }

})

// 下划线的动画

vue.$refs.usertext.onfocus = function () {
    vue.$refs.textline.style.width = 0 + 'px';
    vue.$refs.usertext.style.border = "1px solid gray"
};
vue.$refs.usertext.onblur = function () {

    vue.$refs.textline.style.width = 200 + 'px';
    vue.$refs.usertext.style.border = "1px solid rgba(200,200,200,0.1)"
};
vue.$refs.passtext.onfocus = function () {
    vue.$refs.passline.style.width = 0 + 'px';
    vue.$refs.passtext.style.border = "1px solid gray"
};
vue.$refs.passtext.onblur = function () {
    vue.$refs.passline.style.width = 200 + 'px';
    vue.$refs.passtext.style.border = "1px solid rgba(200,200,200,0.1)"
};


