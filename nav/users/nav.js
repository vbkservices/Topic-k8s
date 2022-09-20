$(function () {
    let login = "";
    let smloginav = "";
    let status = localStorage.getItem("status");
    if (status != "true") {
        if(location.href!="http://120.114.142.17/sys/login/login.html"){
            document.location.href = "http://120.114.142.17/sys/login/login.html";
        }
    } else {
        if(location.href=="http://120.114.142.17/sys/login/login.html"){
            document.location.href = "http://120.114.142.17/sys/user/index.html";
        }
        login = `
    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cubes  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/namespase/namespase.html" ><b  class="namepase"></b></a>
        </div>
    </div>
    <div class="row ms-2 mt-3">
    <div class="col-2 ms-2 p-0">
        <i class="fa fa-cubes  me-5"></i>
    </div>
    <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user/images/images.html" ><b  class="images"></b></a>
    </div>
   </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cubes  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/user" ><b  class="container_user"></b></a>
        </div>
    </div>`;
        smloginav = `<a href="http://120.114.142.17/sys/user/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-cubes  fs-4"></i></button></a>
    <a href="http://120.114.142.17/sys/user/images/images.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-cubes  fs-4"></i></button></a>
        <a href="http://120.114.142.17/sys/user/images/images.html"><button class="btn btn-light my-3" type="button"><i
    class="fa fa-cubes  fs-4"></i></button></a>`;
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
`+ login + `
<div class="row ms-2 mt-3">
    <div class="col-2 ms-2 p-0">
        <i class="fa fa-cloud  me-5"></i>
    </div>
    <div class="col-8 ">
        <a class="text-dark fs-4 py-0 mb-1 btn btn-light btn-lg btn-block" onclick="loginout()"><b class="outlogin"></b></a>
    </div>
</div>`;
    $('#nav').html(loginav)

    $('#nav-sm').html(`<button class="btn btn-light my-3" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
<a href="http://120.114.142.17/sys/user/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-3"></i></button></a>
            `+ smloginav + `
<a><button class="btn btn-light my-3" type="button" onclick="loginout()"><i
            class="fa fa-cloud fs-4"></i></button></a>`)

    $('#center-logo').html(`
    <img src="http://120.114.142.17/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
    <span class=" h4 ms-3"><b class="logo"></b></span>`)

});
function loginout(){
    alert("登出");
    localStorage.removeItem("name");
    localStorage.removeItem("status");
    localStorage.removeItem("user");
    document.location.href="http://120.114.142.17/sys/login/login.html";
}
