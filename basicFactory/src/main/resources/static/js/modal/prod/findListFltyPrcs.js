$("document").ready(function () {
  //불량처리목록 모달창
  $("#fltyPrcsBtn").on("click", function (e) {

    $("#findListFltyPrcsModal").modal("show");
    findListFltyPrcs();
  });

  function findListFltyPrcs() {
    $.ajax({
      url: "findListFltyPrcs",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findListFltyPrcstbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    });
  }

  //모달창에서 불량처리일 검색 버튼 클릭 이벤트
  $("#selectBtn").click(function () {
    let fltyPrcsSdate = $("#fltyPrcsSdate").val();
    let fltyPrcsEdate = $("#fltyPrcsEdate").val();

    $.ajax({
      url: 'findListFltyPrcs',
      method: "GET",
      dataType: "json",
      data: {
        fltyPrcsSdate: fltyPrcsSdate,
        fltyPrcsEdate: fltyPrcsEdate,
      },
      success: function (data) {
        $("#findListFltyPrcstbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    })
  });

  //불량처리내역 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td>${obj.fltyPrcsNo}</td>
                  <td>${obj.processPerfomNo}</td>
                  <td>${obj.finPrdCdCode}</td>
                  <td>${obj.finPrdCdName}</td>
                  <td>${obj.fltyPrcsVol}</td>
                  <td>${obj.procCdName}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.faultyCdCode}</td>
                  <td>${obj.faultyName}</td>
                  <td>${obj.fltyPrcsDate}</td>
                  <td>${obj.empId}</td>
                  <td>${obj.fltyPrcsRemk}</td>
                </tr>`
    $("#findListFltyPrcstbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findListFltyPrcstbody").on("click", "tr", function () {
    //테이블 상단 공통 요소 삽입
    let fltyPrcsNo = $(this).find("td:first").text();
    let processPerfomNo = $(this).find("td:eq(1)").text();
    let finPrdCdCode = $(this).find("td:eq(2)").text();
    let finPrdCdName = $(this).find("td:eq(3)").text();
    let fltyPrcsVol = $(this).find("td:eq(4)").text();
    let procCdName = $(this).find("td:eq(5)").text();
    let mchnName = $(this).find("td:eq(6)").text();
    let faultyCdCode = $(this).find("td:eq(7)").text();
    let faultyName = $(this).find("td:eq(8)").text();
    let fltyPrcsDate = $(this).find("td:eq(9)").text();
    let empId = $(this).find("td:eq(10)").text();
    let fltyPrcsRemk = $(this).find("td:last").text();

    $("#processPerfomNo").val(processPerfomNo);
    $("#productcode").val(finPrdCdCode);
    $("#productname").val(finPrdCdName);
    $("#proccdname").val(procCdName);
    $("#mchnname").val(mchnName);

    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>
                    <td>${fltyPrcsNo}</td>
                    <td class="faultyCode">${faultyCdCode}</td>
                    <td class="faultyName">${faultyName}</td>
                    <td>${fltyPrcsVol}</td>
                    <td><input type="date" value="${fltyPrcsDate}"></td>
                    <td>${empId}</td>
                    <td>${fltyPrcsRemk}</td>
                </tr>`;

    if ($("#fltyPrcstbody tr").length != 0) {
      if (confirm("현재 수정한 내용이 모두 삭제됩니다") == true) {
        $("#fltyPrcstbody tr").remove();
        $("#fltyPrcstbody").append(node);
        $("#findListFltyPrcsModal").modal("hide");
      }
    } else {
      $("#fltyPrcstbody").append(node);
      $("#findListFltyPrcsModal").modal("hide");
    }



  });
});