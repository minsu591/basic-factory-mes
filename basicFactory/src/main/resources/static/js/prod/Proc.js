$(document).ready(function () {
  //실적조회테이블
  findAllProcPerform();
});

function findAllProcPerform() {
  $.ajax({
    url: "findallprocperform",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      $("#procPerfomTable tbody tr").remove();
      for (obj of data) {
        ProcPerformMakeRow(obj);
      }
    },
  });
}
function ProcPerformMakeRow(obj) {
  let node = `<tr>
              <td>${obj.instNo}</td>
              <td>${obj.processPerfomNo}</td>
              <td>${obj.workDate}</td>
              <td>${obj.finPrdCdCode}</td>
              <td>${obj.finPrdCdName}</td>
              <td>${obj.procCdName}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.workerName}</td>
              <td>${obj.prodVol}</td>
              <td>${obj.fltyVol}</td>
              <td>${obj.perfomeRemk}</td>
              </tr>
  `;
  $("#procPerfomTable tbody").append(node);
}
