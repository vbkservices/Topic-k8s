var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/prg/kube_pod.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var demo = JSON.parse(result);
        var table;
        var tables;
        Object.entries(demo.items).forEach(([key, value]) => {

            if (value.metadata.namespace != "kube-system" && value.metadata.namespace != "kube-public") {
                var ports= '80'+`${key}`.padStart(2,'8');
                table = table + `<tr><th scope="row fs-1"> ${value.spec.containers[0].name}</th><td>${value.status.phase}</td>`;
                table = table +'<tr><th scope="row fs-1" colspan="2"> <button class="btn btn-secondary mx-2" onclick="gottycreate(\''+`${value.spec.containers[0].name}`+'\',\''+ports+'\',\''+`${value.metadata.name}`+'\',\''+`${value.metadata.namespace}`+'\')">啟動</button><button class="btn btn-secondary mx-2" onclick="gottyclose(\''+`${value.spec.containers[0].name}`+'\')">關閉</button><button class="btn btn-secondary mx-2" onclick="link(\''+ports+'\',\''+`${value.spec.containers[0].name}`+'\')">連線</button><button class="btn btn-secondary mx-2" onclick="linkon(\''+`${value.spec.containers[0].name}`+'\')">分享畫面</button></th>'; 
                table = table + '<input type="hidden" id="student" value="'+`${value.metadata.name}`+'"></input><input type="hidden" id="port" value="'+ports+'"></input><input type="hidden" id="container" value="'+(`${value.metadata.name}`)+'"></input>' ;
            }
        });

        $('#example').html(table);
    }
});
function gottycreate(student,port,container,namespace) {
    var fddyaml = new FormData();
    fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddyaml.append('student', student);
    fddyaml.append('port', port);
    fddyaml.append('container', container);
    fddyaml.append('namespace', namespace);
    
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/prg/kube_gotty_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            alert("己建立");
        }
    });
};
function gottyclose(student) {
    var fddyaml = new FormData();
    fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddyaml.append('student', student);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/prg/kube_gotty_close.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            $("#webgotty").html('<span></span>');
        }
    });
};
function link(port,student) {
    $("#ifname").html('<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:'+port+'" frameborder="0" style=" width: 100%; height:100%;"></iframe>');
    $("#webgotty").html('<b>'+student+'</b>');

}
function nolink() {
    $("#ifname").html('<div></div>');
}
function linkon(students) {
    var fddyaml = new FormData();
    fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddyaml.append('student', students);
    
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/prg/kube_gotty_pts_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            window.open('http://120.114.142.17:8899 ', '廣播', config='height=1500,width=1500');
        }
    });
}

