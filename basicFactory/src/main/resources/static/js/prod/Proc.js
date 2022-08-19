$(document).ready(function () {
  $("#worker").click(function (e) {
    e.preventDefault();

    $("#findempModal").modal("show");
  });

  $("#proccdname").click(function (e) {
    e.preventDefault();

    $("#findProcCdNameModal").modal("show");
  });

  $("#mchnname").click(function (e) {
    e.preventDefault();

    $("#findMchnNameModal").modal("show");
  });

  //직원검색
  findEmp();
  //공정명 검색
  findAllProcCode();
  //설비명검색
  findMchnName();
  function findEmp() {
    $.ajax({
      url: "findemp",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $.each(data, function (index, item) {
          // console.log("length -> " + data.length);
          // console.log(index);
          // console.log(item.deptvo.deptName);
          // console.log(item.empvo.empName);
        });

        let index = 0;
        for (obj of data) {
          index += 1;
          makeRow(obj, index);
        }
      },
    });
  }

  //공정검색
  function findAllProcCode() {
    $.ajax({
      url: "findallproccode",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        let index = 0;
        for (obj of data) {
          index += 1;
          makeProcCodeRow(obj, index);
        }
      },
    });
  }
  function makeProcCodeRow(obj, index) {
    let node = `<tr>
    <td>${index}</td>
    <td>${obj.procCdCode}</td>
    <td>${obj.procCdName}</td>
    <td>${obj.procCdRemk}</td>
   </tr>`;
    $("#findProcCdNameTable").append(node);
  }
  //공정테이블 클릭이벤트
  $("#findProcCdNameTable").on("click", "tr", function () {
    let procCdName = $(this).find("td:eq(2)").text();
    $("#proccdname").val(procCdName);
    $("#findProcCdNameModal").modal("hide");
  });
  //설비검색
  function findMchnName() {
    $.ajax({
      url: "findallmchn",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        let index = 0;
        for (obj of data) {
          index += 1;
          mchnMakeRow(obj, index);
        }
      },
    });
  }

  //설비테이블 클릭이벤트
  $("#findMchnTable").on("click", "tr", function () {
    let mchnName = $(this).find("td:eq(2)").text();
    $("#mchnname").val(mchnName);
    $("#findMchnNameModal").modal("hide");
  });

  function mchnMakeRow(obj, index) {
    let node = `<tr>
                 <td>${index}</td>
                 <td>${obj.mchnCode}</td>
                 <td>${obj.mchnName}</td>
                 <td>${obj.procCdName}</td>
                 <td>${obj.mchnStts}</td>
                </tr>`;
    $("#findMchnTable").append(node);
  }

  //초기데이터
  function makeRow(obj, index) {
    let node = `<tr>
								<td>${index}</td>
								<td>${obj.empvo.empName}</td>
								<td>${obj.deptvo.deptName}</td>
							</tr>`;
    $("#findemptbody").append(node);
  }

  //테이블 클릭 이벤트
  $("#findemptable").on("click", "tr", function () {
    console.log($(this).find("td:eq(1)").text());
    let empName = $(this).find("td:eq(1)").text();

    $("#worker").val(empName);
    $("#findempModal").modal("hide");
  });

  //검색버튼 클릭 이벤트
  $("#findempbtn").click(function () {
    console.log("버튼클릭");
    console.log($("#empName").val());
    let empname = $("#empName").val();

    $.ajax({
      url: `findemp/${empname}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        //console.log(data);

        $("#findemptbody tr").remove();

        let index = 1;
        let obj = data;
        makeRow(obj, index);
      },
    });
  });
});
