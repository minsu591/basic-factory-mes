$("document").ready(function () {

  $("#closeBtn").click(function () {
    $("#workInsertModal").modal("hide");
  });

  //불량증가
  fltyCntUp();
  //불량감소
  fltyCntDown();
  //불량저장이벤트
  addFlty();

  //설비상태 클릭 이벤트
  $("#mchnStatus").on("click", "button", function () {
    let instProdNo;
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
      }
    });
    let statusMchnName = $(this).text();
    findProcess(instProdNo, statusMchnName);
    let processNo = $("#processNo").val();
    //모달 시간과 날짜 입력을 위해 조회
    getprocPerform(processNo);
  });


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
          //모달데이터 입력
          getprocPerform(processNo);
        }
      });

      $("#workInsertModal").modal("show");
    }
  });

  //저장버튼
  $("#saveBtn").click(function () {
    //공정실적 테이블 등록
    let workDate = $("#instDate").val();
    let processNo = $("#processNo").val(); //작업번호
    let inDtlVol = $("#workStateTable tr:eq(1) td").text();//입고량 
    let prodVol = $("#workStateTable tr:eq(3) td").text(); //실적량
    let fltyVol = $("#workStateTable tr:eq(4) td").text(); //불량랑
    let procPerform = {
      processNo: processNo,
      prodVol: prodVol,
      fltyVol: fltyVol,
      workStartTime: workDate + " " + $("#sHours").val() + ":" + $("#sMinutes").val(),
      workEndTime: workDate + " " + $("#eHours").val() + ":" + $("#eMinutes").val(),
      workerName: $("#empid").val(),
      prodDate: workDate,
    };
    console.log(procPerform);
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
        let instProdNo;
        $("#procManageTable tbody tr").each(function () {
          if ($(this).find("td:eq(0)").children().prop("checked")) {
            finPrdCdCode = $(this).find("td:eq(4)").text();
            instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
          }
        });
        //처리
        console.log("finRscVO로 넘기는 finPrdCdCode=" + finPrdCdCode);
        //프로시저호출 자재 재고 등록
        insertRscVO(finPrdCdCode, inDtlVol, processNo);

        //지시 작업구분 업데이트
        updateWorkScope(instProdNo);
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
      updateProcIndtlVol(updateData);
      saveSucess();
    } else {
      //포장일 경우?
    }

  });
}); //document end


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////AJAX////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//제품명,입고량 ,등 테이블 생성 
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


