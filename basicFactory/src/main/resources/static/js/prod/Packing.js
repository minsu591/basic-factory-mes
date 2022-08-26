//클릭시 완료여부 체크해서 모달 헤더 데이터 넣기 작업 해야함
$(document).ready(function () {
  findPacking();
  $("#packingTable").on("click", "tr", function () {
    //fidndPacking($(this));
    insertModalData($(this));
    $("#workInsertModal").modal("show");
  });

  let fltyCnt = 0;
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    fltyCnt += 1;
    $("#fltyCnt").val(fltyCnt);
  });

  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      fltyCtn -= 1;
      $("#fltyCnt").val(fltyCnt);
    }
  });

  //불량 클릭 버튼 이벤트
  $("#addFlty").click(function () {
    let fltyVol = $("#workStateTable tr:eq(4) td"); //불량량

    if (parseInt(fltyVol.text()) == 0) {
      //console.log(fltyCnt);
      fltyVol.html(fltyCnt);
      let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
      let result = parseInt(prodVol.text()) - parseInt(fltyVol.text());
      console.log("실적량 ->" + prodVol.text() + "불량량->" + fltyVol.text());
      console.log("결과->" + result);
      prodVol.html(result);
      let resultFltyVol = fltyVol.text();
      let totalProdVol = prodVol.text();
      let processNo = $("#processNo").val(); //작업번호

      //불량량 업데이트문 실행하고 다시 실적량 업데이트 실행함
      $.ajax({
        url: `updatefltyvol`,
        method: "PUT",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
          totalProdVol: totalProdVol,
          processNo: processNo,
          fltyVol: resultFltyVol,
        }),
        success: function (data) {
          //console.log("update sucess");
        },
      });
      fltyCnt = 0;
      $("#fltyCnt").val(fltyCnt);
    } else {
    }
  });
});
function findPacking() {
  $.ajax({
    url: `findpackingproc`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let index = 0;
      $("#packingTable tbody tr").remove();

      for (obj of data) {
        index += 1;
        packingTableMakeRow(obj, index);
        findMchnStts(obj.finPrdCdCode);
      }
    },
  });
}
function insertModalData(tr) {
  $.ajax({
    url: `findpackingproc`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      for (obj of data) {
        if (tr.find("td:eq(1)").text() == obj.finPrdCdCode) {
          $("#workStateTable tbody tr td").remove();
          $("#procCdName").val(obj.procCdName);
          $("#instNo").val(obj.instNo);
          $("#processNo").val(obj.processNo);
          $("#mchnName").val(obj.mchnName);
          $("#workStateTable tbody tr:eq(0)").append(
            `<td>${obj.finPrdCdName}</td>`
          );
          $("#workStateTable tbody tr:eq(1)").append(
            `<td>${obj.inDtlVol}</td>`
          );
          $("#workStateTable tbody tr:eq(2)").append(
            `<td>${obj.virResult}</td>`
          );
          $("#workStateTable tbody tr:eq(3)").append(
            `<td>${obj.totalProdVol}</td>`
          );
          $("#workStateTable tbody tr:eq(4)").append(`<td>${obj.fltyVol}</td>`);
          $("#workStateTable tbody tr:eq(5)").append(
            `<td>${obj.achieRate}%</td>`
          );
        }
      }
    },
  });
}
function findMchnStts(finPrdCdCode) {
  $.ajax({
    url: `findmchn/${finPrdCdCode}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      // workinsertTableLastChildMakeRow(obj, index);
      mchnStatusMakeRow(data);
    },
  });
}

function packingTableMakeRow(obj, index) {
  [
    {
      instProdNo: 24,
      finPrdCdCode: "FIN001",
      instNo: 27,
      instProdIndicaVol: 50,
      workScope: "지시",
      workDate: "2020-08-26",
      processNo: 82,
      processOrder: 5,
      procCdCode: "PROC005",
      procCdName: "포장",
      mchnCode: "MCHN005",
      mchnName: "포장기 1호기",
      inDtlVol: 46,
      totalProdVol: 0,
      fltyVol: 0,
      completionStatus: "n",
      processRemk: null,
      virResult: 0,
      nonResult: 0,
      achieRate: 0,
    },
  ];
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.finPrdCdCode}</td>
              <td>${obj.finPrdCdName}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.inDtlVol}</td>
              <td>${obj.virResult}</td>
              <td>${obj.nonResult}</td>
              <td>${obj.totalProdVol}</td>
              <td>${obj.fltyVol}</td>
              <td>${obj.workDate}</td>
              <input type="hidden" value="${obj.mchnCode}" name="mchnCode">
              </tr>`;

  $("#packingTable tbody").append(node);
}
function mchnStatusMakeRow(obj) {
  let node = `
  <div>
    <button type="button" class="btn btn-outline-primary m-r-20 m-t-15">${obj.mchnName}</button>
    <div class="btn btn-outline-primary m-t-15">${obj.mchnStts}</div>
  </div>`;

  $("#mchnStatus").append(node);
}

let work;
//작업시작 시간 입력
function startWork() {
  //완료여부

  if ($("#empid").val() == "") {
    alert("작업자 입력하세요");
    return;
  } else {
    $("#empid").prop("readonly", true);
    $("#instDate").prop("readonly", true);
  }
  let inDtlVol = $("#workStateTable tbody tr:eq(1) td").text(); //입고량
  let virResult = $("#workStateTable tbody tr:eq(2) td").text(); //기실적량
  let prodVol = $("#workStateTable tbody tr:eq(3) td").text(); //실적량
  let fltyVol = $("#workStateTable tbody tr:eq(4) td").text(); //불량량

  if ($("#sHours").val() == "" && $("#sMinutes").val() == "") {
    var date = new Date();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    $("#sHours").val(hours).prop("readonly", true);
    $("#sMinutes").val(minutes).prop("readonly", true);
    //설비코드 찾기
    let mchnCode;
    $("#packingTable tbody tr").each(function () {
      let mchnName = $("#mchnName").val();
      if (mchnName == $(this).find("td:eq(3)").text()) {
        mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
      }
    });
    console.log("진행중업데이트 ->" + mchnCode);
    let mchnStts = "진행중";
    //진행중으로 업데이트 실행
    updateMchnStts(mchnCode, mchnStts);
    work = setInterval(startinterval, 10);
  } else {
    alert("이미 시작했어요");
  }
}

//설비상태 업데이트
function updateMchnStts(mchnCode, mchnStts) {
  $.ajax({
    url: `updatemchnstts`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      mchnStts: mchnStts,
      mchnCode: mchnCode,
    }),
    success: function (data) {
      alert("설비상태업데이트");
    },
  });
}

