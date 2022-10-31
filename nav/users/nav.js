$(function () {
    let login = "";
    let smloginav = "";
    let user_login = "";
    let user_smloginav = "";
    let status = localStorage.getItem("status");
    let user = localStorage.getItem("user");

    if (status != "true") {
           
        if (location.href != "http://120.114.142.17/sys/login/login.html") {
            document.location.href = "http://120.114.142.17/sys/login/login.html";
        }

    } else {

        if (location.href == "http://120.114.142.17/sys/login/login.html") {
            document.location.href = "http://120.114.142.17/sys/user/index.html";
        }
        if(user=="teacher"){
            login = `<div class="row ms-2 mt-3">
                <div class="col-2 ms-2 p-0">
                    <i class="fa fa-book  me-5"></i>
                </div>
                <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/namespase/namespase.html" ><b  class="namepase"></b></a>
                </div>
            </div>
            <div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa fa-clone  me-5"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/images/images.html" ><b  class="images"></b></a>
            </div>
           </div>`;
           smloginav=`<a href="http://120.114.142.17/sys/user/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-book fs-4"></i></button></a>
    <a href="http://120.114.142.17/sys/user/images/images.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-clone  fs-4"></i></button></a>`;
            user_login=login;
            user_smloginav=smloginav;
        }else if(user=="student"){
            login = "";
            smloginav=="";
            user_login=``+login+`
            <div class="row ms-2 mt-3">
            <div class="col-2 ms-2 p-0">
                <i class="fa  fa-cube  me-5"></i>
            </div>
            <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/container" ><b  class="container_user"></b></a>
            </div>
        </div>`;
        user_smloginav=``+smloginav+`<a href="http://120.114.142.17/sys/user/container"><button class="btn btn-light my-3" type="button"><i
        class="fa  fa-cube  fs-4"></i></button></a> `;
        };
        
    }
    let loginav = `<div class="row ms-2 my-3">
    <div class="col-5 ms-2 p-0">
    <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <i class="fa fa-bars" ></i>
  </button>
  <img src="http://120.114.142.17/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
    </div>
    <div class="col-5 ">
    <span class="h4"><b  class="logo"></b></span>
    </div>
</div>

<div class="row ms-2 mt-3">
    <div class="col-2 ms-2 p-0">
        <i class="fa fa-home  me-5"></i>
    </div>
    <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/index.html" ><b  class="index"></b></a>
    </div>
</div>
`+ user_login + `
<div class="row ms-2 mt-3">
    <div class="col-2 ms-2 p-0">
        <i class="fa fa-cloud  me-5"></i>
    </div>
    <div class="col-8 ">
        <a class="text-dark fs-4 py-0 mb-1 btn btn-light btn-lg btn-block" onclick="loginout()"><b class="outlogin"></b></a>
    </div>
</div>`;
    $('#nav').html(loginav)

    $('#nav-sm').html(`<button class="btn btn-light my-3 " type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
<a href="http://120.114.142.17/sys/user/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-3"></i></button></a>
            `+ user_smloginav + `
<a><button class="btn btn-light my-3" type="button" onclick="loginout()"><i
            class="fa fa-cloud fs-4"></i></button></a>`)

    $('#center-logo').html(`
    <button class="btn btn-light my-3 d-xl-none" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
    <img src="http://120.114.142.17/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
    <span class=" h4 ms-3"><b class="logo"></b></span>`)
    navber()
});
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
}
function loginout() {
    alert("登出");
    localStorage.removeItem("name");
    localStorage.removeItem("status");
    localStorage.removeItem("user");
    document.location.href = "http://120.114.142.17/sys/login/login.html";
}