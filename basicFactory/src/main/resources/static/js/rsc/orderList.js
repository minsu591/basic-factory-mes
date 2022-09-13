$("document").ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  let rscOrderSDate = $("#rscReturnSDate").val();
  let rscOrderEDate = $("#rscReturnEDate").val();

  if(!rscOrderSDate){
   if(!rscOrderEDate){
    findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
   }
  }else{
   if(!rscOrderEDate){
    alert("일자 검색 범위를 확인해주세요.")
   }else {
    findList();
   }
  }
 })

 function findList(){
  let rscOrderCode = $("#rscOrderCode").val();
  let rscCdCode = $("#rsccode").val();
  let vendCdCode = $("#vendor").val();
  let rscOrderSDate = $("#rscOrderSDate").val();
  let rscOrderEDate = $("#rscOrderEDate").val();
  $.ajax({
   url : "orderListTable",
   method : "GET",
   dataType: "text",
   data: {
    rscOrderCode: rscOrderCode,
     rscCdCode: rscCdCode,
     vendCdCode: vendCdCode,
     rscOrderSDate: rscOrderSDate,
     rscOrderEDate: rscOrderEDate
   },
   success: function(data){
    console.log(data);
    $("#ordtable").replaceWith(data);
   }
  })
 }
})
