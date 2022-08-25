$(function () {
    $('#nav').html(`
    <div class="row ms-2 my-3">
        <div class="col-5 ms-2 p-0">
        <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <i class="fa fa-bars" ></i>
      </button>
      <img src="http://120.114.142.17/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
        </div>
        <div class="col-5 ">
        <span class=" h4 "><b  class="logo"></b></span>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-home  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/index.html" ><b  class="nav1"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-sitemap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/cluster/master.html" ><b  class="nav2"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-graduation-cap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/namespase/namespase.html" ><b  class="nav3"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-window-maximize  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/webtty/webtty_create.html" ><b  class="nav4"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cubes  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/pod_status/pod_all.html" ><b  class="nav5"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cubes  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://120.114.142.17/sys/images" ><b  class="nav6"></b></a>
        </div>
    </div>
    
    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cloud  me-5"></i>
        </div>
        <div class="col-8 ">
            <a class="text-dark fs-4 py-0 mb-1 btn btn-light btn-lg btn-block " href="http://120.114.142.17/sys/vip.html"><b class="nav7">vip</b></a>
        </div>
    </div>`)

    $('#nav-sm').html(`<button class="btn btn-light my-3" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
<a href="http://120.114.142.17/sys/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-3"></i></button></a>
<a href="http://120.114.142.17/sys/cluster/master.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-sitemap  fs-4"></i></button></a>
<a href="http://120.114.142.17/sys/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-graduation-cap fs-4"></i></button></a>
<a href="http://120.114.142.17/sys/webtty/webtty_create.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-window-maximize  fs-4"></i></button></a>
<a href="http://120.114.142.17/sys/images"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-cubes  fs-4"></i></button></a>
<a href="http://120.114.142.17/sys/pod_status/pod_all.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-cubes  fs-4"></i></button></a>`)

    $('#center-logo').html(`
    <img src="http://120.114.142.17/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
    <span class=" h4 ms-3"><b class="logo"></b></span>`)

});
