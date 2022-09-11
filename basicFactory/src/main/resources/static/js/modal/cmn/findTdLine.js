$("document").ready(function () {
  let tdInfo;
  $("tbody").on("click",".lineCdHdCode",function (e) {
    e.preventDefault();
    findLine();
    tdInfo = $(this);
    defaultVal = tdInfo.text();
    $("#findLineModal").modal("show");
  });

  //공정테이블 클릭이벤트
  $("#findLineTable").on("click", "tr", function () {
    let lineCdHdCode = $(this).find("td:eq(1)").text();
    let lineCdHdName = $(this).find("td:eq(2)").text();
    tdInfo.text(lineCdHdCode);
    tdInfo.next().text(lineCdHdName);
    tdInfo.trigger("change");
    $("#findLineModal").modal("hide");
  });
  
function findLine() {
  $.ajax({
    url: "findLine",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#findLineTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeLineRow(obj,index);
      }
    },
  });
}
function makeLineRow(obj,index) {
  let node = `<tr>
                <td>${index}</td>
                <td>${obj.lineCdHdCode}</td>
                <td>${obj.lineCdHdName}</td>
                <td>${obj.finPrdCdCode}</td>
                <td>${obj.finPrdCdName}</td>
              </tr>`;
  $("#findLineTable").append(node);
}
});
