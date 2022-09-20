$(document).ready(function () {
  findAllProcCode();
  findMchnName();

  $("#saveBtn").prop("disabled", true);

  let date = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -14);
  $("#inputDate").val(date).prop("readonly", true);
  $("#workEndBtn").prop("disabled", true);

  //작업 종료 버튼
  $("#workEndBtn").click(function () {
    $("#saveBtn").prop("disabled", false);

    let date = new Date();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    $("#eHours").val(hours).prop("readonly", true);
    $("#eMinutes").val(minutes).prop("readonly", true);
    $("#workEndBtn").prop("disabled", true);
    let mchnCode = $("#mchnCode").val();
    $.ajax({
      url: `endmchnstatusupdate/${mchnCode}`,
      method: "POST",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        // console.log(data);
      },
    });
  });
  //작업시작시간 입력
  $("#workStartBtn").click(function () {
    //설비테이블 클릭이벤트 제거
    $("#equipTable").off("click");

    let mchnCode = $("#mchnCode").val();
    let mchnStatus = $("#mchnStatus").val();

    if (mchnStatus == "비가동") {
      alert("비가동중입니다.");
    } else if (mchnCode == "") {
      selectMchn();
    } else {
      findMchnName();
      let date = new Date();

      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);
      $("#workStartBtn").prop("disabled", true);
      $("#sHours").val(hours).prop("readonly", true);
      $("#sMinutes").val(minutes).prop("readonly", true);
      $("#workEndBtn").prop("disabled", false);
      $("#empid").prop("readonly", true);
      $.ajax({
        url: `startmchnstatusupdate/${mchnCode}`,
        method: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) { },
      });
      $.ajax({
        url: `findinputno`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          // console.log("inputno-> " + data);
          $("#inputNo").val(data);
        },
      });

      nonOpTableMakeRow();
    }
  });
  //설비테이블 클릭 이벤트
  $("#equipTable").on("click", "tr", function () {
    let mchnCode = $(this).find("td:eq(0)").text();
    let mchnName = $(this).find("td:eq(1)").text();
    let mchnStatus = $(this).find("td:eq(3)").text();
    $("#mchnCode").val(mchnCode).prop("readonly", true);
    $("#mchnName").val(mchnName).prop("readonly", true);
    $("#mchnStatus").val(mchnStatus);
  });

  //공정셀렉티드 검색
  $("#selectProcCdName").bind("input", function () {
    let procCdName = $("#selectProcCdName option:selected").text();
    $.ajax({
      url: `findmchn/${procCdName}`,
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#equiptbody tr").remove();
        for (obj of data) {
          mchnMakeRow(obj);
        }
      },
    });
  });

  //비가동테이블 ㅡㄹ릭 이벤트
  $("#nonOpTable").on("click", "tr", function () {
    let nonOpCode = $(this).find("td:eq(0)").children();
    let nonOpName = $(this).find("td:eq(1)").children();
    let nonOpRsn = $(this).find("td:eq(2)").children();

    nonOpRsn.change(function () {
      nonOpRsn.removeClass("inputRequired");
    });

    if (nonOpName.val() != "") {
      nonOpName.removeClass("inputRequired");
    }

    nonOpCode.bind("input", function () {
      console.log($(this).val());
      $(this).removeClass("inputRequired");
      let nonOpCode = $(this).val();
      $.ajax({
        url: "getnonopcode",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          nonOpCode: nonOpCode,
        },
        error: function (error, status, msg) {
          nonOpName.val("");
        },
        success: function (data) {
          console.log(data);
          if (data.length == 0) {
            nonOpName.val("");
          } else {
            nonOpName.val(data.nonOpName);
          }
        },
      });
    });
  });

  //저장버튼 클릭
  $("#saveBtn").click(function () {
    let sHours = $("#sHours").val();

    let sMinutes = $("#sMinutes").val();

    let eHours = $("#eHours").val();

    let eMinutes = $("#eMinutes").val();
    let inputNo = $("#inputNo").val();
    let mchnCode = $("#mchnCode").val();
    let nonOpCode = $("#nonOpTable tbody tr").find("td:eq(0)").children().val();
    let nonOpName = $("#nonOpTable tbody tr").find("td:eq(1)").children().val();
    let empId = $("#empid").val();
    let inputDate = $("#inputDate").val();
    let startTime = sHours + ":" + sMinutes;
    let endTime = eHours + ":" + eMinutes;
    let nonOpRsn = $("#nonOpTable tbody tr").find("td:eq(2)").children().val();
    let remk = $("#nonOpTable tbody tr").find("td:eq(3)").children().val();
    let nonOpMin = eMinutes - sMinutes;

    if (nonOpCode == "" || nonOpRsn == "" || nonOpName == "") {
      if (nonOpCode == "") {
        $("#nonOpTable tbody tr")
          .find("td:eq(0)")
          .children()
          .addClass("inputRequired");
      }

      if (nonOpRsn == "") {
        $("#nonOpTable tbody tr")
          .find("td:eq(2)")
          .children()
          .addClass("inputRequired");
      }

      if (nonOpName == "") {
        $("#nonOpTable tbody tr")
          .find("td:eq(1)")
          .children()
          .addClass("inputRequired");
      }
      inputDataWarn();
      return;
    }
    if (sHours == "" || eHours == "") {
      inputDataWarn();
      return;
    }

    let nonOpHistory = {
      inputNo: inputNo,
      mchnCode: mchnCode,
      nonOpCode: nonOpCode,
      empId: empId,
      inputDate: inputDate,
      nonOpMin: nonOpMin,
      nonOpStartTime: startTime,
      nonOpEndTime: endTime,
      nonOpRemk: remk,
      nonOpRsn: nonOpRsn,
    };

    console.log(nonOpHistory);
    Swal.fire({
      icon: "success", // Alert 타입
      title: "저장이 완료되었습니다.", // Alert 제목
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "insertnonophistory",
          method: "POST",
          contentType: "application/json;charset=utf-8",
          dataType: "json",
          data: JSON.stringify(nonOpHistory),
          error: function (error, status, msg) {
            alert("상태코드 " + status + "에러메시지" + msg);
          },
          success: function (data) {
            console.log("success");
          },
        });
        location.reload();
      }
    });
  });
});

