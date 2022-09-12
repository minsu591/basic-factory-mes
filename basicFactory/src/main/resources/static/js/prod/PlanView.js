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

  $("#planViewBtn").click(function () {
    let sdate = $("#planSdate").val();
    let edate = $("#planEdate").val();
    let vendor = $("#vendor").val();
    $.ajax({
      url: "planView/org",
      data: {
        sdate,
        edate,
        vendorCd
      },
      methods: "GET",
      dataType: "text",
      success: function (data) {
        $("#planViewDiv").replaceWith(data);
      }
    });
  });
});
