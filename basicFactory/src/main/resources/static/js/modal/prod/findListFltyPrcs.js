$("document").ready(function () {
  //불량처리목록 모달창
  $("#fltyPrcsBtn").on("click", function (e) {
    e.preventDefault();

    findListFltyPrcs();
    $("#findListFltyPrcsModal").modal("show");
  });

  function findListFltyPrcs() {
    $.ajax({
      url: "findListFltyPrcs",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        $("#findListFltyPrcstbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj, index);
        }
      },
    });
  }

  //모달창에서 불량처리일 검색 버튼 클릭 이벤트
  $("#selectBtn").click(function () {
    let fltyPrcsSdate = $("#fltyPrcsSdate").val();
    let fltyPrcsEdate = $("#fltyPrcsEdate").val();

    $.ajax({
      url: 'findListFltyPrcs',
      method: "GET",
      dataType: "json",
      data: {
        fltyPrcsSdate: fltyPrcsSdate,
        fltyPrcsEdate: fltyPrcsEdate,
      },
      success: function (data) {
        console.log(data);
        $("#findListFltyPrcstbody tr").remove();
        for (obj of data) {
          modalMakeRow(obj);
        }
      }
    })
  });

  //불량처리내역 조회 모달 내에 데이터 출력
  function modalMakeRow(obj) {
    let node = `<tr>
                  <td><input type="hidden" value="${obj.fltyPrcsNo}"></td>
                  <td>${obj.finPrdCdCode}</td>
                  <td>${obj.finPrdCdName}</td>
                  <td>${obj.fltyVol}</td>
                  <td>${obj.procCdName}</td>
                  <td>${obj.mchnName}</td>
                  <td>${obj.faultyCdCode}</td>
                  <td>${obj.faultyName}</td>
                  <td>${obj.fltyPrcsDate}</td>
                  <td>${obj.empName}</td>
                  <td>${obj.fltyPrcsRemk}</td>
                </tr>`
    $("#findListFltyPrcstbody").append(node);
  }

  //tr 클릭 이벤트
  $("#findListFltyPrcsTable").on("click", "tr", function () {
    //테이블 상단 공통 요소 삽입
    let fltyPrcsNo = $(this).find("td:first").text();
    let finPrdCdCode = $(this).find("td:eq(1)").text();
    let finPrdCdName = $(this).find("td:eq(2)").text();
    let fltyVol = $(this).find("td:eq(3)").text();
    let procCdName = $(this).find("td:eq(4)").text();
    let mchnName = $(this).find("td:eq(5)").text();
    let faultyCdCode = $(this).find("td:eq(6)").text();
    let faultyName = $(this).find("td:eq(7)").text();
    let fltyPrcsDate = $(this).find("td:eq(8)").text();
    let empName = $(this).find("td:eq(9)").text();
    let fltyPrcsRemk = $(this).find("td:last").text();

    let node = `<tr>
                    <td><input type="checkbox"></td>
                    <td><input type="hidden" value="${fltyPrcsNo}"></td>
                    <td id="faultyCdCode">${faultyCdCode}</td>
                    <td>${fltyVol}</td>
                    <td>${ord.slsOrdDtlVO.slsOrdDtlOutVol}</td> 기출고량
                    <td></td>
                    <td></td>
                    <td><input type="text" class="lotNo"></td>
                    <td>${ord.slsOutDtlVO.finPrdCdPrice}</td>
                    <td></td>
                </tr>`;
    $("#outMngTable tbody").append(node);

  });

  function sucFun(result) {
    //경고창 띄워주기
    let alertFlag = false;
    if ($("#fltyPrcsTable tbody").children().length != 0) {
      if (confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?") == true) {
        alertFlag = true;
      }
    } else {
      alertFlag = true;
    }

    if (alertFlag) {
      $("#fltyPrcsTable tbody tr").remove();
      for (ord of result) {
        outMakeRow(ord);
      }

      $("#findListFltyPrcsModal").modal("hide");
    }
  }



  //불량처리내역 조회 모달을 통한 데이터 출력
  function outMakeRow(ord) {
    
    let node = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${ord.slsOutDtlVO.finPrdCdCode}</td>
                    <td name="finPrdCdName">${ord.slsOutDtlVO.finPrdCdName}</td>
                    <td>${ord.slsOrdDtlVO.slsOrdDtlVol}</td>
                    <td>${ord.slsOrdDtlVO.slsOrdDtlOutVol}</td> 기출고량
                    <td></td>
                    <td></td>
                    <td><input type="text" class="lotNo"></td>
                    <td>${ord.slsOutDtlVO.finPrdCdPrice}</td>
                    <td></td>
                </tr>`;
    
    $("#outMngTable tbody").append(node);
  }

  

  

  
});
