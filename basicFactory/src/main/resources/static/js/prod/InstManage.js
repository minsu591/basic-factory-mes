//InstManage.js

$(document).ready(function () {
	
  //모달창 확인 버튼
  $("#selectbtn").click(function () {
    $("#findempModal").modal("hide");
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
      $(this).parent().parent().remove();
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
    let lineName = $(this).find("td:eq(11)").children();
    if ($(this).find("td:eq(0)").children().prop("checked")) {
      findProcStatus(lineName.val());
    } else {
      $("#procStatusTable tbody tr").remove();
    }
    //제품코드에 값이 입력됐을 때 실행
    prodCode.bind("input", function () {
      //console.log($(this).val());
      let prodCode = $(this).val();
      $.ajax({
        url: `findProdName/${prodCode}`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
          prodName.val(data.finPrdCdName);
          prodUnit.val(data.finPrdCdVol + data.finPrdCdUnit);
          lineName.val(data.lineCdHdName);
        },
        error: function (error, status, msg) {
          prodName.val("");
          prodUnit.val("");
          lineName.val("");
        },
      });
    });
  });

  function findProcStatus(lineName) {
    console.log(lineName);
    console.log("findprocstatus");
    $.ajax({
      url: `findprocstatus/${lineName}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("#procStatusTable tbody tr").remove();
        for (obj of data) {
          procStatusMakeRow(obj);
        }
      },
    });
  }
  function procStatusMakeRow(obj) {
    let node = `<tr>
                <td>${obj.lineCdOrd}</td>
                <td>${obj.procCdName}</td>
                <td>${obj.mchnName}</td>
                <td>${obj.mchnStts}</td>
                </tr>`;
    $("#procStatusTable tbody").append(node);
  }
  
  
});
