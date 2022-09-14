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
        for (obj of data) {
          outMakeRow(obj);
        }
      }
    });
  }
  
  function outMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsOutHdVO.slsOutHdDate}</td>
                    <td>${obj.slsOutHdVO.slsOutHdNo}</td>
                    <td>${obj.slsOutHdVO.vendCdNm}</td>
                    <td>${obj.slsOutDtlVO.finPrdCdCode}</td>
                    <td>${obj.slsOutDtlVO.finPrdCdName}</td>
                    <td>${obj.slsOutHdVO.slsOrdHdNo}</td>
                    <td>${obj.slsOutDtlVO.slsOrdDtlVol}</td>
                    <td>${obj.slsOutDtlVO.slsOutDtlPrvsVol}</td>
                    <td>${obj.slsOutDtlVO.slsOutDtlVol}</td>
                    <td>${(obj.slsOutDtlVO.slsOrdDtlVol - obj.slsOutDtlVO.slsOutDtlPrvsVol) - obj.slsOutDtlVO.slsOutDtlVol}</td>
                    <td>${obj.slsOutDtlVO.fnsPrdStkLotNo}</td>
                    <td>${obj.slsOutDtlVO.finPrdCdPrice}</td>
					          <td>${obj.slsOutDtlVO.slsOutDtlPrice}</td>
                    <td>${obj.slsOutHdVO.empName}</td>
                    <td>${obj.slsOutHdVO.slsOutHdRemk}</td>
                </tr>`;
    $("#outTable tbody").append(node);
  }

  //조건에 맞는 출고내역 조회
  $("#outBtn").click(function () {
    let outSdate = $("#outSdate").val();
    let outEdate = $("#outEdate").val();
    let vendorName = $("#vendorName").val();

    if (outSdate != null && outSdate != '' && outEdate != null && outEdate != '') {
      if (outSdate > outEdate) {
        outDateChecked();
      } else {
        findOut(outSdate, outEdate, vendorName);
      }
    } else if (outSdate == null || outSdate == '' && outEdate == null || outEdate == '' && vendorName == null || vendorName == '') { 
      selectChecked();
    } else {
      findOut(outSdate, outEdate, vendorName);
    }
  });

  function findOut(outSdate, outEdate, vendorName) {


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

  function selectChecked() {
    Swal.fire({
      icon: "warning",
      title: "조회 조건을 입력해주세요."
    });
    return false;
  }

  function outDateChecked() {
    Swal.fire({
      icon: "warning",
      title: "잘못된 검색 조건입니다."
    });
    $("#outSdate").val('');
    $("#outEdate").val('');
    return false;
  }
});