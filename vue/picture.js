//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '18',
        name: '周诚',
        imgarray: '',//查询到的图片信息数组
        insertistrue: '1',//判断添加框是否显示了
        insertdatetime: '',//插入的时间
        picreferenceid: '',//关联id
        filename: [],//名字的数组
        filenamelength: "",//数组的长度
        imgsrc: 'pictureimg/',//图片地址
        imgarraylength: '',//图片数组的长度，其实没必要写这个
        idarray: [],
        srcindex: '',
        src: '',
        thisimg: '',
        imgdate: '',//图片的日期
        cebianlanistrue: true,
    },

    methods: {
        //这是侧边栏的滑动效果
        cebianlan: function () {
            vue.cebianlanistrue = !(vue.cebianlanistrue);

            vue.cebianlanistrue == false ? vue.$refs.cebianlan.style.left = '0px' : vue.$refs.cebianlan.style.left = '-120px'
        },
        //点击显示切换
        insertbutton: function () {
            vue.insertistrue == 1 ? vue.$refs.insert.style.display = "block" : vue.$refs.insert.style.display = "none";
            vue.insertistrue = !(vue.insertistrue);

        },
        //关闭按钮
        closeopen: function () {
            vue.$refs.imgopen.style.display = "none"
        },
        //点击左键头
        lefticon: function () {
            vue.srcindex--;
            vue.src = vue.thisimg.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[1].children[0].children[0].src;//获取点击的第index个图片地址
            vue.imgdate = vue.thisimg.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[0].children[1].innerText;
            vue.srcindex == 0 ? vue.$refs.lefticon.style.display = 'none' : vue.$refs.righticon.style.display = 'block'
        },
        // 点击右箭头
        righticon: function () {
            vue.srcindex++;
            vue.src = vue.thisimg.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[1].children[0].children[0].src;//获取点击的第index个图片地址
            vue.imgdate = vue.thisimg.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[0].children[1].innerText;
            vue.srcindex == vue.imgarray.length - 1 ? vue.$refs.righticon.style.display = 'none' : vue.$refs.lefticon.style.display = 'block'
        },
        //照片全选
        checkall: function () {
            //$refs获取不到for循环的ref，只能使用原生js
            if (vue.$refs.allcheckchild.checked == true) {
                for (i = 0; i < vue.imgarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = true;
                }
            }
            //全不选
            else {
                for (i = 0; i < vue.imgarray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = false;
                }
            }
        },


        //多选删除
        deletecheck: function () {

            vue.idarray = [];

            //遍历所有input框，如果选中了，则把这个id放到数组中，
            for (i = 0; i < vue.imgarray.length; i++) {
                var str = 'check' + i;


                if (document.getElementById(str).checked == true) {
                    vue.idarray.push(document.getElementById(str).parentNode.children[1].innerText);
                }

            }


            //如果数组是空的，那么提示错误
            if (vue.idarray == '') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='font-size:25px;text-align:center;margin:30px 0 0 0'>请勾选要删除的图片!</div>",
                    //宽高
                    area: ['350px', '200px'],
                });
            }
            else {
                //请求后端的删除接口

                layer.confirm('<div style="font-size:25px;text-align:center;margin:3px 0 0 0">确定要删除所选项吗？</div>', { icon: 3, title: '提示', area: ['360px', '180px'] }, function (index) {
                    //do something
                    // axios.post("http://localhost/phpcurd/picture.php?action=delete",
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
                        window.location.href = "picture.html"
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



        //新增照片
        insert: function (e) {
            var houzui = e.target.files[0].name;
            var index = houzui.lastIndexOf(".");
            // 获取后缀
            var ext = houzui.substr(index + 1);
            //输出后缀名
            // console.log(ext);

            // 如果后缀不是png，那么重置表单
            if (ext != 'jpg' && ext != 'jpge' && ext != 'png' && ext != 'PNG' && ext != 'JPG' && ext != 'JPGE') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:30px";><span style="color:red">上传失败！</span></br>图片格式只能为JPG,PNG,JPGE</div>',
                    //宽高
                    area: ['320px', '220px'],
                });

                var videoForm = document.getElementById("videoForm"); //获取表单对象
                videoForm.reset();
            }
            else {
                // //开始创建
                // let file = new FormData();
                // let arr = Array.from(e.target.files);

                // console.log(arr);
                // //获取当前时间
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








                // console.log(time);//获取时间
                // //  console.log((new Date(all)).getTime());//获取毫秒

                // // for (let j = 0; j < arr.length; j++) {
                // //     // a.append('insertdatetime', '2018/08/08 19:01:01');
                // //     console.log(arr[j]);
                // //     //这是向对象里添加键值对
                // //     arr[j].insertdatetime = all;
                // //     arr[j].picreferenceid = vue.picreferenceid;
                // // }


                // for (let i = 0; i <= this.$refs.file.files.length - 1; i++) {

                //     vue.filename.push(arr[i].name);

                //     file.append('file' + i, this.$refs.file.files[i]);


                // };
                // vue.insertdatetime = all;//完整时间


                // vue.filenamelength = vue.filename.length;//数组的长度


                // axios.post('http://localhost/phpcurd/picture.php?action=file'
                //     , file
                //     , {
                //         headers: {
                //             "content-type": "multipart/form-data"
                //         }
                //     }).then((res) => {
                //         //当图片上传成功之后，再发送保存照片信息的请求
                //         axios.post('http://localhost/phpcurd/picture.php?action=filemessage', "&picreferenceid=" + vue.picreferenceid + "&filename=" + vue.filename + "&picdate=" + vue.insertdatetime + "&filenamelength=" + vue.filenamelength + ""
                //         ).then((res) => {
                //             if (res.data.message == '1') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:30px";>上传照片成功！</div>',
                    //宽高
                    area: ['300px', '200px'],
                    time: 1200
                });
                setTimeout(() => {
                    window.location.href = 'picture.html'
                }, 1300);
                // }
                // else {
                //     layer.open({
                //         title: '提示',
                //         type: 1,
                //         content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:30px";><span style="color:red">上传失败！</span></div>',
                //         //宽高
                //         area: ['300px', '200px'],
                //         time: 1200
                //     });
                //     setTimeout(() => {
                //         window.location.href = 'picture.html'
                //     }, 1300);
                // }

                // });
                //         });
            }

        }

    }
})

