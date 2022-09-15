$("document").ready(function(){
 
 //조회버튼 실행
//  $("#search").click(function(){
//   let rscInspSDate = $("#rscInspSDate").val();
//   let rscInspEDate = $("#rscInspEDate").val();

//   if(!rscInspSDate){
//    if(!rscInspEDate){
//     findList();
//    } else {
//     alert("일자 검색 범위를 확인해주세요.");
//    }
//   }else{
//    if(!rscInspEDate){
//     alert("일자 검색 범위를 확인해주세요.")
//    }else {
//     findList();
//    }
//   }
//  })

//  function findList(){
//   let rscInspCode = $("#rscInspCode").val();
//   let rscCdCode = $("#rsccode").val();
//   let rscInspSDate = $("#rscInspSDate").val();
//   let rscInspEDate = $("#rscInspEDate").val();
//   $.ajax({
//    url : "inspListTable",
//    method : "GET",
//    dataType: "text",
//    data: {
//      rscInspCode: rscInspCode,
//      rscCdCode: rscCdCode,
//      rscInspSDate: rscInspSDate,
//      rscInspEDate: rscInspEDate
//    },
//    success: function(data){
//     $("#insplisttable").replaceWith(data);
//    }
//   })
//   $("#rscInspCode").val(null);
//   $("#rsccode").val(null);
//   $("#rscname").val(null);
//   $("#rscInspSDate").val(null);
//   $("#rscInspEDate").val(null);
//  }

 $("#search").click(function(e) {
  e.preventDefault();
  let rscInspSDate = $("#rscInspSDate").val();
  let rscInspEDate = $("#rscInspEDate").val();

  if(!rscInspSDate){
   if(!rscInspEDate){
    // findList();
   } else {
    alert("일자 검색 범위를 확인해주세요.");
    return false;
   }
  }else{
   if(!rscInspEDate){
    alert("일자 검색 범위를 확인해주세요.");
    return false;
   }else {
    // findList();
   }
  }
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  //발주코드
  $("input:hidden[name=keyword]").val($("#rscInspCode").val());
  //발주일자
  $("input:hidden[name=keyword2]").val($("#rsccode").val());
  $("input:hidden[name=keyword3]").val(rscInspSDate);
  $("input:hidden[name=keyword4]").val(rscInspEDate);
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
});


})