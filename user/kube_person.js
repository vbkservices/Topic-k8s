let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let user = localStorage.getItem("user");
window.onload = function () {
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/prg/kube_person.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            let table='';
            Object.entries(result).forEach(([key, value]) => {
                table=table+`<tr>
                <th scope="row">`+value["name"]+`</th>
                <td>`+value["username"]+`</td>
                <td>`+value["remark"]+`</td>
                <td>`+value["address"]+`</td>
                <td>`+value["year"]+`</td>
                <td>`+value["logintime"]+`</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                修改
              </button></td>
              </tr>`
            });
            $('#user_status').html(table);
        }
    });
}