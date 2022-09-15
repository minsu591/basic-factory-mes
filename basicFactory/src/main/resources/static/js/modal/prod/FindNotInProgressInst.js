$(document).ready(function () {
  $("#findNotInProgInst").click(function (e) {
    e.preventDefault();
    $("#FindNotInProgressInstModal").modal("show");
  });
  //기존 생산지시 진행전인 건만 조회
  findNotInProgInst();

  //기존생산지시 검색버튼
  $("#FindNotInProgressInstBtn").click(function () {
    //기존 생산지시 날짜별 조회
    let instSdate = $("#instSdate").val();
    let instEdate = $("#instEdate").val();
    findNotInProgInstDate(instSdate, instEdate);
  });

  //모달 테이블 클릭 이벤트
  $("#FindNotInProgressInstTable").on("click", "tr", function () {
    //console.log($(this).find("td:eq(1)").text());
    // console.log("모달 -> 유니크라인어레이" + uniqueLineArray);
    uniqueLineArray.splice(0);
    //console.log("모달 -> 자르고->" + uniqueLineArray);
    lineArray.splice(0);
    inDtlVol.splice(0);
    prodCodeArr.splice(0);
    $("#planDetailTable tbody tr").each(function () {
      $(this).children().children().prop("checked", false);
    });
    $("#planDetailTable tbody tr").remove();
    $("#procStatusTable tbody tr").remove();
    $("#rscStockTable tbody tr").remove();
    let instNo = $(this).find("td:eq(2)").text();
    //console.log(instNo);

    let instName = $(this).find("td:eq(1)").text();
    $("#instname").val(instName);
    $("#planDetailTable thead tr").find("input:hidden").remove();
    $("#planDetailTable thead tr").append(`<input type="hidden" id="instNo" value="${instNo}">`);
    findNotInProcInst(instNo);

    $("#FindNotInProgressInstModal").modal("hide");
  });
});

//생산지시번호로 진행전인 지시 디테일목록 조회
function findNotInProcInst(instNo) {
  $.ajax({
    url: `findnotprocinst`,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: {
      instNo: instNo
    },
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg + ' ' + error);
    },
    success: function (data) {

      console.log('생산지시 ->' + data);

      $("#planDetailTable tbody tr").remove();
      // let index = 0;
      for (obj of data) {
        let finInfoList = finInfo(obj.finPrdCdCode);
        //console.log(finInfoList);
        planDetailTableMakeRow(obj, finInfoList);

      }
    },
  });
};


function finInfo(prodCode) {
  let finPrdCdName;
  let prodUnit;
  let lineName;
  $.ajax({
    url: `findProdName/${prodCode}`,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data);
      finPrdCdName = data.finPrdCdName;
      prodUnit = data.finPrdCdVol + data.finPrdCdUnit;
      lineName = data.lineCdHdName;
    },
    error: function (error, status, msg) {
      finPrdCdName = "";
      prodUnit = "";
      lineName = "";
    },
  });
  return [finPrdCdName, prodUnit, lineName];
};


//기존 생산지시 진행전인 건만 조회
function findNotInProgInst() {

  let workScope = "진행전";
  $.ajax({
    url: `findinst`,
    method: "GET",
    dataType: "json",
    success: function (data) {

      console.log('기존생산지시' + data);

      $("#FindNotInProgressInstTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        FindNotInProgressInstTableMakeRow(obj, index);
      }
    },
  });
}
//진행전 지시 검색
function findNotInProgInstDate(instSdate, instEdate) {
  $.ajax({
    url: `findinst`,
    method: "GET",
    dataType: "json",
    data: {
      instSdate: instSdate,
      instEdate: instEdate,
    },
    success: function (data) {
      console.log('검색후 데이터->' + data);
      $("#FindNotInProgressInstTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        FindNotInProgressInstTableMakeRow(obj, index);
      }
    },
  });
}

function findProdName(prodCode) {
  $.ajax({
    url: `findProdName/${prodCode}`,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
      $("#planDetailTable tbody tr td:eq(11)")
        .children()
        .val(data.lineCdHdName);
    },
    error: function (error, status, msg) { },
  });
}
//생산지시 헤더 조회
// function getInst(instNo) {
//   $.ajax({
//     url: `getinst/${instNo}`,
//     method: "GET",
//     async: false,
//     contentType: "application/json;charset=utf-8",
//     dataType: "json",
//     success: function (data) {
//       $("#instdate").val(data.instDate);
//       $("#instremk").val(data.instRemk);
//       $("#instname").val(data.instName);
//       getEmpName(data.empId);
//       $("#empid").append(
//         `<input type="hidden" id="instNo" value="${data.instNo}">`
//       );
//     },
//     error: function (error, status, msg) { },
//   });
// }
//empId로 empName찾기
// function getEmpName(empId) {
//   $.ajax({
//     url: `getempname/${empId}`,
//     method: "GET",
//     contentType: "application/json;charset=utf-8",
//     dataType: "json",
//     success: function (data) {
//       console.log(data);
//       $("#empid").val(data.empName);
//     },
//     error: function (error, status, msg) { },
//   });
// }

function FindNotInProgressInstTableMakeRow(obj, index) {
  let node = `<tr style="cursor:pointer;">
                <td>${index}</td>
                <td>${obj.instName}</td>
                <td>${obj.instNo}</td>
                <td>${obj.instDate}</td>
                <td>${obj.empId}</td>
                <td>${obj.planHdCode == null ? '' : obj.planHdCode}</td>
              </tr>`;
  $("#FindNotInProgressInstTable tbody").append(node);
}

function planDetailTableMakeRow(obj, finInfoList) {
  let date = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -14);
  console.log("instprodNo ->" + obj.instProdNo);
  let node = `<tr class="updateInst" style="cursor:pointer;">
              <td><input type="checkbox"></td>
              <td><input type="text" value="${obj.finPrdCdCode}"></td>
              <td><input type="text" disabled value="${finInfoList[0]}"></td>
              <td><input type="text" disabled value="${finInfoList[1]}"></td>
              <td><input type="text" disabled value="${obj.planIdx == 0 ? '' : obj.planIdx}"></td>
              <td><input type="text" disabled value="${obj.planHdCode == null ? '' : obj.planHdCode}"></td>
              <td><input type="text" disabled value="${obj.planSdate == null ? '' : obj.planSdate}"></td>
              <td><input type="text" disabled value="${obj.planEdate == null ? '' : obj.planEdate}"></td>
              <td><input type="text" disabled value="${obj.planHdCode == null ? 0 : obj.instProdIndicaVol}"></td>
              <td><input type="text" disabled value="${obj.planHdCode == null ? 0 : obj.planProdVol - obj.instProdIndicaVol}"></td>
              <td><input type="text" value="${obj.instProdIndicaVol}"></td>
              <td><input type="text" disabled value="${finInfoList[2]}" ></td>
              <td><input type="date" min="${date}" value="${obj.workDate}"></td>
              <td><input type="hidden" name="instProdNo" value="${obj.instProdNo}"></td>
              </tr>`;

  $("#planDetailTable tbody").append(node);
}
