$(document).ready(function () {
  //생산지시테이블 초기데이터 입력
  findvinst();

  $("#findInstBtn").click(function () {
    let sdate = $("#instsdate").val();
    let edate = $("#instedate").val();
    let vendorName = $("#vendorName").val();
    let productName = $("#productname").val();
    console.log(productName);
    if (sdate == "" && edate == "" && vendorName == "" && productName == "") {
      findvinst();
    } else {
      $.ajax({
        url: "findvinst",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {
          instSdate: sdate,
          instEdate: edate,
          vendorName: vendorName,
          productName: productName,
        },
        error: function (error, status, msg) {
          alert("상태코드 " + status + "에러메시지" + msg);
        },
        success: function (data) {
          console.log(data);
          $("#instTable tbody tr").remove();
          for (obj of data) {
            instMakeRow(obj);
          }
        },
      });
    }
  });
});

function findvinst() {
  $.ajax({
    url: "findvinst",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);
      $("#instTable tbody tr").remove();
      for (obj of data) {
        instMakeRow(obj);
      }
    },
  });
}

function instMakeRow(obj) {
  let node = `<tr>
  <td>${obj.instDate}</td>
  <td>${obj.instNo}</td>
  <td>${obj.vendCdNm}</td>
  <td>${obj.finPrdCdCode}</td>
  <td>${obj.finPrdCdName}</td>
  <td>${obj.slsOrdHdNo}</td>
  <td>${obj.slsOrdDtlDlvDate}</td>
  <td>${obj.slsOrdDtlVol}</td>
  <td>${obj.instProdIndicaVol}</td>
  <td>${obj.workScope}</td>
  <td>${obj.workDate}</td>
</tr>`;
  $("#instTable tbody").append(node);
}
