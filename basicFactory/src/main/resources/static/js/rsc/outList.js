$("document").ready(function(){
  
  
  //들어오자마자 
  console.log($("#myTab .active").text());
  if($("input:hidden[name=type]").val() == 'E'){
    $("#myTab li:eq(1) a").trigger("click");
  }

  //조회버튼 실행
  $("#search").click(function(){
    let rscOutCode = $("#rscOutCode").val();
    let rscCdCode = $("#rsccode").val();
    let rscOutSDate = $("#rscOutSDate").val();
    let rscOutEDate = $("#rscOutEDate").val();
    
  if(!rscOutSDate){
   if(!rscOutEDate){
    // findList();
   } else {
    dateWarning();
    return false;
   }
  }else{
   if(!rscOutEDate){
    dateWarning();
    return false;
   }else {
    // findList();
    if (rscOutSDate > rscOutEDate) {
      dateWarning2();
      return false;
    }
   }
  }

  e.preventDefault();
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  $("input:hidden[name=keyword]").val(rscOutCode);
  $("input:hidden[name=keyword2]").val(rscOutSDate);
  $("input:hidden[name=keyword3]").val(rscOutEDate);
  $("input:hidden[name=keyword4]").val(rscCdCode);
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
 })


 $("#myTab").on("click","li",function(){
  console.log("hello")
  $(".pagination input:hidden[name=pageNum]").val(1);
 });
//  function findList(){

//   let rscOutSDate = $("#rscOutSDate").val();
//   let rscOutEDate = $("#rscOutEDate").val();
//   $.ajax({
//    url : "outListTable",
//    method : "GET",
//    dataType: "text",
//    data: {
//     rscOutCode: rscOutCode,
//      rscCdCode: rscCdCode,
//      rscOutSDate: rscOutSDate,
//      rscOutEDate: rscOutEDate
//    },
//    success: function(data){
//     $("#outlisttable").replaceWith(data);
//    }
//   })
//  }


 function dateWarning() {
  Swal.fire({
    icon: "warning",
    title: "일자 검색값 확인",
    text : "입력값이 부족합니다.",
    confirmButtonText: "확인",
  })
}

function dateWarning2() {
  Swal.fire({
    icon: "warning",
    title: "일자 검색 범위 확인",
    html : "시작날짜는 마침날짜보다 작아야합니다.",
    confirmButtonText: "확인",
  })
}
})