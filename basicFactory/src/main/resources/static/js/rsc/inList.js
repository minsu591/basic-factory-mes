$("document").ready(function(){

 //조회버튼 실행
 $("#search").click(function(){
  let rscInSDate = $("#rscInSDate").val();
  let rscInEDate = $("#rscInEDate").val();

  if(!rscInSDate){
   if(!rscInEDate){
    findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
   }
  }else{
   if(!rscInEDate){
    alert("일자 검색 범위를 확인해주세요.")
   }else {
    findList();
   }
  }
 })

 function findList(){
  let rscInCode = $("#rscInCode").val();
  let rscCdCode = $("#rsccode").val();
  let rscInSDate = $("#rscInSDate").val();
  let rscInEDate = $("#rscInEDate").val();

  $.ajax({
   url : "inListTable",
   method : "GET",
   dataType: "text",
   data: {
     rscInCode: rscInCode,
     rscCdCode: rscCdCode,
     rscInSDate: rscInSDate,
     rscInEDate: rscInEDate
   },
   success: function(data){
    $("#inlisttable").replaceWith(data);
   }
  })
 }


})