$("document").ready(function () {
  $("#rsclotno").click(function (e) {
    e.preventDefault();
    let rsccode = $("#rsccode").val();
    let rscname = $("#rscname").val();
      //자재조회
      findRscLot();
      $("#lotrsccode").val(rsccode);
      $("#lotrscname").val(rscname);
      $("#findRscLotModal").modal("show");
 });

 //자재코드 검색 버튼 클릭 이벤트
 $("#findRscLotBtn").click(function () {
   let rscCdUse = $("#rscCdUse option:selected").text();
   let rscCdName = $("#lotrscname").val();
   $.ajax({
     url: "findRscLot",
     method: "GET",
     contentType: "application/json;charset=utf-8",
     dataType: "json",
     data: {
       rscCdName: rscCdName,
       rscCdUse: rscCdUse
     },
     error: function (error, status, msg) {
       alert("상태코드 " + status + "에러메시지" + msg);
     },
     success: function (data) {
       console.log("검색조건 데이타 _ >" + data);
       let index = 0;
       $("#findRscLottbody tr").remove();
       for (obj of data) {
         index += 1;
         makeRscLotRow(obj, index);
       }
     },
   });
 });

 //자재코드 검색 테이블 클릭이벤트
 $("#findRscLotTable").on("click", "tr", function () {
  let rscCdCode = $(this).find("#modalrscCode").val();
  let rscCdName = $(this).find("td:eq(1)").text();
   let rscLotNo = $(this).find("td:eq(2)").text();
   let stockVol = $(this).find("#rscStock").val();
   $("#rsccode").val(rscCdCode);
   $("#rscname").val(rscCdName);
   $("#rsclotno").val(rscLotNo);
   $("#stockVol").val(stockVol);
   $("#findRscLotModal").modal("hide");
 });
 
});

function findRscLot() {
  let rscCdName = $("#rscname").val();
 $.ajax({
   url: "findRscLot",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data : {
    rscCdName : rscCdName
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
//자재조회 행생성
function makeRscLotRow(obj, index) {
  let st = null;
  if( obj.rscStockSt == 1){
    st = `<input type="checkbox" checked onClick="return false;">`;
  }else{
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
