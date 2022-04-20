//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '',//账户id
        name: '周诚',//账户的昵称
        //自己创建一个数组对象
        telarray: '',//从后端接收到的查询到的数据，是一个数组
        zimu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        notdata: 0,  //用于累计有多少没有数据的字母
        havedata: 0,//有多少有效数据
        idarray: [],//一个准备删除的id数组
        referenceid: '',//关联id
        telname: '',//联系人
        tel: '',//联系人的电话
        sex: '',//联系人性别
        remark: '',//备注
        telid: '',//联系人的id
        insertsex: '',//打开的插入页面的性别
        opentel: '',//打开的插入页面的电话号
        opentelname: '',//打开的插入页面的用户名
        allcheckistrue: [],//全选
        cebianlanistrue: true,//侧边栏是否启用
    },

    methods: {
        //这是侧边栏的滑动效果
        cebianlan: function () {
            vue.cebianlanistrue = !(vue.cebianlanistrue);
            console.log(vue.cebianlanistrue);
            vue.cebianlanistrue == false ? vue.$refs.cebianlan.style.left = '0px' : vue.$refs.cebianlan.style.left = '-120px'
        },
        // //通讯录全选
        checkall: function () {
            //$refs获取不到for循环的ref，只能使用原生js
            if (vue.$refs.allcheckchild.checked == true) {
                for (i = 0; i < vue.telarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = true;
                }
            }
            //全不选
            else {
                for (i = 0; i < vue.telarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = false;
                }
            }
        },


        //修改
        update: function () {

            if (vue.telarray.length == 0) {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>您还没有联系人</br>快去添加吧~！</div>",
                    //宽高
                    area: ['300px', '200px'],
                });
            }
            else {

                //否则就修改
                if (vue.$refs.telupdate.value == '' || !((/^[0-9]{1,15}$/.test(vue.$refs.telupdate.value))) || vue.$refs.telnameupdate.value == '' || !((/^[\u4E00-\u9FA5A-Za-z]{1}[\u4E00-\u9FA5A-Za-z0-9]{0,20}$/).test(vue.$refs.telnameupdate.value))) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>请正确填写</br><strong>联系人</strong>和<strong>电话号码</strong>！</div><div style='text-align:center;font-size:15px;color:gray;margin:80px 0 0 0 '>规则：姓名只能以字母或汉字开头</br>姓名不能有空格</br>电话不能为空</div>",
                        //宽高
                        area: ['300px', '300px'],
                    });

                }
                else {
                    //根据telid修改相应数据
                    // vue.$refs.man.checked == true ? vue.sex = '1' : vue.sex = '0'
                    // axios.post('http://localhost/phpcurd/tel.php?action=update', "telname=" + vue.telname + "&tel=" + vue.tel + "&sex=" + vue.sex + "&remark=" + vue.remark + "&telid=" + vue.telid + "")
                    //     .then(res => {
                    //         if (res.data.message == 1) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center';>修改成功！</div>",
                        //宽高
                        area: ['200px', '150px'],
                        time: 1500,
                    });

                    setTimeout(res => {
                        window.location.href = "tel.html"
                    }, 1500)

                    //         }
                    //         else {
                    //             layer.open({
                    //                 title: '提示',
                    //                 type: 1,
                    //                 content: "<div style='font-size:25px;text-align:center';>修改失败！</div>",
                    //                 //宽高
                    //                 area: ['200px', '150px'],
                    //             });
                    //         }
                    //     })

                }
            }
        },

        //点击渲染数据到修改页面
        getupdate: function () {
            // //根据telid来查询相关信息，填入到右边的框内
            // axios.post('http://localhost/phpcurd/tel.php?action=selectclickdata', "telid=" + vue.telid + "")
            //     .then(res => {
            //         console.log(res);

            //         vue.telname = res.data.message[0].telname;
            //         vue.tel = res.data.message[0].tel;
            //         vue.sex = res.data.message[0].sex;
            //         vue.sex == "1" ? vue.$refs.man.checked = true : vue.$refs.woman.checked = true;
            //         vue.remark = res.data.message[0].remark;
            //     })


        },


        //多选删除
        deletecheck: function () {

            vue.idarray = [];

            //遍历所有input框，如果选中了，则把这个id放到数组中，
            for (i = 0; i < vue.telarray.length; i++) {
                var str = 'check' + i;
                if (document.getElementById(str).checked == true) {
                    vue.idarray.push(document.getElementById(str).parentNode.children[2].innerText);
                }

            }
            //如果数组是空的，那么提示错误
            if (vue.idarray == '') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='font-size:25px;text-align:center;margin:30px 0 0 0'>请勾选要删除的联系人!</div>",
                    //宽高
                    area: ['350px', '200px'],
                });
            }
            else {
                //请求后端的删除接口
                layer.confirm('<div style="font-size:25px;text-align:center;margin:3px 0 0 0">确定要删除所选项吗？</div>', { icon: 3, title: '提示', area: ['360px', '180px'] }, function (index) {
                    //do something
                    //     axios.post("http://localhost/phpcurd/tel.php?action=delete",
                    //         "id=" + vue.idarray + "")
                    //         .then(res => {
                    //             if (res.data.message == 1) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center';>删除成功！</div>",
                        //宽高
                        area: ['200px', '150px'],
                        time: 1500,
                    });

                    setTimeout(res => {
                        window.location.href = "tel.html"
                    }, 1700)

                    //             }
                    //             else {
                    //                 layer.open({
                    //                     title: '提示',
                    //                     type: 1,
                    //                     content: "<div style='font-size:25px;text-align:center';>删除失败！</div>",
                    //                     //宽高
                    //                     area: ['200px', '150px'],
                    //                 });
                    //             }
                    //         })
                    //     layer.close(index);
                });
            }

        },


        //添加！
        insert: function () {
            layer.open({
                title: '新增联系人',
                type: 1,
                content: '<div style="width:500px;height:450px;margin: 0px auto;"><div style="margin: 40px 0 0 50px; font-size: 18px;"><div>姓名：<input type="text" id="opentelname" placeholder="请输入姓名" maxlength="15" style="width: 300px;height: 40px;"></div></div><div style="margin: 40px 0 0 50px;font-size: 18px;"><div>电话：<input type="text" maxlength="15" placeholder="请输入电话" style="width: 300px;height: 40px;"  id="opentel"></div></div><div style="margin: 40px 0 0 50px;font-size: 18px;">性别：男&nbsp;&nbsp;<input type="radio" name="insertsex" id="insertman" title="男" style="width: 20px;height: 20px;" checked>&nbsp;&nbsp;&nbsp; 女&nbsp;&nbsp;<input type="radio" name="insertsex" title="女" id="insertwoman" style="width: 20px;height: 20px;"></div><div style="margin: 40px 0 0 50px;font-size: 18px;">备注：<textarea style="width: 300px;height: 100px;" id="remark" placeholder=" 写上对TA的备注..."></textarea></div><div style="margin: 30px auto; text-align: center;font-size: 18px;"><button id="insertdata" class="layui-btn layui-btn-normal" style="font-size: 25px; width: 400px; background-color:#009688" >添&nbsp;&nbsp;加</button></div></div>',
                //宽高
                area: ['600px', '550px'],
            });


            //这里使用ref获取不到content的内容，所以改用原生js
            var insertdata = document.getElementById('insertdata');
            insertdata.onclick = function () {


                var opentel = document.getElementById('opentel').value;
                var opentelname = document.getElementById('opentelname').value;

                //电话号码和联系人的正则
                if (opentel == '' || !((/^[0-9]{1,15}$/.test(opentel))) || opentelname == '' || !((/^[\u4E00-\u9FA5A-Za-z]{1}[\u4E00-\u9FA5A-Za-z0-9]{1,20}$/).test(opentelname))) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>请正确填写</br><strong>联系人</strong>和<strong>电话号码</strong>！</div><div style='text-align:center;font-size:15px;color:gray;margin:80px 0 0 0 '>规则：姓名只能以字母或汉字开头</br>姓名不能有空格</br>电话不能为空</div>",
                        //宽高
                        area: ['300px', '300px'],
                    });

                }
                else {
                    vue.opentel = opentel;
                    vue.opentelname = opentelname;
                    var insertman = document.getElementById('insertman');
                    insertman.checked ? vue.insertsex = 1 : vue.insertsex = 0;

                    vue.remark = document.getElementById('remark').value;


                    // //请求后端添加接口
                    // axios.post("http://localhost/phpcurd/tel.php?action=insert",
                    //     "telname=" + vue.opentelname + "&tel=" + vue.opentel + "&sex=" + vue.insertsex + "&remark=" + vue.remark + "&referenceid=" + vue.referenceid + "")
                    //     .then(res => {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>添加成功！</div>",
                        //宽高
                        area: ['250px', '200px'],
                        time: 1200,
                    });

                    setTimeout(() => {
                        window.location.href = 'tel.html'
                    }, 1300);

                    //     })
                }


            }
        }
    }



})







