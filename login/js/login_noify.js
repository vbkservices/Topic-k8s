const fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
(function () {
    'use strict';
    window.addEventListener('load', function () {
        let year = new Date();
        year=year.getYear()-11;
        let year_opt='<option value='+year+'>'+year+'</option>'
        for (let i = 1; i < 5; i++) {
            let years=year-i;
            year_opt=year_opt+'<option value='+years+'>'+years+'</option>'
        }
        document.getElementById("k8s_year").innerHTML=year_opt;

        const forms = document.getElementsByClassName("needs-validation");
        var validation = Array.prototype.filter.call(forms, function (forms) {
            forms.addEventListener('submit', function (event) {
                event.preventDefault();
                $("#k8s_repasswd").removeClass("is-invalid")
                forms.classList.add('was-validated');
                if (forms.checkValidity() === false) {
                    event.stopPropagation();
                } else {
                    if ($('#k8s_passwd').val() != $('#k8s_repasswd').val()) {
                        document.querySelector('#k8s_repasswd').value = "";
                        let demo = document.getElementById("k8s_repasswd").classList;
                        demo.add("is-invalid");
                        document.getElementById("error_k8s_repasswd").innerText = "密碼不一致";
                        $("form").removeClass("was-validated")
                    } else {
                        fddjs.append('name', document.querySelector('#k8s_name').value);
                        fddjs.append('username', document.querySelector('#k8s_user').value);
                        fddjs.append('password', document.querySelector('#k8s_passwd').value);
                        fddjs.append('year', document.querySelector('#k8s_year').value);
                        fddjs.append('email', document.querySelector('#k8s_mail').value);
                        fddjs.append('status', 'reg');
                        $.ajax({
                            type: "post",
                            url: 'http://dic-con.vbfaka.com/sys/login/prg/k8s_login.php',
                            data: fddjs,
                            processData: false,
                            contentType: false,
                            success: function (result, status) {
                                let usrobj = JSON.parse(result)
                                let login="0";
                                Object.entries(usrobj).forEach(([key, value]) => {
                                    if(value[0]==false){
                                        event.stopPropagation();
                                        let error=value[1];
                                        
                                        if(error=="k8s_user"){
                                           // document.querySelector('#k8s_user').value="";
                                            $("#k8s_user_error").text("錯誤: 學號已重複");
                                            $("#k8s_user_error").show('fast');
                                            let stlye_border=`border-color: #dc3545;
                                            padding-right: calc(1.5em + 0.75rem);
                                            background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
                                            background-repeat: no-repeat;
                                            background-position: right calc(0.375em + 0.1875rem) center;
                                            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
                                            document.getElementById('k8s_user').style=stlye_border;
                                            document.getElementById('k8s_user').addEventListener("change",function(){
                                                document.getElementById('k8s_user').style=``;
                                                $("#k8s_user_error").hide('fast');
                                                $("#k8s_user_error").text("錯誤: 請輸入學號");
                                            })
    
                                        }
                                        if(error=="k8s_mail"){
                                            document.querySelector('#k8s_mail').value="";
                                            $("#k8s_mail_error").text("錯誤: 電子郵件已重複");
                                            $("#k8s_mail_error").show('fast');
                                            let stlye_border=`border-color: #dc3545;
                                            padding-right: calc(1.5em + 0.75rem);
                                            background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
                                            background-repeat: no-repeat;
                                            background-position: right calc(0.375em + 0.1875rem) center;
                                            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
                                            document.getElementById('k8s_mail').style=stlye_border;
                                            document.getElementById('k8s_mail').addEventListener("change",function(){
                                                document.getElementById('k8s_mail').style=``;
                                                $("#k8s_mail_error").hide('fast');
                                                $("#k8s_mail_error").text("錯誤: 請輸入電子郵件");
                                            })
                                        }
    

                                    }else{
                                        login=="1"
                                    }   
                                });
                                if(login=="1"){
                                    alert(usrobj[0]);
                                    window.location.reload();
                                } 
                            }
                        });
                    }
                }
            }, false);
        });
    }, false);
})();
(function () {
    'use strict';
    window.addEventListener('load', function () {
        const formser = document.getElementsByClassName("from-needs-validation");
        var validation = Array.prototype.filter.call(formser, function (formser) {
            formser.addEventListener('submit', function (event) {
                event.preventDefault();
                let stlye_border=`border-color: #dc3545;
                padding-right: calc(1.5em + 0.75rem);
                background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
                background-repeat: no-repeat;
                background-position: right calc(0.375em + 0.1875rem) center;
                background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
                if (formser.checkValidity() === false) {
                   // formser.classList.add('was-validated');
                    event.stopPropagation();
                    $(".invalid-feedback-login").show('fast');
                    document.getElementById('error_log').innerHTML='<b class="fs-4 mb-3 text-danger">格式錯誤</b>';
                    document.getElementById('k8s_login_passwd').style=stlye_border;
                    document.getElementById('k8s_login_passwd').style=stlye_border;
                } else {
                    fddjs.append('username', document.querySelector('#k8s_login_user').value);
                    fddjs.append('password', document.querySelector('#k8s_login_passwd').value);
                    fddjs.append('status', 'log');
                    $.ajax({
                        type: "post",
                        url: 'http://dic-con.vbfaka.com/sys/login/prg/k8s_login.php',
                        data: fddjs,
                        processData: false,
                        contentType: false,
                        success: function (result, status) {
                            console.log(result);
                            let usrobj = JSON.parse(result);
                            if (usrobj[0] == false) {
                                $(".invalid-feedback-login").show('fast');
                                document.getElementById('error_log').innerHTML='<b class="fs-4 mb-3 text-danger">'+usrobj[1]+'</b>';
                                document.getElementById('k8s_login_passwd').style=stlye_border;
                                document.getElementById('k8s_login_passwd').style=stlye_border;
                            } else {
                                localStorage.setItem("user", usrobj[2]);
                                localStorage.setItem("iden", usrobj[3]);
                                let login_model=`
                                <div class="modal fade" id="k8s_login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                  <div class="modal-dialog" role="document">
                                    <div class="modal-content  text-center">
                                      <div class="modal-header">
                                        <h5 class="modal-title " id="k8s_loginLabel"><b>系統訊息</b></h5>
                                      </div>
                                      <div class="modal-body">
                                        <b class="fs-4">`+usrobj[3]+`:`+usrobj[2]+` 登入</b>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;
                                document.getElementById('error_log').innerHTML=login_model;
                                $('#k8s_login').modal('show');
                                
                                setTimeout(function(){
                                    $('#k8s_login').modal('hide');
                                    if(usrobj[3]=="root"){
                                        document.location.href = "http://dic-con.vbfaka.com/sys";
                                    }else{
                                        document.location.href = "http://dic-con.vbfaka.com/sys/user/index.html";
                                    }
                                },1500);

                            }
                            $('#k8s_login').modal('show');
                        }
                    });
                }
            }, false);
        });
    }, false);
})();