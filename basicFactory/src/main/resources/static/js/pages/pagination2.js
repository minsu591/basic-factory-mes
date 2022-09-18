$("document").ready(function () {
  //페이지 번호 클릭시 현재 검색하고있는 타입,키워드를 같이 보내줌
  $(".pagination").on("click", 'a', function () {
    console.log($("#pageForm"));
    let pageNum;
    if ($(this).parent().hasClass("page-number")) {
      pageNum = $(this).text();
    } else {
      pageNum = $(this).data("value");
    }
    
    $("input:hidden[name=amount]").val(10);
    //자재 출고 조회 전용
    if($(this).closest("nav").siblings("table").attr("id")=='eListTable'){
      //클릭한 페이지 번호가 정상외 출고 페이지라면
      //type == E, ePageNum에 클릭된 페이지 넣어서 submit
      $("input:hidden[name=type]").val("E");
      $("input:hidden[name=ePageNum]").val(pageNum);
    }else if(($(this).closest("nav").siblings("table").attr("id")=='nListTable')){
      //클릭한 페이지 번호가 정상출고 페이지라면
      //type == N, nPageNum에 클릭된 페이지 넣어서 submit
      $("input:hidden[name=type]").val("N");
      $("input:hidden[name=nPageNum]").val(pageNum);
    }else{
      $("input:hidden[name=pageNum]").val(pageNum);
    }
    $("#pageForm").submit();
  });
});