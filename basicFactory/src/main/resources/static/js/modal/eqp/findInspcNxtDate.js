$("document").ready(function () {
  //점검대상조회 모달창
  $("#inspcTargetBtn").on("click", function (e) {

    $("#findNxtDateModal").modal("show");
    findNxtDate();
  });

  function findNxtDate() {
    $.ajax({
      url: "findNxtDate",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findNxtDateTbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    });
  }

  //점검대상 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td><input type="checkbox"></td>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.inspcNxtDate}</td>
                </tr>`
    $("#findNxtDateTbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findNxtDateTbody").on("click", "tr", function () {
    //테이블 상단 공통 요소 삽입
    let mchnCode = $(this).find("td:eq(1)").text();
    let mchnName = $(this).find("td:eq(2)").text();
    let inspcNxtDate = $(this).find("td:last").text();

    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>
                    <td></td>
                    <td class="">${mchnCode}</td>
                    <td class="">${mchnName}</td>
                    <td><input type="date" value="${inspcNxtDate}"></td>
                    <td><input type="date"></td>
                    <td></td>
                    <td></td>
                    <td class="담당자"></td>
                    <td></td>
                </tr>`;

    if ($("#inspctbody tr").length != 0) {
      if (confirm("현재 수정한 내용이 모두 삭제됩니다") == true) {
        $("#inspctbody tr").remove();
        $("#inspctbody").append(node);
        $("#findNxtDateModal").modal("hide");
      }
    } else {
      $("#inspctbody").append(node);
      $("#findNxtDateModal").modal("hide");
    }
  });
});