$("document").ready(function () {
 $("#rsccode").click(function (e) {
   e.preventDefault();
   //자재조회
   findRscCode();
   $("#findresourceModal").modal("show");
 });

 //자재코드 검색 버튼 클릭 이벤트
 $("#findRscBtn").click(function () {
   let rscCdClfy = $("#rscCdClfy option:selected").text();
   let rscCdName = $("#rscCdName").val();
   console.log(rscCdName);
   $.ajax({
     url: "findResourceCode",
     method: "GET",
     contentType: "application/json;charset=utf-8",
     dataType: "json",
     data: {
       rscCdName: rscCdName,
       rscCdClfy: rscCdClfy
     },
     error: function (error, status, msg) {
       alert("상태코드 " + status + "에러메시지" + msg);
     },
     success: function (data) {
       console.log("검색조건 데이타 _ >" + data);
       let index = 0;
       $("#findRsctbody tr").remove();
       for (obj of data) {
         index += 1;
         makeRscCodeRow(obj, index);
       }
     },
   });
 });

 //자재코드 검색 테이블 클릭이벤트
 $("#findRscTable").on("click", "tr", function () {
   let rscCdCode = $(this).find("td:eq(1)").text();
   let rscCdName = $(this).find("td:eq(2)").text();
   $("#rsccode").val(rscCdCode);
   $("#rscname").val(rscCdName);
   $("#rsclotno").val(null);

   $("#findresourceModal").modal("hide");
 });
 
 //rsccode input 내용이 사라지면 rscName 내용도 사라지는 이벤트
$("#rsccode").on("change",function(){
    if($("#rsccode").val()==''){
        $("#rscname").val('');
    }
});
 
 
});
function findRscCode() {
 $.ajax({
   url: "findResourceCode",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   error: function (error, status, msg) {
     alert("상태코드 " + status + "에러메시지" + msg);
   },
   success: function (data) {
     console.log(data);
     $("#findRsctbody tr").remove();
     let index = 0;
     for (obj of data) {
       index += 1;
       makeRscCodeRow(obj, index);
     }
   },
 });
}
//자재조회 행생성
function makeRscCodeRow(obj, index) {
  let st = null;
  if( obj.rscCdUse == 1){
    st = `<input type="checkbox" checked onClick="return false;">`;
  }else{
    st = `<input type="checkbox" onClick="return false;">`;
  }
 let node = `<tr>
             <td>${index}</td>
             <td>${obj.rscCdCode}</td>
             <td>${obj.rscCdName}</td>
             <td>${obj.rscCdClfy}</td>
             <td>${st}</td>
           </tr>`;
 $("#findRsctbody").append(node);
}
