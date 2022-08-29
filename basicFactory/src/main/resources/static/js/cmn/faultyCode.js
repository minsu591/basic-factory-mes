$("document").ready(function () {
  //조회버튼 click 이벤트
  $("#selectBtn").on("click", function () {
    let faultyName = $("#faultyName").val();
    $.ajax({
      url: "faultyCode/findName",
      method: "GET",
      dataType: "json",
      data: {
        faultyName: faultyName
      },
      success: function (result) {
        $("#faultyTable tbody tr").remove();
        for (obj of result) {
          faultyMakeRow(obj);
        }
      },
    });
  });

  $("#addBtn").on("click", function () {
    let node = `<tr>
                  <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")) {
        node = `<tr>
                  <td><input type="checkbox" name="chk" checked></td>`;
    }
    node += `<td></td>
              <td></td>
              <td></td>
            </tr>`;

    $("#faultyTable tbody").append(node);
  });

  function faultyMakeRow(obj) {
    let node = `<tr>
                  <td><input type="checkbox" name="chk"></td>
                  <td>${obj.faultyCdCode}</td>
                  <td>${obj.faultyName}</td>
                  <td>${obj.faultyRemk}</td>
                </tr>`;
    $("#faultyTable tbody").append(node);
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#faultyTable tbody input:checkbox[name=chk]").prop("checked", true);
    } else {
      $("#faultyTable tbody input:checkbox[name=chk]").prop("checked", false);
    }
  });
  $("input[name=chk]").click(function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) $("#allCheck").prop("checked", false);
    else $("#allCheck").prop("checked", true);
  });
});
