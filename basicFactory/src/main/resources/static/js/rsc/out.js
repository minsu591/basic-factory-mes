$("document").ready(function () {
  let tdinfo;

  //체크박스 체크유무
  let allCheck = $("#allCheck");
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#outInsertTable tbody input:checkbox").prop("checked", true);
    } else {
      $("#outInsertTable tbody input:checkbox").prop("checked", false);
    }
  })

  $("#outInsertTable").on("change", "input[name=chk]", function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if ((total != checked)) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
  })


  //추가버튼
  $("#addRowBtn").click(function () {
    detailTableMakeRow();
  });

  //생산지시 삭제 버튼
  $("#delRowBtn").click(function () {
    if ($("input[type='checkbox']:checked").length === 0) {
      deleteWarning();
      return;
    }
    $("input[name='chk']:checked").each(function (k, val) {
      $(this).parent().parent().remove();
    });
  });

  function detailTableMakeRow() {
    let node = `<tr>
 <td><input type="checkbox" name="chk"></td>
 <td><input type="text" readonly></td>
 <td><input type="date" required></td>
 <td><input type="text" class="vendor"></td>
 <td><input type="text" readonly></td>
 <td><input type="text" class="rsccode"></td>
 <td><input type="text" class="rscname" readonly></td>
 <td><input type="text" class="rsclotno"></td>
 <td><input type="text" readonly></td>
 <td><input type="text" class="outVol"></td>
 <td><input type="text"></td>
 <td><input type="text"></td>
 </tr>`;
    $("#outInsertTable tbody").append(node);
  }


  //출고수량>재고수량일때 alert창
  $("#outInsertTable").on("input", ".outVol", function (e) {
    let outVol = $(this).val();
    let stockVol = $(this).parent().prev().find("input").val();
    if (Number(outVol) > Number(stockVol)) {
      Swal.fire({
        title: '수량 초과',
        text: '출고 수량이 재고 수량보다 많습니다.',
        icon: 'warning',                       // Alert 타입

        confirmButtonText: '확인' // confirm 버튼 텍스트 지정
      });
      $(this).val('');
    }
  })

  function deleteWarning() {
    Swal.fire({
      icon: "warning", // Alert 타입
      title: "삭제할 항목을 선택하세요.", // Alert 제목
    })
  }

  function submitWarning() {
    Swal.fire({
      icon: "warning", // Alert 타입
      title: "선택된 항목이 없습니다.", // Alert 제목
    })
  }


  //등록버튼

  $("#subBtn").click(function () {
    let checked = $("input[name='chk']:checked").length;
    if (checked == 0) {
      submitWarning();
      return;
    }
    let param = [];
    let info = [];
    let rowData = new Array();
    let checkbox = $("input[name='chk']:checked");
    console.log(checkbox)
    // 체크된 체크박스 값을 가져온다
    checkbox.each(function(i) {
      // checkbox.parent() : checkbox의 부모는 <td>이다.
      // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
      let tr = checkbox.parent().parent().eq(i);
      let td = tr.children().children();
      // 체크된 row의 모든 값을 배열에 담는다.
      rowData.push(tr.text());

      // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
      let rscOutCode = td.eq(1).val();
      let rscOutDate = td.eq(2).val();
      let vendCdCode = td.eq(3).val();
      let rscCdCode = td.eq(5).val();
      let rscLotNo = td.eq(7).val();
      let rscOutVol = td.eq(9).val();
      let rscOutResn = td.eq(10).val();
      let empId = td.eq(11).val();
      
      if (!rscOutCode){
        rscOutCode = null;
      }

      info = {
        rscOutCode: rscOutCode,
        rscOutDate: rscOutDate,
        vendCdCode: vendCdCode,
        rscCdCode: rscCdCode,
        rscLotNo: rscLotNo,
        rscOutVol: rscOutVol,
        rscOutResn: rscOutResn,
        empId: empId
      }

      param.push(info);
      console.log(info);
      console.log(rowData);
    });

    console.log(param);


    $.ajax({
      url: "outInAndUp",
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(param),
      dataType: "text",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function () {
        alert("등록처리완료");
        //완료된 행 삭제
        $("input[name='chk']:checked").each(function (k, val) {
          $(this).parent().parent().remove();
        });
      }
    })

  })

  //조회버튼 모달 팝업
  $("#search").click(function(e){
    e.preventDefault();
    findRscOutList();
    $("#findRscOutModal").modal("show");
    
  })

  //체크박스 체크유무
  $("#modalAllCheck").click("change", function () {
    if ($("#modalAllCheck").is(":checked")) {
      $("#findRscOutTable tbody input:checkbox").prop("checked", true);
    } else {
      $("#findRscOutTable tbody input:checkbox").prop("checked", false);
    }
  })

  $("#findRscOutTable").on("change", "input[name=chkModal]", function () {
    let total = $("input[name=chkModal]").length;
    let checked = $("input[name=chkModal]:checked").length;
    if ((total != checked)) {
      $("#modalAllCheck").prop("checked", false);
    } else {
      $("#modalAllCheck").prop("checked", true);
    }
  })

  
  function findRscOutList(){
     let rscOutCode = $("#rscOutCode").val();
     let rscOutDate = $("#rscOutDate").val();
    $.ajax({
      url: "findRscOut",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data : {
        rscOutCode : rscOutCode,
        rscOutDate : rscOutDate
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#findRscOuttbody tr").remove();
        let index = 0;
        for (obj of data) {
          index += 1;
          makeRscOutRow(obj, index);
        }
      },
    });
   }

     //출고목록 행생성
  function makeRscOutRow(obj, index) {
    let node = `<tr>
              <td><input type="checkbox" name="chkModal"></td>
              <td>${obj.rscOutCode}</td>
              <td>${obj.rscOutDate}</td>
              <td>${obj.vendCdNm}</td>
              <td>${obj.rscCdCode}</td>
              <td>${obj.rscOutVol}</td>
            </tr>`;
    $("#findRscOuttbody").append(node);
  }

  //출고목록 등록버튼 체크박스에 체크된것만
  $("#addBtn").click(function(){
    let checked = $("input[name='chkModal']:checked").length;
    if (checked == 0) {
      submitWarning();
      return;
    }
  })


  //거래처코드, 거래처명찾기
  //거래처코드 클릭 시 모달팝업
  $("#outInsertTable").on("click", ".vendor", function (e) {
    e.preventDefault();
    tdinfo = $(this);
    //거래처조회
    findVendorCode();
    $("#findvendorModal").modal("show");
  });

  //거래처코드 검색 버튼 클릭 이벤트
  $("#findVendorBtn").click(function () {
    let vendCdClfy = $("#vendCdClfy option:selected").text();
    let vendorCode = $("#vendorCode").val();
    $.ajax({
      url: `findvendorcode`,
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        vendorCode: vendorCode,
        vendCdClfy: vendCdClfy,
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log("검색조건 데이타 _ >" + data);
        let index = 0;
        $("#findVendortbody tr").remove();
        for (obj of data) {
          index += 1;
          makeVendorCodeRow(obj, index);
        }
      },
    });
  });

  //거래처코드 검색 테이블 클릭이벤트
  $("#findVendorTable").on("click", "tr", function () {
    let vendCode = $(this).find("td:eq(1)").text();
    let vendName = $(this).find("td:eq(2)").text();

    tdinfo.val(vendCode);
    tdinfo.parent().next().find("input").val(vendName);

    $("#findvendorModal").modal("hide");
  });

  //vendor input 내용이 사라지면 vendorName 내용도 사라지는 이벤트
  $("#outInsertTable").on("change", ".vendor", function () {
    tdinfo = $(this);
    let vendorCode = $(".vendor").text();
    if (!vendorCode) {
      tdinfo.parent().next().find("input").val('');
    }
  });


  function findVendorCode() {
    $.ajax({
      url: "findvendorcode",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#findVendortbody tr").remove();
        let index = 0;
        for (obj of data) {
          index += 1;
          makeVendorCodeRow(obj, index);
        }
      },
    });
  }

  //거래처조회 행생성
  function makeVendorCodeRow(obj, index) {
    let node = `<tr>
              <td>${index}</td>
              <td>${obj.vendCdCode}</td>
              <td>${obj.vendCdNm}</td>
              <td>${obj.vendCdClfy}</td>
              <td>${obj.empId}</td>
            </tr>`;
    $("#findVendortbody").append(node);
  }


  //자재코드, 자재명 찾기

  //자재코드 행 클릭시 모달팝업
  $("#outInsertTable").on("click", ".rsccode", function (e) {
    e.preventDefault();
    tdinfo = $(this);
    //자재조회
    findRscCode();
    $("#findresourceModal").modal("show");
  });

  //자재코드 검색 테이블 클릭이벤트
  $("#findRscTable").on("click", "tr", function () {
    let rscCdCode = $(this).find("td:eq(1)").text();
    let rscCdName = $(this).find("td:eq(2)").text();
    tdinfo.val(rscCdCode);
    tdinfo.parent().next().find("input").val(rscCdName);
    tdinfo.parent().next().next().find("input").val("");
    tdinfo.parent().next().next().next().find("input").val("");
    tdinfo.parent().next().next().next().next().find("input").val("");
    tdinfo.parent().next().next().next().next().next().find("input").val("");

    $("#findresourceModal").modal("hide");
  });

  //rsccode input 내용이 사라지면 rscName 내용도 사라지는 이벤트
  $("#outInsertTable").on("change", ".rsccode", function () {
    tdinfo = $(this);
    let rsccode = $(".rsccode").text();
    if (!rsccode) {
      tdinfo.parent().next().find("input").val("");
      tdinfo.parent().next().next().find("input").val("");
      tdinfo.parent().next().next().next().find("input").val("");
    }
  });


  //자재코드 조회
  function findRscCode() {
    $.ajax({
      url: "findResourceCode",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#findRsctbody tr").remove();
        let index = 0;
        for (obj of data) {
          index += 1;
          makeRscCodeRow(obj, index);
        }
      },
    });
  }

  //자재조회 행생성
  function makeRscCodeRow(obj, index) {
    let st = null;
    if (obj.rscCdUse == 1) {
      st = `<input type="checkbox" checked onClick="return false;">`;
    } else {
      st = `<input type="checkbox" onClick="return false;">`;
    }
    let node = `<tr>
            <td>${index}</td>
            <td>${obj.rscCdCode}</td>
            <td>${obj.rscCdName}</td>
            <td>${obj.rscCdClfy}</td>
            <td>${st}</td>
          </tr>`;
    $("#findRsctbody").append(node);
  }



  //자재lot번호 찾기

  $("#outInsertTable").on("click", ".rsclotno", function (e) {
    e.preventDefault();
    tdinfo = $(this);
    let rscname = tdinfo.parent().prev().find("input").val();
    if (!rscname) {
      Swal.fire({
        title: '자재 코드 미입력',
        text: '자재 코드를 먼저 선택해주세요.',
        icon: 'warning',                       // Alert 타입

        confirmButtonText: '확인' // confirm 버튼 텍스트 지정
      });
    } else {
      //자재조회
      $("#lotrscname").val(rscname);
      findRscLot();
      $("#findRscLotModal").modal("show");
    }
  });

  //자재코드 검색 테이블 클릭이벤트
  $("#findRscLotTable").on("click", "tr", function () {
    let rscLotNo = $(this).find("td:eq(2)").text();
    let stockVol = $(this).find("#rscStock").val();
    tdinfo.val(rscLotNo);
    tdinfo.parent().next().find("input").val(stockVol);
    $("#findRscLotModal").modal("hide");
  });


  function findRscLot() {
    let rscCdName = $("#lotrscname").val();
    $.ajax({
      url: "findRscLot",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        rscCdName: rscCdName
      },
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        console.log(data);
        $("#findRscLottbody tr").remove();
        let index = 0;
        for (obj of data) {
          index += 1;
          makeRscLotRow(obj, index);
        }
      },
    });
  }

  //자재lot조회 행생성
  function makeRscLotRow(obj, index) {
    let st = null;
    if (obj.rscStockSt == 1) {
      st = `<input type="checkbox" checked onClick="return false;">`;
    } else {
      st = `<input type="checkbox" onClick="return false;">`;
    }
    let node = `<tr>
            <td>${index}</td>
            <td>${obj.rscCdName}</td>
            <td>${obj.rscLotNo}</td>
            <td>${st}</td>
            <input type="hidden" value="${obj.rscStock}" id="rscStock">
          </tr>`;
    $("#findRscLottbody").append(node);
  }

})