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
    let workScope = "진행전";
    findNotInProgInstDate(instSdate, instEdate, workScope);
  });

  //모달 테이블 클릭 이벤트
  $("#FindNotInProgressInstTable").on("click", "tr", function () {
    //console.log($(this).find("td:eq(1)").text());

    $("#planDetailTable tbody tr").remove();
    planDetailTableMakeRow($(this));

    //라인명 입력
    findProdName($(this).find("td:eq(3)").text());

    $("#FindNotInProgressInstModal").modal("hide");
  });
});

//기존 생산지시 진행전인 건만 조회
function findNotInProgInst() {
  let workScope = "진행전";
  $.ajax({
    url: `findvinst`,
    method: "GET",
    dataType: "json",
    data: {
      workScope: workScope,
    },
    success: function (data) {
      console.log(data);
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
function findNotInProgInstDate(instSdate, instEdate, workScope) {
  $.ajax({
    url: `findvinst`,
    method: "GET",
    dataType: "json",
    data: {
      workScope: workScope,
      instSdate: instSdate,
      instEdate: instEdate,
    },
    success: function (data) {
      console.log(data);
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
    error: function (error, status, msg) {},
  });
}
//생산지시 헤더 조회
function getInst(instNo) {
  $.ajax({
    url: `getinst/${instNo}`,
    method: "GET",
    async: false,
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
      $("#instdate").val(data.instDate);
      $("#instremk").val(data.instRemk);
      $("#instname").val(data.instName);
      getEmpName(data.empId);
      $("#empid").append(
        `<input type="hidden" id="instNo" value="${data.instNo}">`
      );
    },
    error: function (error, status, msg) {},
  });
}
//empId로 empName찾기
function getEmpName(empId) {
  $.ajax({
    url: `getempname/${empId}`,
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#empid").val(data.empName);
    },
    error: function (error, status, msg) {},
  });
}

function FindNotInProgressInstTableMakeRow(obj, index) {
  let node = `<tr>
                <td>${index}</td>
                <td>${obj.instDate}</td>
                <td>${obj.instNo}</td>
                <td>${obj.finPrdCdCode}</td>
                <td>${obj.finPrdCdName}</td>
                <td>${obj.finPrdCdVol + obj.finPrdCdUnit}</td>
                <td>${obj.instProdIndicaVol}</td>
                <td>${obj.workScope}</td>
                <td>${obj.workDate}</td>
                <input type="hidden" value="${
                  obj.instProdNo
                }" name="instProdNo">
              </tr>`;

  $("#FindNotInProgressInstTable tbody").append(node);
}

function planDetailTableMakeRow(tr) {
  let instNo = tr.find("td:eq(2)").text();
  let instProdNo = tr.find("input:hidden[name=instProdNo]").val();
  console.log("instProdNo ->" + instProdNo);
  $("#instname").append(
    `<input type="hidden" value="${instProdNo}" id="instProdNo"`
  );
  getInst(instNo);

  let node = `<tr class="updateInst">
                <td><input type="checkbox"></td>
                <td><input type="text" name="prodCode" value="${tr
                  .find("td:eq(3)")
                  .text()}"></td>
                <td><input type="text" disabled value="${tr
                  .find("td:eq(4)")
                  .text()}"></td>
                <td><input type="text" disabled value="${tr
                  .find("td:eq(5)")
                  .text()}"></td>
                <td><input type="text" disabled></td>
                <td><input type="text" disabled></td>
                <td><input type="text" disabled></td>
                <td><input type="text" disabled></td>
                <td><input type="text" disabled></td>
                <td><input type="text" disabled></td>
                <td><input type="text" value="${tr
                  .find("td:eq(6)")
                  .text()}"></td>
                <td><input type="text" disabled></td>
                <td><input type="date" value="${tr
                  .find("td:eq(8)")
                  .text()}"></td>
                <input type="hidden" value="${instProdNo}" id="instProdNo">
              </tr>`;

  $("#planDetailTable tbody").append(node);
}