//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
window.onload = function () {
    //     if (window.sessionStorage.length == 0) {
    //         window.location.href = 'Login.html';
    //     }
    //     else {
    //把登录页传过来的值赋值给相对应的字段

    // vue.id = window.sessionStorage.id;
    // vue.name = window.sessionStorage.name;
    // vue.referenceid = window.sessionStorage.id;
    // console.log(window.sessionStorage);
    //vue.idarray = [];
    //调用刷新通讯录的方法

    //刷新通讯录的方法

    // axios.post('http://localhost/phpcurd/tel.php?action=select', "id=" + vue.id + "")
    //     .then(res => {
    //         vue.telarray = res.data.users; //把返回的数据给到telarray字段，方便对数据进行二次处理

    //         if (vue.telarray.length == 0) {
    //             console.log('没有数据');

    //         }
    //         else {
    vue.telarray = [
        {
            referenceid: "18",
            remark: "这是我的中国朋友",
            sex: "0", tel: "15317777777",
            telid: "77",
            telname: "肖云"
        },
        {
            referenceid: "18",
            remark: "一个非常不错的人",
            sex: "0", tel: "15316666666",
            telid: "78",
            telname: "韩金龙"
        }, {
            referenceid: "18",
            remark: "有趣的灵魂",
            sex: "0", tel: "15399999999",
            telid: "79",
            telname: "李理智"
        }
        , {
            referenceid: "18",
            remark: "父亲",
            sex: "0", tel: "15355555555",
            telid: "80",
            telname: "周某某"
        }
        , {
            referenceid: "18",
            remark: "欠我几百万的人",
            sex: "0", tel: "15311111111",
            telid: "81",
            telname: "阿与"
        }, {
            referenceid: "18",
            remark: "这人很有趣",
            sex: "0", tel: "15777777777",
            telid: "82",
            telname: "刘世民"
        }, {
            referenceid: "18",
            remark: "院长",
            sex: "0", tel: "14777777777",
            telid: "83",
            telname: "李院长"
        },
        {
            referenceid: "18",
            remark: "同事",
            sex: "0", tel: "1455555577",
            telid: "84",
            telname: "情小梦"
        },
        {
            referenceid: "18",
            remark: "发小",
            sex: "0", tel: "14777771234",
            telid: "85",
            telname: "部意图"
        },
        {
            referenceid: "18",
            remark: "发小",
            sex: "0", tel: "14777779999",
            telid: "86",
            telname: "小系"
        }
    ];


    //把数据按照字母顺序一次排序---下面的全部代码
    for (var i = 0; i < vue.telarray.length; i++) {

        //获取每个名字的首字的首字母，用插件
        // console.log(Pinyin.GetJP(vue.telarray[i].telname.charAt(0)));
        var q = Pinyin.GetJP(vue.telarray[i].telname.charAt(0));
        //输出字母的大写.toUpperCase()方法
        var zimu = document.getElementById(q.toUpperCase());
        //创建一个div标签
        var div = document.createElement("div");
        //通过字母组数来添加这个div标签
        zimu.children[1].append(div);
        //给这个创建的div一些内容，以下内容
        div.innerHTML = '<a href="#"><li style=";width:100%;border-top:1px solid gray;border-bottom:1px solid gray;"><span><input type="checkbox"  class="allcheckistrue" id="check' + vue.havedata + '" style="width: 20px;height: 20px; margin-left: 20px;"><i id="iii" class="layui-icon layui-icon-username" style="font-size: 35px;"></i>' + vue.telarray[i].telname + '<span style="display:none">' + vue.telarray[i].telid + '</span></li></span></a>';
        vue.havedata++;

    }

    //页面登陆首先把第一个数据给到telid，防止报错
    vue.telid = vue.telarray[0].telid;
    //console.log(vue.telid);

    //根据点击的id查询相关数据
    // axios.post('http://localhost/phpcurd/tel.php?action=selectclickdata', "telid=" + vue.telid + "")
    //     .then(res => {
    //         console.log(res);
    //         vue.telname = res.data.message[0].telname;
    //         vue.tel = res.data.message[0].tel;
    //         vue.sex = res.data.message[0].sex;
    //         vue.sex == "1" ? vue.$refs.man.checked == true : vue.$refs.woman.checked == true;
    //         vue.remark = res.data.message[0].remark;
    //     })


    //下面两个循环是删除所有没有数据的字母ul
    for (i = 0; i < vue.zimu.length; i++) {
        //判断如果是空的，也就是说这个字母中没有数据，则把这个li附上一个id叫做notdata的属性，使用setAttribute
        if (vue.$refs.tel.children[i].children[1].innerHTML == '') {
            var zimuid = document.getElementById(vue.zimu[i]);
            zimuid.setAttribute("id", "notdata");
            vue.notdata += 1;

        }
    }
    console.log(vue.telarray);

    //然后再通过循环，找出id叫做notdata的元素，把他们移除
    for (i = 0; i < vue.notdata; i++) {
        var notdata = document.getElementById('notdata');
        vue.$refs.tel.removeChild(notdata);
    }


    //给渲染的所有数据添加一个点击事件
    var ulbox = document.getElementById("tel").getElementsByTagName("ul");
    for (i = 0; i < ulbox.length; i++) {
        var libox = ulbox[i].children[1].getElementsByTagName("li");
        for (j = 0; j < libox.length; j++) {
            libox[j].onclick = function () {
                vue.telid = this.children[0].children[2].innerText;
            };
        }
    }
}



