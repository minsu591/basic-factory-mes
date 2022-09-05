$("document").ready(function () {

  let outLotList = [];            //출고시킬 LOT정보 담기(제품코드, lot번호, 출고량)
  let ModalTable = $("#findLotTable"); //테이블 정보
  let outDtlVol = 0;              //출고량 총 합계

  //lot별 완제품 재고 모달창 선택 tr정보 저장
  let modalTrInfo
  ModalTable.find("tbody").on("click", "tr", function (e) {
    modalTrInfo = $(this);
    console.log(modalTrInfo);
  });

  //모달 td 수정 이벤트
  ModalTable.find("tbody").on("click", "td", function (e) {
    console.log(e);
    //e.stopPropagation();       //현재 이벤트 상위로 전파 중단
    let col = $(this).index();   //선택한 컬럼index 저장
    let tdInfo = $(this);        //선택한 td정보 저장
    tdInfo.attr("contenteditable", "true"); //수정 가능하도록 설정

    tdInfo.unbind("focus").bind("focus", function (e) { //td에 focus되면 클래스 지정(border 생성 css)
      tdInfo.addClass("tdBorder");
    });

    tdInfo.on("keyup", function (key) { //enter나 esc 누르면 blur
      if (key.keyCode == 13 || key.keyCode == 27) {
        key.preventDefault();           //고유 동작 중단
        tdInfo.blur();
      }
    });

    tdInfo.unbind("blur").bind("blur",function (e) {               //td가 focus 잃으면
      e.preventDefault();                   
      tdInfo.attr("contenteditable", "false")
            .removeClass("tdBorder");
      tdInfo.trigger("change");
      e.stopPropagation();
    });
  });

  ModalTable.find("tbody").unbind("change").bind("change", "td", function (e) { //모달창의 td가 변경됐을 때
    console.log(e);
    e.preventDefault();
    let col = $(this).index();
    let finPrdCdCode = modalTrInfo.find("td:eq(1)").text();           //모달 tr의 제품코드
    let fnsPrdStkVol = modalTrInfo.find("td:eq(4)").text();           //모달 tr의 재고수량
    let fnsPrdStkLotNo = modalTrInfo.find("td:eq(3)").text();         //모달 tr의 lot번호
    let slsOutDtlVol = parseInt(modalTrInfo.find("td:eq(5)").text()); //모달 tr의 입력한 출고수량
    
    if (fnsPrdStkVol < slsOutDtlVol) {         //출고량이 재고수량보다 클 경우 
      alert('출고량이 재고수량보다 많습니다.');
      modalTrInfo.find("td:eq(5)").text('');
      return;
    } else if (slsOutDtlVol != null && slsOutDtlVol != '') { //모달창에서 출고량이 비어있지 않다면 함수로 값 넘겨서 push처리
      checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol);
    } 
    e.stopPropagation();
  });
  
  function checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol) {
    let flag = true;
    for (lot of outLotList) {                                     //outLotList[addList[제품코드, lot, 출고량], addList[]]
      if (lot[0] == finPrdCdCode && lot[1] == fnsPrdStkLotNo) {   //outLotList를 for문 돌면서 addList에 대해 같은 값 수정은 기존 배열에서 수정 (추가되지 않고)
        flag = false;                                             //하나라도 같은 게 있다면 false처리되서 push되지 않도록
        lot[2] = slsOutDtlVol;
        break;
      }
    }

    let addList = [finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol];

    if (flag) {
      outLotList.push(addList);
    }

    console.log(outLotList);

    if (addList[2] != null && addList[2] != '') { //출고량이 비어있지 않으면
     outDtlVol += addList[2];                     //출고량 합
    } else {
      return;
    }
  }

  //출고관리 테이블 tr클릭 시 정보 저장
  let finPrdCdCode;
  let lotTdInfo;
  let outVolTd;
  let notOutVol;
  let orderVol = 0;
  let price;
  let danga;
  $("#outMngTable").on("click", "tr", function (e) {
    outVolTd = $(this).find("td:eq(5)");
    lotTdInfo = $(this).find("td:eq(7)");
    notOutVol = $(this).find("td:eq(6)");
    price = $(this).find("td:eq(9)");
    finPrdCdCode = $(this).find("td:eq(1)").text();
    orderVol = $(this).find("td:eq(3)").text();
    danga = $(this).find("td:eq(8)").text();
  });

  //저장했을 때 해당 tr에 총 합계 출고량 입력되도록
  $("#okBtn").on("click", function (e) {
    console.log("obBtn클릭");
    let outVolCheck = modalTrInfo.find("td:eq(5)").text();
    if (outVolCheck == null || outVolCheck == '') {
      alert('출고량이 입력되지 않았습니다.');
      return;
    }
    
    $("#findLotModal").modal("hide");
    outVolTd.text(outDtlVol);
    notOutVol.text(orderVol - outDtlVol);
    price.text(outDtlVol * danga);
    //outLotList[addList[제품코드, lot, 출고량], addList[]]
    let sum = 0;
    let lotInfo;
    for (let i = 0; i < outLotList.length; i++){
      if (outLotList[i][0] == finPrdCdCode) {
        sum += 1;
        lotInfo = outLotList[i][1];
      }
    }
    console.log("sum" + sum);
    if (sum == 1) {
      lotTdInfo.text(outLotList[0][1]);
    } else {
      lotTdInfo.text(lotInfo + "외 " + (sum-1));
    }
    outDtlVol = 0;          //총 출고량 초기화
  });

  //완제품 출고 관리에서 lot별 완제품 재고 모달창
  let lotNoTdInfo;
  $("#outMngTable").on("click", ".lotNo", function (e) {
    console.log(e);
    e.preventDefault();
    $("#findLotModal").modal("show");
    lotNoTdInfo = $(this);
    findLotClick();
  });

  function findLotClick() {
    let finPrdCdCode = lotNoTdInfo.parent().find("td:eq(1)").text(); //click한 tr의 제품코드
    let prdCdName = lotNoTdInfo.parent().find("td:eq(2)").text();    //click한 tr의 제품명 찾기

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
