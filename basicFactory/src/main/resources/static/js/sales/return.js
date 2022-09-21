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
        for (obj of data) {
          returnMakeRow(obj);
        }
        $("#remo").remove();
        page();
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
    console.log('클릭');
    let rtnSdate = $("#rtnSdate").val();
    let rtnEdate = $("#rtnEdate").val();
    let vendorName = $("#vendorName").val();
    let prcCls = $("#prcCls option:selected").val();
    
    if (rtnSdate != null && rtnSdate != '' && rtnEdate != null && rtnEdate != '') {
      if (rtnSdate > rtnEdate) {
        if (rtnDateChecked()) {
          dateReset();
          return false;
        }
      }
    } else if (rtnSdate != null && rtnSdate != '') {
      if (rtnEdate == null || rtnEdate == '') {
        dateWarning();
        dateReset();
        return false;
      }
    } else if (rtnEdate != null && rtnEdate != '') {
      if (rtnSdate == null || rtnSdate == '') {
        dateWarning();
        dateReset();
        return false;
      }
    }
    findReturn(rtnSdate, rtnEdate, vendorName, prcCls);
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
        $("#remo").remove();
        page();
      }
    });
  }

  function rtnDateChecked() {
    Swal.fire({
      icon: "warning",
      title: "잘못된 검색 조건입니다."
    });
    return true;
  }

  function dateWarning() {
    Swal.fire({
      icon: "warning",
      title: "일자 검색값 확인",
      text: "입력값이 부족합니다.",
      confirmButtonText: "확인",
    })
  }

  function dateReset() {
    $("#rtnSdate").val('');
    $("#rtnEdate").val('');
  }
});