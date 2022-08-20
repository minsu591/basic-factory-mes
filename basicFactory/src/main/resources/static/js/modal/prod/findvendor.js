$("document").ready(function () {
  $("#vendor").click(function (e) {
    e.preventDefault();
    //거래처조회
    findVendorCode();
    $("#findvendorModal").modal("show");
  });
  //거래처코드 검색 테이블 클릭이벤트
  $("#findVendorTable").on("click", "tr", function () {
    let vendCode = $(this).find("td:eq(1)").text();
    let vendName = $(this).find("td:eq(2)").text();

    $("#vendor").val(vendCode);
    $("#vendorName").val(vendName);

    $("#findvendorModal").modal("hide");
  });
});
function findVendorCode() {
  $.ajax({
    url: "findvendorcode",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      $("#findVendortbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeVendorCodeRow(obj, index);
      }
    },
  });
}
//거래처조회 행생성
function makeVendorCodeRow(obj, index) {
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.vendCdCode}</td>
              <td>${obj.vendCdNm}</td>
              <td>${obj.vendCdClfy}</td>
              <td>${obj.empId}</td>
            </tr>`;
  $("#findVendortbody").append(node);
}
