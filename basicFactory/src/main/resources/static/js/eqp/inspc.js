$("document").ready(function () {
  $("#inspcViewBtn").click(function () {
    let sdate = $("#inspcSdate").val();
    let edate = $("#inspcEdate").val();
    let mchnCode = $("#mchnCode").val();
    console.log(sdate);
    console.log(edate);

    $.ajax({
      url: "inspcList/find",
      methods: "GET",
      data: {
        sdate: sdate,
        edate: edate,
        mchnCode: mchnCode,
      },
      dataType: "text",
      success: function (data) {
        $("#inspcListDiv").replaceWith(data);
      },
    });
  });
});
