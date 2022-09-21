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
  //date타입이 null일때 null값 안보이게
  if (obj.mchnMnfctDate == null || obj.mchnMnfctDate == '') {
    obj.mchnMnfctDate = '';
  }
  if (obj.inspcEdate == null || obj.inspcEdate == '') {
    obj.inspcEdate == '';
  }
  let node = `<tr>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.mchnModel}</td>
                  <td>${obj.vendCdNm}</td>
                  <td>${obj.mchnMnfctDate}</td>
                  <td>${obj.mchnInspcCycle}</td>
                  <td>${obj.inspcEdate}</td>
                  <td><span>${obj.mchnStts}</span></td>
                  <td>${obj.mchnRemk}</td>
                </tr>`;
  $("#mchnTable tbody").append(node);

  if (obj.mchnStts == '비가동') {
    $("#mchnTable tbody tr").last().find("td:eq(7) span").addClass("badge badge-danger")
  } else if (obj.mchnStts == '진행전') {
    $("#mchnTable tbody tr").last().find("td:eq(7) span").addClass("badge badge-primary")
  } else if (obj.mchnStts == '진행중') {
    $("#mchnTable tbody tr").last().find("td:eq(7) span").addClass("badge badge-warning")
  } else {
    $("#mchnTable tbody tr").last().find("td:eq(7) span").addClass("badge badge-secondary")
  }
}
