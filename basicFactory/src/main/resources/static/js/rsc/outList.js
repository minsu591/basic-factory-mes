$("document").ready(function(){
  
  //조회버튼 실행
  $("#search").click(function(){
    let rscOutSDate = $("#rscOutSDate").val();
    let rscOutEDate = $("#rscOutEDate").val();
    
  if(!rscOutSDate){
   if(!rscOutEDate){
    findList();
   } else {
    dateWarning();
    return false;
   }
  }else{
   if(!rscOutEDate){
    dateWarning();
    return false;
   }else {
    findList();
    if (rscOutSDate > rscOutEDate) {
      dateWarning2();
      return false;
    }
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