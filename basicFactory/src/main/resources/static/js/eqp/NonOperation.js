$(document).ready(function () {
  $("#nonOpCode").click(function (e) {
    e.preventDefault();
    $("#findnonOpCodeModal").modal("show");
  });

  $("#mchnCode").click(function (e) {
    e.preventDefault();
    findMchnName();
    $("#findMchnNameModal").modal("show");
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
  function mchnMakeRow(obj, index) {
    let node = `<tr>
							 <td>${index}</td>
							 <td>${obj.mchnCode}</td>
							 <td>${obj.mchnName}</td>
							 <td>${obj.procCdName}</td>
							 <td>${obj.mchnStts}</td>
							</tr>`;
    $("#findMchntbody").append(node);
  }

  //설비테이블 클릭 이벤트
  $("#findMchnTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(1)").text();
    $("#mchnCode").val(mchnCode);
    $("#findMchnNameModal").modal("hide");
  });

  //비가동코드테이블 클릭이벤트
  $("#findNonOpTable").on("click", "tr", function () {
    let nonOpCode = $(this).find("td:eq(1)").text();
    $("#nonOpCode").val(nonOpCode);
    $("#findnonOpCodeModal").modal("hide");
  });
});
