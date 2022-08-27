$("document").ready(function () {
  let date = new Date();

  $("#closeBtn").click(function () {
    $("#workInsertModal").modal("hide");
  });

  //설비상태 클릭 이벤트
  $("#mchnStatus").on("click", "button", function () {
    let instProdNo;
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        instProdNo = $(this).find("input[type=hidden]").val();
      }
    });
    let statusMchnName = $(this).text();
    findProcess(instProdNo, statusMchnName);
    let processNo = $("#processNo").val();
    //모달 시간과 날짜 입력을 위해 조회
    getprocPerform(processNo);
  });

  function findProcess(instProdNo, MchnName) {
    $.ajax({
      url: `findprocess/${instProdNo}`,
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

  function getprocPerform(processNo) {
    $.ajax({
      url: `getprocperform/${processNo}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        // console.log("getperfrom->" + data.prodDate);
        let startTime = data.workStartTime;
        let endTime = data.workEndTime;
        $("#instDate").val(data.prodDate).prop("readonly", true);
        $("#sHours").val(startTime.substring(11, 13));
        $("#sMinutes").val(startTime.substring(14, 16));
        $("#eHours").val(endTime.substring(11, 13));
        $("#eMinutes").val(endTime.substring(14, 16));
        $("#empid").val(data.workerName).prop("readonly", true);
      },
      error: function () {
        //$("#instDate").val("").prop("readonly", false);
        //console.log('에러?');
        $("#sHours").val("");
        $("#sMinutes").val("");
        $("#eHours").val("");
        $("#eMinutes").val("");
        $("empid").val("").prop("readonly", false);
      },
    });
  }

  function workStateTableMakeRow(obj) {
    let inputDate;
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        // console.log("체크됨?")
        modalprodName($(this));
        inputDate = $(this).find("td:eq(2)").text();
      }
    });
    // console.log(inputDate);
    $("#instDate").val(inputDate);
    $("#procCdName").val(obj.procCdName);
    $("#mchnName").val(obj.mchnName);
    $("#processNo").val(obj.processNo);
    $("#workStateTable tr:eq(1)").append(`<td>${obj.inDtlVol}</td>`);
    $("#workStateTable tr:eq(2)").append(`<td>${obj.virResult}</td>`);
    $("#workStateTable tr:eq(3)").append(`<td>${obj.totalProdVol}</td>`);
    $("#workStateTable tr:eq(4)").append(`<td>${obj.fltyVol}</td>`);
    $("#workStateTable tr:eq(5)").append(`<td>${obj.achieRate}%</td>`);
  }

  $("#workInsertTable").on("click", "button", function () {
    // console.log($(this).text());
    let mchnName = $(this).parent().parent().find("td:eq(2)").text();
    let processNo = $(this)
      .parent()
      .parent()
      .find("input:hidden[name=processNo]")
      .val();
    $("#workStateTable tr td").remove();

    if ($(this).text() == "비가동") {
      alert("비가동입니다.");
    } else {
      $("#procManageTable tr").each(function () {
        //console.log("each문 들어옴");
        if ($(this).find("td:eq(0)").children().prop("checked")) {
          console.log($(this));
          let instProdNo = $(this).find("input[type=hidden]").val();
          console.log("instProdNo->" + instProdNo);
          findProcess(instProdNo, mchnName);
          //"겟프로세스"
          getprocPerform(processNo);
        }
      });
      //modalDataInsert($(this));

      $("#workInsertModal").modal("show");
    }
  });

  //모달창 제품명 입력
  function modalprodName(data) {
    let prodName = data.find("td:eq(5)").text();
    $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
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
      let procCdName = $("#procCdName").val(); //공정명

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
    // console.log(procPerform);
    let check = false;
    $.ajax({
      url: "insertprocperform",
      method: "POST",
      async: false, //동기로 처리
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: JSON.stringify(procPerform),
      error: function (error, status, msg) {
        //alert("상태코드 " + status + "에러메시지" + msg);
        console.log(error);
        check = true;
      },
      success: function (data) {
        check = true;
        console.log("success");
      },
    });
    if (check == true) {
      let processOrder;
      let procCdName = $("#procCdName").val();
      $("#workInsertTable tbody tr").each(function () {
        //console.log($(this).find("td:eq(1)").text())
        if (procCdName == $(this).find("td:eq(1)").text()) {
          processOrder = parseInt($(this).find("td:eq(0)").text());
        }
      });

      if (processOrder == 1) {
        let finPrdCdCode;
        $("#procManageTable tbody tr").each(function () {
          if ($(this).find("td:eq(0)").children().prop("checked")) {
            finPrdCdCode = $(this).find("td:eq(4)").text();
          }
        });
        //처리
        //제품명으로 사용량 자재 재고 조회
        console.log("finRscVO로 넘기는 finPrdCdCode=" + finPrdCdCode);
        findRscVO(finPrdCdCode);
      }
    }

    let processOrder;
    let procCdName = $("#procCdName").val();
    $("#workInsertTable tbody tr").each(function () {
      //console.log($(this).find("td:eq(1)").text())
      if (procCdName == $(this).find("td:eq(1)").text()) {
        processOrder = $(this).find("td:eq(0)").text();
      }
    });
    let nextProcessOrder = parseInt(processOrder) + 1;
    console.log("프로세스오더->" + nextProcessOrder);

    if (nextProcessOrder < 6) {
      let instProdNo;
      $("#procManageTable tbody tr").each(function () {
        if ($(this).find("td:eq(0)").children().prop("checked")) {
          instProdNo = $(this).find("input[type=hidden]").val();
        }
      });
      console.log("저장할 instProdNo->" + instProdNo);

      let updateData = {
        inDtlVol: prodVol,
        instProdNo: instProdNo,
        processOrder: nextProcessOrder,
      };
      console.log(updateData);
      //다음공정 입고량 업데이트
      $.ajax({
        url: "updateprocindetlvol",
        method: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(updateData),
        error: function (error, status, msg) {
          //alert("상태코드 " + status + "에러메시지" + msg);
          console.log(error);
        },
        success: function (data) {
          console.log("success");
        },
      });
    } else {
      //포장일 경우?
    }
  });
}); //document end

let work;
//작업시작 시간 입력
function startWork() {
  //완료여부

  let completionStatus;
  $("#workInsertTable tbody tr").each(function () {
    let mchnName = $("#mchnName").val();
    let tablemchnname = $(this).find("td:eq(2)").text();

    // console.log("찾은 테이블에있는 머신이름?" + tablemchnname);
    if (mchnName == tablemchnname) {
      completionStatus = $(this).find("input[name=completionStatus]").val();
    }
  });
  console.log("컴플리션스테이터스->" + completionStatus);
  // if (completionStatus == 'y') {
  //   alert('이미 완료된 작업입니다.');
  //   return;
  // }

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
    $("#workInsertTable tbody tr").each(function () {
      let mchnName = $("#mchnName").val();
      if (mchnName == $(this).find("td:eq(2)").text()) {
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
    $("#workInsertTable tbody tr").each(function () {
      let mchnName = $("#mchnName").val();
      if (mchnName == $(this).find("td:eq(2)").text()) {
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

function findRscVO(finPrdCdCode) {
  $.ajax({
    url: `findrscvo/${finPrdCdCode}`,
    method: "GET",
    dataType: "json",
    contentType: "application/json;charset=utf-8",

    success: function (data) {
      console.log(data);
      let indicaVol = parseInt($("#workStateTable tbody tr:eq(1) td").text()); //지시량
      let rscCdName;
      let totalQty;
      for (obj of data) {
        let needQty = obj.bomRscUseVol * indicaVol; //소요량
        console.log(obj.rscCdName + "재고량->" + obj.rscStock);
        console.log("원래소요량->" + needQty);
        console.log("포문시작 토탈 큐티와이" + totalQty);
        if (totalQty != undefined && totalQty != "") {
          if (obj.rscStock < totalQty) {
            console.log("맨위 이프 작을 떄 자재명 ->" + obj.rscCdName);
            console.log("계산후 남은 소요량 ->" + totalQty);
            totalQty = totalQty - obj.rscStock;
            console.log(
              obj.rscLotNo +
                "자재 " +
                obj.rscCdName +
                "를" +
                obj.rscStock +
                "만큼 출고량 인설트"
            );
            console.log("토탈큐티와이" + totalQty);
          } else {
            if (rscCdName == obj.rscCdName) {
              console.log("맨위이프 왔따 가따");
            } else {
              console.log(
                "남은 소요량" + totalQty + "만큼감소" + obj.rscCdName
              );
              console.log(
                obj.rscLotNo +
                  "자재 " +
                  obj.rscCdName +
                  "를" +
                  totalQty +
                  "만큼 출고량 인설트"
              );
              totalQty = "";
            }
          }
        } else {
          if (obj.rscStock < needQty) {
            console.log("작을 떄 자재명->" + obj.rscCdName);
            console.log("남은 소요량->" + (needQty - obj.rscStock));
            console.log(
              obj.rscLotNo +
                "자재 " +
                obj.rscCdName +
                "를" +
                obj.rscStock +
                "만큼 출고량 인설트"
            );
            totalQty = needQty - obj.rscStock;
            console.log("토탈큐티와이" + totalQty);
          } else {
            if (rscCdName == obj.rscCdName) {
              console.log("한번 왔다 가따");
            } else {
              if (totalQty != "" && totalQty != null && totalQty != undefined) {
                console.log(
                  "남은 소요량" + totalQty + "만큼 감소->" + obj.rscCdName
                );

                totalQty = "";
              } else {
                console.log(needQty + "만큼 감소 ->" + obj.rscCdName);
                rscCdName = obj.rscCdName;
              }
            }
          }
        }
      }
    },
  });
}
