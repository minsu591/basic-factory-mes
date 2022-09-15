$("document").ready(function () {
  //excel 다운로드
  $("#exportBtn").click(function () {
    $("#planViewTable").table2excel({
      exclude: ".excludeThisClass",
      name: "testExcel",
      filename: "production_plan_data"+".xls",
      fileext: ".xls",
      preserveColors: false
    });
  });

  $("#planSdate").click(function(){


  });
  $("#planViewBtn").click(function(e) {
    e.preventDefault();
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    $("input:hidden[name=type]").val('a');
    $("input:hidden[name=keyword]").val($("#planSdate").val());
    $("input:hidden[name=keyword2]").val($("#planEdate").val());
    $("input:hidden[name=keyword3]").val($("#vendor").val());
    $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();
  });
});
