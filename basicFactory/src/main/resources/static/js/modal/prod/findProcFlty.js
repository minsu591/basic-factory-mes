$("document").ready(function () {
  //생산불량내역 모달창
  $("#prodFltyBtn").on("click", function (e) {
    
    findProcFlty();
    $("#findProcFltyModal").modal("show");
  });

  function findProcFlty() {
    $.ajax({
      url: "findProcFlty",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findProcFltytbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    });
  }

  //생산불량내역 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td>${obj.processPerfomNo}</td>
                  <td>${obj.workDate}</td>
                  <td>${obj.finPrdCdCode}</td>
                  <td>${obj.finPrdCdName}</td>
                  <td>${obj.fltyVol}</td>
                  <td>${obj.procCdName}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.workerName}</td>
                </tr>`
    $("#findProcFltytbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findProcFltytbody").on("click", "tr", function () {
    let processPerfomNo = $(this).find("td:first").text();
    let workDate = $(this).find("td:eq(1)").text();
    let finPrdCdCode = $(this).find("td:eq(2)").text();
    let finPrdCdName = $(this).find("td:eq(3)").text();
    let fltyVol = $(this).find("td:eq(4)").text();
    let procCdName = $(this).find("td:eq(5)").text();
    let mchnName = $(this).find("td:eq(6)").text();
    let workerName = $(this).find("td:last").text();

    let node = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${processPerfomNo}</td>
                    <td>${finPrdCdCode}</td>
                    <td>${finPrdCdName}</td>
                    <td>${fltyVol}</td>
                    <td>${procCdName}</td>
                    <td>${mchnName}</td>
                    <td id="faultyCode"></td>
                    <td id="faultyName"></td>
                    <td><input type="date" id="fltyPrcsDate"></td>
                    <td id="empId"></td>
                    <td></td>
                </tr>`;
    $("#fltyPrcsTable tbody").append(node);

    $("#findProcFltyModal").modal("hide");

    //sucFun();

  });

  ///////////////////////////////
  function sucFun(result) {
    //경고창 띄워주기
    let alertFlag = false;
    if ($("#fltyPrcsTable tbody").children().length != 0) {
      if (confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?") == true) {
        alertFlag = true;
      }
    } else {
      alertFlag = true;
    }

    if (alertFlag) {
      $("#fltyPrcsTable tbody tr").remove();
      for (data of result) {
        outMakeRow(data);
      }

      $("#findListFltyPrcsModal").modal("hide");
    }
  }

  function outMakeRow(data){
    let node = `<tr>
                    <td><input type="checkbox"></td>
                    <td><input type="hidden" value="${data.fltyPrcsNo}"></td>
                    <td id="">${data.finPrdCdCode}</td>
                    <td id="">${data.finPrdCdName}</td>
                    <td>${data.fltyVol}</td>
                    <td>${data.procCdName}</td>
                    <td>${data.mchnName}</td>
                    <td id="faultyCode">${data.faultyCdCode}</td>
                    <td id="faultyName">${data.faultyName}</td>
                    <td>${data.fltyPrcsDate}</td>
                    <td id="empId">${data.empName}</td>
                    <td>${data.fltyPrcsRemk}</td>
                </tr>`;
    $("#fltyPrcsTable tbody").append(node);
  }

  //모달창에서 생산불량내역 검색 버튼 클릭 이벤트
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
        console.log(data);
        $("#findListFltyPrcstbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    })
  });
});