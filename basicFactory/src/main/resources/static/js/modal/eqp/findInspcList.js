$("document").ready(function () {
  //점검내역조회 모달창
  $("#inspcListBtn").on("click", function (e) {

    $("#findInspcListModal").modal("show");
    findInspcList();
  });

  function findInspcList() {
    $.ajax({
      url: "findInspcList",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findInspcListTbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    });
  }

  //모달창에서 설비점검일 검색 버튼 클릭 이벤트
  $("#selectBtn").click(function () {
    let inspcSdate = $("#inspcSdate").val();
    let inspcEdate = $("#inspcEdate").val();

    $.ajax({
      url: 'findInspcList',
      method: "GET",
      dataType: "json",
      data: {
        inspcSdate,
        inspcEdate
      },
      success: function (data) {
        console.log(data);
        $("#findInspcListTbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    })
  });

  //불량처리내역 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td><input type="checkbox"></td>
                  <td>${obj.inspcNo}</td>
                  <td>${obj.mchnCode}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.inspcSdate}</td>
                  <td>${obj.inspcEdate}</td>
                  <td>${obj.inspcActnPnt}</td>
                  <td>${obj.inspcActnRsn}</td>
                  <td>${obj.empId}</td>
                  <td>${obj.inspcRemk}</td>
                </tr>`
    $("#findInspcListTbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findInspcListTbody").on("click", "tr", function () {
    //테이블 상단 공통 요소 삽입
    let inspcNo = $(this).find("td:eq(1)").text();
    let mchnCode = $(this).find("td:eq(2)").text();
    let mchnName = $(this).find("td:eq(3)").text();
    let inspcSdate = $(this).find("td:eq(4)").text();
    let inspcEdate = $(this).find("td:eq(5)").text();
    let inspcActnPnt = $(this).find("td:eq(6)").text();
    let inspcActnRsn = $(this).find("td:eq(7)").text();
    let empId = $(this).find("td:eq(8)").text();
    let inspcRemk = $(this).find("td:last").text();

    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>
                    <td>${inspcNo}</td>
                    <td class="">${mchnCode}</td>
                    <td class="">${mchnName}</td>
                    <td><input type="date" value="${inspcSdate}"></td>
                    <td><input type="date" value="${inspcEdate}"></td>
                    <td>${inspcActnPnt}</td>
                    <td>${inspcActnRsn}</td>
                    <td>${empId}</td>
                    <td>${inspcRemk}</td>
                </tr>`;

    if ($("#inspctbody tr").length != 0) {
      if (confirm("현재 수정한 내용이 모두 삭제됩니다") == true) {
        $("#inspctbody tr").remove();
        $("#inspctbody").append(node);
        $("#findInspcListModal").modal("hide");
      }
    } else {
      $("#inspctbody").append(node);
      $("#findInspcListModal").modal("hide");
    }
  });
});