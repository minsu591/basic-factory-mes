$("document").ready(function () {
  $("#nonopcode").click(function (e) {
    e.preventDefault();
    findNonOp();
    $("#findnonOpCodeModal").modal("show");
  });

  $("#sdate").change(function () {
    $("#edate").prop("min", $("#sdate").val())
  })

  $("#edate").change(function () {
    $("#sdate").prop("max", $("#edate").val());
  })

  $("#findNonOpCodebtn").click(function () {
    let code = $("#nonOpCode").val();
    console.log("nonOpCode-> " + code);
    let name = $("#nonOpName").val();
    console.log("nonOpName ->" + name);
    if (code == "" && name == "") {
      findNonOp();
    } else {
      $.ajax({
        url: "findnonop",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          nonOpCode: code,
          nonOpName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          let index = 0;

          $("#findNonOptbody tr").remove();
          for (obj of data) {
            index += 1;
            nonOpMakeRow(obj, index);
          }
        },
      });
    }
  });
  //비가동코드테이블 클릭이벤트
  $("#findNonOpTable").on("click", "tr", function () {
    let nonOpCode = $(this).find("td:eq(1)").text();
    $("#nonopcode").val(nonOpCode);
    $("#findnonOpCodeModal").modal("hide");
  });
});

function findNonOp() {
  $.ajax({
    url: "findnonop",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log("findnonop->" + data);
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
