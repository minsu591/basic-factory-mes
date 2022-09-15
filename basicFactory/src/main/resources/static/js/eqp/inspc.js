$("document").ready(function () {
  $("#inspcViewBtn").click(function (e) {
    e.preventDefault();
    let sdate = $("#inspcSdate").val();
    let edate = $("#inspcEdate").val();
    let mchnCode = $("#mchnCode").val();
    console.log(sdate);
    console.log(edate);
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    $("input:hidden[name=keyword]").val(sdate);
    $("input:hidden[name=keyword2]").val(edate);
    $("input:hidden[name=keyword3]").val(mchnCode);
    $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();

    // $.ajax({
    //   url: "inspcList/find",
    //   methods: "GET",
    //   data: {
    //     sdate: sdate,
    //     edate: edate,
    //     mchnCode: mchnCode,
    //   },
    //   dataType: "text",
    //   success: function (data) {
    //     $("#inspcListDiv").replaceWith(data);
    //   },
    // });
  });
});
