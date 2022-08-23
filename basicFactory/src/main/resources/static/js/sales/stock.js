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
                    <td>${obj.slsInDtlRemk}</td>
                </tr>`;
    $("#stockTable tbody").append(node);
  }
});