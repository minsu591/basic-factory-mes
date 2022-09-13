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
    let slsRtnDtlPrcCls = obj.slsRtnDtlVO.slsRtnDtlPrcCls;
    let node = `<tr>
                    <td>${obj.slsRtnHdVO.slsRtnHdDate}</td>
                    <td>${obj.slsRtnHdVO.slsRtnHdNo}</td>
                    <td>${obj.slsRtnHdVO.vendCdNm}</td>
                    <td>${obj.slsRtnDtlVO.finPrdCdCode}</td>
                    <td>${obj.slsRtnDtlVO.finPrdCdName}</td>
                    <td>${obj.slsRtnHdVO.slsOutHdNo}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlVol}</td>
                    <td>${obj.slsRtnDtlVO.finPrdCdPrice}</td>
                    <td>${obj.slsRtnDtlVO.slsRtnDtlPrice}</td>`
        if(slsRtnDtlPrcCls == 0) {
          node += `<td>폐기</td>`;
        } else if(slsRtnDtlPrcCls == 1) {
          node += `<td>입고</td>`;
        } else {
          node += `<td>거부</td>`;
        }
          node +=   `<td>${obj.slsRtnDtlVO.slsRtnDtlResn}</td>
                     <td>${obj.slsRtnHdVO.empName}</td>
					           <td>${obj.slsRtnHdVO.slsRtnHdRemk}</td>
                </tr>`;
    $("#returnTable tbody").append(node);
  }

  //조건에 맞는 주문내역 조회
  $("#rtnBtn").click(function () {
    let rtnSdate = $("#rtnSdate").val();
    let rtnEdate = $("#rtnEdate").val();
    let vendorName = $("#vendorName").val();
    let prcCls = $("#prcCls option:selected").val();
    if (rtnSdate != null && rtnSdate != '' && rtnEdate !== null && rtnEdate != '') {
      if (vendorName == null || vendorName == '') {
        vendorName = null;
      } else if (prcCls == 3) {
        prcCls == null;
      }
      findReturn(rtnSdate, rtnEdate, vendorName, prcCls);
    } else {
      alert('날짜를 선택해주세요');
      return false;
    }
  });

  function findReturn(rtnSdate, rtnEdate, vendorName, prcCls) {
    $.ajax({
      url: "findReturn",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType : "json",
      data: {
        rtnSdate,
        rtnEdate,
        prcCls,
        vendorName
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