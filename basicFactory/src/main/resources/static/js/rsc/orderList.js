$(document).ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  findList();
 })

 function findList(){
  let rscOrderCode = $("#rscOrderCode").val();
  let rscCdCode = $("#rsccode").val();
  let vendCdCode = $("#vendor").val();
  console.log(rscCdCode);
  $.ajax({
   url : "orderListTable",
   method : "GET",
   dataType: "text",
   data: {
    rscOrderCode: rscOrderCode,
     rscCdCode: rscCdCode,
     vendCdCode: vendCdCode
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
 }
})