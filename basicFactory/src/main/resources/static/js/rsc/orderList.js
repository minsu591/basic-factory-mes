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
  });
 }

 $("#search").click(function(e) {
  e.preventDefault();
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  //발주코드
  $("input:hidden[name=keyword]").val($("#rscOrderCode").val());
  //발주일자
  $("input:hidden[name=keyword2]").val($("#rscOrderSDate").val());
  $("input:hidden[name=keyword3]").val($("#rscOrderEDate").val());
  $("input:hidden[name=keyword4]").val($("#vendor").val());
  $("input:hidden[name=keyword5]").val($("#rsccode").val());
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
});
});
