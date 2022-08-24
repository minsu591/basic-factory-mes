$("document").ready(function () {

  $("#workInsertTable").on("click", "button", function () {
    $("#workStateTable tr td").remove();

    $("#procManageTable tr").each(function () {
      console.log('each문 들어옴')
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        let prodName = $(this).find("td:eq(5)").text();
        $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
      }
    })

    let mchnName = $(this).parent().parent().find("td:eq(2)").text();
    let procCdName = $(this).parent().parent().find("td:eq(1)").text();
    let inDtlVol = $(this).parent().parent().find("td:eq(3)").text(); //입고량
    let virResult = $(this).parent().parent().find("td:eq(4)").text(); //기실적량
    let nonResult = $(this).parent().parent().find("td:eq(5)").text(); // 미실적량
    let fltyVol = $(this).parent().parent().find("td:eq(6)").text(); //불량량
    $("#mchnName").val(mchnName);
    $("#procCdName").val(procCdName);
    $("#workStateTable tr:eq(1)").append(`<td>${inDtlVol}</td>`);
    $("#workStateTable tr:eq(2)").append(`<td>${virResult}<td>`);
    $("#workStateTable tr:eq(3)").append(`<td>${nonResult}</td>`);
    $("#workStateTable tr:eq(4)").append(`<td>${fltyVol}</td>`);
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

  //작업시작시간 입력
  $("#workStartBtn").click(function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    $("#sHours").val(hours).prop("readonly", true);
    $("#sMinutes").val(minutes).prop("readonly", true);
  });

  $("#workEndBtn").click(function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
  });


});

