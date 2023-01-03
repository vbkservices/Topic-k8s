const fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let user = localStorage.getItem('user');
(function () {
    'use strict';
    window.addEventListener('load', function () {
        $('.form-group').addClass('m-3')

        const forms = document.getElementsByClassName("needs-validation");
        var validation = Array.prototype.filter.call(forms, function (forms) {
            forms.addEventListener('submit', function (event) {
                event.preventDefault();
                $("#k8s_repasswd").removeClass("is-invalid")
                forms.classList.add('was-validated');
                if (forms.checkValidity() === false) {
                    event.stopPropagation();
                } else {
                    if(document.querySelector('#k8s_user').value!=user){
                        if ($('#k8s_passwd').val() != $('#k8s_repasswd').val() ) {
                            document.querySelector('#k8s_repasswd').value = "";
                            let demo = document.getElementById("k8s_repasswd").classList;
                            demo.add("is-invalid");
                            document.getElementById("error_k8s_repasswd").innerText = "密碼不一致";
                            $("form").removeClass("was-validated")
                            $(".invalid-feedback #error_k8s_repasswd").show('fast');
    
                        } else {
                            fddjs.append('name', document.querySelector('#k8s_name').value);
                            fddjs.append('username', document.querySelector('#k8s_user').value);
                            fddjs.append('password', document.querySelector('#k8s_passwd').value);
                            fddjs.append('year', document.querySelector('#k8s_years').value);
                            fddjs.append('email', document.querySelector('#k8s_mail').value);
                            fddjs.append('status', 'set');
                            $.ajax({
                                type: "post",
                                url: 'http://dic-con.vbfaka.com/sys/login/prg/k8s_login.php',
                                data: fddjs,
                                processData: false,
                                contentType: false,
                                
                                success: function (result, status) {
                                    let odj=JSON.parse(result);
                                    if(odj[0]){
                                        alert("修改成功");
                                    }else{
                                        alert("帳號錯誤");
                                    }
                                }
                            });
                        }
                    }else{
                        alert("帳號錯誤");
                    }
                }
            }, false);
        });
    }, false);
})();
