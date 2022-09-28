
$(document).ready(function () {
  findPacking();

  //긴급중지버튼 클릭 이벤트
  emergency();
  //중지후 작업 재시작
  reStart();
  $("#emergencyBtn").hide();

  $("#closeBtn").click(function () {
    $("#workInsertModal").modal("hide");
  });



  $("#packingTable").on("click", "tr", function () {
    let instDate = $(this).find("td:eq(7)").text();
    console.log(instDate);
    if ($(this).find("input:hidden[name=completionStatus]").val() == "y") {
      insertModalData($(this));
      let processNo = $(this).find("input:hidden[name=processNo]").val();

      getprocPerform(processNo);
    } else {

      console.log("else문 인스트데이트->" + instDate);
      $("#empid").prop("readonly", false);
      $("#sHours").val("");
      $("#sMinutes").val("");
      $("#eHours").val("");
      $("#eMinutes").val("");
      $("#empid").val("");
      insertModalData($(this));
    }
    $("#workInsertModal").modal("show");

  });
  function getprocPerform(processNo) {
    $.ajax({
      url: `getprocperform/${processNo}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("getperfrom->" + data.prodDate);
        let startTime = data.workStartTime;
        let endTime = data.workEndTime;
        $("#instDate").val(data.prodDate).prop("readonly", true);
        $("#workStartBtn").prop("disabled", true);
        $("#sHours").val(startTime.substring(11, 13));
        $("#sMinutes").val(startTime.substring(14, 16));
        $("#eHours").val(endTime.substring(11, 13));
        $("#eMinutes").val(endTime.substring(14, 16));
        $("#empid").val(data.workerName).prop("readonly", true);
      },
      error: function () { },
    });
  }

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
      fltyCnt -= 1;
      $("#fltyCnt").val(fltyCnt);
    }
  });

  //불량 클릭 버튼 이벤트
  $("#addFlty").click(function () {
    if ($("#fltyCnt").val() == 0) {
      noAddFlty();
      return;
    }
    let fltyVol = $("#workStateTable tr:eq(4) td"); //불량량
    let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
    if (parseInt($("#fltyCnt").val()) < parseInt(prodVol.text())) {
      //console.log(fltyCnt);
      let fltyResult = fltyCnt + parseInt(fltyVol.text());
      fltyVol.html(fltyResult);
      let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
      let result = parseInt(prodVol.text()) - parseInt($("#fltyCnt").val());
      console.log(
        "실적량 ->" +
        prodVol.text() +
        "불량량->" +
        parseInt($("#fltyCnt").val())
      );
      console.log("결과->" + result);
      prodVol.html(result);
      let resultFltyVol = fltyVol.text();
      let totalProdVol = prodVol.text();
      let processNo = $("#processNo").val(); //작업번호
      let procCdName = $("#procCdName").val(); //공정명

      updateProcess(processNo, totalProdVol, procCdName, resultFltyVol);
      fltyCnt = 0;
      $("#fltyCnt").val(fltyCnt);
      fltyinfo();
    } else {
      //불량량이 실적량보다 많다면
      fltyWarn();
      return;
    }
  });

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
      async: false,
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
    //지시 작업구분 업데이트
    let instProdNo;
    let finPrdCdCode;
    $("#packingTable tbody tr").each(function () {
      if (processNo == $(this).find("input:hidden[name=processNo]").val()) {
        instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
        finPrdCdCode = $(this).find("td:eq(1)").text();
      }
    });
    console.log("찾은 제품코드 ->" + finPrdCdCode);
    updateWorkScope(instProdNo);

    //완제품 재고 등록 처리
    insertInDtl(processNo, workDate, prodVol, finPrdCdCode);

    $("#addFlty").prop("disabled", true);
    $("#saveBtn").prop("disabled", true);
    saveSucess();
  });
});

function emergency() {
  $("#emergencyBtn").click(function () {
    console.log("긴급중지버튼 클릭");
    $("#reStartBtn").show(); //재시작버튼 보이기
    //인터벌중지
    clearInterval(work);
    //현재 실적량 -> 기실적량 업데이트
    //processNo랑 현재 실적량보내줘
    let processNo = $("#processNo").val();
    let virResult = $("#workStateTable tbody tr:eq(2) td").text();
    let totalProdVol = $("#workStateTable tbody tr:eq(3) td").text(); //현재 실적량
    let updateVol = parseInt(totalProdVol) + parseInt(virResult);
    console.log(processNo);
    console.log(updateVol);
    updateVirResult(processNo, updateVol);

    let instProdNo;
    $("#packingTable tbody tr").each(function () {
      if ($(this).find("input:hidden[name=processNo]").val() == processNo) {
        console.log("같을떄?");
        instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
      }
    });
    console.log("instProdno->" + instProdNo);
    let mchnName = $("#mchnName").val();

    //업데이트후 모달 테이블데이터 다시 로드
    findProcess(instProdNo, mchnName);
    num = 0;
    totalProdVol = $("#workStateTable tr:eq(3) td"); //실적량
    // totalProdVol.html(num);
  });
}
//중지후 작업 재시작
function reStart() {
  $("#reStartBtn").click(function () {
    console.log("작업 재시작 버튼 클릭");
    $("#workStartBtn").prop("disalbed", true);
    $("#reStartBtn").hide();
    work = setInterval(startinterval, 1);
  });
}

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
      }
    },
  });
}

function updateVirResult(processNo, totalProdVol) {
  $.ajax({
    url: "updatevirresult",
    method: "PUT",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false, //동기로 처리
    data: JSON.stringify({ processNo: processNo, totalProdVol: totalProdVol }),
    error: function (error, status, msg) {
      //alert("상태코드 " + status + "에러메시지" + msg);
      console.log(error);
    },
    success: function (data) {
      console.log("success");
    },
  });
}

function insertModalData(tr) {
  let date = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -14);
  $.ajax({
    url: `findpackingproc`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      for (obj of data) {
        if (tr.find("input:hidden[name=processNo]").val() == obj.processNo) {
          findMchnStts(obj.finPrdCdCode);
          $("#instDate").val(date);
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

function packingTableMakeRow(obj, index) {
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.finPrdCdCode}</td>
              <td>${obj.finPrdCdName}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.inDtlVol}</td>
              <td>${obj.totalProdVol}</td>
              <td>${obj.fltyVol}</td>
              <td>${obj.workDate}</td>
              <input type="hidden" value="${obj.mchnCode}" name="mchnCode">
              <input type="hidden" value="${obj.completionStatus}" name="completionStatus">
              <input type="hidden" value="${obj.processNo}" name="processNo">
              <input type="hidden" value="${obj.instProdNo}" name="instProdNo">
              </tr>`;

  $("#packingTable tbody").append(node);
}

let work;
//작업시작 시간 입력
function startWork() {
  //완료여부

  if ($("#mchnStatus div:eq(1)").text() == '비가동') {
    console.log("비가동!!")
    nonOpWarn();
    return;
  }

  if ($("#empid").val() == "") {
    noEmpId();
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
    $("#emergencyBtn").show();
    //설비코드, 제품코드찾기
    let mchnCode;
    let finPrdCdCode;
    $("#packingTable tbody tr").each(function () {
      let processNo = $("#processNo").val();
      if (processNo == $(this).find("input:hidden[name=processNo]").val()) {
        mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
        finPrdCdCode = $(this).find("td:eq(1)").text();
      }
    });
    console.log("진행중업데이트 ->" + mchnCode);
    let mchnStts = "진행중";
    //진행중으로 업데이트 실행
    updateMchnStts(mchnCode, mchnStts);

    work = setInterval(startinterval, 50);
    //설비상태 다시 불러오기
    findMchnStts(finPrdCdCode);
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
    async: false, //동기로 처리
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      mchnStts: mchnStts,
      mchnCode: mchnCode,
    }),
    success: function (data) { },
  });
}

//작업시작
let num = 0;
function startinterval() {
  num += 1;
  let inDtlVol = $("#workStateTable tr:eq(1) td"); //입고량
  let virResult = $("#workStateTable tr:eq(2) td"); //기실적량
  let prodVol = $("#workStateTable tr:eq(3) td"); //실적량
  let fltyVol = $("#workStateTable tr:eq(4) td"); //불량량
  let rate = $("#workStateTable tr:eq(5) td"); //달성률
  let processNo = $("#processNo").val(); //작업번호
  let procCdName = $("#procCdName").val(); //공정명
  let totalProdVol = 1 + parseInt(prodVol.text());

  rate.html(
    Math.ceil(
      ((totalProdVol + parseInt(virResult.text())) /
        parseInt(inDtlVol.text())) *
      100
    ) + "%"
  );
  prodVol.html(num);
  let achieRate = $("#workStateTable tr:eq(5) td").text().slice(0, -1);

  //실적량 업데이트
  updateProcess(processNo, totalProdVol, procCdName, fltyVol.text());

  // 달성률 업데이트
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

  if (num + parseInt(virResult.text()) == parseInt(inDtlVol.text())) {
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
    $("#saveBtn").prop("disabled", false);
    $("#addFlty").prop("disabled", false);
    $("#workStartBtn").prop("disabled", true);
    $("#emergencyBtn").hide();
    var date = new Date();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
    let mchnCode;
    let finPrdCdCode;
    $("#packingTable tbody tr").each(function () {
      let processNo = $("#processNo").val();
      if (processNo == $(this).find("input:hidden[name=processNo]").val()) {
        mchnCode = $(this).find("input:hidden[name=mchnCode]").val();
        finPrdCdCode = $(this).find("td:eq(1)").text();
      }
    });
    console.log("진행전으로 업데이트 ->" + mchnCode);
    let mchnStts = "진행전";
    //진행전으로 업데이트
    updateMchnStts(mchnCode, mchnStts, finPrdCdCode);

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

    //설비상태 다시 리로드
    findMchnStts(finPrdCdCode);
  } else {
    alert("이미 종료했어요");
  }
} // 작업종료 끝

//실적량 및 불량량 업데이트
function updateProcess(processNo, totalProdVol, procCdName, fltyVol) {
  $.ajax({
    url: `updateprocess`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      processNo: processNo,
      totalProdVol: totalProdVol,
      procCdName: procCdName,
      fltyVol: fltyVol,
    }),
    success: function (data) {
      console.log("update sucess");
    },
  });
}

