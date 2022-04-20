
//去除vue警告
Vue.config.productionTip = false;

var vue = new Vue({
    el: '.background',
    data: {
        id: '',//账户id
        name: '',//账户的昵称
        filearray: '',//查询到的所有数据
        filearraycopy: '',//复制一份查询到的默认数据
        sortistrue: '1',//用来判断排序是否被点击
        referenceid: '',
        cebianlanistrue: true,
        insertistrue: 1,//图片的隐藏切换
        insertdatetime: '',//插入的时间
        filereferenceid: '',//关联id
        filename: [],//名字的数组
        filesize: [],//大小的数组
        filetype: [],//类型的数组
        filenamelength: "",//数组的长度
        imgsrc: '../皓月云服务主/img/',//图片地址
        idarray: [],
        inputname: '',//输入框的模糊搜索
        inputarray: '',//模糊搜索得到的结果
        filesort: [],//文件排序
        filesrc: 'D:/xmapp/htdocs/phpcurd/fileupload/'
    },

    methods: {
        //这是侧边栏的滑动效果
        cebianlan: function () {
            vue.cebianlanistrue = !(vue.cebianlanistrue);
            console.log(vue.cebianlanistrue);
            vue.cebianlanistrue == false ? vue.$refs.cebianlan.style.left = '0px' : vue.$refs.cebianlan.style.left = '-120px'
        },
        //文件全选
        checkall: function () {
            //$refs获取不到for循环的ref，只能使用原生js
            if (vue.$refs.allcheckchild.checked == true) {
                for (i = 0; i < vue.filearray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = true;
                }
            }
            //全不选
            else {
                for (i = 0; i < vue.filearray.length; i++) {
                    var str = 'check' + i;
                    document.getElementById(str).checked = false;
                }
            }
        },


        //多选删除
        deletecheck: function () {
            vue.idarray = [];
            //遍历所有input框，如果选中了，则把这个id放到数组中，
            for (i = 0; i < vue.filearray.length; i++) {
                var str = 'check' + i;
                if (document.getElementById(str).checked == true) {
                    vue.idarray.push(document.getElementById(str).parentNode.parentNode.children[6].innerText);
                }
            }


            //如果数组是空的，那么提示错误
            if (vue.idarray == '') {
                layer.open({
                    title: '提示',
                    type: 1,
                    content: "<div style='font-size:25px;text-align:center;margin:30px 0 0 0'>请勾选要删除的文件!</div>",
                    //宽高
                    area: ['350px', '200px'],
                });
            }
            else {
                //请求后端的删除接口
                layer.confirm('<div style="font-size:25px;text-align:center;margin: 2px 0 0 0;">确定要删除所选项吗？</div>', { icon: 3, title: '提示', area: ['340px', '180px'] }, function (index) {
                    //do something
                    axios.post("http://localhost/phpcurd/file.php?action=delete",
                        "id=" + vue.idarray + "")
                        .then(res => {
                            if (res.data.message == 1) {
                                layer.open({
                                    title: '提示',
                                    type: 1,
                                    content: "<div style='font-size:25px;text-align:center';>删除成功！</div>",
                                    //宽高
                                    area: ['200px', '150px'],
                                    time: 1100,
                                });

                                setTimeout(res => {
                                    window.location.href = "file.html"
                                }, 1200)

                            }
                            else {
                                layer.open({
                                    title: '提示',
                                    type: 1,
                                    content: "<div style='font-size:25px;text-align:center';>删除失败！</div>",
                                    //宽高
                                    area: ['200px', '150px'],
                                });
                            }
                        })
                    layer.close(index);
                });
            }

        },


        //文件排序
        sortfile: function () {
            vue.filesort = [];

            if (vue.sortistrue == 1) {
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '文本.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '图片.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '视频.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '音乐.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '压缩文件.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                for (let i = 0; i < vue.filearray.length; i++) {
                    if (vue.filearray[i].filetype == '文件未知.png') {
                        vue.filesort.push(vue.filearray[i]);
                    }
                }
                vue.filearray = vue.filesort;
                vue.sortistrue = 0;
            }
            else {
                vue.filearray = vue.filearraycopy;
                vue.sortistrue = 1;
            }

        },


        //点击显示切换
        insertbutton: function () {
            vue.insertistrue == 1 ? vue.$refs.insert.style.display = "block" : vue.$refs.insert.style.display = "none";
            vue.insertistrue = !(vue.insertistrue);

        },
        //新增文件
        insert: function (e) {


            //开始创建
            let file = new FormData();
            let arr = Array.from(e.target.files);

            console.log(arr);
            //获取当前时间
            var day = new Date();
            var Year = day.getFullYear();
            var Month = day.getMonth() + 1;
            var Day = day.getDate();
            var hours = day.getHours();	           //获取当前小时数(0-23)
            var minutes = day.getMinutes();	             //获取当前分钟数(0-59)
            var secounds = day.getSeconds();            //获取当前秒数(0-59)
            var CurrentDate = "";//这是拼接完整年月日定义的

            //年月日的加零拼接
            CurrentDate += Year + "/";
            Month >= 10 ? CurrentDate += Month + "/" : CurrentDate += "0" + Month + "/";
            Day >= 10 ? CurrentDate += Day : CurrentDate += "0" + Day;

            hours >= 10 ? hours : hours = '0' + hours;
            minutes >= 10 ? minutes : minutes = '0' + minutes;
            secounds >= 10 ? secounds : secounds = '0' + secounds;

            var time = hours + ':' + minutes + ':' + secounds;//这是拼接完整年月日定义的
            //all是把年月日和时间拼接的最终结果
            var all = CurrentDate + " " + time;


            //开始把文件信息存入formdata
            for (let i = 0; i <= this.$refs.file.files.length - 1; i++) {

                vue.filename.push(arr[i].name);
                var type = arr[i].name;
                var filetype = "";
                if (type.indexOf('mp4') != '-1' || type.indexOf('MP4') != '-1') {
                    filetype = '视频';
                }
                else if (type.indexOf('mp3') != '-1' || type.indexOf('MP3') != '-1') {
                    filetype = '音频';
                }
                else if (type.indexOf('ZIP') != '-1' || type.indexOf('zip') != '-1' || type.indexOf('RAR') != '-1' || type.indexOf('rar') != '-1') {
                    filetype = '压缩';
                }
                else if (type.indexOf('pdf') != '-1' || type.indexOf('PDF') != '-1' || type.indexOf('Excel') != '-1' || type.indexOf('EXCEL') != '-1' || type.indexOf('excel') != '-1' || type.indexOf('word') != '-1' || type.indexOf('WORD') != '-1' || type.indexOf('Word') != '-1' || type.indexOf('pptx') != '-1' || type.indexOf('PPTX') != '-1' || type.indexOf('txt') != '-1' || type.indexOf('TXT') != '-1' || type.indexOf('xlsx') != '-1' || type.indexOf('docx') != '-1') {
                    filetype = '文档';
                }
                else if (type.indexOf('jpeg') != '-1' || type.indexOf('JPEG') != '-1' || type.indexOf('jpg') != '-1' || type.indexOf('JPG') != '-1' || type.indexOf('PNG') != '-1' || type.indexOf('png') != '-1') {
                    filetype = '图片';
                }
                else {
                    filetype = '未知';
                }
                if (arr[i].size > 8000000) {
                    layer.open({
                        title: '提示',
                        type: 1,
                        content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:20px";></br>目前只支持<span style="color: red;">8M左右</span>大小的文件的上传！</div>',
                        //宽高
                        area: ['320px', '200px'],
                        time: 2000
                    });
                    i = -999999;
                    setTimeout(() => {
                        window.location.href = "file.html"
                    }, 2000);

                }
                else {
                    vue.filesize.push(arr[i].size);
                    vue.filetype.push(filetype);
                    file.append('file' + i, this.$refs.file.files[i]);
                }
            };

            vue.insertdatetime = all;//完整时间
            vue.filenamelength = vue.filename.length;//数组的长度
            console.log(vue.filenamelength);

            console.log(vue.filesize);
            axios.post('http://localhost/phpcurd/file.php?action=file'
                , file
                , {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                }).then((res) => {
                    //当文件上传成功之后，再发送保存文件信息的请求
                    axios.post('http://localhost/phpcurd/file.php?action=filemessage', "&filereferenceid=" + vue.filereferenceid + "&filename=" + vue.filename + "&filedatetime=" + vue.insertdatetime + "&filenamelength=" + vue.filenamelength + "&filetype=" + vue.filetype + "&filesize=" + vue.filesize + ""
                    ).then((res) => {
                        if (res.data.message == '1') {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:30px";>上传成功！</div>',
                                //宽高
                                area: ['300px', '200px'],
                                time: 1800
                            });
                            setTimeout(() => {
                                window.location.href = 'file.html'
                            }, 1300);
                        }
                        else {
                            layer.open({
                                title: '提示',
                                type: 1,
                                content: '<div style="text-align: center;margin:20px 0 20px 0;font-size:30px";><span style="color:red">上传失败！</span></div>',
                                //宽高
                                area: ['300px', '200px'],
                                time: 1800
                            });
                            setTimeout(() => {
                                window.location.href = 'file.html'
                            }, 1300);
                        }

                    });
                });

        }
    }
})




