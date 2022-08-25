var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/images_status.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
      //  console.log(JSON.parse(result));
        //alert(result);
        var table="";
        Object.entries(JSON.parse(result)).forEach(([key, value]) => {  
                 table= table +`
                <div class="col-2 mx-2 mt-2">
                    <div class="card text-center rounded-3 shadow" style="width: 100%;">
                    <div class="card-body">
                    <h5 class="card-title">`+value.name+`</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">建立者:`+value.user+`</li>
                    <li class="list-group-item">建立者:</br>`+value.date+`</li>
                    <li class="list-group-item">容量:`+value.size+`</li>
                    <li class="list-group-item">作業系統:`+value.os+`</li>
                  </ul>
                    </div>
                </div>
                `;
        });
        $('#imagesuser').html(table);
    }
});