
$(document).ready(function () {

 //자재lot번호 찾기

 $("#InsertTable").on("click", ".rsclotno", function (e) {
  e.preventDefault();
  tdinfo = $(this);
  findRscLot();
  $("#findRscLotModal").modal("show");
 });

 //자재코드 검색 테이블 클릭이벤트
 $("#findRscLotTable").on("click", "tr", function () {
  let rscCdCode = $(this).find("#modalrscCode").val();
  let rscCdName = $(this).find("td:eq(1)").text();
  let rscLotNo = $(this).find("td:eq(2)").text();
  let stockVol = $(this).find("#rscStock").val();
  tdinfo.parent().prev().prev().find("input").val(rscCdCode);
  tdinfo.parent().prev().find("input").val(rscCdName);
  tdinfo.val(rscLotNo);
  tdinfo.parent().next().find("input").val(stockVol);
  $("#findRscLotModal").modal("hide");
 });

 //rsclotcode input 내용이 사라지면 다른 내용도 사라지는 이벤트
 $("#InsertTable").on("change", ".rsclotno", function () {
  tdinfo = $(this);
  let rsclotno = $(".rsclotno").text();
  if (!rsclotno) {
   tdinfo.parent().next().find("input").val("");
   tdinfo.parent().prev().find("input").val("");
   tdinfo.parent().prev().prev().find("input").val("");
  }
 });

 //조회버튼 클릭 이벤트
 $("#findRscLotBtn").click(function () {
  findRscLot();
 })


 function findRscLot() {
  let rscCdCode = $("#lotrsccode").val();
  let rscCdName = $("#lotrscname").val();
  $.ajax({
   url: "findCanRscLot",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data: {
    rscCdCode: rscCdCode,
    rscCdName: rscCdName
   },
   error: function (error, status, msg) {
    alert("상태코드 " + status + "에러메시지" + msg);
   },
   success: function (data) {
    console.log(data);
    $("#findRscLottbody tr").remove();
    let index = 0;
    for (obj of data) {
     index += 1;
     makeRscLotRow(obj, index);
    }
   },
  });
 }

 //자재lot조회 행생성
 function makeRscLotRow(obj, index) {
  let st = null;
  if (obj.rscStockSt == 1) {
   st = `<input type="checkbox" checked onClick="return false;">`;
  } else {
   st = `<input type="checkbox" onClick="return false;">`;
  }
  let node = `<tr>
           <td>${index}</td>
           <td>${obj.rscCdName}</td>
           <td>${obj.rscLotNo}</td>
           <td>${st}</td>
           <input type="hidden" value="${obj.rscStock}" id="rscStock">
           <input type="hidden" value="${obj.rscCdCode}" id="modalrscCode">
         </tr>`;
  $("#findRscLottbody").append(node);
 }

})
