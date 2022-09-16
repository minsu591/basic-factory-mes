//InstManage.js다음
let uniqueLineArray = [];
let lineArray = [];
let prodCodeArr = [];
let inDtlVol = [];
$(document).ready(function () {
  $("#PDFBtn").click(function () {
    console.log("instNo->" + $("#instNo").val());
    let instNo = $("#instNo").val();
    $.ajax({
      url: `report.do`,
      method: "GET",
      //contentType: "application/json;charset=utf-8",
      //dataType: "json",
      data: { instNo: instNo },
      success: function (data) {
        window.open("/prod/report.do?instNo=" + instNo);
        console.log("호출성공");
      },
      error: function (error, status, msg) {},
    });
  });

  $("#empid").prop("disabled", true);
  //지시일자 기본값 세팅
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  $("#instdate").val(dateString).prop("readonly", true);
  //모달창 확인 버튼
  $("#selectbtn").click(function () {
    $("#findempModal").modal("hide");
  });

  //requried 값 변화 감지
  $("#instname").change(function () {
    $("#instname").removeClass("required");
  });

  $("#empid").focus(function () {
    console.log("이엠피아이디 체인지펑션");
    $("#empid").removeClass("required");
  });

  //생산지시 추가 버튼
  $("#addRowBtn").click(function () {
    detailTableMakeRow();
  });
  //생산지시 삭제 버튼
  $("#delRowBtn").click(function () {
    let checklength = 0;
    let trlength = $("#planDetailTable tbody tr").length;

    if ($("input[type='checkbox']:checked").length === 0) {
      deleteWarning();
      return;
    }
    $("input[type='checkbox']:checked").each(function (k, val) {
      checklength += 1;
      let lineIndex = lineArray.indexOf(
        $(this).parent().parent().find("td:eq(11)").children().val()
      );
      let inDtlVolIndex = inDtlVol.indexOf(
        $(this).parent().parent().find("td:eq(10)").children().val()
      );
      let procCodeIndex = inDtlVol.indexOf(
        $(this).parent().parent().find("td:eq(1)").children().val()
      );
      //선택한 값만 삭제
      lineArray.splice(lineIndex, 1);
      inDtlVol.splice(inDtlVolIndex, 1);
      prodCodeArr.splice(procCodeIndex, 1);
      if ($(this).parent().parent().hasClass("not-don-plan")) {
        $(this).parent().parent().remove();
      } else {
        deleteCheck($(this).parent().parent());
      }
    });

    if (trlength == checklength) {
      //지시 헤더 삭제
      $("#instNo").val();
      console.log("삭제할 인스트노->" + $("#instNo").val());
      deleteInstHd($("#instNo").val());
    }
  });

  //저장 버튼 클릭이벤트
  $("#instSaveBtn").click(function () {
    let check = false;
    $("#rscStockTable tbody tr").each(function () {
      if ($(this).hasClass("warn") === true) {
        check = true;
        Swal.fire({
          icon: "warning",
          title: "재고량이 부족합니다.",
          text: "발주 페이지로 이동하시겠습니까?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          closeOnClickOutside: false,
        }).then((result) => {
          if (result.isConfirmed) {
            moveOrderPage();
          }
        });
      }
    });

    let instDate = $("#instdate").val();
    let empId = $("#empid").val();
    let instName = $("#instname").val();
    let instRemk = $("#instremk").val();
    let instNo = $("#instNo").val();
    let instProdNo;
    let dataArray = [];
    //  재고량이 충분할때
    if (!check) {
      let check2 = false;
      $("#planDetailTable tbody tr").each(function () {
        if ($(this).hasClass("updateInst")) {
          //alert("수정하세영 수정 수정");
          check2 = true;
        }
      });

      if (check2 == true) {
        //수정일 경우
        instobjheader = {
          instNo: instNo,
          empId: empId,
          instName: instName,
          instDate: instDate,
          instRemk: instRemk,
        };

        let prodCode;
        let prodIndicaVol;
        let workDate;
        let check = false;
        $("#planDetailTable tbody tr").each(function () {
          if ($(this).children().children().is(":checked")) {
            prodCode = $(this).find("td:eq(1)").children().val();
            prodIndicaVol = $(this).find("td:eq(10)").children().val();
            workDate = $(this).find("td:eq(12)").children().val();
            instProdNo = $(this).find("input:hidden[name=instProdNo]").val();
            instobjdetail = {
              instProdNo: instProdNo,
              instProdIndicaVol: prodIndicaVol,
              finPrdCdCode: prodCode,
              workDate: workDate,
            };
            dataArray.push(instobjdetail);
          } else if ($(this).children().children().is(":checked") == false) {
            check = true;
          }
        });

        if (check) {
          notChecked();
          return;
        }

        console.log(instobjheader);
        console.log(instobjdetail);

        //수정
        requiredCheck(instobjheader, dataArray, "update");
      } else {
        // 저장일 경우
        // let instDate = $("#instdate").val();
        // let empId = $("#empid").val();
        // let instName = $("#instname").val();
        // let instRemk = $("#instRemk").val();
        let checkbox = $("input:checkbox:checked");
        //let dataArray = [];
        let planHdCode;
        checkbox.each(function (i) {
          let tr = checkbox.parent().parent().eq(i);
          let td = tr.children();
          let prodCode = td.children().eq(1).val(); //제품코드
          let prodIndicaVol = td.children().eq(10).val(); //지시량
          let workDate = td.children().eq(12).val(); //작업날짜
          planHdCode = td.children().eq(5).val(); //계획코드

          instobjdetail = {
            instProdIndicaVol: prodIndicaVol,
            finPrdCdCode: prodCode,
            workDate: workDate,
          };
          dataArray.push(instobjdetail);
        });
        instobjheader = {
          empId: empId,
          instName: instName,
          planHdCode: planHdCode,
          instDate: instDate,
          instRemk: instRemk,
        };
        console.log(instobjheader);
        console.log(dataArray);
        requiredCheck(instobjheader, dataArray, "save");

        if (dataArray.length == 0) {
          notChecked();
        }

        //자재소요예상량 업데이트
        // if (check == true) {
        //   $("#rscStockTable tbody tr").each(function (i) {
        //     let tr = $(this);
        //     let td = tr.children();
        //     console.log(tr);
        //     let needQty = td.eq(5).text();
        //     let rscCdCode = td.eq(1).text();
        //     console.log(needQty);
        //     console.log(rscCdCode);
        //     $.ajax({
        //       url: `updateneedqty`,
        //       method: "PUT",
        //       dataType: "json",
        //       contentType: "application/json;charset=utf-8",
        //       data: JSON.stringify({
        //         needQty: needQty,
        //         rscCdCode: rscCdCode,
        //       }),
        //       success: function (data) {
        //         console.log("update sucess");
        //       },
        //     });
        //   });
        // }

        //location.reload();
      }
    }
  });

  //지시테이블 클릭 이벤트
  $("#planDetailTable").on("click", "tr", function () {
    let prodCode = $(this).find("td:eq(1)").children();
    let prodName = $(this).find("td:eq(2)").children();
    let prodUnit = $(this).find("td:eq(3)").children();
    let lineName = $(this).find("td:eq(11)").children();
    let indicaVol = $(this).find("td:eq(10)").children();
    let tr = $(this);
    //지시량에 값이 입력 됬을 떄 실행
    indicaVol.bind("input", function () {
      $(this)
        .parent()
        .parent()
        .find("td:eq(0)")
        .children()
        .prop("checked", false);
      // findRscNeedQty(prodCode.val(), indicaVol.val());
    });

    if (tr.children().children().is(":checked") == true) {
      tr.find("td:eq(1)")
        .children()
        .change(function () {
          tr.find("td:eq(1)").removeClass("inputRequired");
        });
      tr.find("td:eq(10)")
        .children()
        .keyup(function () {
          tr.find("td:eq(10)").removeClass("inputRequired");
        });
      tr.find("td:eq(12)")
        .children()
        .change(function () {
          tr.find("td:eq(12)").removeClass("inputRequired");
        });
      lineArray.push(tr.find("td:eq(11)").children().val());
      prodCodeArr.push(tr.find("td:eq(1)").children().val());
      inDtlVol.push(tr.find("td:eq(10)").children().val());
    } else if (tr.children().children().is(":checked") == false) {
      lineArray = lineArray.filter(
        (element) => element !== tr.find("td:eq(11)").children().val()
      );
      prodCodeArr = prodCodeArr.filter(
        (element) => element !== tr.find("td:eq(1)").children().val()
      );
      inDtlVol = inDtlVol.filter(
        (element) => element !== tr.find("td:eq(10)").children().val()
      );
    }

    let lineArraySet = new Set(lineArray);
    let prodCodeArrSet = new Set(prodCodeArr);
    uniqueLineArray = [...lineArraySet];
    let uniqueProdCode = [...prodCodeArrSet];

    // //자재 재고 조회
    findRscNeedQty(uniqueProdCode);
    //공정 상태 조회
    findProcStatus(uniqueLineArray);
    //console.log("매니지페이지 유니크라인어레이->" + uniqueLineArray);
    //console.log("uniqueLineArray -> " + uniqueLineArray);

    //제품코드에 값이 입력됐을 때 실행
    prodCode.bind("input", function () {
      let prodCode = $(this).val();
      findProdName(prodCode, prodName, prodUnit, lineName);
    });
  });

  //제품코드로 제품이름,규격,라인 찾기
  function findProdName(prodCode, prodName, prodUnit, lineName) {
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
  }

  //생산지시 헤더 삭제
  function deleteInstHd(instNo) {
    $.ajax({
      url: "deleteinsthd",
      method: "DELETE",
      contentType: "application/json;charset=utf-8",
      dataType: "text",
      data: JSON.stringify({
        instNo: instNo,
      }),
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(" delete success");
      },
    });
  }

  function findProcStatus(lineArray) {
    // console.log(lineArray);
    // console.log('파인드프로세스실행')
    $.ajax({
      url: `findprocstatus`,
      method: "GET",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: {
        lineName: lineArray,
      },
      error: function (err) {
        $("#procStatusTable tbody tr").remove();
      },
      success: function (data) {
        //console.log('지겹다진짜' + data);
        $("#procStatusTable tbody tr").remove();

        for (obj of data) {
          procStatusMakeRow(obj);
        }
      },
    });
  }
  //자재재고 내역 검색
  let finAllStock = [];
  function findRscNeedQty(uniqueProdCode) {
    $.ajax({
      url: `findvrscneedqty`,
      method: "GET",
      async: false, //동기로 처리
      dataType: "json",
      data: {
        finPrdCdCode: uniqueProdCode,
      },
      error: function (err) {
        $("#rscStockTable tbody tr").remove();
      },
      success: function (data) {
        console.log(data);
        let index = 0;
        $("#rscStockTable tbody tr").remove();
        finAllStock = [];
        for (obj of data) {
          index += 1;
          rscStockMakeRow(obj, index);
        }
      },
    });
  }

  function detailTableMakeRow() {
    let date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -14);
    let node = `<tr>
  <td><input type="checkbox" style="margin-top:1rem;"></td>
  <td><input type="text" name="prodCode"></td>
  <td><input type="text" disabled></td>
  <td><input type="text" disabled></td>
  <td><input type="text" disabled value="-"></td>
  <td><input type="text" disabled value="-"></td>
  <td><input type="text" disabled value="-"></td>
  <td><input type="text" disabled value="-"></td>
  <td><input type="text" disabled value="0"></td>
  <td><input type="text" disabled value="0"></td>
  <td><input type="text"></td>
  <td><input type="text" disabled></td>
  <td><input type="date" min='${date}'></td>
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

  function rscStockMakeRow(obj, index) {
    let finPrdCdCode;
    let indicaVol2;
    let needQty;
    let saveNeedQty;
    $("#planDetailTable tbody tr").each(function () {
      let tr = $(this);
      if (tr.children().children().is(":checked") == true) {
        finPrdCdCode = tr.find("td:eq(1)").children().val();
        indicaVol2 = tr.find("td:eq(10)").children().val();
        if (obj.finPrdCdCode == finPrdCdCode) {
          needQty = Math.round(indicaVol2 * obj.rscUseVol);
          saveindicaVol2 = indicaVol2;
          //console.log("saveNeedQty ->" + saveindicaVol2);
        } else if (obj.finPrdCdCode != finPrdCdCode) {
          needQty = Math.round(saveindicaVol2 * obj.rscUseVol);
        }
      }
    });

    let node = `<tr>
      <td>${index}</td>
      <td name="rscCdCode">${obj.rscCdCode}</td>
      <td>${obj.finPrdCdCode}</td>
      <td>${obj.rscCdName}</td>
      <td>${obj.rscStock}</td>
      <td>${obj.rscCdUnit}</td>
      <td>${needQty}</td>
      </tr>`;
    $("#rscStockTable tbody").append(node);
    console.log(finAllStock);

    let flag = true;
    for (fin of finAllStock) {
      if (fin.rscCdCode == obj.rscCdCode) {
        flag = false;
      }
    }
    if (flag) {
      finAllStock.push({
        rscCdCode: obj.rscCdCode,
        needQty: needQty,
      });
    } else {
      fin.needQty += needQty;
    }

    for (fin of finAllStock) {
      if (fin.rscCdCode == obj.rscCdCode) {
        if (obj.rscStock < fin.needQty) {
          $("#rscStockTable tbody tr").last().addClass("warn");
        }
      }
    }
  }
});

function insertInstAndDetail(instobjheader, dataArray) {
  $.ajax({
    url: "insertinstanddetail",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    async: false, //동기로 처리
    //dataType: "json",
    data: JSON.stringify({
      vo: instobjheader,
      detailvo: dataArray,
    }),
    error: function (error, status, msg) {
      console.log("err");
    },
    success: function (data) {
      console.log(" insert success");
      check = true;
    },
  });
}

function requiredCheck(instobjheader, dataArray, command) {
  for (let i = 0; i < dataArray.length; i++) {
    if (
      dataArray[i].finPrdCdCode == "" ||
      dataArray[i].instProdIndicaVol == "" ||
      dataArray[i].workDate == "" ||
      $("#instname").val() == "" ||
      $("#empid").val() == ""
    ) {
      if (dataArray[i].finPrdCdCode == "") {
        $("#planDetailTable tbody tr")
          .eq(i)
          .find("td:eq(1)")
          .addClass("inputRequired");
      }
      if (dataArray[i].instProdIndicaVol == "") {
        $("#planDetailTable tbody tr")
          .eq(i)
          .find("td:eq(10)")
          .addClass("inputRequired");
      }
      if (dataArray[i].workDate == "") {
        $("#planDetailTable tbody tr")
          .eq(i)
          .find("td:eq(12)")
          .addClass("inputRequired");
      }
      if ($("#instname").val() == "") {
        $("#instname").addClass("required");
      }
      if ($("#empid").val() == "") {
        $("#empid").addClass("required");
      }
      requiredWarn();
      return;
    } else {
    }
  }

  if (command == "save") {
    insertInstAndDetail(instobjheader, dataArray);
    //console.log("저장일 떄 ->" + instobjheader, dataArray);
    saveSuccess();
  } else if (command == "update") {
    //생산지시 수정
    console.log("수정일 때 ->" + instobjheader);
    //console.log("수정일 떄 -> " + dataArray);
    updateInst(instobjheader, dataArray);
    updateSuccess();
  }
}

//생산지시수정
function updateInst(instobjheader, instobjdetail) {
  $.ajax({
    url: "updateinst",
    method: "PUT",
    contentType: "application/json;charset=utf-8",
    //dataType: "json",
    data: JSON.stringify({
      vo: instobjheader,
      detailvo: instobjdetail,
    }),
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log("update success");
    },
  });
}

function deleteWarning() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "삭제할 항목을 선택하세요.", // Alert 제목
  });
}
function deleteCheck(tr) {
  if (tr.hasClass("updateInst")) {
    console.log("업데이트 클래스 !!");
    let instProdNo = tr.find("input:hidden[name=instProdNo]").val();
    console.log("instProdNo" + instProdNo);
    deleteques(instProdNo);
  } else {
    tr.remove();
  }
}

//생산지시삭제
function deleteInst(instProdNo) {
  $.ajax({
    url: "deleteinst",
    method: "DELETE",
    contentType: "application/json;charset=utf-8",

    dataType: "text",
    data: JSON.stringify({
      instProdNo: instProdNo,
    }),
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(" delete success");
    },
  });
}
//자재발주페이지 이동
function moveOrderPage() {
  let orderArray = [];
  $("#rscStockTable tbody tr").each(function () {
    if ($(this).hasClass("warn")) {
      let obj = {
        rscCdCode: $(this).find("td:eq(1)").text(),
        rscOrderVol: $(this).find("td:eq(6)").text(),
      };
      orderArray.push(obj);
    }
  });

  localStorage.setItem("instOrder", JSON.stringify(orderArray));
  //let instOrder = JSON.parse(localStorage.getItem("instOrder"));
  //localStorage.clear();
  //console.log(instOrder);
  window.location = `/rsc/order`;
}

function saveSuccess() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "저장 되었습니다.", // Alert 제목
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function deleteSuccess() {
  Swal.fire({
    icon: "success", // Alert 타입
    title: "삭제 되었습니다.", // Alert 제목
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function updateSuccess() {
  Swal.fire({
    icon: "success",
    title: "수정이 완료되었습니다.",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function notChecked() {
  Swal.fire({
    icon: "warning",
    title: "체크된 데이터가 없습니다.",
  });
  return;
}
function requiredWarn() {
  Swal.fire({
    icon: "warning",
    title: "입력하지 않은 값이 있습니다.",
  });
  return;
}

function deleteques(instProdNo) {
  Swal.fire({
    icon: "warning",
    title: "생산지시가 삭제됩니다.",
    text: "정말 삭제하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    closeOnClickOutside: false,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteInst(instProdNo);
      //tr.remove();
      deleteSuccess();
    }
  });
}
