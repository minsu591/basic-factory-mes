$(document).ready(function () {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  //작업시작시간 입력
  $("#workStartBtn").click(function () {
    $("#sHours").val(hours).prop("readonly", true);
    $("#sMinutes").val(minutes).prop("readonly", true);
  });

  $("#workEndBtn").click(function () {
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
  });

  findMchnName();
  //설비테이블
  function findMchnName() {
    $.ajax({
      url: "prod/findallmchn",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        for (obj of data) {
          mchnMakeRow(obj);
        }
      },
    });
  }
  //설비테이블 행추가
  function mchnMakeRow(obj) {
    let node = `<tr>                 
                 <td>${obj.mchnCode}</td>
                 <td>${obj.mchnName}</td>
                 <td>${obj.procCdName}</td>
                 <td>${obj.mchnStts}</td>
                </tr>`;
    $("#equiptbody").append(node);
  }
  //설비테이블 클릭 이벤트
  $("#equipTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(0)").text();
    let mchnName = $(this).find("td:eq(1)").text();

    $("#mchnCode").val(mchnCode).prop("readonly", true);
    $("#mchnName").val(mchnName).prop("readonly", true);
  });
});
