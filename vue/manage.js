//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '',
        name: '',
        username: '',
        sex: '',
        nameistrue: false,//右上角的弹框
        userarray: '',//查询到的数据
        inputname: '',//搜索框的数据
        updateid: '',//修改的id
        password: '',//密码
        updateistrue: 1,//判断修改密码框是否出发
        getid: '',//获取的用户id
        getusername: '',//获取的用户名
    },
    methods: {
        //修改密码
        updatepass: function (e) {
            vue.getid = '';
            vue.getusername = '';
            vue.updateistrue == 1 ? vue.$refs.updatepasswordbox.style.display = "block" : vue.$refs.updatepasswordbox.style.display = "none";
            vue.updateistrue = !(vue.updateistrue);
            vue.getid = e.target.parentNode.parentNode.parentNode.children[0].innerText;
            vue.getusername = e.target.parentNode.parentNode.parentNode.children[1].innerText;
        },
        //修改为普通身份
        updateuser: function (e) {
            vue.updateid = e.target.parentNode.parentNode.parentNode.children[0].innerText;
            if (vue.updateid == vue.id) {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:25px;color:red'>自己不能更改自己的身份！</div>",
                    //宽高
                    area: ['350px', '150px'],
                });
            }
            else {
                axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=updateuser',
                    "id=" + vue.updateid + "")
                    .then(res => {
                        if (res.data.message == 0) {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改失败！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });
                        }

                        else {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改成功！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });
                            setTimeout(() => {
                                window.location.href = 'manage.html'
                            }, 1000)
                        }
                    })
            }
        },
        //退出修改界面
        exit: function () {
            vue.$refs.updatepasswordbox.style.display = "none";
            vue.updateistrue = "1";
        },
        //修改为管理员身份
        updatemanage: function (e) {
            vue.updateid = ''
            vue.updateid = e.target.parentNode.parentNode.parentNode.children[0].innerText;
            if (vue.updateid == vue.id) {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:25px;color:red'>自己不能更改自己的身份！</div>",
                    //宽高
                    area: ['350px', '150px'],
                });
            }
            else {
                axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=updatemanage',
                    "id=" + vue.updateid + "")
                    .then(res => {
                        if (res.data.message == 0) {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改失败！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });

                        }
                        else {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改成功！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });
                            setTimeout(() => {
                                window.location.href = 'manage.html'
                            }, 1000)
                        }
                    })
            }
        },

        //判断密码的正确性并且进行修改
        updatepasswordbutton: function (e) {

            if (/^(?![0-9]+$)[a-z0-9]{8,20}$/.test(vue.password)) {
                vue.$refs.passwordbuttonreg.innerHTML = "";
                axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=buttonupdate', "id=" + vue.getid + "&password=" + vue.password + "")
                    .then(res => {
                        if (res.data.message == 1) {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改成功！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });
                            setTimeout(() => {
                                window.location.href = 'manage.html'
                            }, 1100)
                        }
                        else {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>修改失败！</div>",
                                //宽高
                                area: ['300px', '200px'],
                            });
                            setTimeout(() => {
                                window.location.href = 'manage.html'
                            }, 1100)
                        }
                    })
            }
            else {
                vue.$refs.passwordbuttonreg.innerHTML = "<div style='color:red'>必须包含数字、英文字母且大于7小于21位</div>";
            }
        },

        //退出登录的效果
        exitlogin: function () {
            layer.confirm('<div style="font-size:25px;text-align:center;padding-top:0px">确定要退出登录吗？</div>', { icon: 3, title: '提示', area: ['340px', '170px'] }, function (index) {
                //do something
                sessionStorage.clear();
                window.location.href = "index.html";
                layer.close(index);
            });
        },

        //修改密码的框
        namedropdown: function () {
            this.nameistrue = !(this.nameistrue);
            this.nameistrue == true ? this.$refs.dropdown.style.display = "block" : this.$refs.dropdown.style.display = "none"
        },

        //删除用户触发触发器
        deleteuser: function (e) {
            vue.updateid = '';
            vue.updateid = e.target.parentNode.parentNode.parentNode.children[0].innerText;
            if (vue.updateid == vue.id) {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:25px;color:red'>自己不能删除自己！</div>",
                    //宽高
                    area: ['350px', '150px'],
                });
            }
            else {
                //请求后端的删除接口
                layer.confirm('<div style="font-size:25px;text-align:center;margin:3px 0 0 0">确定要删除所选项吗？</div>', { icon: 3, title: '提示', area: ['360px', '180px'] }, function (index) {
                    //do something
                    axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=deleteuser',
                        "id=" + vue.updateid + "")
                        .then(res => {
                            if (res.data.message == 0) {
                                layer.open({
                                    title: '提示',
                                    type: 1,
                                    content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>删除失败！</div>",
                                    //宽高
                                    area: ['300px', '200px'],
                                });

                            }
                            else {
                                layer.open({
                                    title: '提示',
                                    type: 1,
                                    content: "<div style='text-align: center;margin:20px 0 20px 0;font-size:30px';>删除成功！</div>",
                                    //宽高
                                    area: ['300px', '200px'],
                                });
                                setTimeout(() => {
                                    window.location.href = 'manage.html'
                                }, 1000)
                            }
                        })
                }
                )
            }
        }
    }

})

//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
window.onload = function () {
    if (window.sessionStorage.length == 0) {
        window.location.href = 'index.html';
    }
    else {
        //把登录页传过来的值赋值给相对应的字段
        vue.name = window.sessionStorage.name;
        vue.id = window.sessionStorage.id;
        vue.username = window.sessionStorage.username;
        vue.sex = window.sessionStorage.sex;

        axios.get('http://localhost/phpcurd/LogRegUpdate.php?action=manageselect')
            .then(res => {
                vue.userarray = res.data.users;
                console.log(vue.userarray);


                //判断是什么用户
                for (let i = 0; i < vue.userarray.length; i++) {
                    vue.userarray[i].ismanage == "1" ? vue.userarray[i].ismanage = '管理员' : vue.userarray[i].ismanage = '普通用户';
                }

            })
    }
}






//监听用户名文本框的数据
document.getElementById('selectinput').addEventListener("keyup", (function (e) { //这是一个自运行函数
    var t = null;
    return function () { //真正的事件函数在这里
        clearTimeout(t); //每次触发，都把前面的定时器关闭，尽管第一次定时器并不存在
        t = setTimeout(function () { //开启新的定时器

            axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=inputselect', "name=" + vue.inputname + "")
                .then(res => {
                    console.log(res.data.inputselect);
                    vue.userarray = res.data.inputselect;
                    //判断是什么用户
                    for (let i = 0; i < vue.userarray.length; i++) {
                        vue.userarray[i].ismanage == "1" ? vue.userarray[i].ismanage = '管理员' : vue.userarray[i].ismanage = '普通用户';
                    }
                })
        }, 300);
    }

})());


