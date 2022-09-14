
$(document).ready(function () {
 let tdinfo;
 //자재lot번호 찾기

 $("#InsertTable").on("click", ".rsclotno", function (e) {
  e.preventDefault();
  tdinfo = $(this);
  let vendor = tdinfo.parent().parent().children().eq(3).children().val();
  console.log(vendor);
  if(!vendor) {
   //거래처 미선택시 lot번호 선택 불가능
    lotNoWarning();
  }else {
   findRscLot();
   $("#findRscLotModal").modal("show");
  }
 });

 //자재코드 검색 테이블 클릭이벤트
 $("#findRscLotTable").on("click", "tr", function () {
  let rscCdCode = $(this).find("#modalrscCode").val();
  let rscCdName = $(this).find("td:eq(1)").text();
  let rscLotNo = $(this).find("td:eq(2)").text();
  let stockVol = $(this).find("#rscStock").val();
  let orderPrc = $(this).find("#orderPrc").val();
  tdinfo.parent().prev().prev().find("input").val(rscCdCode);
  tdinfo.parent().prev().find("input").val(rscCdName);
  tdinfo.val(rscLotNo);
  tdinfo.parent().next().find("input").val(stockVol);
  tdinfo.parent().next().next().next().find("input").val(orderPrc);
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
  let vendCdCode = tdinfo.parent().parent().children().eq(3).children().val();
  console.log(vendCdCode);
  $.ajax({
   url: "findRscLotToReturn",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data: {
    vendCdCode : vendCdCode,
    rscCdCode: rscCdCode,
    rscCdName: rscCdName
   },
   error: function (error, status, msg) {
    Swal.fire({
     icon: "warning", 
     title: "에러 발생",
     text : `상태코드 ${status}, 에러메시지 ${msg}`,
     confirmButtonText: "확인"
   })
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
           <input type="hidden" value="${obj.rscOrderPrc}" id="orderPrc">
         </tr>`;
  $("#findRscLottbody").append(node);
 }

 
function lotNoWarning() {
 Swal.fire({
   icon: "warning", 
   title: "거래처를 먼저 선택해주세요", 
   confirmButtonText: "확인",
 })
}
})
