$("document").ready(function () {

  let lotNoTdInfo;
  let stockSum = 0;
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
        
        stockVolSumMakeRow();

        let stockOutVolSum = parseInt(0);

        $(".stockOutVol").on("focusout", function () {

          $(".stockOutVol").each(function (el) {
            if (!isNaN(this.value) && this.value !== '') {
              stockOutVolSum += parseInt(this.value);
            } else {
              console.log("0");
              return 0;
            }
            $("#stockOutVolSum").text(stockOutVolSum);
          });
        });
        
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

    //완제품 재고수량 합계
    stockSum += obj.fnsPrdStkVol;
  }

  //완제품 재고 합계
  function stockVolSumMakeRow() {
    let node = `<tr>
                  <td colspan="3">총 합계:</td>
                  <td id="stockVolSum"></td>
                  <td id="stockOutVolSum"></td>
                </tr>`
    $("#findLotTable tbody").append(node);
    $("#stockVolSum").text(stockSum);
  }

  //입력된 출고량 합계
  // function stockOutVolSum() {
  //   let stockOutVolSum = 0;

  //   $(".stockOutVol").on("keyup", function () {
  //     this.value = this.value.replace(/[^0-9]/g, '');
  //     $(".stockOutVol").each(function () {
  //       if (!isNaN(this.value) && this.value !== '') {
  //         stockOutVolSum += this.value;
  //       } else {
  //         return 0;
  //       }
  //       $("#stockOutVolSum").val(stockOutVolSum);
  //     });
  //   });
  // }

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
