//InstManage.js

$(document).ready(function () {
  $("#empid").click(function (e) {
    e.preventDefault();
    $("#findempModal").modal("show");
  });

  $("#selectbtn").click(function () {
    console.log("클릭이벤트으ㅡ");

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
      },
    });
  }
});
