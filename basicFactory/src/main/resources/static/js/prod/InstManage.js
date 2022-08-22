//InstManage.js

$(document).ready(function () {
  $("#findPlan").click(function (e) {
    e.preventDefault();
    $("#findPlanModal").modal("show");
  });
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

  $("#instSaveBtn").click(function () {
    console.log($("#instdate").val()); //지시작성일자
    console.log($("#instremk").val()); //특기사항
    console.log($("#instname").val()); //생산지시명
    console.log($("empid").val()); //작업자명

    let checkbox = $("input:checkbox:checked");
    checkbox.each(function (i) {
      let tr = checkbox.parent().parent().eq(i);
      let td = tr.children();
      let prodCode = td.children().eq(1).val(); //제품코드
      let prodIndicaVol = td.children().eq(9).val(); //지시량
      let workDate = td.children().eq(12).val(); //작업날짜
      console.log("prodCode ->" + prodCode);
      console.log("지시량 ->" + prodIndicaVol);
      console.log("workDate->" + workDate);
    });
  });

  //지시테이블 클릭 이벤트
  $("#planDetailTable").on("click", "tr", function () {
    let prodCode = $(this).find("td:eq(1)").children();
    let prodName = $(this).find("td:eq(2)").children();
    let prodUnit = $(this).find("td:eq(3)").children();
    let lineName = $(this).find("td:eq(11)").children();
    let indicaVol = $(this).find("td:eq(9)").children();
    if ($(this).find("td:eq(0)").children().prop("checked")) {
      findProcStatus(lineName.val());
      findRscNeedQty(lineName.val(), indicaVol.val());
    } else {
      $("#procStatusTable tbody tr").remove();
      $("#rscStockTable tbody tr").remove();
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
});

//공정상태
function findProcStatus(lineName) {
  $.ajax({
    url: `findprocstatus/${lineName}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      //console.log(data);
      $("#procStatusTable tbody tr").remove();
      for (obj of data) {
        procStatusMakeRow(obj);
      }
    },
  });
}

//자재재고 내역
function findRscNeedQty(lineName, indicaVol) {
  $.ajax({
    url: `findvrscneedqty/${lineName}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      let index = 0;
      $("#rscStockTable tbody tr").remove();
      for (obj of data) {
        index += 1;
        rscStockMakeRow(obj, indicaVol, index);
      }
    },
  });
}

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

function procStatusMakeRow(obj) {
  let node = `<tr>
              <td>${obj.lineCdOrd}</td>
              <td>${obj.procCdName}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.mchnStts}</td>
              </tr>`;
  $("#procStatusTable tbody").append(node);
}

function rscStockMakeRow(obj, indicaVol, index) {
  console.log(obj.rscUseVol);
  let node = `<tr>
              <td>${index}</td>
              <td>${obj.rscCdCode}</td>
              <td>${obj.rscCdName}</td>
              <td>${obj.rscStock}</td>
              <td>${obj.rscCdUnit}</td>
              <td>${(indicaVol *= obj.rscUseVol)}</td>
              </tr>`;

  $("#rscStockTable tbody").append(node);
}