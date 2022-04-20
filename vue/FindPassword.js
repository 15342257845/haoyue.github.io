//去除vue警告
Vue.config.productionTip = false;

//sad
var vue = new Vue({
    el: '#findCenter',
    data: {
        username: '',
        name: '',
    },
    methods: {
        findpassclick: function () {
            layer.open({
                title: '提示',
                type: 1,
                content: "</br><div style='font-size:25px;text-align:center';>找回成功！</br>您的密码自动重置为haoyue123456</div>",
                //宽高
                area: ['300px', '200px'],
            });

            //原项目代码--找回账号
            // var thisdata = this;
            // //根据用户名和昵称来查询
            // axios.post('http://localhost/phpcurd/LogRegUpdate.php?action=findpassword',
            //     "username=" + thisdata.username + "&name=" + thisdata.name + "")
            //     .then(res => {
            //         //如果返回值为1则，自动修改为haoyue123456
            //         if (res.data.message == '1') {
            //             layer.open({
            //                 title: '提示',
            //                 type: 1,
            //                 content: "<div style='font-size:25px';>找回成功！您的密码自动重置为haoyue123456</div>",
            //                 //宽高
            //                 area: ['300px', '300px'],
            //             });
            //         }
            //         //否则提示错误
            //         else {
            //             
            //             vue.$refs.findmessage.innerHTML = '用户名与昵称不匹配，如有疑问请联系QQ：1264375748';
            //         }

            //     })
        }
    }

})


