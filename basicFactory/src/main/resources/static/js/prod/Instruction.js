$(document).ready(function () {
  $("#vendor").click(function (e) {
    console.log("클릭");
    e.preventDefault();

    $("#findvendorModal").modal("show");
  });

  $("#productname").click(function (e) {
    e.preventDefault();
    $("#findproductModal").modal("show");

    findProduct();

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
            makeRow(obj, index);
          }
        },
      });

      //제품검색버튼 이벤트
      $("#findProductbtn").click(function () {
        let code = $("#prdCdCode").val();
        let name = $("#prdCdName").val();
        console.log("code -> " + code + " name->" + name);

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
            makeRow(data, index);
          },
        });
      });

      //테이블 클릭 이벤트
      $("#findProductTable").on("click", "tr", function () {
        console.log($(this).find("td:eq(2)").text());
        let name = $(this).find("td:eq(2)").text();

        $("#productname").val(name);
        $("#findproductModal").modal("hide");
      });

      //초기데이터
      function makeRow(obj, index) {
        let node = `<tr>
								<td>${index}</td>
								<td>${obj.finPrdCdCode}</td>
								<td>${obj.finPrdCdName}</td>
								<td>${obj.finPrdCdUnit}</td>
							</tr>`;
        $("#findProducttbody").append(node);
      }
    }
  });

  //거래처코드 검색 테이블 클릭이벤트
  $("#findVendorTable").on("click", "tr", function () {
    let vendCode = $(this).find("td:eq(1)").text();
    let vendName = $(this).find("td:eq(2)").text();

    $("#vendor").val(vendCode);
    $("#vendorName").val(vendName);

    $("#findvendorModal").modal("hide");
  });

  //생산지시테이블 초기데이터 입력
  instTableInsert();

  function instTableInsert() {
    $.ajax({
      url: "findvInst",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);

        for (obj of data) {
          let node = `<tr>
					<td>${obj.instDate}</td>
					<td>${obj.instNo}</td>
					<td>${obj.vendCdNm}</td>
					<td>${obj.finPrdCdCode}</td>
					<td>${obj.finPrdCdName}</td>
					<td>${obj.slsOrdHdNo}</td>
					<td>${obj.slsOrdDtlDlvDate}</td>
					<td>${obj.slsOrdDtlVol}</td>
					<td>${obj.instProdIndicaVol}</td>
					<td>${obj.workScope}</td>
					<td>${obj.workDate}</td>
				</tr>`;
          $("#instTable tbody").append(node);
        }
      },
    });
  }
});
