$(document).ready(function () {
  $("#exportBtn").click(function () {
    console.log("click");
    $("#instTable").table2excel({
      exclude: ".excludeThisClass",
      name: "testExcel",
      filename: "textname",
      preserveColors: false,
    });
  });
  //생산지시테이블 초기데이터 입력
  findvinst();

  $("#instsdate").change(function () {
    let instSdate = $("#instsdate").val();
    $("#instedate").prop("min", instSdate);
  });

  $("#instedate").change(function () {
    $("#instsdate").prop("max", $("#instedate").val());
  });

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
          $("#remo").remove();
          page();

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
      $("#remo").remove();
      page();
    },
  });
}

function instMakeRow(obj) {
  let slsOrdDtlDlvDate;
  let slsOrdDtlVol;
  if (!obj.slsOrdDtlDlvDate) {
    slsOrdDtlDlvDate = " ";
  } else {
    slsOrdDtlDlvDate = obj.slsOrdDtlDlvDate;
  }
  if (!obj.slsOrdDtlVol) {
    slsOrdDtlVol = " ";
  } else {
    slsOrdDtlVol = obj.slsOrdDtlVol;
  }
  console.log(slsOrdDtlDlvDate);
  let node = `<tr>
  <td>${obj.instDate}</td>
  <td>${obj.instNo}</td>
  <td>${obj.vendCdNm == " " ? "-" : obj.vendCdNm}</td>
  <td>${obj.finPrdCdCode}</td>
  <td>${obj.finPrdCdName}</td>
  <td>${obj.slsOrdHdNo == " " ? "-" : obj.slsOrdHdNo}</td>
  <td>${slsOrdDtlDlvDate == " " ? "-" : obj.slsOrdDtlDlvDate}</td>
  <td>${slsOrdDtlVol == " " ? "-" : obj.slsOrdDtlVol}</td>
  <td>${obj.instProdIndicaVol}</td>
  <td><span>${obj.workScope}</span></td>
  <td>${obj.workDate}</td>
</tr>`;
  $("#instTable tbody").append(node);

  if (obj.workScope == '진행중') {
    $("#instTable tbody tr").last().find("td:eq(9) span").addClass("badge badge-light-primary");
  } else {
    $("#instTable tbody tr").last().find("td:eq(9) span").addClass("badge badge-light-secondary");
  }
}
