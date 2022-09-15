$("document").ready(function(){

 //조회버튼 실행
//  $("#search").click(function(){
//   let rscInSDate = $("#rscInSDate").val();
//   let rscInEDate = $("#rscInEDate").val();

//   if(!rscInSDate){
//    if(!rscInEDate){
//     findList();
//    } else {
//     alert("일자 검색 범위를 확인해주세요.");
//    }
//   }else{
//    if(!rscInEDate){
//     alert("일자 검색 범위를 확인해주세요.")
//    }else {
//     findList();
//    }
//   }
//  })

//  function findList(){
//   let rscInCode = $("#rscInCode").val();
//   let rscCdCode = $("#rsccode").val();
//   let rscInSDate = $("#rscInSDate").val();
//   let rscInEDate = $("#rscInEDate").val();

//   $.ajax({
//    url : "inListTable",
//    method : "GET",
//    dataType: "text",
//    data: {
//      rscInCode: rscInCode,
//      rscCdCode: rscCdCode,
//      rscInSDate: rscInSDate,
//      rscInEDate: rscInEDate
//    },
//    success: function(data){
//     $("#inlisttable").replaceWith(data);
//    }
//   })
//  }

 $("#search").click(function(e) {
  e.preventDefault();
  let rscInSDate = $("#rscInSDate").val();
  let rscInEDate = $("#rscInEDate").val();

  if(!rscInSDate){
   if(!rscInEDate){
    // findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
    return false;
   }
  }else{
   if(!rscInEDate){
    alert("일자 검색 범위를 확인해주세요.");
    return false;
   }else {
    // findList();
   }
  }
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  //발주코드
  $("input:hidden[name=keyword]").val($("#rscInCode").val());
  //발주일자
  $("input:hidden[name=keyword2]").val($("#rsccode").val());
  $("input:hidden[name=keyword3]").val(rscInSDate);
  $("input:hidden[name=keyword4]").val(rscInEDate);
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
});

});