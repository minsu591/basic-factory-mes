$("document").ready(function () {
  $("#empid").click(function (e) {
    e.preventDefault();
    findEmp();
    $("#findempModal").modal("show");
  });

  //모달테이블 클릭 이벤트
  $("#findemptable").on("click", "tr", function () {
    console.log($(this).find("td:eq(1)").text());
    let empName = $(this).find("td:eq(1)").text();

    $("#empid").val(empName);
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
  console.log("findEMp 실행")
  let pathName = $(location).attr('pathname');
  console.log(pathName);
  if (pathName == '/prod/procManage') {
    let deptNo = 3;
    findInstEmp(deptNo);
  } else if(pathName == '/prod/packing'){
    let deptNo = 3;
    findInstEmp(deptNo);
  }else {
    deptNo = '';
    findInstEmp(deptNo);
  }


}

function findInstEmp(deptNo) {

  $.ajax({
    url: "findemp",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    data: {
      deptNo
    },
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
  let node = `<tr style="cursor:pointer;">
                <td>${index}</td>
                <td>${obj.empvo.empName}</td>
                <td>${obj.deptvo.deptName}</td>
              </tr>`;
  $("#findemptbody").append(node);
}
