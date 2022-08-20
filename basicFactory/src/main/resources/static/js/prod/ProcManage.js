$(document).ready(function () {
  $("#productname").click(function (e) {
    e.preventDefault();
    findProduct();
    $("#findproductModal").modal("show");
  });

  function findProduct() {
    $.ajax({
      url: "findProduct",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        let index = 0;
        $("#findProducttbody tr").remove();
        for (obj of data) {
          index += 1;
          makeRow(obj, index);
        }
      },
    });
  }

  //제품검색버튼 이벤트
  $("#findProductbtn").click(function () {
    let code = $("#prdCdCode").val();
    let name = $("#prdCdName").val();
    console.log("code -> " + code + " name->" + name);
    if (code == "" && name == "") {
      findProduct();
    } else {
      $.ajax({
        url: `getProduct`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          prdCdCode: code,
          prdCdName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);

          let index = 0;
          index += 1;
          $("#findProducttbody tr").remove();
          makeRow(data, index);
        },
      });
    }
  });

  //모달 테이블 클릭 이벤트
  $("#findProductTable").on("click", "tr", function () {
    console.log($(this).find("td:eq(2)").text());
    let name = $(this).find("td:eq(2)").text();

    $("#productname").val(name);
    $("#findproductModal").modal("hide");
  });

  //초기데이터
  function makeRow(obj, index) {
    let node = `<tr>
            <td>${index}</td>
            <td>${obj.finPrdCdCode}</td>
            <td>${obj.finPrdCdName}</td>
            <td>${obj.finPrdCdUnit}</td>
          </tr>`;
    $("#findProducttbody").append(node);
  }

  $("#workInsertTable").on("click", "button", function () {
    console.log($(this).parent().parent().find("td:eq(2)").text());
    $("#workInsertModal").modal("show");
  });

  let fltyCnt = 0;
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    $("#fltyCnt").val((fltyCnt += 1));
  });

  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      $("#fltyCnt").val((fltyCnt -= 1));
    }
  });

  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  //작업시작시간 입력
  $("#workStartBtn").click(function () {
    $("#sHours").val(hours).prop("readonly", true);
    $("#sMinutes").val(minutes).prop("readonly", true);
  });

  $("#workEndBtn").click(function () {
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
  });
});
