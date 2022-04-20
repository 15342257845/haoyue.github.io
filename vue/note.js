
//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '18',//账户id
        name: '周诚',//账户的昵称
        contentarray: '',//请求到的数据
        referenceid: '',
        opentitle: '',//标题
        remark: '',//内容
        datetime: '',//时间
        idarray: [],//id的数组
        cebianlanistrue: true
    },

    methods: {
        //这是侧边栏的滑动效果
        cebianlan: function () {
            vue.cebianlanistrue = !(vue.cebianlanistrue);
            console.log(vue.cebianlanistrue);
            vue.cebianlanistrue == false ? vue.$refs.cebianlan.style.left = '0px' : vue.$refs.cebianlan.style.left = '-120px'
        },
        //添加！
        insert: function () {
            layer.open({
                title: '新增备忘录',
                type: 1,
                content: '<div style="width:500px;height:450px;margin: 0px auto;"><div style="margin: 40px 0 0 50px; font-size: 18px;"><div>标题：<input type="text" id="opentitle" placeholder="没想好可以空着哦~" maxlength="40" style="width: 420px;height: 40px;"></div></div><div style="margin: 40px 0 0 50px;font-size: 18px;">内容：<textarea style="width: 420px;height: 200px;" id="remark" maxlength="500" placeholder=" 今天有些重要的事情需要记下来..."></textarea></div><div style="margin: 30px auto; text-align: center;font-size: 18px;"><button id="insertdata" class="layui-btn layui-btn-normal" style="font-size: 25px; width: 450px; background-color:#1E9FFF" >添&nbsp;&nbsp;加</button></div></div>',
                //宽高
                area: ['600px', '550px'],
            });

            //这里使用ref获取不到content的内容，所以改用原生js
            var insertdata = document.getElementById('insertdata');
            insertdata.onclick = function () {


                var opentitle = document.getElementById('opentitle').value;
                var remark = document.getElementById('remark').value;

                //电话号码和联系人的正则
                if (remark == "") {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>内容栏不能为空！</div>",
                        //宽高
                        area: ['200px', '200px'],
                    });

                }
                else {
                    // vue.opentitle = opentitle;
                    // vue.remark = remark;

                    // //下面是获取时间
                    // var day = new Date();
                    // var Year = day.getFullYear();
                    // var Month = day.getMonth() + 1;
                    // var Day = day.getDate();
                    // var hours = day.getHours();	           //获取当前小时数(0-23)
                    // var minutes = day.getMinutes();	             //获取当前分钟数(0-59)
                    // var secounds = day.getSeconds();            //获取当前秒数(0-59)
                    // var CurrentDate = "";//这是拼接完整年月日定义的

                    // //年月日的加零拼接
                    // CurrentDate += Year + "/";
                    // Month >= 10 ? CurrentDate += Month + "/" : CurrentDate += "0" + Month + "/";
                    // Day >= 10 ? CurrentDate += Day : CurrentDate += "0" + Day;


                    // hours >= 10 ? hours : hours = '0' + hours;
                    // minutes >= 10 ? minutes : minutes = '0' + minutes;
                    // secounds >= 10 ? secounds : secounds = '0' + secounds;
                    // var time = hours + ':' + minutes + ':' + secounds;//这是拼接完整年月日定义的
                    // //all是把年月日和时间拼接的最终结果
                    // var all = CurrentDate + " " + time;


                    // //请求后端添加接口
                    // axios.post("http://localhost/phpcurd/note.php?action=insert",
                    //     "opentitle=" + vue.opentitle + "&remark=" + vue.remark + "&date=" + all + "&referenceid=" + vue.referenceid + "")
                    //     .then(res => {
                    //         console.log(res.data);

                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center;margin:40px 0 0 0 '>添加成功！</div>",
                        //宽高
                        area: ['250px', '200px'],
                        time: 1200,
                    });

                    setTimeout(() => {
                        window.location.href = 'note.html'
                    }, 1300);

                    //     })
                }


            }
        },

        //备忘录全选
        checkall: function () {
            //$refs获取不到for循环的ref，只能使用原生js
            if (vue.$refs.allcheckchild.checked == true) {
                for (i = 0; i < vue.contentarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = true;
                }
            }
            //全不选
            else {
                for (i = 0; i < vue.contentarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = false;
                }
            }
        },
        //多选删除
        deletecheck: function () {
            vue.idarray = [];
            //遍历所有input框，如果选中了，则把这个id放到数组中，
            for (i = 0; i < vue.contentarray.length; i++) {
                var str = 'check' + i;

                if (document.getElementById(str).checked == true) {
                    vue.idarray.push(document.getElementById(str).parentNode.children[2].innerText);
                    console.log(document.getElementById(str).parentNode.children[2].innerText);

                }
            }
            //如果数组是空的，那么提示错误
            if (vue.idarray == '') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='font-size:25px;text-align:center;margin:30px 0 0 0'>请勾选要删除的便签!</div>",
                    //宽高
                    area: ['350px', '200px'],
                });
            }
            else {
                //请求后端的删除接口
                layer.confirm('<div style="font-size:25px;text-align:center;margin:3px 0 0 0">确定要删除所选项吗？</div>', { icon: 3, title: '提示', area: ['360px', '180px'] }, function (index) {
                    //do something
                    // axios.post("http://localhost/phpcurd/note.php?action=delete",
                    //     "id=" + vue.idarray + "")
                    //     .then(res => {
                    //         if (res.data.message == 1) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: "<div style='font-size:25px;text-align:center';>删除成功！</div>",
                        //宽高
                        area: ['200px', '150px'],
                        time: 1100,
                    });

                    setTimeout(res => {
                        window.location.href = "note.html"
                    }, 1200)

                    //         }
                    //         else {
                    //             layer.open({
                    //                 title: '提示',
                    //                 type: 1,
                    //                 content: "<div style='font-size:25px;text-align:center';>删除失败！</div>",
                    //                 //宽高
                    //                 area: ['200px', '150px'],
                    //             });
                    //         }
                    //     })
                    layer.close(index);
                });
            }

        },

    }
})



