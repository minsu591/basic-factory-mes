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

  //선택 삭제 이벤트
  $("#deleteBtn").on("click", function () {
    table.find("tbody input:checkbox[name='cb']").each(function (idx, el) {
      if ($(el).is(":checked")) {
        let tr = $(el).closest('tr');
        console.log(tr);
        let priKey = tr.find("input[type='hidden']").val();
        tr.remove();
        delList.push(priKey);
        for (let i = 0; i < modifyList.length; i++) {
          if (modifyList[i][0] == priKey) {
            modifyList.splice(i, 1);
          }
        }
      }
    });
  });
});