$(document).ready(function () {
  $("#proccdname").click(function (e) {
    e.preventDefault();
    //공정명 검색
    findAllProcCode();
    $("#findProcCdNameModal").modal("show");
  });

  $("#mchnname").click(function (e) {
    e.preventDefault();
    //설비명검색
    findMchnName();
    $("#findMchnNameModal").modal("show");
  });

  //실적조회테이블
  findAllProcPerform();

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

  //공정검색
  function findAllProcCode() {
    $.ajax({
      url: "findallproccode",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        let index = 0;
        $("#findProcCdNameTable tbody tr").remove();
        for (obj of data) {
          index += 1;
          makeProcCodeRow(obj, index);
        }
      },
    });
  }
  function makeProcCodeRow(obj, index) {
    let node = `<tr>
    <td>${index}</td>
    <td>${obj.procCdCode}</td>
    <td>${obj.procCdName}</td>
    <td>${obj.procCdRemk}</td>
   </tr>`;
    $("#findProcCdNameTable").append(node);
  }

  //공정검색버튼 클릭 이벤트
  $("#findCdNameBtn").on("click", function () {
    let code = $("#procCdCode").val();
    let name = $("#procCdName").val();
    console.log("code -> " + code + " name->" + name);
    if (name == "" && code == "") {
      findAllProcCode();
    } else {
      $.ajax({
        url: `getproccode`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          procCdCode: code,
          procCdName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          let index = 0;
          index += 1;
          $("#findProcCdNameTable tbody tr").remove();
          makeProcCodeRow(data, index);
        },
      });
    }
  });

  //공정테이블 클릭이벤트
  $("#findProcCdNameTable").on("click", "tr", function () {
    let procCdName = $(this).find("td:eq(2)").text();
    $("#proccdname").val(procCdName);
    $("#findProcCdNameModal").modal("hide");
  });
  //설비검색
  function findMchnName() {
    $.ajax({
      url: "findallmchn",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        let index = 0;
        $("#findMchntbody tr").remove();
        for (obj of data) {
          index += 1;
          mchnMakeRow(obj, index);
        }
      },
    });
  }

  //설비테이블 검색버튼 클릭 이벤트
  $("#findMchnBtn").click(function () {
    let code = $("#mchnCode").val();
    let name = $("#mchnName").val();
    console.log("code->" + code + " name->" + name);
    if (name == "" && code == "") {
      findMchnName();
    } else {
      $.ajax({
        url: `getmchn`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          mchnCode: code,
          mchnName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          let index = 0;
          index += 1;
          $("#findMchntbody tr").remove();
          mchnMakeRow(data, index);
        },
      });
    }
  });

  //설비테이블 클릭이벤트
  $("#findMchnTable").on("click", "tr", function () {
    let mchnName = $(this).find("td:eq(2)").text();
    $("#mchnname").val(mchnName);
    $("#findMchnNameModal").modal("hide");
  });

  function mchnMakeRow(obj, index) {
    let node = `<tr>
                 <td>${index}</td>
                 <td>${obj.mchnCode}</td>
                 <td>${obj.mchnName}</td>
                 <td>${obj.procCdName}</td>
                 <td>${obj.mchnStts}</td>
                </tr>`;
    $("#findMchnTable").append(node);
  }
});
