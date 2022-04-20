//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '1',
        name: '周诚',
        username: '18888888888',
        sex: '',
        nameistrue: false,
        oldpassword: '',
        newpassword: '',
        newpasswordbool: 0,

    },
    methods: {

        //退出登录的效果
        exitlogin: function () {
            layer.confirm('<div style="font-size:25px;text-align:center;padding-top:0px">确定要退出登录吗？</div>', { icon: 3, title: '提示', area: ['340px', '170px'] }, function (index) {
                //do something
                //清除session
                //sessionStorage.clear();
                window.location.href = "index.html";
                layer.close(index);
            });
        },
        //修改密码框的显示与隐藏
        namedropdown: function () {
            this.nameistrue = !(this.nameistrue);
            this.nameistrue == true ? this.$refs.dropdown.style.display = "block" : this.$refs.dropdown.style.display = "none"
        },

        //密码验证
        passwordreg: function () {

            function yes() {
                vue.$refs.passwordreg.innerHTML = '';
                vue.newpasswordbool = 1;
            }
            yes();
            function no() {
                vue.$refs.passwordreg.innerHTML = '必须包含数字、英文字母且大于7小于21位';
                vue.newpasswordbool = 0;
            }
            (/^(?![0-9]+$)[a-z0-9]{8,20}$/.test(vue.newpassword)) ? yes() : no()

        },

        //更新密码按钮
        updatepassword: function () {
            layer.open({
                title: '提示',
                type: 1,
                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改成功！</div>",
                //宽高
                area: ['300px', '200px'],

                //原项目代码--修改密码
                // if (vue.newpasswordbool == 1) {
                //     console.log(vue.username);
                //     console.log(vue.oldpassword);
                //     console.log(vue.id);
                //     console.log(vue.newpassword);
                //     axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=update',
                //         "username=" + vue.username + "&oldpassword=" + vue.oldpassword + "&id=" + vue.id + "&newpassword=" + vue.newpassword + "")
                //         .then(res => {
                //             console.log(res.data);
                //             if (res.data.message == 0) {
                //                 vue.$refs.passworderr.innerHTML = '密码错误'

                //             }
                //             if (res.data.message == 1) {
                //                 layer.open({
                //                     title: '提示',
                //                     type: 1,
                //                     content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改成功！</div>",
                //                     //宽高
                //                     area: ['300px', '200px'],
                //                 });
                //                 setTimeout(() => {
                //                     window.location.href = 'Navigation.html'
                //                 }, 1000)
                //             }
                //         })
                // }
                // else {
                //     vue.$refs.passwordreg.innerHTML = '必须包含数字、英文字母且大于7小于21位';
                // }



            });
        }
    }
})


//原项目----防止跨登录进入导航页代码
//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
// window.onload = function () {
//     if (window.sessionStorage.length == 0) {
//         window.location.href = 'Login.html';
//     }
//     else {
//         //把登录页传过来的值赋值给相对应的字段
//         vue.name = window.sessionStorage.name;
//         vue.id = window.sessionStorage.id;
//         vue.username = window.sessionStorage.username;
//         vue.sex = window.sessionStorage.sex;

//     }
// }




