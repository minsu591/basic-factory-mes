$("document").ready(function () {
  $("#nonOpCode").click(function (e) {
    e.preventDefault();
    findAllNonOp();
    $("#findnonOpCodeModal").modal("show");
  });

  $("#findNonOpCodebtn").click(function () {
    let code = $("#nonOpCode").val();
    let name = $("#nonOpName").val();
    if (code == "" && name == "") {
      findAllNonOp();
    } else {
      $.ajax({
        url: `getnonop`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          nonOpCode: code,
          noneOpName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          let index = 0;
          index += 1;
          $("#findNonOptbody tr").remove();
          nonOpMakeRow(data, index);
        },
      });
    }
  });
});

function findAllNonOp() {
  $.ajax({
    url: "findallnonop",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      let index = 0;
      $("#findNonOptbody tr").remove();
      for (obj of data) {
        index += 1;
        nonOpMakeRow(obj, index);
      }
    },
  });
}

function nonOpMakeRow(obj, index) {
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.nonOpCode}</td>
              <td>${obj.nonOpName}</td>
              <td>${obj.nonOpRemk}</td>
              </tr>`;

  $("#findNonOptbody").append(node);
}
