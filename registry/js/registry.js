var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/registry/prg/registry.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var userlistreg = JSON.parse(result);
        var table="";
        Object.entries(userlistreg).forEach(([key, value]) => {
            var reglist="";
            for(var i = 0; i <`${value.length}`; i++) { 
                reglist=reglist+'<li class="breadcrumb-item">'+`${value[i]}`+'</li>'
            }
            table = table+`
            <div class="col-3">
            <div class="card text-center rounded-3 shadow" style="width: 100%;">
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h2 class="card-title"><b>建立者:`+`${key}`+`</b></h2>
                        </li>
                        <li class="list-group-item">
                            <ol class="breadcrumb fs-4 ">
                                `+reglist+`
                             </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            `;
        });
        $('#reglist').html(table);
    }
});