//当页面加载时，判断sessionStorage里有没有值，没有则跳回登录页
window.onload = function () {
    if (window.sessionStorage.length == 0) {
        window.location.href = 'Login.html';
    }
    else {
        //把登录页传过来的值赋值给相对应的字段

        vue.id = window.sessionStorage.id;
        vue.name = window.sessionStorage.name;
        vue.filereferenceid = window.sessionStorage.id;
        console.log(window.sessionStorage);


        //文件信息的请求
        axios.post('http://localhost/phpcurd/file.php?action=select', "id=" + vue.id + "")
            .then(res => {
                vue.filearray = res.data.users;
                vue.filearraycopy = vue.filearray;
                console.log(vue.filearray);

                //图片类型的分类
                for (var i = 0; i < vue.filearray.length; i++) {
                    switch (vue.filearray[i].filetype) {
                        case '视频': vue.filearray[i].filetype = '视频.png'; break
                        case '音频': vue.filearray[i].filetype = '音乐.png'; break
                        case '图片': vue.filearray[i].filetype = '图片.png'; break
                        case '压缩': vue.filearray[i].filetype = '压缩文件.png'; break
                        case '文档': vue.filearray[i].filetype = '文本.png'; break
                        case '未知': vue.filearray[i].filetype = '文件未知.png'; break
                    }

                }
                //slice是左闭右开，包含开头不包含结尾

                for (var i = 0; i < vue.filearray.length; i++) {
                    var a = vue.filearray[i].filesize;
                    if (a.length >= 4 && a.length <= 6) {
                        vue.filearray[i].filesize = a.slice(0, a.length - 3) + '.' + a.slice(0, a.length - (a.length - 2)) + 'KB';
                    }
                    else if (a.length == 7) {
                        vue.filearray[i].filesize = a.slice(0, a.length - 6) + '.' + a.slice(0, a.length - 6) + 'MB';
                    }
                    else if (a.length == 1) {
                        vue.filearray[i].filesize = vue.filearray[i].filesize + 'KB'
                    }
                }
            })
    }
};

