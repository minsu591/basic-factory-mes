$("document").ready(function () {
  $("#empName").click(function (e) {
    e.preventDefault();
    findEmp();
    $("#findempModal").modal("show");
  });

  //모달테이블 클릭 이벤트
  $("#findemptable").on("click", "tr", function () {
    console.log($(this).find(".empId").val());
    let empName = $(this).find("td:eq(1)").text();
    let empId = $(this).find(".empId").val();
    $("#empName").val(empName);
    $("#empId").val(empId);
    $("#findempModal").modal("hide");
  });

  //검색버튼 클릭 이벤트
  $("#findempbtn").click(function () {
    let empname = $("#empName").val();
    if (empname == "") {
      findEmp();
    } else {
      $.ajax({
        url: `findemp`,
        method: "GET",
        dataType: "json",
        data: { empName: empname },
        success: function (data) {
          console.log(data);
          $("#findemptbody tr").remove();
          let index = 0;
          for (obj of data) {
            index += 1;
            empMakeRow(obj, index);
          }
        },
      });
    }
  });
});
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
      let index = 0;
      $("#findemptbody tr").remove();
      for (obj of data) {
        index += 1;
        empMakeRow(obj, index);
      }
    },
  });
}
//초기데이터
function empMakeRow(obj, index) {
  let node = `<tr>
                <td>${index}</td>
                <input type="hidden" value="${obj.empvo.empId}" class="empId">
                <td>${obj.empvo.empName}</td>
                <td>${obj.deptvo.deptName}</td>
              </tr>`;
  $("#findemptbody").append(node);
}
