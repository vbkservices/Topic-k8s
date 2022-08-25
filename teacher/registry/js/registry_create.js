var fddjs = new FormData();
$(document).ready(function(){
    $(".search").click(function(){
        localStorage.setItem('userName',$("#user").val());
        window.location.reload();
        //alert(localStorage.getItem('userName'));
    });
  });
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('reguser', localStorage.getItem('userName'));
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/teacher/registry/prg/registry.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var userlistreg = JSON.parse(result);
        var table="";
        Object.entries(userlistreg).forEach(([key, value]) => {
            console.log(`${value.Id}`);
            var str=`${value.RepoTags[0]}`;
            str=str.replace("10.255.1.254:5000/","");
            table = table +`<tr><th scope="row">`+str+`</th><td>`+localStorage.getItem('userName')+`</td><td>${value.Id}</td><td> ${value.Size}</td><td> ${value.Size}</td><td> ${value.Created}</td></tr>`;
        });
        //alert(userlistreg[0].Id);
        $('#reglist').html(table);
    }
});