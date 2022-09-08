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
      success: function (data) {
        console.log(data);
        for (obj of data) {
          console.log(obj);
          orderMakeRow(obj);
        }
      }
    });
  }
  
  function orderMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsOrdHdVO.slsOrdHdDate}</td>
                    <td>${obj.slsOrdHdVO.slsOrdHdNo}</td>
                    <td>${obj.slsOrdHdVO.vendCdNm}</td>
                    <td>${obj.slsOrdDtlVO.finPrdCdCode}</td>
                    <td>${obj.slsOrdDtlVO.finPrdCdName}</td>
                    <td>${obj.slsOrdDtlVO.slsOrdDtlDlvDate}</td>
                    <td>${obj.slsOrdDtlVO.slsOrdDtlVol}</td>
                    <td>${obj.slsOrdDtlVO.slsOrdDtlOutVol}</td>
                    <td>${obj.slsOrdDtlVO.slsOrdDtlVol - obj.slsOrdDtlVO.slsOrdDtlOutVol}</td>
                    <td>${obj.slsOrdHdVO.empName}</td>
					<td>${obj.slsOrdHdVO.slsOrdHdRemk}</td>
                </tr>`;
    $("#orderTable tbody").append(node);
  }

  //조건에 맞는 주문내역 조회
  $("#ordBtn").click(function() {
    findOrder();
  });

  function findOrder() {
    let ordSdate = $("#orderSdate").val();
    let ordEdate = $("#orderEdate").val();
    let vendorName = $("#vendorName").val();

    console.log(ordSdate);
    $.ajax({
      url: "findOrder",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType : "json",
      data: {
        ordSdate: ordSdate,
        ordEdate: ordEdate,
        vendorName: vendorName
      },
      error: function(error) {
        console.log(error);
      },
      success: function (data) {
        console.log(data);
        $('#orderTable tbody tr').remove();
        
        for (obj of data) {
          orderMakeRow(obj);
        }
      }
    });
  }
});