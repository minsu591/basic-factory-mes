//InstManage.js

$(document).ready(function () {
  $("#empid").click(function (e) {
    e.preventDefault();
    findEmp();
    $("#findempModal").modal("show");
  });

  $("#findPlan").click(function (e) {
    e.preventDefault();
    $("#findPlanModal").modal("show");
  });
  //모달창 확인 버튼
  $("#selectbtn").click(function () {
    $("#findempModal").modal("hide");
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

  //모달테이블 클릭 이벤트
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
        empMakeRow(obj, index);
      },
    });
  });

  //생산지시 추가 버튼
  $("#addRowBtn").click(function () {
    detailTableMakeRow();
  });

  //생산지시 삭제 버튼
  $("#delRowBtn").click(function () {
    if ($("input[type='checkbox']:checked").length === 0) {
      alert("삭제할 항목을 선택하세요");
      return;
    }

    $("input[type='checkbox']:checked").each(function (k, val) {
      let checked = $(this).parent().parent().remove();
    });
  });

  function detailTableMakeRow() {
    let node = `<tr>
		<td><input type="checkbox"></td>
		<td><input type="text" name="prodCode"></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text"></td>
		<td><input type="text" readonly></td>
		<td><input type="text" readonly></td>
		<td><input type="text"></td>
	</tr>`;
    $("#planDetailTable tbody").append(node);
  }

  //지시테이블 클릭 이벤트

  $("#planDetailTable").on("click", "tr", function () {
    let focusEle = document.activeElement;
    if ($(this).find("td:eq(1)") == focusEle) {
      console.log("포커스");
    }

    let prodCode = $(this).find("td:eq(1)").children();
    let prodName = $(this).find("td:eq(2)").children();
    let prodUnit = $(this).find("td:eq(3)").children();
    //제품코드에 값이 입력됐을 때 실행
    prodCode.bind("input", function () {
      //console.log($(this).val());
      let prodCode = $(this).val();
      console.log(prodCode);

      $.ajax({
        url: `findProdName/${prodCode}`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
          prodName.val(data.finPrdCdName);
          prodUnit.val(data.finPrdCdVol + data.finPrdCdUnit);
        },
      });
    });
  });

  //초기데이터
  function empMakeRow(obj, index) {
    let node = `<tr>
									<td>${index}</td>
									<td>${obj.empvo.empName}</td>
									<td>${obj.deptvo.deptName}</td>
								</tr>`;
    $("#findemptbody").append(node);
  }
});
