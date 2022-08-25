$("document").ready(function () {
  $("#workInsertTable").on("click", "button", function () {
    console.log($(this).text());
    $("#workStateTable tr td").remove();
    if ($(this).text() == "비가동") {
      alert("비가동입니다.");
    } else {
      $("#procManageTable tr").each(function () {
        console.log("each문 들어옴");
        if ($(this).find("td:eq(0)").children().prop("checked")) {
          let prodName = $(this).find("td:eq(5)").text();
          $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
        }
      });

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
    }
  });

  let fltyCnt = 0;
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    fltyCnt += 1;
    $("#fltyCnt").val(fltyCnt);
  });

  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      fltyCtn -= 1;
      $("#fltyCnt").val(fltyCnt);
    }
  });

  $("#addFlty").click(function () {
    console.log("클릭");
    console.log(fltyCnt);
    let fltyVol = $("#workStateTable tr:eq(4) td");
    fltyVol.html(fltyCnt);
    fltyCnt = 0;
    $("#fltyCnt").val(fltyCnt);
  });
});
let work;
//작업시작 시간 입력
function startWork() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  $("#sHours").val(hours).prop("readonly", true);
  $("#sMinutes").val(minutes).prop("readonly", true);
  work = setInterval(startinterval, 10);
}

//작업종료 시간 입력
function endWork() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  $("#eHours").val(hours).prop("readonly", true);
  $("#eMinutes").val(minutes).prop("readonly", true);

  clearInterval(work);
}
let num = 0;
function startinterval() {
  let inDtlVol = parseInt($("#workStateTable tr:eq(1) td").text());
  console.log(inDtlVol);

  num += 1;
  $("#workStateTable tr:eq(3) td").html(num);
  if (num == inDtlVol) {
    console.log("종료");
    endWork();
  }
}
