$("document").ready(function () {
  let tdInfo;
  $("tbody").on("click",".procCode",function (e) {
    e.preventDefault();
    //공정명 검색
    let lineCode = $("#lineCode").val();
    findAllProcCode(lineCode);
    $("#findProcForLineModal").modal("show");
    tdInfo = $(this);
  });

  //공정테이블 클릭이벤트
  $("#findProcForLineTable").on("click", "tr", function () {
    let procCdCode = $(this).find("td:eq(1)").text();
    let procCdName = $(this).find("td:eq(2)").text();
    let mchnCode = $(this).find("td:eq(3)").text();
    let mchnName = $(this).find("td:eq(4)").text();
    let lineCdCode = $(this).find("input[class='lineCdCode']").val();

    tdInfo.text(procCdCode);
    tdInfo.next().text(procCdName);
    tdInfo.next().next().text(mchnCode);
    tdInfo.next().next().next().text(mchnName);
    tdInfo.parent().find("input[class='lineCdCode']").val(lineCdCode);

    tdInfo.trigger("change");
    $("#findProcForLineModal").modal("hide");

  });
  
//공정조회
function findAllProcCode(lineCode) {
  $.ajax({
    url: "bomRsc/proc",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data : {
      lineCode
    },
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#findProcForLineTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeProcCodeRow(obj,index);
      }
    },
  });
}
function makeProcCodeRow(obj,index) {
  let node = `<tr>
                <input type="hidden" value="${obj.lineCdCode}" class="lineCdCode">
                <td>${index}</td>
                <td>${obj.procCdCode}</td>
                <td>${obj.procCdName}</td>
                <td>${obj.mchnCode}</td>
                <td>${obj.mchnName}</td>
              </tr>`;
  $("#findProcForLineTable").append(node);
}
});