function findProcess(instProdNo, MchnName) {
  $.ajax({
    url: `findprocesspacking/${instProdNo}`,
    method: "GET",
    async: false,
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#workStateTable tbody td").remove();
      for (obj of data) {
        if (`${obj.mchnName}` == MchnName) {
          workStateTableMakeRow(obj);
        }
      }
    },
  });
}

function workStateTableMakeRow(obj) {
  let prodName;
  $("#packingTable tbody tr").each(function () {
    if (obj.processNo == $(this).find("input:hidden[name=processNo]").val()) {
      prodName = $(this).find("td:eq(2)").text();
    }
  });
  $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
  $("#workStateTable tr:eq(1)").append(`<td>${obj.inDtlVol}</td>`);
  $("#workStateTable tr:eq(2)").append(`<td>${obj.virResult}</td>`);
  $("#workStateTable tr:eq(3)").append(`<td>${obj.totalProdVol}</td>`);
  $("#workStateTable tr:eq(4)").append(`<td>${obj.fltyVol}</td>`);
  $("#workStateTable tr:eq(5)").append(`<td>${obj.achieRate}%</td>`);
}

function reloadMchnSttsMakeRow(obj) {
  let node = `<div>
              <button type="button" class="btn btn-outline-primary m-r-20 m-t-15">${obj.mchnName}</button>
              <div class="btn btn-outline-primary m-t-15">${obj.mchnStts}</div>
              </div>`;

  $("#mchnStatus").append(node);

  if (obj.mchnStts == "진행중") {
    $("#mchnStatus div")
      .last()
      .append(
        `<span class="spinner-border spinner-border-sm m-l-5" role="status"></span>`
      );
  }
}