//설비테이블
function findMchnName() {
  $.ajax({
    url: "findmchn",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#equiptbody tr").remove();
      for (obj of data) {
        mchnMakeRow(obj);
      }
    },
  });
}

//공정검색
function findAllProcCode() {
  $.ajax({
    url: "findproccode",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      let index = 0;
      for (obj of data) {
        // console.log("어팬드");
        $("#selectProcCdName").append(
          "<option value='" + (index += 1) + "'>" + obj.procCdName + "</option>"
        );
      }
    },
  });
}

//설비테이블 행추가
function mchnMakeRow(obj) {
  let node = `<tr style="cursor:pointer;">                 
                   <td>${obj.mchnCode}</td>
                   <td>${obj.mchnName}</td>
                   <td>${obj.procCdName}</td>
                   <td>${obj.mchnStts}</td>
                  </tr>`;
  $("#equiptbody").append(node);
}
//비가동 입력 테이블 행 추가
function nonOpTableMakeRow() {
  let node = `<tr>
		            <td><input type="text"></td>
                <td><input type="text" readonly></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
              </tr>`;

  $($("#nonOpTable tbody")).append(node);
}

function selectMchn() {
  Swal.fire({
    icon: "warning",
    title: "설비를 선택하세요",
  });
}
function selectemp() {
  Swal.fire({
    icon: "warning",
    title: "작업자를 입력하세요",
  });
}

function inputDataWarn() {
  Swal.fire({
    icon: "warning",
    title: "입력되지 않은 값이 있습니다.",
  });
}
