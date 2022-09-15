$("document").ready(function(){
 //조회버튼 실행
//  $("#search").click(function(){
//   let rscCdCode = $("#rsccode").val();
//   let rscLotNo = $("#rsclotno").val();
//   $.ajax({
//    url : "stockTable",
//    method : "GET",
//    dataType: "text",
//    data: {
//      rscCdCode: rscCdCode,
//      rscLotNo: rscLotNo
//    },
//    success: function(data){
//     $("#sttable").replaceWith(data);
//    }
//   })
//  })

$("#search").click(function(e) {
  e.preventDefault();
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  $("input:hidden[name=keyword]").val($("#rsccode").val());
  $("input:hidden[name=keyword2]").val($("#rsclotno").val());
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
});
})