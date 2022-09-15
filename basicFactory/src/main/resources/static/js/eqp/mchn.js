$(document).ready(function () {
  $("#mchnListBtn").click(function () {
    findMchnCode();
  });

  function findMchnCode() {
    let mchnName = $("#mchnName").val();

    $.ajax({
      url: "mchnList/mchnName",
      method: "get",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        mchnName
      },
      success: function (result) {
        console.log(result);
        $("#mchnTable tbody tr").remove();
        for (obj of result) {
          mchnMakeRow(obj);
          console.log(obj);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function mchnMakeRow(obj) {
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
});
