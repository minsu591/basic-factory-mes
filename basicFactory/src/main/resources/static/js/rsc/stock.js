$("document").ready(function(){
 //조회버튼 실행
 $("#search").click(function(){
  let rscCdCode = $("#rsccode").val();
  let rscLotNo = $("#rsclotno").val();
  $.ajax({
   url : "stockTable",
   method : "GET",
   dataType: "text",
   data: {
     rscCdCode: rscCdCode,
     rscLotNo: rscLotNo
   },
   success: function(data){
    $("#sttable").replaceWith(data);
   }
  })
  $("#rsccode").val(null);
  $("#rscname").val(null);
  $("#rsclotno").val(null);
 })
})