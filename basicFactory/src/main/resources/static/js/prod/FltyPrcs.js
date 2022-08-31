$("document").ready(function () {

  $("#selectBtn").click(function () {
    let fltyPrcsSdate = $("#fltyPrcsSdate").val();
    let fltyPrcsEdate = $("#fltyPrcsEdate").val();
    let finPrdCdCode = $("#productname").val();

    $.ajax({
      url: "fltyPrcsList/find",
      methods: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        fltyPrcsSdate: fltyPrcsSdate,
        fltyPrcsEdate: fltyPrcsEdate,
        finPrdCdCode: finPrdCdCode,
      },
      success: function (result) {
        $("#fplyPrcsTable tbody tr").remove();
        for (obj of result) {
          fltyPrcsMakeRow(obj);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  function fltyPrcsMakeRow(obj) {
    let node = `<tr>
                  <td>${obj.processPerfomNo}</td>
                  <td>${obj.faultyCdCode}</td>
                  <td>${obj.faultyName}</td>
                  <td>${obj.fltyVol}</td>
                  <td>${obj.finPrdCdCode}</td>
                  <td>${obj.finPrdCdName}</td>
                  <td>${obj.procCdName}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.fltyPrcsDate}</td>
                  <td>${obj.empName}</td>
                  <td>${obj.fltyPrcsRemk}</td>
                </tr>`;
    $("#fplyPrcsTable tbody").append(node);
  }

});
