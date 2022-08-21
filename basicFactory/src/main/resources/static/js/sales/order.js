$(document).ready(function () {

  //주문테이블 초기데이터 입력
  orderTableInsert();

  function orderTableInsert() {
    $.ajax({
      url: "findAllOrder",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function(error) {
        console.log(error);
      },
      success: function(data) {
        for (obj of data) {
          let node = `<tr>
                        <td>${obj.slsOrdHdVO.slsOrdHdDate}</td>
                        <td>${obj.slsOrdHdVO.slsOrdHdNo}</td>
                        <td>${obj.slsOrdHdVO.vendCdNm}</td>
                        <td>${obj.slsOrdDtlVO.finPrdCdCode}</td>
                        <td>${obj.slsOrdDtlVO.finPrdCdName}</td>
                        <td>${obj.slsOrdDtlVO.slsOrdDtlDlvDate}</td>
                        <td>${obj.slsOrdDtlVO.slsOrdDtlVol}</td>
                        <td>${obj.slsOrdDtlVO.slsOrdDtlOutVol}</td>
                        <td>${obj.slsOrdDtlVO.slsOrdDtlNotOutVol}</td>
                        <td>${obj.slsOrdHdVO.empName}</td>
						<td>${obj.slsOrdHdVO.slsOrdHdRemk}</td>
                      </tr>`;
          $("#orderTable tbody").append(node);
        }
      }
    });
  }

  $("#vendor").click(function (e) {
	e.preventDefault();
	findVendorCode();
	$("#findvendorModal").modal("show");
  });

  //거래처조회
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
  
  //거래처코드 검색 테이블 클릭이벤트
  $("#findVendorTable").on("click", "tr", function () {
    let vendCode = $(this).find("td:eq(1)").text();
    let vendName = $(this).find("td:eq(2)").text();

    $("#vendor").val(vendCode);
    $("#vendorName").val(vendName);

    $("#findvendorModal").modal("hide");
  });
  
  //조건에 맞는 주문내역 조회
  $("#ordBtn").on("click", function() {
    findOrder();
  });

  function findOrder() {
    let params = $('#ordSelectForm').serialize();
    console.log(params);
    $.ajax({
      url: "findOrder",
      method: "POST",
      data: params,
      dataType : "json",
      error: function(error) {
        console.log(error);
      },
      success: function(data) {
        console.log(data + "data!!!!!!");
      }
    });
  }
});