$(document).ready(function () {
  //비가동코드테이블 클릭이벤트
  $("#findNonOpTable").on("click", "tr", function () {
    let nonOpCode = $(this).find("td:eq(1)").text();
    $("#nonOpCode").val(nonOpCode);
    $("#findnonOpCodeModal").modal("hide");
  });
});
