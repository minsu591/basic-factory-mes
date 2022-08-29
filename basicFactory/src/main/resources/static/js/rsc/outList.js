$("document").ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  let rscOutSDate = $("#rscOutSDate").val();
  let rscOutEDate = $("#rscOutEDate").val();

  if(!rscOutSDate){
   if(!rscOutEDate){
    findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
   }
  }else{
   if(!rscOutEDate){
    alert("일자 검색 범위를 확인해주세요.")
   }else {
    findList();
   }
  }
 })

 function findList(){
  let rscOutCode = $("#rscOutCode").val();
  let rscCdCode = $("#rsccode").val();
  let rscOutSDate = $("#rscOutSDate").val();
  let rscOutEDate = $("#rscOutEDate").val();
  $.ajax({
   url : "outListTable",
   method : "GET",
   dataType: "text",
   data: {
    rscOutCode: rscOutCode,
     rscCdCode: rscCdCode,
     rscOutSDate: rscOutSDate,
     rscOutEDate: rscOutEDate
   },
   success: function(data){
    $("#outlisttable").replaceWith(data);
   }
  })
  $("#rscOutCode").val(null);
  $("#rsccode").val(null);
  $("#rscname").val(null);
  $("#rscOutSDate").val(null);
  $("#rscOutEDate").val(null);
 }

})