function findMchnStts(finPrdCdCode) {
  //console.log("리로드설비상태 제품코드번호->" + finPrdCdCode);
  $.ajax({
    url: `findmchn/${finPrdCdCode}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      // workinsertTableLastChildMakeRow(obj, index);
      //console.log(data);
      $("#mchnStatus div").remove();
      mchnStatusMakeRow(data);
    },
  });
}

function mchnStatusMakeRow(obj) {
  console.log("프로세스번호->" + $("#processNo").val());
  let processNo = $("#processNo").val();
  let node;
  let instProdNo;
  $("#packingTable tbody tr").each(function () {
    if ($(this).find("input:hidden[name=processNo]").val() == processNo) {
      instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
    }
  });
  console.log("instProdNo ->" + instProdNo);
  $.ajax({
    url: `findprocesspacking/${instProdNo}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      for (obj2 of data) {
        console.log("obj2 of data ");
        if (obj2.mchnCode == obj.mchnCode) {
          console.log("obj2mc=objmc");
          if (obj2.completionStatus == "y") {
            console.log("if y");
            node = `<div>
                    <button type="button" class="btn btn-outline-primary m-r-20 m-t-15">${obj.mchnName}</button>
                    <div class="btn btn-outline-primary m-t-15">진행완료</div>
                   </div>`;
            $("#mchnStatus").append(node);
          } else {
            node = `<div>
                     <button type="button" class="btn btn-outline-primary m-r-20 m-t-15">${obj.mchnName}</button>
                     <div class="btn btn-outline-primary m-t-15">${obj.mchnStts}</div>
                    </div>`;
            $("#mchnStatus").append(node);
            if (obj.mchnStts == "진행중") {
              $("#mchnStatus div")
                .last()
                .append(
                  `<span class="spinner-border spinner-border-sm m-l-5" role="status"></span>`
                );
            }
          }
        }
      }
    },
  });
}

//지시 작업구분 업데이트
function updateWorkScope(instProdNo) {
  let workScope = "진행완료";

  $.ajax({
    url: `updateworkscope`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      instProdNo: instProdNo,
      workScope: workScope,
    }),
    success: function (data) {
      console.log("update sucess");
    },
  });
}

function insertInDtl(processNo, workDate, prodVol, finPrdCdCode) {
  console.log(processNo);
  console.log(workDate);
  console.log(prodVol);
  console.log(finPrdCdCode);
  console.log("insert 돈다~");
  $.ajax({
    url: "insertindtl",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      processNo: processNo,
      slsInDtlDate: workDate,
      finPrdCdCode: finPrdCdCode,
      slsInDtlVol: prodVol,
    }),
    error: function (error, status, msg) { },
    success: function (data) { },
  });
}

function saveSucess() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "저장 되었습니다.", // Alert 제목
  });
}

function fltyinfo() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "불량 등록이 완료되었습니다.", // Alert 제목
  });
}
function fltyWarn() {
  Swal.fire({
    icon: "warning",
    title: "불량량이 실적량보다 많습니다.",
  });
}

function noEmpId() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "작업자가 입력되지 않았습니다.", // Alert 제목
  });
}

function nonOpWarn() {
  Swal.fire({
    icon: "warning",
    title: "비가동상태입니다."
  })
}