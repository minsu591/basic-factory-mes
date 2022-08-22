$(document).ready(function () {

  //출고 테이블 초기데이터 입력
  outTableInsert();

  function outTableInsert() {
    $.ajax({
      url: "findAllOut",
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
          outMakeRow(obj);
        }
      }
    });
  }
  
  function outMakeRow(obj) {
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
    $("#outTable tbody").append(node);
  }

  //조건에 맞는 출고내역 조회
  $("#outBtn").click(function() {
    findOut();
  });

  function findOut() {
    let outSdate = $("#outSdate").val();
    let outEdate = $("#outEdate").val();
    let vendorName = $("#vendorName").val();

    console.log(ordSdate);
    $.ajax({
      url: "findOut",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType : "json",
      data: {
        outSdate: outSdate,
        outEdate: outEdate,
        vendorName: vendorName
      },
      error: function(error) {
        console.log(error);
      },
      success: function (data) {
        console.log(data);
        $('#outTable tbody tr').remove();
        
        for (obj of data) {
          outMakeRow(obj);
        }
      }
    });
  }
});