//작업시작
let num = 0;
function startinterval() {
  num += 1;
  let inDtlVol = $("#workStateTable tr:eq(1) td"); //입고량
  let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
  let rate = $("#workStateTable tr:eq(5) td"); //달성률
  let processNo = $("#processNo").val(); //작업번호
  let procCdName = $("#procCdName").val(); //공정명
  let totalProdVol = 1 + parseInt(prodVol.text());

  rate.html(Math.ceil((totalProdVol / parseInt(inDtlVol.text())) * 100) + "%");
  prodVol.html(num);
  let achieRate = $("#workStateTable tr:eq(5) td").text().slice(0, -1);
  //실적량 업데이트
  $.ajax({
    url: `updateprodvol`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      processNo: processNo,
      totalProdVol: totalProdVol,
      procCdName: procCdName,
    }),
    success: function (data) {
      console.log("update sucess");
    },
  });

  //달성률 업데이트
  $.ajax({
    url: `updateachierate`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      processNo: processNo,
      achieRate: achieRate,
    }),
    success: function (data) {
      console.log("update sucess");
    },
  });

  if (num == parseInt(inDtlVol.text())) {
    console.log("종료");
    endWork();
  }
}

//작업종료 시간 입력
function endWork() {
  if ($("#eHours").val() == "" && $("#eMinutes").val() == "") {
    //인터벌 종료
    num = 0;
    clearInterval(work);
    var date = new Date();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
    let mchnCode;
    $("#packingTable tbody tr").each(function () {
      let mchnName = $("#mchnName").val();
      if (mchnName == $(this).find("td:eq(3)").text()) {
        mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
      }
    });
    console.log("진행전으로 업데이트 ->" + mchnCode);
    let mchnStts = "진행전";
    //진행전으로 업데이트
    updateMchnStts(mchnCode, mchnStts);

    //완료여부 업데이트
    let processNo = $("#processNo").val();
    console.log("완려여부 업데이트 프로세스번호->" + processNo);
    // let achieRate = $("#workStateTable tr:eq(5) td").text().slice(0, -1);

    $.ajax({
      url: `updateproccheck`,
      method: "PUT",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        processNo: processNo,
      }),
      success: function (data) {
        alert("완료 업데이트");
      },
    });
  } else {
    alert("이미 종료했어요");
  }
} // 작업종료 끝

//저장버튼
$("#saveBtn").click(function () {
  //공정실적 테이블 등록
  let workDate = $("#instDate").val();
  let processNo = $("#processNo").val(); //작업번호
  let prodVol = $("#workStateTable tr:eq(3) td").text(); //실적량
  let fltyVol = $("#workStateTable tr:eq(4) td").text(); //불량랑
  let procPerform = {
    processNo: processNo,
    prodVol: prodVol,
    fltyVol: fltyVol,
    workStartTime:
      workDate + " " + $("#sHours").val() + ":" + $("#sMinutes").val(),
    workEndTime:
      workDate + " " + $("#eHours").val() + ":" + $("#eMinutes").val(),
    workerName: $("#empid").val(),
    prodDate: workDate,
  };
  console.log(procPerform);

  $.ajax({
    url: "insertprocperform",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify(procPerform),
    error: function (error, status, msg) {
      //alert("상태코드 " + status + "에러메시지" + msg);
      console.log(error);
    },
    success: function (data) {
      console.log("success");
    },
  });
});
