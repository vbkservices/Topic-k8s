if (status != true) {

}
const fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
(function () {
    'use strict';
    window.addEventListener('load', function () {
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
                        fddjs.append('email', document.querySelector('#k8s_mail').value);
                        $.ajax({
                            type: "post",
                            url: 'http://120.114.142.17/sys/login/prg/k8s_login.php',
                            data: fddjs,
                            processData: false,
                            contentType: false,
                            success: function (result, status) {
                                let usrobj = JSON.parse(result);
                                if(usrobj[0]==false){
                                    event.stopPropagation();
                                    let error=usrobj[1];
                                    if(error=="k8s_name"){
                                        document.querySelector('#k8s_name').value="";
                                    }else if(error=="k8s_nmail"){
                                        document.querySelector('#k8s_nmail').value="";
                                    }
                                }else{
                                    alert(usrobj[0])
                                   // window.location.reload();
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
                formser.classList.add('was-validated');
                if (formser.checkValidity() === false) {
                    event.stopPropagation();
                } else {
                    fddjs.append('username', document.querySelector('#k8s_login_user').value);
                    fddjs.append('password', document.querySelector('#k8s_login_passwd').value);
                    $.ajax({
                        type: "post",
                        url: 'http://120.114.142.17/sys/login/prg/k8s_reg.php',
                        data: fddjs,
                        processData: false,
                        contentType: false,
                        success: function (result, status) {
                            let usrobj = JSON.parse(result);
                            if (usrobj[0] == false) {
                                alert(usrobj[1]);
                            } else {
                                alert(usrobj[1]);
                                localStorage.setItem("name", document.querySelector('#k8s_login_user').value);
                                localStorage.setItem("status", usrobj[0]);
                                localStorage.setItem("user", usrobj[2]);
                                //localStorage.setItem("status", usrobj[0]);
                                document.location.href = "http://120.114.142.17/sys/user/index.html";
                            }
                        }
                    });
                }
            }, false);
        });
    }, false);
})();