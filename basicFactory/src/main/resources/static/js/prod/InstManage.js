//InstManage.js

$(document).ready(function () {
  $("#empid").click(function (e) {
    e.preventDefault();
    $("#findempModal").modal("show");
  });

  //모달창 확인 버튼
  $("#selectbtn").click(function () {
    $("#findempModal").modal("hide");
  });

  findEmp();

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

    $("#empid").val(empName);
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
