$("document").ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  let rscInspSDate = $("#rscInspSDate").val();
  let rscInspEDate = $("#rscInspEDate").val();

  if(!rscInspSDate){
   if(!rscInspEDate){
    findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
   }
  }else{
   if(!rscInspEDate){
    alert("일자 검색 범위를 확인해주세요.")
   }else {
    findList();
   }
  }
 })

 function findList(){
  let rscInspCode = $("#rscInspCode").val();
  let rscCdCode = $("#rsccode").val();
  let rscInspSDate = $("#rscInspSDate").val();
  let rscInspEDate = $("#rscInspEDate").val();
  $.ajax({
   url : "inspListTable",
   method : "GET",
   dataType: "text",
   data: {
     rscInspCode: rscInspCode,
     rscCdCode: rscCdCode,
     rscInspSDate: rscInspSDate,
     rscInspEDate: rscInspEDate
   },
   success: function(data){
    $("#insplisttable").replaceWith(data);
   }
  })
  $("#rscInspCode").val(null);
  $("#rsccode").val(null);
  $("#rscname").val(null);
  $("#rscInspSDate").val(null);
  $("#rscInspEDate").val(null);
 }


})