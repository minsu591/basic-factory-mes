$("document").ready(function () {
  let tdInfo;
  $("tbody").on("click",".mchnCode",function (e) {
    e.preventDefault();
    //설비명검색
    findMchnName();
    $("#findMchnInLineModal").modal("show");
    tdInfo = $(this);
  });
  //설비테이블 클릭이벤트
  $("#findMchnTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(1)").text();
    let mchnName = $(this).find("td:eq(2)").text();
    tdInfo.text(mchnCode);
    tdInfo.next().text(mchnName);
    tdInfo.trigger("change");
    
    $("#findMchnInLineModal").modal("hide");
  });

  //설비테이블 검색버튼 클릭 이벤트
  $("#findMchnBtn").click(findMchnName);

});
//설비검색
function findMchnName() {
  let mchnCode = $("#mchnCode").val();
  let mchnName = $("#mchnName").val();
  console.log("잉");
  $.ajax({
    url: "findmchn",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data : JSON.stringify({
      mchnCode,
      mchnName
    }),
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
                </tr>`;
  $("#findMchnTable").append(node);
}
