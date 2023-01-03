$(function () {
    let username = localStorage.getItem("user");
    let iden = localStorage.getItem("iden");
/*
    let login = "";
    let smloginav = "";
    let user_login = ""
    let user_smloginav = "";*/
    let user = localStorage.getItem("user");

    //專題logo
    $('#center-logo').html(`
    <button class="btn btn-light my-3 d-xl-none" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
    <img src="http://dic-con.vbfaka.com/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="60" height="40">
    <span class="h4 ms-3"><b>以容器技術製作教學環境平台</b></span>`)

    $('#nav-sm').html(`<button class="btn btn-light my-3 " type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-"></i></button>
    <!--a href="http://dic-con.vbfaka.com/sys/user/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-5"></i></br>首頁</button></a-->
    <a href="http://dic-con.vbfaka.com/sys/login/login.html"><button class="btn btn-light my-3" type="button"><i
            class="	fa fa-drivers-license-o fs-5"></i></br>登入</button></a>
     <!--div><a><button class="btn btn-light my-3" type="button" onclick="loginout()"><i
            class="	fa fa-power-off fs-5"></i></br>登出</button></a></div-->`);
           
    $('#nav').html(`<div class="row ms-2 my-3">
            <div class="col-5 ms-2 p-0">
            <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa fa-bars" ></i>
          </button>
          <img src="http://dic-con.vbfaka.com/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
            </div>
            <div class="col-5 ">
            <span class="h4"><b  class="logo"></b></span>
            </div>

        </div>
        <div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa fa-drivers-license-o fs-4"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/login/login.html" ><b>登入</b></a>
            </div>
        </div>`);  

    if (user == null) {
        if (location.href != "http://dic-con.vbfaka.com/sys/login/login.html") {
            document.location.href = "http://dic-con.vbfaka.com/sys/login/login.html";
        }
    } else {
        const fddjs = new FormData();
        fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
        fddjs.append('username', username);
        fddjs.append('status', 'statususer');
        $.ajax({
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/login/prg/k8s_status.php',
            data: fddjs,
            processData: false,
            contentType: false,
            success: function (result, status) {
                let obj=JSON.parse(result)
                console.log(obj);
                if(obj[0] && obj[1]["remark"] == iden){

                    if (location.href == "http://dic-con.vbfaka.com/sys/login/user_status.html") {
                        document.querySelector('#k8s_user').value=username;
                        document.querySelector('#k8s_name').value=obj[1]["name"];
                        let year_opt='<option value='+obj[1]["year"]+' selected>'+obj[1]["year"]+'</option>'
                        for (let i = 1; i < 5; i++) {
                            let yearsa=parseInt(obj[1]["year"])+i;
                            year_opt='<option value='+yearsa+'>'+yearsa+'</option>'+year_opt
                            let yearsr=parseInt(obj[1]["year"])-i;
                            year_opt=year_opt+'<option value='+yearsr+'>'+yearsr+'</option>'
                        }
                        document.querySelector('#k8s_years').innerHTML=year_opt;
                        document.querySelector('#k8s_status').value=obj[1]["remark"];
                        document.querySelector('#k8s_mail').value=obj[1]["address"];
                        document.querySelector('#k8s_reg').innerHTML='<b>'+obj[1]["logintime"]+'<b/>';
                        document.querySelector('#k8s_login').innerHTML='<b>'+obj[1]["noidtime"]+'<b/>';
                    }
                    user_status(JSON.stringify(obj[1]));
                    
                }else{
                    localStorage.clear();
                    sessionStorage.clear();
                    document.location.href = "http://dic-con.vbfaka.com/sys/login/login.html";
                }

            }
        });        
        if (location.href == "http://dic-con.vbfaka.com/sys/login/login.html") {
            document.location.href = "http://dic-con.vbfaka.com/sys/user/index.html";
        }
        /*

        if(user=="teacher"){
            login = `<div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa fa-clone  me-5"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/images/images.html" ><b  class="images"></b></a>
            </div></div>
           <div class="row ms-2 mt-3">
                <div class="col-2 ms-2 p-0">
                    <i class="fa fa-book  me-5"></i>
                </div>
                <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html" ><b  class="namepase"></b></a>
                </div>
            </div>`;

           smloginav=`
    <a href="http://dic-con.vbfaka.com/sys/user/images/images.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-clone  fs-5"></i></br>硬碟</button></a>
           <a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-book fs-5"></i></br>課程</button></a>`;

            user_login=login;
            user_smloginav=smloginav;
        }else if(user=="student"){
            login = "";
            smloginav=="";

        };*/
        
    }



/*
    navber()*/
});
function user_status(status){
    let user_status=JSON.parse(status)
    let nav_status,nav_status_sm;
    if(user_status["remark"]=="teacher"){
        user_status["remark"]="老師";
        nav_status=`
        <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-clone  me-5 fs-3"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/images/images.html" ><b>硬碟</b></a>
        </div>
       </div>
        <div class="row ms-2 mt-3">
             <div class="col-2 ms-2 p-0">
                 <i class="fa fa-book  me-5 fs-3"></i>
             </div>
             <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html" ><b>課程</b></a>
             </div>
         </div>`;
        nav_status_sm=`
        <a href="http://dic-con.vbfaka.com/sys/user/images/images.html"><button class="btn btn-light my-3" type="button"><i
        class="fa fa-clone  fs-5"></i></br>硬碟</button></a>
        <a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
        class="fa fa-book fs-5"></i></br>課程</button></a>`;
        if(location.href == "http://dic-con.vbfaka.com/sys/user/index.html"){
            $('#append_namespace').html(`<div class="col-xl-3 col-lg-5 mx-2 col-sm-8 mb-sm-2">
            <div class="card text-center rounded-3 shadow" style="width: 100%;">
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h2 class="card-title"><i class="fa fa-clone fs-1 mx-3"></i><b>硬碟</b></h2>
                            <p class="card-text my-3 fs-6">本平台提供給老師端建立硬碟的功能
                                <!--/br>能各自看到三台的cpu、記憶體及硬碟空間
                                </br>也能觀察kubernetes集群內的容器數量</p-->
                        </li>
                        <li class="list-group-item">
                            <ol class="breadcrumb fs-4 justify-content-center">
                                <li class="breadcrumb-item "><b><a href="http://dic-con.vbfaka.com/sys/user/images/images.html" class="text-dark">查看硬碟</a></b></li>
                                <li class="breadcrumb-item"><b><a href="http://dic-con.vbfaka.com/sys/user/images/images_create.html" class="text-dark">編輯硬碟環境</a></b></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-xl-3 mx-2 col-lg-5 col-sm-8 mb-sm-2">
        <div class="card text-center rounded-3 shadow" style="width: 100%;">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h2 class="card-title"><i class="fa fa-book  fs-1 mx-3"></i><b>課程</b></h2>
                        <p class="card-text my-3 fs-6">主要是使用kubernetes namespase來部署課程
                            <!--/br>是使用namespase將容量規劃在一個特定的空間
                            </br>由教師進行建立課程以在內建立容器給學生操作</p-->
                    </li>
                    <li class="list-group-item">
                        <b>
                            <ol class="breadcrumb fs-4 justify-content-center">
                                <li class="breadcrumb-item"><a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html" class="text-dark">查看課程</a></li>
                                <li class="breadcrumb-item"><a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase_create.html" class="text-dark">建立課程</a></li>
                            </ol>
                        </b>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-xl-3 mx-2 col-lg-5 col-sm-8 mb-sm-2">
        <div class="card text-center rounded-3 shadow" style="width: 100%;">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h2 class="card-title"><i class="fa fa-drivers-license-o fs-1 mx-3"></i><b>個人</b></h2>
                        <p class="card-text my-3 fs-6">查看個人資料
                            <!--/br>主要能將目前的畫面進度進行保留方便使用者
                            </br>接來下能在對上次的進度進行修改
                            </br>也有讓使用者來分享畫面給其他人觀看</p-->
                    </li>
                    <li class="list-group-item">
                        <b>
                            <ol class="breadcrumb fs-4  justify-content-center">
                                <li class="breadcrumb-item"><a href="http://dic-con.vbfaka.com/sys/login/user_status.html" class="text-dark">修改個人資料</a></li>
                            </ol>
                        </b>
                    </li>
                </ul>
            </div>
        </div>
    </div>`);
        }
    }else{
        user_status["remark"]="學生";
        nav_status=`<div class="row ms-2 mt-3">
             <div class="col-2 ms-2 p-0">
                 <i class="fa fa-book  me-5"></i>
             </div>
             <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html" ><b>課程</b></a>
             </div>
         </div>`;
        nav_status_sm=`<a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
        class="fa fa-book fs-5"></i></br>課程</button></a>`;
    }
    //小標引導列
    $('#nav-sm').html(`<button class="btn btn-light my-3 " type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-5"></i></button>
     <a href="http://dic-con.vbfaka.com/sys/user/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-5"></i></br>首頁</button></a>
            `+nav_status_sm+`
     <a href="http://dic-con.vbfaka.com/sys/login/user_status.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-drivers-license-o fs-5"></i></br>個人</button></a>
     <div><a><button class="btn btn-light my-3" type="button" onclick="loginout()"><i
            class="	fa fa-power-off fs-5"></i></br>登出</button></a></div>`);
   //摺疊引導列 
    $('#nav').html(`<div class="row ms-2 my-3">
            <div class="col-5 ms-2 p-0">
            <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa fa-bars fs-4" ></i>
          </button>
          <img src="http://dic-con.vbfaka.com/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
            </div>
            <div class="col-5 ">
            <span class="h4"><b  class="logo"></b></span>
            </div>

        </div>
        <div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa fa-home fs-3"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/index.html" ><b>首頁</b></a>
            </div>
        </div>
        `+nav_status+`
        <div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa fa-drivers-license-o  fs-3"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/login/user_status.html" ><b>個人</b></a>
            </div>
        </div>

        <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-power-off fs-3"></i>
        </div>
        <div class="col-8 "><button class="btn btn-light py-0 fs-4" type="button" onclick="loginout()"><b>登出</b></button>
        </div>
        </div>`);  
   // if()
}
/*
function navber() {
    $('.logo').text('Dashboard')
    $('.index').text('首頁')
    $('.namepase').text('課程')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="master.html">master</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1"  href="node1.html">node1</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="node2.html" >node2</a></li>';
    $('#node').html(nodes)

    $('.images').text('映像檔')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase.html">查看課程</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase_create.html">部屬課程</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase_delete.html">刪除課程</a></li>';
    $('#namespase').html(nodes)

    $('.container_user').text('容器')
    var web = '<ul class="list-group list-group-flush">';
    web = web + '<li class="list-group-item"><a class="btn btn-dark " href="webtty_create.html">連線測試</a></li>';
    web = web + '<li class="list-group-item"><a class="btn btn-dark " href="webtty_status.html">連線狀況</a></li>';
    $('#webconntion').html(web)


    $('.outlogin').text('登出')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="teacher_pod.html">教師容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="student_pod.html">學生容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1">特權容器</a></li>';
    $('#pod').html(nodes)
    //$('.left-sm').html(li)


    $('.nav7').text('登入及註冊')


    //namespace 課程
}*/
function loginout() {
    let username = localStorage.getItem("user");
    const fddjs = new FormData();
    fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddjs.append('status', 'loginout');
    fddjs.append('username', username);
    if (confirm('要登出嗎') == true) {

        $.ajax({
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/login/prg/k8s_login.php',
            data: fddjs,
            processData: false,
            contentType: false,
            success: function (result, status) {
                localStorage.clear();
                document.location.href = "http://dic-con.vbfaka.com/sys/login/login.html";
            }
        });
    } 
}