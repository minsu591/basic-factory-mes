$(document).ready(function () {
  $("#exportBtn").click(function () {
    $("#procPerfomTable").table2excel({
      exclude: ".excludeThisClass",
      name: "testExcel",
      filename: "textname",
      preserveColors: false,
    });
  });

  //실적조회테이블
  findAllProcPerform();

  $("#findProcBtn").click(function () {
    let workSdate = $("#worksdate").val();
    let workEdate = $("#workedate").val();
    let procCdName = $("#proccdname").val();
    let mchnName = $("#mchnname").val();
    let empId = $("#empid").val();

    $.ajax({
      url: "findprocperform",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        workSdate: workSdate,
        workEdate: workEdate,
        procCdName: procCdName,
        mchnName: mchnName,
        empId: empId,
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#procPerfomTable tbody tr").remove();
        for (obj of data) {
          ProcPerformMakeRow(obj);
        }
        page();
      },
    });
  });
});

function findAllProcPerform() {
  $.ajax({
    url: "findprocperform",
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
      page();
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
