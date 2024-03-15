$(function () {
    let iden = localStorage.getItem("iden");
    let user = localStorage.getItem("user");
    let username = localStorage.getItem("user");
    $('#nav').html(`
    <div class="row ms-2 my-3">
        <div class="col-5 ms-2 p-0">
        <button class="btn btn-light me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <i class="fa fa-bars" ></i>
      </button>
      <img src="http://dic-con.vbfaka.com/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
        </div>
        <div class="col-5 ">
        <span class=" h4 "><b  class="logo"></b></span>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-home  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/index.html" ><b  class="nav1"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-sitemap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/cluster/master.html" ><b  class="nav2"></b></a>
        </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-graduation-cap  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/namespase/namespase.html" ><b  class="nav3"></b></a>
        </div>
    </div>

    <!--div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-window-maximize  me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/webtty/webtty_create.html" ><b  class="nav4"></b></a>
        </div>
    </div-->

    <div class="row ms-2 mt-3">
    <div class="col-2 ms-2 p-0">
        <i class="fa fa-male me-5"></i>
    </div>
    <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/user/user_status_all.html" ><b  class="nav6"></b></a>
    </div>
    </div>

    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
            <i class="fa fa-clone me-5"></i>
        </div>
        <div class="col-8 "><a class="text-left text-dark fs-4 py-0 btn btn-light btn-lg btn-block" href="http://dic-con.vbfaka.com/sys/images/images_dow.html" ><b  class="nav5"></b></a>
        </div>
    </div>
    
    <div class="row ms-2 mt-3">
        <div class="col-2 ms-2 p-0">
        <i class="	fa fa-power-off me-5"></i>
        </div>
        <div class="col-8 ">
            <a class="text-dark fs-4 py-0 mb-1 btn btn-light btn-lg btn-block "  onclick="loginout()"><b class="nav7">登出</b></a>
        </div>
    </div>`)

    $('#nav-sm').html(`<button class="btn btn-light my-3" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i
        class="fa fa-bars  fs-4"></i></button>
<a href="http://dic-con.vbfaka.com/sys/index.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-home fs-3"></i></button></a>
<a href="http://dic-con.vbfaka.com/sys/cluster/master.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-sitemap  fs-4"></i></button></a>
<a href="http://dic-con.vbfaka.com/sys/namespase/namespase.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-graduation-cap fs-4"></i></button></a>
<!--a href="http://dic-con.vbfaka.com/sys/webtty/webtty_create.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-window-maximize  fs-4"></i></button></a-->
<a href="http://dic-con.vbfaka.com/sys/user/user_status_all.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-male fs-3"></i></button></a>
<a href="http://dic-con.vbfaka.com/sys/images/images_dow.html"><button class="btn btn-light my-3" type="button"><i
            class="fa fa-clone fs-4"></i></button></a>
<a  onclick="loginout()"><button class="btn btn-light my-3" type="button"><i
class="	fa fa-power-off fs-4"></i></button></a>`)

    $('#center-logo').html(`
    <img src="http://dic-con.vbfaka.com/sys/favicon.ico" class="rounded" alt="Cinque Terre" width="70" height="50">
    <span class=" h4 ms-3"><b class="logo"></b></span>`)
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
                }else{
                    alert("帳號異常");
                    localStorage.clear();
                    document.location.href = "http://dic-con.vbfaka.com/sys/login/login.html";
                }

            }
        });        
        if (location.href == "http://dic-con.vbfaka.com/sys/login/login.html") {
            if(iden=="root"){
                document.location.href = "http://dic-con.vbfaka.com/sys/";
            }else{
                document.location.href = "http://dic-con.vbfaka.com/sys/user/index.html";
            }
        }  
    }

});
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