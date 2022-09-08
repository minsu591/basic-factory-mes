$("document").ready(function () {
  $("#mchnname").click(function (e) {
    e.preventDefault();
    //설비명검색
    findMchnName();
    $("#findMchnNameModal").modal("show");
  });
  //설비테이블 클릭이벤트
  $("#findMchnTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(1)").text();
    let mchnName = $(this).find("td:eq(2)").text();

    $("#mchnCode").val(mchnCode);
    $("#mchnname").val(mchnName);

    $("#findMchnNameModal").modal("hide");
  });
  //설비테이블 검색버튼 클릭 이벤트
  $("#findMchnBtn").click(function () {
    let code = $("#mchnCode").val();
    let name = $("#mchnName").val();
    console.log("code->" + code + " name->" + name);
    if (name == "" && code == "") {
      findMchnName();
    } else {
      $.ajax({
        url: `findmchn`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          mchnCode: code,
          mchnName: name,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          let index = 0;

          $("#findMchntbody tr").remove();
          for (obj of data) {
            index += 1;
            mchnMakeRow(obj, index);
          }
        },
      });
    }
  });
});
//설비검색
function findMchnName() {
  $.ajax({
    url: "findmchn",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      let index = 0;
      $("#findMchntbody tr").remove();
      for (obj of data) {
        index += 1;
        mchnMakeRow(obj, index);
      }
    },
  });
}

function mchnMakeRow(obj, index) {
  let node = `<tr style="cursor:pointer;">
                 <td>${index}</td>
                 <td>${obj.mchnCode}</td>
                 <td>${obj.mchnName}</td>
                 <td>${obj.procCdName}</td>
                 <td>${obj.mchnStts}</td>
                </tr>`;
  $("#findMchnTable").append(node);
}
