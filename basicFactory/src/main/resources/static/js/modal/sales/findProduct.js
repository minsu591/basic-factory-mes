$("document").ready(function () {

  let tdInfo;
  $("#ordMngTable").find("tbody").on("click", ".productCode", function (e) {
    e.preventDefault();
    //제품 조회
    findProduct();
    tdInfo = $(this);
    $("#findproductModal").modal("show");
  })

  //테이블 클릭 이벤트
  $("#findProductTable").on("click", "tr", function () {
    //지금 클릭한 finCode가 이미 추가된 완제품코드인지 확인
    let prdCode = $(this).find("td:eq(1)").text();
    let prdName = $(this).find("td:eq(2)").text();
    let table = tdInfo.closest("table");

    if(table.attr("id") == 'ordMngTable') {
      let trs = tdInfo.closest('tbody').find("tr");
      for(tr of trs){
        if($(tr).find("td:eq(1)").text() == prdCode){
          Swal.fire({
            icon: "warning",
            title: "이미 추가된 제품코드입니다",
            text: "다시 선택해주세요"
          });
          $("#findproductModal").modal("hide");
          return false;
        }
      }
    }
    tdInfo.text(prdCode);
    tdInfo.next().text(prdName);

    tdInfo.trigger("change");
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
        url: `findproduct`,
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
          $("#findProducttbody tr").remove();
          for (obj of data) {
            index += 1;
            productMakeRow(obj, index);
          }
        },
      });
    }
  });
});

//제품조회
function findProduct() {
  $.ajax({
    url: "findproduct",
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
