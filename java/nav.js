$(function () {
    $('#nav').html(`
    <div class="row ms-2 my-3">
        <div class="col-5 ms-2 p-0">
        <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <i class="fa fa-bars" ></i>
      </button>
      <img src="favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
        </div>
        <div class="col-5 ">
        <span class=" h4 "><b  class="logo"></b></span>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-home  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="index.html" ><b  class="nav1"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-sitemap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="master.html" ><b  class="nav2"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-graduation-cap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="namespase.html" ><b  class="nav3"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-window-maximize  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="webtty_create.html" ><b  class="nav4"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cubes  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="pod_all.html" ><b  class="nav5"></b></a>
        </div>
    </div>
    
    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-cloud  me-5"></i>
        </div>
        <div class="col-8 ">
            <a class="text-dark fs-4 py-0 mb-1 btn btn-light btn-lg btn-block " href="vip.html"><b class="nav6">vip</b></a>
        </div>
    </div>`)
    $('.rigth').html(`
    <div class="container-lg" style="height:100%;">
    <p class="h1 text-center mt-3" id="rigth">測試版面</p>
    <div class="row" style="height: 50%;">
        <div class="col-5">
            <p class="fs-3">使用者 :</p>
            <p class="fs-3">port :</p>
            <p class="fs-3">容器 :</p>
            <p class="fs-3">課程 :</p>
            <p class="fs-3">狀況 :</p>
        </div>
        <div class="col-7" id="kube_status">
            <p class="fs-2">測試項目</p>
            <p class="fs-2">測試項目</p>
            <p class="fs-2">測試項目</p>
            <p class="fs-2">測試項目</p>
        </div>
        <div class="col-4" >
            <button class="btn btn-secondary fs-3" onclick="link()">連線</button>
        </div>
        <div class="col-4" >
            <button class="btn btn-secondary fs-3" onclick="nolink()">關閉</button>
        </div>
        <div class="col-4" >
        <button class="btn btn-secondary fs-3" onclick="linkon()">廣播</button>
    </div>
    </div>
</div>

    `)
});
