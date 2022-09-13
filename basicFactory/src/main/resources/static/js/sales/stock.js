$(document).ready(function () {

  //완제품재고 초기데이터 입력
  stockTableInsert();

  function stockTableInsert() {
    $.ajax({
      url: "findAllStock",
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
          stockMakeRow(obj);
        }
      }
    });
  }
  
  function stockMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsInDtlDate}</td>
                    <td>${obj.finPrdCdCode}</td>
                    <td>${obj.finPrdCdName}</td>
                    <td>${obj.fnsPrdStkVol}</td>
                    <td>${obj.fnsPrdStkLotNo}</td>
                </tr>`;
    $("#stockTable tbody").append(node);
  }

  //조건에 맞는 완제품 재고 조회
  $('#stockBtn').click(function () {

    findStock();
  });

  function findStock() {
    let prdName = $('#productname').val();
    let lotNo = $('#fnsPrdStkLotNo').val();

    $.ajax({
      url: "findStock",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        prdName: prdName,
        lotNo: lotNo
      },
      error: function (error) {
        console.log(error);
      },
      success: function (data) {
        $('#stockTable tbody tr').remove();

        for (obj of data) {
          stockMakeRow(obj);
        }
      }
    });
  }
});