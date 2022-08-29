$("document").ready(function(){
 
 //조회버튼 실행
 $("#search").click(function(){
  let rscReturnSDate = $("#rscReturnSDate").val();
  let rscReturnEDate = $("#rscReturnEDate").val();

  if(!rscReturnSDate){
   if(!rscReturnEDate){
    findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
   }
  }else{
   if(!rscReturnEDate){
    alert("일자 검색 범위를 확인해주세요.")
   }else {
    findList();
   }
  }
 })

 function findList(){
  let rscReturnCode = $("#rscReturnCode").val();
  let vendor = $("#vendor").val();
  let rscReturnSDate = $("#rscReturnSDate").val();
  let rscReturnEDate = $("#rscReturnEDate").val();
  $.ajax({
   url : "returnListTable",
   method : "GET",
   dataType: "text",
   data: {
    rscReturnCode: rscReturnCode,
    vendor: vendor,
    rscReturnSDate: rscReturnSDate,
    rscReturnEDate: rscReturnEDate
   },
   success: function(data){
    $("#returnlisttable").replaceWith(data);
    console.log(data)
   }
  })
  $("#rscReturnCode").val(null);
  $("#vendor").val(null);
  $("#vendorName").val(null);
  $("#rscReturnSDate").val(null);
  $("#rscReturnEDate").val(null);
 }

})