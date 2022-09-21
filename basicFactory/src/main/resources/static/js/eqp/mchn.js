$(document).ready(function () {
  findAllMchnCode();

  $("#mchnListBtn").click(function () {
    findAllMchnCode();
  });
});
  function findAllMchnCode() {
    let mchnName = $("#mchnName").val();
    $.ajax({
      url: "mchnList/name",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        mchnName
      },
      success: function (result) {
        $("#mchnTable tbody tr").remove();
        for (obj of result) {
          mchnMakeRow(obj);
        }
        $("#remo").remove();
        page();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function mchnMakeRow(obj) {
    if(obj.mchnMnfctDate == null || obj.mchnMnfctDate == ''){
      obj.mchnMnfctDate = '';
    }
    let node = `<tr>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.mchnModel}</td>
                  <td>${obj.vendCdNm}</td>
                  <td>${obj.mchnMnfctDate}</td>
                  <td>${obj.mchnInspcCycle}</td>
                  <td>${obj.inspcEdate}</td>
                  <td>${obj.mchnStts}</td>
                  <td>${obj.mchnRemk}</td>
                </tr>`;
    $("#mchnTable tbody").append(node);
  }
