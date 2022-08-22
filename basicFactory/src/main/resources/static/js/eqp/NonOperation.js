$(document).ready(function () {
  findAllNonOpHistory();
});

function findAllNonOpHistory() {
  $.ajax({
    url: "findallnonophistory",
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
