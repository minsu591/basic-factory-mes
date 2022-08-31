//InstManage.js다음

$(document).ready(function () {
  //지시일자 기본값 세팅
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  $("#instdate").val(dateString);
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
      deleteWarning();
      return;
    }
    $("input[type='checkbox']:checked").each(function (k, val) {
      $(this).parent().parent().remove();
    });
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
            window.location = "/rsc/order";
          }
        });
      }
      if (!check) {
        //  재고량이 충분할때
        Swal.fire({
          icon: "success", // Alert 타입
          title: "저장이 완료되었습니다.", // Alert 제목
        }).then((result) => {
          if (result.isConfirmed) {
            console.log($("#instdate").val()); //지시작성일자
            console.log($("#instremk").val()); //특기사항
            console.log($("#instname").val()); //생산지시명
            console.log($("#empid").val()); //작업자명
            let instDate = $("#instdate").val();
            let empId = $("#empid").val();
            let instName = $("#instname").val();
            let instRemk = $("#instRemk").val();
            let checkbox = $("input:checkbox:checked");

            let detailvo = [];
            checkbox.each(function (i) {
              let tr = checkbox.parent().parent().eq(i);
              let td = tr.children();
              let prodCode = td.children().eq(1).val(); //제품코드
              let prodIndicaVol = td.children().eq(10).val(); //지시량
              let workDate = td.children().eq(12).val(); //작업날짜
              console.log("prodCode ->" + prodCode);
              console.log("지시량 ->" + prodIndicaVol);
              console.log("workDate->" + workDate);

              let instObjDetail = {
                instProdIndicaVol: prodIndicaVol,
                finPrdCdCode: prodCode,
                workDate: workDate,
              };
              detailvo.push(instObjDetail);
            });
            instObj = {
              empId: empId,
              instName: instName,
              instDate: instDate,
              instRemk: instRemk,
            };
            console.log(instObj);
            let check = false;
            $.ajax({
              url: "insertinstanddetail",
              method: "POST",
              contentType: "application/json;charset=utf-8",
              traditional: true,
              data: JSON.stringify({
                vo: instObj,
                detailvo: detailvo,
              }),
              error: function (err) {
                console.log(err);
              },
              success: function (data) {
                console.log(data);
              },
            });
            // $.ajax({
            //   url: "insertinstruction",
            //   method: "POST",
            //   contentType: "application/json;charset=utf-8",
            //   async: false, //동기로 처리
            //   //dataType: "json",
            //   data: JSON.stringify({
            //     instobjheader: instobjheader,
            //     instobjdetail: instobjdetail,
            //   }),
            //   error: function (error, status, msg) {
            //     alert("상태코드 " + status + "에러메시지" + msg);
            //   },
            //   success: function (data) {
            //     console.log(" insert success");
            //     check = true;
            //   },
            // });
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

            // location.reload();
          }
        });
      }
    });
  });

  //지시테이블 클릭 이벤트
  $("#planDetailTable").on("click", "tr", function () {
    let prodCode = $(this).find("td:eq(1)").children();
    let prodName = $(this).find("td:eq(2)").children();
    let prodUnit = $(this).find("td:eq(3)").children();
    let lineName = $(this).find("td:eq(11)").children();
    let indicaVol = $(this).find("td:eq(10)").children();

    let tr = $(this);
    let procTabletr = $("#procStatusTable tbody tr").length;
    if (tr.children().children().is(":checked") == true) {
      console.log("체크");

      findProcStatus(lineName.val());
      findRscNeedQty(prodCode.val(), indicaVol.val());
    } else if (tr.children().children().is(":checked") == false) {
      var trNum = $(this).closest("tr").prevAll().length;
      // console.log("trNum : " + trNum);
      // console.log(Math.abs(trNum * 5 - procTabletr));
      // console.log(Math.abs(trNum * 5 - procTabletr + procTabletr));
      // $("#procStatusTable tbody tr")
      //   .slice(
      //     Math.abs(trNum * 5 - procTabletr),
      //     Math.abs(trNum * 5 - procTabletr + 5)
      //   )
      //   .remove();
      console.log("언체크");
    }
    // $("#planDetailTable tbody tr").each(function (idx) {
    //   let tr = $(this);
    //   if (tr.find("td:eq(0)").children().is(":checked") == true) {
    //     console.log("쳌 인덱스-> " + idx);
    //     findProcStatus(lineName.val(), idx);
    //     findRscNeedQty(prodCode.val(), indicaVol.val());
    //   } else if (tr.find("td:eq(0)").children().is(":checked") == false) {
    //     $("#procStatusTable tbody tr")
    //       .slice(idx * 5, idx * 5 + 5)
    //       .remove();
    //     // console.log(index);
    //     //console.log($("#procStatusTable tbody tr").eq(index));
    //     //$("#rscStockTable tbody tr").remove();
    //   }
    // });

    //지시량에 값이 입력 됬을 떄 실행
    indicaVol.bind("input", function () {
      $("#rscStockTable tbody tr").remove();
      findRscNeedQty(prodCode.val(), indicaVol.val());
    });
    //제품코드에 값이 입력됐을 때 실행
    prodCode.bind("input", function () {
      //console.log($(this).val());

      console.log($(this).val());
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
  //공정상태
  function findProcStatus(lineName) {
    $.ajax({
      url: `findprocstatus/${lineName}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        //console.log(data);
        $("#procStatusTable tbody tr").remove();
        // $("#procStatusTable tbody tr")
        //   .slice(idx * 5, idx * 5 + 5)
        //   .remove();
        for (obj of data) {
          procStatusMakeRow(obj);
        }
      },
    });
  }

  //자재재고 내역
  function findRscNeedQty(prodCode, indicaVol) {
    $.ajax({
      url: `findvrscneedqty/${prodCode}`,
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
  <td><input type="text" readonly></td>
  <td><input type="text"></td>
  <td><input type="text" readonly></td>
  <td><input type="date"></td>
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
    //console.log(obj.rscUseVol);
    //console.log(indicaVol);
    let needQty = Math.round(indicaVol * obj.rscUseVol);

    let node = `<tr>
      <td>${index}</td>
      <td>${obj.rscCdCode}</td>
      <td>${obj.rscCdName}</td>
      <td>${obj.rscStock}</td>
      <td>${obj.rscCdUnit}</td>
      <td>${needQty}</td>
      </tr>`;
    $("#rscStockTable tbody").append(node);
    if (needQty > obj.rscStock) {
      $("#rscStockTable tbody tr").last().addClass("warn");
    }
  }
});

function deleteWarning() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "삭제할 항목을 선택하세요.", // Alert 제목
  });
}
