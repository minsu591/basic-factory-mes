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

  $("#planViewBtn").click(function(e) {
    e.preventDefault();
    console.log("hi");
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    let type = $("input:hidden[name=type]").val('a');
    let keyword = $("input:hidden[name=keyword]").val($("#planSdate").val());
    let keyword2 = $("input:hidden[name=keyword2]").val($("#planEdate").val());
    let keyword3 = $("input:hidden[name=keyword3]").val($("#vendor").val());
    let amount = $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();
  });

  //페이지 번호 클릭시 현재 검색하고있는 타입,키워드를 같이 보내줌
  $(".pagination").on("click", 'a', function() {
      let pageNum = $(this).text();
      $("input:hidden[name=pageNum]").val(pageNum);
      let amount = $("input:hidden[name=amount]").val(10);
      pageForm.submit();
  });
});
