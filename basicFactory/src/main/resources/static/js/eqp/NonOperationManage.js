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

  //설비테이블 클릭 이벤트
  $("#equipTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(1)").text();
    let mchnName = $(this).find("td:eq(2)").text();

    $("#mchnCode").val(mchnCode);
    $("#mchnName").val(mchnName);
  });
});