// //当焦点失去的时候，修改文本框
// function notecontent(e) {

//     var noteid = e.parentNode.children[0].children[2].innerText;
//     var notecontent = e.value;

//     axios.post('http://localhost/phpcurd/note.php?action=contentupdate', "remark=" + notecontent + "&id=" + noteid + "")

// }
// //当焦点失去的时候，修改标题
// function notetitle(e) {

//     var noteid = e.parentNode.children[2].innerText;
//     var notetitle = e.value;
//     axios.post('http://localhost/phpcurd/note.php?action=titleupdate', "notetitle=" + notetitle + "&id=" + noteid + "")

// }




//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
window.onload = function () {
    // if (window.sessionStorage.length == 0) {
    //     window.location.href = 'Login.html';
    // }
    // else {
    //     //把登录页传过来的值赋值给相对应的字段

    //     vue.id = window.sessionStorage.id;
    //     vue.name = window.sessionStorage.name;
    //     vue.referenceid = window.sessionStorage.id;

    //     console.log(window.sessionStorage);

    // //便签信息的请求
    // axios.post('http://localhost/phpcurd/note.php?action=select', "id=" + vue.id + "")
    //     .then(res => {
    //模拟请求到的数据
    vue.contentarray = [
        {
            notecontent: "123413123",
            notedate: "2022/04/03 14:03:25",
            noteid: "22",
            notereferenceid: "18",
            notetitle: "电话",
        },
        {
            notecontent: "记得吃法啊asd sad asd as d\nas \ndas\n d阿松大阿三打赏",
            notedate: "2022/03/03 14:03:25",
            noteid: "23",
            notereferenceid: "18",
            notetitle: "备注一下",
        },
        {
            notecontent: "有趣的灵魂，是我",
            notedate: "2022/02/03 14:03:25",
            noteid: "24",
            notereferenceid: "18",
            notetitle: "非常好的一句话",
        },
        {
            notecontent: "加葱，加香菜，加醋，炒10分钟",
            notedate: "2021/03/03 14:03:25",
            noteid: "25",
            notereferenceid: "18",
            notetitle: "西红柿炒鸡蛋",
        },
        {
            notecontent: "我要月入千万！！",
            notedate: "2020/03/03 14:03:25",
            noteid: "26",
            notereferenceid: "18",
            notetitle: "给自己下的目标",
        },
        {
            notecontent: "有趣的灵魂，是我",
            notedate: "2022/03/03 14:03:25",
            noteid: "27",
            notereferenceid: "18",
            notetitle: "非常好的一句话",
        },

    ];
    var users = vue.contentarray;
    //对数据进行冒泡排序，形成一个从上往下时间从大到小的一个新数组，然后进行渲染
    function bSort(users) {

        for (var i = 0; i < users.length - 1; i++) {
            for (var j = 0; j < users.length - 1 - i; j++) {

                // users[j].picdate.substring(0, 9)
                // 相邻元素两两对比，元素交换，大的元素交换到后面
                if (users[j].notedate > users[j + 1].notedate) {
                    var temp = users[j];
                    users[j] = users[j + 1];
                    users[j + 1] = temp;
                }
            }
        }
        return users.reverse();//反转数组
    }
    vue.contentarray = bSort(users);
    // })
    //     }
};


