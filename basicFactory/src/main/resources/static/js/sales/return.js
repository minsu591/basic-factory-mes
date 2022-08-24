$(document).ready(function () {

  //반품테이블 초기데이터 입력
  returnTableInsert();

  function returnTableInsert() {
    $.ajax({
      url: "findAllReturn",
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
          returnMakeRow(obj);
        }
      }
    });
  }
  
  function returnMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsRtnHdVO.slsRtnHdDate}</td>
                    <td>${obj.slsRtnHdVO.slsRtnHdNo}</td>
                    <td>${obj.slsRtnHdVO.vendCdNm}</td>
                    <td>${obj.slsRtnDtlVO.finPrdCdCode}</td>
                    <td>${obj.slsRtnDtlVO.finPrdCdName}</td>
                    <td>${obj.slsRtnHdVO.slsOutHdNo}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlVol}</td>
                    <td>${obj.slsRtnDtlVO.slsFinPrdCdPrice}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlPrice}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlPrcCls}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlResn}</td>
                    <td>${obj.slsRtnHdVO.empName}</td>
					          <td>${obj.slsRtnHdVO.slsRtnHdRemk}</td>
                </tr>`;
    $("#returnTable tbody").append(node);
  }

  //조건에 맞는 주문내역 조회
  $("#rtnBtn").click(function() {
    findReturn();
  });

  function findReturn() {
    let rtnSdate = $("#rtnSdate").val();
    let rtnEdate = $("#rtnEdate").val();
    let prcCls = $('#prcCls').val();
    let vendorName = $("#vendorName").val();
    
    console.log(prcCls);
    
    $.ajax({
      url: "findReturn",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType : "json",
      data: {
        rtnSdate: rtnSdate,
        rtnEdate: rtnEdate,
        prcCls: prcCls,
        vendorName: vendorName
      },
      error: function(error) {
        console.log(error);
      },
      success: function (data) {
        console.log(data);
        $('#returnTable tbody tr').remove();
        
        for (obj of data) {
          returnMakeRow(obj);
        }
      }
    });
  }
});