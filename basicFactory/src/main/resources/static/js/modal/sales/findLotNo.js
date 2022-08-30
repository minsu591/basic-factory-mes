$("document").ready(function () {

  let lotNoTdInfo;
  //완제품 출고 관리에서 lot별 완제품 재고 모달창
  $("#outMngTable").on("click", ".lotNo", function (e) {
    e.preventDefault();
    $("#findLotModal").modal("show");
    lotNoTdInfo = $(this);
    findLotClick();
  });



  function findLotClick() {
    let prdCdName = lotNoTdInfo.parent().parent().find("td:eq(2)").text();

    $.ajax({
      url: 'findStock',
      method: "GET",
      dataType: "json",
      data: {
        prdName: prdCdName
      },
      success: function (data) {
        console.log(data);
        $("#findLotTable tbody tr").remove();

        stockSum = 0;

        for (obj of data) {
          findLotNoModalMakeRow(obj);
        }
        
      }
    })
  }

  //tr 클릭 이벤트
  $("#findLotTable").on("click", "tr", function (e) {
    
    //해당 tr의 2번째 td(제품명)
    let lotNo = $(this).find("td:eq(2)").text();
  });

  //lot별 완제품 재고 모달창 데이터 출력 make row
  function findLotNoModalMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsInDtlDate}</td>
                    <td>${obj.finPrdCdName}</td>
                    <td>${obj.fnsPrdStkLotNo}</td>
                    <td>${obj.fnsPrdStkVol}</td>
                    <td><input type="text" class="stockOutVol"></td>
                </tr>`
    $("#findLotTable tbody").append(node);
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
});
