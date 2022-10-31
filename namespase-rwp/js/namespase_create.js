$(document).ready(function () {
    $("#yaml").click(function () {
        var fddyaml = new FormData();
        fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
        fddyaml.append('course', $('#course').val());
        fddyaml.append('contianername', $('#contianername').val());
        fddyaml.append('images', $('#images').val());
        fddyaml.append('cpu', $('#cpu').val());
        fddyaml.append('memory', $('#memory').val());
        fddyaml.append('volume', $('#volume').val());
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/namespase/prg/kube_ns_create.php',
            // dataType: "json",
            data: fddyaml,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                alert("ok");
            }
        });
    });
    let select = document.querySelector("#contianer");
    select.addEventListener("change", selectFun);
    function selectFun() {
        const switchValue = select.options[select.selectedIndex].value;
        switch (switchValue) {
          case "student":
            var http=`<div class="form-group row my-2">
        <label for="images" class="col-sm-2 col-form-label">容量</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="volume">
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>
    <div class="form-group row my-2 ">
        <label for="cpu" class="col-sm-2 col-form-label">cpu</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="cpu">
                <option value="0.5">0.5</option>
            </select>
        </div>
        <label for="memory" class="col-sm-2 col-form-label">memory</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="memory">
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>`;
    $('#httpifname').html(http)
            break;
          case "teacher":
            var http=`<div class="form-group row my-2">
        <label for="images" class="col-sm-2 col-form-label">容量</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="volume">
                <option value="1" selected>1</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>
    <div class="form-group row my-2 ">
        <label for="cpu" class="col-sm-2 col-form-label">cpu</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="cpu">
                <option value="1" selected>1</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
        <label for="memory" class="col-sm-2 col-form-label">memory</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="memory">
                <option value="1" selected>1</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>`;
    $('#httpifname').html(http)
            break;
          case "system":
            var http=`<div class="form-group row my-2">
        <label for="images" class="col-sm-2 col-form-label">容量</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="volume">
                <option value="1" selected>預設(1G)</option>
                <option value="2">2</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>
    <div class="form-group row my-2 ">
        <label for="cpu" class="col-sm-2 col-form-label">cpu</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="cpu">
                <option value="1" selected>1(預設)</option>
                <option value="2">2</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
        <label for="memory" class="col-sm-2 col-form-label">memory</label>
        <div class="col-sm-4 py-2">
            <select class="form-control form-control-sm" id="memory">
                <option value="1" selected>1(預設)</option>
                <option value="2">2</option>
                <option value="0.5">0.5</option>
            </select>
        </div>
    </div>`;
    $('#httpifname').html(http)
            break;
          default:
            return;
        }
      }
});
