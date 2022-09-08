$(document).ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  findList();
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
    $("#ordtable").replaceWith(data);
   }
  })
  $("#rscOrderCode").val(null);
  $("#rsccode").val(null);
  $("#rscname").val(null);
  $("#vendor").val(null);
  $("#vendorName").val(null);
  $("#rscOrderSDate").val(null);
  $("#rscOrderEDate").val(null);
 }
})