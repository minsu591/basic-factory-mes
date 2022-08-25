$("document").ready(function () {
 $("#rsclotno").click(function (e) {
   e.preventDefault();
   let rscname = $("#rscname").val();
   if(!rscname){
     alert("자재코드를 먼저 선택해주세요.")
    }else{
      //자재조회
      findRscLot();
      $("#lotrscname").val(rscname);
      $("#findRscLotModal").modal("show");
    }
 });

 //자재코드 검색 버튼 클릭 이벤트
 $("#findRscLotBtn").click(function () {
   let rscCdUse = $("#rscCdUse option:selected").text();
   let rscCdName = $("#lotrscname").val();
   console.log(rscCdName);
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
   let rscLotNo = $(this).find("td:eq(2)").text();
   $("#rsclotno").val(rscLotNo);

   $("#findRscLotModal").modal("hide");
 });
 
});
function findRscLot() {
  let lotrscname = $("#lotrscname").val();
 $.ajax({
   url: "findRscLot",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   date : {
    lotrscname : lotrscname
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
 let node = `<tr>
             <td>${index}</td>
             <td>${obj.rscCdName}</td>
             <td>${obj.rscLotNo}</td>
             <td>${obj.rscCdUse}</td>
           </tr>`;
 $("#findRscLottbody").append(node);
}