//모달창 헤더 데이터 입력
function getprocPerform(processNo) {
  $.ajax({
    url: `getprocperform/${processNo}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      // console.log("getperfrom->" + data.prodDate);
      $("#workStartBtn").prop("disabled", true);
      $("#addFlty").prop("disabled", true);
      $("#workEndBtn").prop("disabled", true);
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
      $("#workStartBtn").prop("disabled", false);
      $("#addFlty").prop("disabled", false);
      $("#sHours").val("");
      $("#sMinutes").val("");
      $("#eHours").val("");
      $("#eMinutes").val("");
      $("#empid").val("").prop("readonly", false);

    },
  });
}
//다음공정 입고량 업데이트
function updateProcIndtlVol(updateData) {
  $.ajax({
    url: "updateprocindtlvol",
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
};
//설비 완료여부 업데이트
function updateProcCheck(processNo) {
  $.ajax({
    url: `updateproccheck`,
    method: "PUT",
    dataType: "json",
    async: false, //동기로 처리
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      processNo: processNo,
    }),
    success: function (data) {
      alert("완료 업데이트");
    },
  });
}
//설비상태 업데이트
function updateMchnStts(mchnCode, mchnStts) {
  $.ajax({
    url: `updatemchnstts`,
    method: "PUT",
    dataType: "json",
    async: false,
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
//설비 상태 조회
function selectMchnStts(prodCode) {
  $.ajax({
    url: `selectmchn/${prodCode}`,
    method: "GET",
    async: false,
    dataType: "json",
    success: function (data) {
      //console.log("리로드 셀렉트머신->" + data);
      $("#mchnStatus div").remove();
      //업데이트 후에 화면 상에 input val이 업데이트가 안되서 안되는듯
      for (obj of data) {
        reloadMchnSttsMakeRow(obj);
      }
    },
  });
}
//불량량업데이트 
function updateFltyVol(totalProdVol, processNo, resultFltyVol) {
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
}
//실적량 업데이트 
function updateProdVol(processNo, totalProdVol, procCdName) {
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
}
//달성률 업데이트
function updateAchieRate(processNo, achieRate) {
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
};
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////AJAX   END /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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
  updateProdVol(processNo, totalProdVol, procCdName);


  //달성률 업데이트
  updateAchieRate(processNo, achieRate);


  if (num == parseInt(inDtlVol.text())) {
    console.log("종료");
    endWork();
  }
}
//프로시저 호출 자재 재고 내역 등록
function insertRscVO(finPrdCdCode, inDtlVol, processno) {
  let empId = $("#empid").val();
  let processNo = parseInt(processno);
  $.ajax({
    url: `insertrscout`,
    method: "POST",
    dataType: "json",
    data: JSON.stringify({
      finPrdCdCode: finPrdCdCode,
      inDtlVol: inDtlVol,
      processNo: processNo,
      empId: empId
    }),
    contentType: "application/json;charset=utf-8",
    success: function (data) {
      console.log(data);

    },
  });
}

//지시 작업구분 업데이트
function updateWorkScope(instProdNo) {
  let workScope = "진행중";

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

//자재 출고량 인설트
function insertRscOut(rscLotNo, rscCdCode, needQty) {
  let processNo = $("#processNo").val(); //현재 공정작업번호 (perfrom키 찾기 위해)
  let instDate = $("#instDate").val(); // 출고 일자
  let rscOutCls = 1; //출고 분류
  console.log(instDate);
  let empName = $("#empid").val(); //작업자 이름 
  $.ajax({
    url: "insertrscout",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      processNo: processNo,
      rscCdCode: rscCdCode,
      rscLotNo: rscLotNo,
      rscOutDate: instDate,
      rscOutVol: needQty,
      rscOutCls: rscOutCls,
      empName: empName
    }),
    error: function (error, status, msg) {

    },
    success: function (data) {

    },
  });
}


/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Make Row //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


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


function reloadMchnSttsMakeRow(obj) {
  let node;
  let instProdNo;
  $("#procManageTable tbody tr").each(function () {
    if ($(this).find("td:eq(0)").children().prop("checked")) {
      instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
    }
  });

  $.ajax({
    url: `findprocess/${instProdNo}`,
    method: "GET",
    dataType: "json",
    success: function (data) {

      for (obj2 of data) {
        console.log('obj2 of data ')
        if (obj2.mchnCode == obj.mchnCode) {
          console.log('obj2mc=objmc')
          if (obj2.completionStatus == 'y') {
            console.log('if y')
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


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Make Row End ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Functinon /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


//모달창 제품명 입력
function modalprodName(data) {
  let prodName = data.find("td:eq(5)").text();
  $("#workStateTable tr:eq(0)").append(`<td>${prodName}</td>`);
}


let fltyCnt = 0;
function fltyCntUp() {
  $("#fltyCnt").val(fltyCnt);
  //불량증가
  $("#fltyUp").click(function () {
    fltyCnt += 1;
    $("#fltyCnt").val(fltyCnt);
  });
}

function fltyCntDown() {
  //불량감소
  $("#fltyDown").click(function () {
    if (fltyCnt == 0) {
      $("#fltyCnt").val(0);
    } else {
      fltyCnt -= 1;
      $("#fltyCnt").val(fltyCnt);
    }
  });
}

function addFlty() {  //불량 클릭 버튼 이벤트
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
      updateFltyVol(totalProdVol, processNo, resultFltyVol);
      fltyinfo();

    } else {
    }
  });
}

let work;
//작업시작 시간 입력
function startWork() {
  //완료여부
  $("#workEndBtn").prop("disabled", false);
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
  if (completionStatus == 'y') {
    warning();
    return;
  }
  let inDtlVol = $("#workStateTable tbody tr:eq(1) td").text(); //입고량

  if (inDtlVol == 0) {
    noInDtlVol();
    return;
  }
  if ($("#empid").val() == "") {
    noEmpId();

    return;
  } else {
    $("#empid").prop("readonly", true);
    $("#instDate").prop("readonly", true);
  }


  // let virResult = $("#workStateTable tbody tr:eq(2) td").text(); //기실적량
  // let prodVol = $("#workStateTable tbody tr:eq(3) td").text(); //실적량
  // let fltyVol = $("#workStateTable tbody tr:eq(4) td").text(); //불량량

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
    work = setInterval(startinterval, 100);

    //설비상태 다시 리로드
    let prodCode;
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        prodCode = $(this).find("td:eq(4)").text();
      }
      console.log("리로드 프로드코드->" + prodCode);
    });
    selectMchnStts(prodCode);
  } else {
    warning();
  }
}

//작업종료 시간 입력
function endWork() {
  if ($("#eHours").val() == "" && $("#eMinutes").val() == "") {
    //인터벌 종료
    num = 0;
    $("#saveBtn").prop("disabled", false);
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
    updateProcCheck(processNo);

    //설비 상태 다시 리로드
    let prodCode;
    $("#procManageTable tbody tr").each(function () {
      if ($(this).find("td:eq(0)").children().prop("checked")) {
        prodCode = $(this).find("td:eq(4)").text();
      }
      console.log("리로드 프로드코드->" + prodCode);
    });
    selectMchnStts(prodCode);

  }

} // 작업종료 끝




/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Functinon End ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////



function warning() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "이미 완료된 작업입니다.", // Alert 제목
  })
}
function fltyinfo() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "불량 등록이 완료되었습니다.", // Alert 제목
  })
};
function noEmpId() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "작업자가 입력되지 않았습니다.", // Alert 제목
  })
};
function noInDtlVol() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "입고가 되지 않은 공정입니다.", // Alert 제목
  })
}

function saveSucess() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "저장 되었습니다.", // Alert 제목

  })
}