$("document").ready(function () {
  //완제품 출고 관리에서 미출고 조회 시 주문내역 모달창
  $("#findNotOutBtn").on("click", function (e) {
    $("#findNotOutModal").modal("show");
    findNotOutClick();
  });

  $("#NotOutBtn").on("click", findNotOutClick);

  function findNotOutClick() {
    let ordSdate = $("#ordSdate").val();
    let ordEdate = $("#ordEdate").val();

    $.ajax({
      url: 'NotOutOrderView',
      method: "GET",
      dataType: "json",
      data: {
        ordSdate: ordSdate,
        ordEdate: ordEdate,
      },
      success: function (data) {
        console.log(data);
        $("#findNotOutTable tbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    })
  }

  //tr 클릭 이벤트
  $("#findNotOutTable").on("click", "tr", function () {
    //출고관리 테이블 상단 공통 요소 삽입
    let slsOrdHdDate = $(this).find("td:first").text();
    let slsOrdHdNo = $(this).find("td:eq(1)").text();
    let vendor = $(this).find("td:eq(2)").text();
    let vendorName = $(this).find("td:eq(3)").text();
    let empName = $(this).find("td:eq(4)").text();
    let remk = $(this).find("td:last").text();

    $("#slsOrdHdDate").val(slsOrdHdDate);
    $("#slsOrdHdDate").attr("readonly", true);
    $("#slsOrdHdNo").val(slsOrdHdNo)
    $("#vendor").val(vendor);
    $("#vendorName").val(vendorName);
    $("#vendorName").attr("readonly", true);
    $("#empid").val(empName);
    $("#empid").attr("readonly", true);
    $("#remk").val(remk);

    //테이블 삽입
    $.ajax({
      url: 'NotOutOrderView/dtl',
      method: 'GET',
      data: {
        slsOrdHdNo: slsOrdHdNo
      },
      success: function (result) {
        console.log(result);
        sucFun(result);
      }
    })
  });

  //주문내역 조회 모달 내에 데이터 출력 make row
  function modalMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsOrdHdDate}</td>
                    <td>${obj.slsOrdHdNo}</td>
                    <td>${obj.vendCdCode}</td>
                    <td>${obj.vendCdNm}</td>
                    <td>${obj.empName}</td>
                    <td>${obj.slsOrdHdRemk}</td>
                </tr>`
    $("#findNotOutTable tbody").append(node);
  }



  function sucFun(result) {
    //경고창 띄워주기
    let alertFlag = false;
    if ($("#outMngTable tbody").children().length != 0) {
      if (confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?") == true) {
        alertFlag = true;
      }
    } else {
      alertFlag = true;
    }

    if (alertFlag) {
      $("#outMngTable tbody tr").remove();
      for (ord of result) {
        outMakeRow(ord);
      }

      $("#findNotOutModal").modal("hide");
    }
  }



  //미출고 주문내역 조회 모달을 통한 데이터 출력
  function outMakeRow(ord) {
    
    let node = `<tr>
                    <td><input type="checkbox" name="cb"></td>
                    <td>${ord.slsOutDtlVO.finPrdCdCode}</td>
                    <td name="finPrdCdName">${ord.slsOutDtlVO.finPrdCdName}</td>
                    <td>${ord.slsOrdDtlVO.slsOrdDtlVol}</td>
                    <td>${ord.slsOrdDtlVO.slsOrdDtlOutVol}</td>
                    <td name="outDtlVol"></td>
                    <td></td>
                    <td class="lotNo"></td>
                    <td>${ord.slsOutDtlVO.finPrdCdPrice}</td>
                    <td></td>
                </tr>`;
    
    $("#outMngTable tbody").append(node);
  }
});
