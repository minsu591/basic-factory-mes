$("document").ready(function () {
  $("#selectBtn").on("click", function () {
    let rscCode = $("#rsccode").val();
    $.ajax({
      url: "rscCode/findCode",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        rscCode: rscCode
      },
      success: function (result) {
        console.log(result);
        $("#rscTable tbody tr").remove();
        for (obj of result) {
          rscMakeRow(obj);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  $("#addBtn").on("click", function () {
    let node = `<tr>
                    <td><input type="checkbox" name="chk">
                </td>`;
    if ($("#allCheck").is(":checked")) {
      node = `<tr>
                <td><input type="checkbox" name="chk" checked</td>`;
    }
    node += `<td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><input type="checkbox"></td>
            <td></td>
        </tr>`;
    $("#rscTable tbody").append(node);
  });

  function rscMakeRow(obj) {
    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>
                    <td>${obj.rscCdCode}</td>
                    <td>${obj.rscCdName}</td>
                    <td>${obj.rscCdUnit}</td>
                    <td>${obj.rscCdClfy}</td>`;
    if (obj.rscCdUse == 1) {
      node += `<td><input type="checkbox" checked></td>`;
    } else {
      node += `<td><input type="checkbox"></td>`;
    }
    node += `<td>${obj.rscCdRemk}</td>
                </tr>`;
    $("#rscTable tbody").append(node);
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#rscTable tbody input:checkbox[name=chk]").prop("checked", true);
    } else {
      $("#rscTable tbody input:checkbox[name=chk]").prop("checked", false);
    }
  });
  $("input[name=chk]").click(function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) $("#allCheck").prop("checked", false);
    else $("#allCheck").prop("checked", true);
  });
});
