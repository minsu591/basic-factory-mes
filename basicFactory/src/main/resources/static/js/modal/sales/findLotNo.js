$("document").ready(function () {

  let outLotList = [];            //출고시킬 LOT정보 담기
  let table = $("#findLotTable"); //테이블 정보
  let modIndex = 5;               //수정 적용할 td의 인덱스

  //수정 이벤트
  table.find("tbody").on("click", "td", function (e) {
    e.stopPropagation();       //현재 이벤트가 캡처링/버블링 단계에서 더 이상 전파되지 않도록
    let col = $(this).index(); //선택한 컬럼index 저장
    let tdInfo = $(this);      //선택한 td정보 저장
    console.log("td정보얌!!!!!!!" + tdInfo);
    tdInfo.attr("contenteditable", "true"); //수정 가능하도록 설정

    tdInfo.focus(function (e) { //td에 focus되면 클래스 지정(border 생성 css)
      tdInfo.addClass("tdBorder");
    });

    tdInfo.on("keyup", function (key) { //enter나 esc 누르면 blur
      if (key.keyCode == 13 || key.keyCode == 27) {
        key.preventDefault();
        tdInfo.blur();
      }
    });

    tdInfo.blur(function (e) {               //td가 focus 잃으면
      e.preventDefault();
      tdInfo.attr("contenteditable", "false")//수정 불가
        .removeClass("tdBorder");
      tdInfo.trigger("change");
      e.stopPropagation();
    });
  });



  table.find("tbody").on("change", "tr", function (e) { 
    console.log(e);
    e.preventDefault();
    let col = $(this).index();
    let finPrdCdCode = $(this).find("td:eq(1)").text();
    let fnsPrdStkLotNo = $(this).find("td:eq(3)").text();
    let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");
    let slsOutDtlVol = parseInt($(this).find("td:eq(5)").text());

    console.log("제품코드" + finPrdCdCode);
    console.log("lot번호" + fnsPrdStkLotNo);
    console.log("출고량" + slsOutDtlVol);

    if (slsOutDtlVol != null && slsOutDtlVol != '') {
      checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol);
    }
    
  });
  
  function checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol) {
    let outDtlVol = 0;
    let addTr = [finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol];
    outLotList.push(addTr);
    for (lot of outLotList) {
      if(lot[2] != null && lot[2] != ''){

        console.log('check');
        outDtlVol += lot[2];
        console.log("총 합계 출고수량: " + outDtlVol);
        return;
      } else {
        outLotList.pop();
      }
    }
  }
  

  $("#okBtn").on("click", function () {
    $("#outMngTable tbody td[name='outDtlVol']").text(outDtlVol);
    $("#findLotModal").modal("hide");
  });






  //완제품 출고 관리에서 lot별 완제품 재고 모달창
  let lotNoTdInfo;
  $("#outMngTable").on("click", ".lotNo", function (e) {
    e.preventDefault();
    $("#findLotModal").modal("show");
    lotNoTdInfo = $(this);
    findLotClick();
  });



  function findLotClick() {
    let finPrdCdCode = lotNoTdInfo.parent().find("td:eq(1)").text(); //모달 내 제품코드 찾기
    let prdCdName = lotNoTdInfo.parent().find("td:eq(2)").text();    //모달 내 제품명 찾기

    $.ajax({
      url: 'findStock',
      method: "GET",
      dataType: "json",
      data: {
        prdName: prdCdName
      },
      success: function (data) {
        console.log(data);
        $("#findLotTable tbody tr").remove();

        stockSum = 0;

        for (obj of data) {
          findLotNoModalMakeRow(obj);
        }
        
      }
    })
  }

  //tr 클릭 이벤트
  $("#findLotTable").on("click", "tr", function (e) {
    
    //해당 tr의 2번째 td(제품명)
    let lotNo = $(this).find("td:eq(2)").text();
  });

  //lot별 완제품 재고 모달창 데이터 출력 make row
  function findLotNoModalMakeRow(obj) {
    let node = `<tr>
                    <td>${obj.slsInDtlDate}</td>
                    <td>${obj.finPrdCdCode}</td>
                    <td>${obj.finPrdCdName}</td>
                    <td>${obj.fnsPrdStkLotNo}</td>
                    <td>${obj.fnsPrdStkVol}</td>
                    <td class="stockOutVol"></td>
                </tr>`
    $("#findLotTable tbody").append(node);
  }
  
  function sucFun(result) {
    //경고창 띄워주기
    let alertFlag = false;
    if ($("#outMngTable tbody").children().length != 0) {
      if (confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?") == true) {
        alertFlag = true;
      }
    } else {
      alertFlag = true;
    }

    if (alertFlag) {
      $("#outMngTable tbody tr").remove();
      for (ord of result) {
        outMakeRow(ord);
      }

      $("#findNotOutModal").modal("hide");
    }
  }
});
