$("document").ready(function(){
  
$("#search").click(function(e) {
  e.preventDefault();
  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  $("input:hidden[name=keyword]").val($("#rsccode").val());
  $("input:hidden[name=keyword2]").val($("#rsclotno").val());
  $("input:hidden[name=amount]").val(10);

  $("#searchForm").submit();
});
})