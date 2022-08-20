$("document").ready(function () {
  $("#proccdname").click(function (e) {
    e.preventDefault();
    //공정명 검색
    findAllProcCode();
    $("#findProcCdNameModal").modal("show");
  });

  //공정테이블 클릭이벤트
  $("#findProcCdNameTable").on("click", "tr", function () {
    let procCdName = $(this).find("td:eq(2)").text();
    $("#proccdname").val(procCdName);
    $("#findProcCdNameModal").modal("hide");
  });
  //공정검색버튼 클릭 이벤트
  $("#findCdNameBtn").on("click", function () {
    let code = $("#procCdCode").val();
    let name = $("#procCdName").val();
    console.log("code -> " + code + " name->" + name);
    if (name == "" && code == "") {
      findAllProcCode();
    } else {
      $.ajax({
        url: `findproccode`,
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
          for (obj of data) {
            index += 1;
            makeProcCodeRow(obj, index);
          }
        },
      });
    }
  });
});
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
