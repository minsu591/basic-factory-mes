$(document).ready(function () {
  $("#workInsertTable").on("click", "button", function () {
    console.log($(this).parent().parent().find("td:eq(2)").text());
    $("#workInsertModal").modal("show");
  });

  let fltyCnt = 0;
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    $("#fltyCnt").val((fltyCnt += 1));
  });

  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      $("#fltyCnt").val((fltyCnt -= 1));
    }
  });

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
});