//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
window.onload = function () {
    // if (window.sessionStorage.length == 0) {
    //     window.location.href = 'Login.html';
    // }
    // else {
    //     //把登录页传过来的值赋值给相对应的字段

    //     vue.id = window.sessionStorage.id;
    //     vue.name = window.sessionStorage.name;
    //     vue.picreferenceid = window.sessionStorage.id;
    //     console.log(window.sessionStorage);

    //     axios.post('http://localhost/phpcurd/picture.php?action=select', "id=" + vue.id + "")
    //         .then(res => {







    //对数据进行冒泡排序，形成一个从上往下时间从大到小的一个新数组，然后进行渲染
    //模拟请求到的数据
    vue.imgarray = [
        {
            picdate: "2022/02/29 13:16:53",
            picid: 104,
            picreferenceid: 18,
            picsrc: '1.jpg'
        },
        {
            picdate: "2022/01/29 13:16:53",
            picid: 105,
            picreferenceid: 18,
            picsrc: '2.jpg'
        },
        {
            picdate: "2022/03/29 13:16:53",
            picid: 106,
            picreferenceid: 18,
            picsrc: '3.jpg'
        },
        {
            picdate: "2021/03/29 13:16:53",
            picid: 107,
            picreferenceid: 18,
            picsrc: '4.jpg'
        },
        {
            picdate: "2020/03/29 13:16:53",
            picid: 108,
            picreferenceid: 18,
            picsrc: '5.jpg'
        },
        {
            picdate: "2019/03/29 13:16:53",
            picid: 109,
            picreferenceid: 18,
            picsrc: '6.jpg'
        },
        {
            picdate: "2018/03/29 13:16:53",
            picid: 110,
            picreferenceid: 18,
            picsrc: '7.jpg'
        },
        {
            picdate: "2017/03/29 13:16:53",
            picid: 111,
            picreferenceid: 18,
            picsrc: '8.jpg'
        },
        {
            picdate: "2016/03/29 13:16:53",
            picid: 112,
            picreferenceid: 18,
            picsrc: '9.jpg'
        },
        {
            picdate: "2015/03/29 13:16:53",
            picid: 113,
            picreferenceid: 18,
            picsrc: '10.jpg'
        },
        {
            picdate: "2014/03/29 13:16:53",
            picid: 114,
            picreferenceid: 18,
            picsrc: '11.jpg'
        },
        {
            picdate: "2013/03/29 13:16:53",
            picid: 115,
            picreferenceid: 18,
            picsrc: '12.jpg'
        },
        {
            picdate: "2012/03/29 13:16:53",
            picid: 116,
            picreferenceid: 18,
            picsrc: '13.jpg'
        },
    ];
    var users = vue.imgarray;
    function bSort(users) {

        for (var i = 0; i < users.length - 1; i++) {
            for (var j = 0; j < users.length - 1 - i; j++) {

                // users[j].picdate.substring(0, 9)
                // 相邻元素两两对比，元素交换，大的元素交换到后面
                if (users[j].picdate > users[j + 1].picdate) {
                    var temp = users[j];
                    users[j] = users[j + 1];
                    users[j + 1] = temp;
                }
            }
        }
        //遍历所有的图片日期，只截取其中前10位，放到新数组中
        for (var k = 0; k < users.length; k++) {
            users[k].picdate = users[k].picdate.substring(0, 10);
        }
        return users.reverse();//反转数组
    }
    vue.imgarray = bSort(users);
    console.log(vue.imgarray);
    vue.imgarraylength = vue.imgarray.length;

}



//点击图片，让图片变大
function scaleimg(e) {
    //获取点击的img的id
    vue.srcindex = '';
    vue.thisimg = e;
    var imgopen = document.getElementById('imgopen');
    imgopen.style.display = 'block';
    //获取图片索引
    vue.srcindex = e.parentNode.parentNode.children[0].children[3].innerText;
    //获取点击的第index个图片地址
    vue.src = e.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[1].children[0].children[0].src;
    vue.imgdate = e.parentNode.parentNode.parentNode.parentNode.children[vue.srcindex].children[0].children[0].children[1].innerText;
    vue.srcindex == 0 ? vue.$refs.lefticon.style.display = 'none' : vue.$refs.lefticon.style.display = 'block';
    vue.srcindex == vue.imgarray.length - 1 ? vue.$refs.righticon.style.display = 'none' : vue.$refs.righticon.style.display = 'block';


}