//监听文本框的数据
document.getElementById('selectinput').addEventListener("keyup", (function (e) { //这是一个自运行函数
    var t = null;
    return function () { //真正的事件函数在这里
        clearTimeout(t); //每次触发，都把前面的定时器关闭，尽管第一次定时器并不存在
        t = setTimeout(function () { //开启新的定时器

            axios.post('http://localhost/phpcurd/file.php?action=inputselect', "name=" + vue.inputname + "")
                .then(res => {
                    console.log(res.data.inputselect);

                    vue.filearray = res.data.inputselect;
                    //图片类型的分类
                    for (var i = 0; i < vue.filearray.length; i++) {
                        switch (vue.filearray[i].filetype) {
                            case '视频': vue.filearray[i].filetype = '视频.png'; break
                            case '音频': vue.filearray[i].filetype = '音乐.png'; break
                            case '图片': vue.filearray[i].filetype = '图片.png'; break
                            case '压缩': vue.filearray[i].filetype = '压缩文件.png'; break
                            case '文档': vue.filearray[i].filetype = '文本.png'; break
                            case '未知': vue.filearray[i].filetype = '文件未知.png'; break
                        }
                    }
                    for (var i = 0; i < vue.filearray.length; i++) {
                        var a = vue.filearray[i].filesize;
                        if (a.length >= 4 && a.length <= 6) {
                            vue.filearray[i].filesize = a.slice(0, a.length - 3) + '.' + a.slice(0, a.length - (a.length - 2)) + 'KB';
                        }
                        else if (a.length == 7) {
                            vue.filearray[i].filesize = a.slice(0, a.length - 6) + '.' + a.slice(0, a.length - 6) + 'MB';
                        }
                        else if (a.length == 1) {
                            vue.filearray[i].filesize = vue.filearray[i].filesize + 'KB'
                        }
                    }
                })

        }, 400);
    }

})());




