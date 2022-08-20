$(document).ready(function () {
  findAllProcCode();
  findMchnName();
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

  //설비테이블 클릭 이벤트
  $("#equipTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(0)").text();
    let mchnName = $(this).find("td:eq(1)").text();

    $("#mchnCode").val(mchnCode).prop("readonly", true);
    $("#mchnName").val(mchnName).prop("readonly", true);
  });
  //공정셀렉티드 검색
  $("#selectProcCdName").bind("input", function () {
    let procCdName = $("#selectProcCdName option:selected").text();
    $.ajax({
      url: `findmchn/${procCdName}`,
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#equiptbody tr").remove();
        for (obj of data) {
          mchnMakeRow(obj);
        }
      },
    });
  });
});
//설비테이블
function findMchnName() {
  $.ajax({
    url: "findmchn",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#equiptbody tr").remove();
      for (obj of data) {
        mchnMakeRow(obj);
      }
    },
  });
}

//공정검색
function findAllProcCode() {
  $.ajax({
    url: "findproccode",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      let index = 0;
      for (obj of data) {
        console.log("어팬드");
        $("#selectProcCdName").append(
          "<option value='" + (index += 1) + "'>" + obj.procCdName + "</option>"
        );
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
