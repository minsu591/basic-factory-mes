$("document").ready(function () {
  $("#productname").click(function (e) {
    e.preventDefault();
    //제품 조회
    findProduct();
    $("#findproductModal").modal("show");
  });
  //테이블 클릭 이벤트
  $("#findProductTable").on("click", "tr", function () {
    console.log($(this).find("td:eq(2)").text());
    let name = $(this).find("td:eq(2)").text();

    $("#productname").val(name);
    $("#findproductModal").modal("hide");
  });
  //제품검색버튼 이벤트
  $("#findProductbtn").click(function () {
    let code = $("#prdCdCode").val();
    let name = $("#prdCdName").val();
    console.log("code -> " + code + " name->" + name);
    if (name == "" && code == "") {
      findProduct();
    } else {
      $.ajax({
        url: `getProduct`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          prdCdCode: code,
          prdCdName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);

          let index = 0;
          index += 1;
          $("#findProducttbody tr").remove();
          productMakeRow(data, index);
        },
      });
    }
  });
});
//제품조회
function findProduct() {
  $.ajax({
    url: "findProduct",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);

      let index = 0;
      $("#findProducttbody tr").remove();
      for (obj of data) {
        index += 1;
        productMakeRow(obj, index);
      }
    },
  });
}
//초기데이터
function productMakeRow(obj, index) {
  let node = `<tr>
								<td>${index}</td>
								<td>${obj.finPrdCdCode}</td>
								<td>${obj.finPrdCdName}</td>
								<td>${obj.finPrdCdUnit}</td>
							</tr>`;
  $("#findProducttbody").append(node);
}
