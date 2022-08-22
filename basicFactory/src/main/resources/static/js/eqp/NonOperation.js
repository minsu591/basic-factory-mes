$(document).ready(function () {
  findAllNonOpHistory();

  $("#findnonOpHistoryBtn").click(function () {

    let sdate = $("#sdate").val();
    let edate = $("#edate").val();
    let mchnName = $("#mchnname").val();
    let nonOpCode = $("#nonopcode").val();

    console.log("sdate->" + sdate)
    console.log("edate->" + edate);
    console.log(mchnName);
    console.log(nonOpCode);

    $.ajax({
      url: "findnonophistory",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        sDate: sdate,
        eDate: edate,
        mchnName: mchnName,
        nonOpCode: nonOpCode
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#nonOpHistoryTable tbody tr").remove();
        for (obj of data) {
          nonOpHistoryMakeRow(obj);
        }
      },
    });


  });

});

function findAllNonOpHistory() {
  $.ajax({
    url: "findnonophistory",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      for (obj of data) {
        nonOpHistoryMakeRow(obj);
      }
    },
  });
}

function nonOpHistoryMakeRow(obj) {
  let node = `<tr>
              <td>${obj.mchnCode}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.inputDate.substring(0, 10)}</td>
              <td>${obj.nonOpName}</td>
              <td>${obj.nonOpRsn}</td>
              <td>${obj.nonOpMin}</td>
              <td>${obj.nonOpStartTime.substring(11, 16)}</td>
              <td>${obj.nonOpEndTime.substring(11, 16)}</td>
              <td>${obj.nonOpRemk}</td>
              </tr>`;
  $("#nonOpHistoryTable tbody").append(node);
}
