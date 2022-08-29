$(document).ready(function () {

  //오늘 일자
  today = new Date();
  today = today.toISOString().slice(0, 10);
  rtnToday = $("#slsRtnHdDate");
  rtnToday.val(today);

  //체크박스 전체선택 & 해제
  $("#allCheck").on("click", function () {
    if ($("#allCheck").prop("checked")) {
      $("input[type=checkbox]").prop("checked", true);
    } else {
      $("input[type=checkbox]").prop("checked", false);
    }
  });

  //선택삭제 버튼
  $("#deleteBtn").on("click", function () {
    let trs = $("#rtnMngTable tbody tr");

  });
});