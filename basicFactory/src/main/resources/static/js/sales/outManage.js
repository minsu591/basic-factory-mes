$("document").ready(function () {
    
    //오늘 일자
    today = new Date();
    today = today.toISOString().slice(0, 10);
    outToday = $("#slsOutHdDate");
    outToday.val(today);


    //체크박스 전체선택 & 해제
    $("#allCheck").on("click", function () {
        if ($("#allCheck").prop("checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });


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

        tdInfo.unbind("blur").bind("blur", function (e) {               //td가 focus 잃으면
            e.preventDefault();
            tdInfo.attr("contenteditable", "false")
                .removeClass("tdBorder");
            tdInfo.trigger("change");
            e.stopPropagation();
        });
    });

    let slsOutDtlVol;
    ModalTable.find("tbody").unbind("change").bind("change", "td", function (e) { //모달창의 td가 변경됐을 때
        console.log(e);
        e.preventDefault();
        let finPrdCdCode = modalTrInfo.find("td:eq(1)").text();           //모달 tr의 제품코드
        let fnsPrdStkVol = modalTrInfo.find("td:eq(4)").text();           //모달 tr의 재고수량
        let fnsPrdStkLotNo = modalTrInfo.find("td:eq(3)").text();         //모달 tr의 lot번호
        slsOutDtlVol = parseInt(modalTrInfo.find("td:eq(5)").text()); //모달 tr의 입력한 출고수량
        // if (fnsPrdStkVol < slsOutDtlVol) {         //출고량이 재고수량보다 클 경우 
        //     alert('출고량이 재고수량보다 많습니다.');
        //     modalTrInfo.find("td:eq(5)").text('');
        //     return;
        // } else if (slsOutDtlVol != null && slsOutDtlVol != '') { //모달창에서 출고량이 비어있지 않다면 함수로 값 넘겨서 push처리
        //     checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol);
        // }
        if(slsOutDtlVol != null && slsOutDtlVol != ''){
            checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol);
        }
        e.stopPropagation();
    });

    function checkNewOutLotList(finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol) {
        let flag = true;
        let addList;
        // let priKey = outTabletrInfo.find("input[type='hidden']").val();  //출고관리 테이블 tr의 hidden으로 숨겨준 priKey값
        for (lot of outLotList) {                                     //outLotList[addList[제품코드, lot, 출고량], addList[]]
            if (lot[0] == finPrdCdCode && lot[1] == fnsPrdStkLotNo) {   //outLotList를 for문 돌면서 addList에 대해 같은 값 수정은 기존 배열에서 수정 (추가되지 않고)
                flag = false;                                             //하나라도 같은 게 있다면 false처리되서 push되지 않도록
                lot[2] = slsOutDtlVol;
                break;
            }
        }
        
        if(priKey == null){
            addList = [finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol];
            if (flag) {
                outLotList.push(addList);
            }
    
            console.log(outLotList);
    
            if (addList[2] != null && addList[2] != '') { //출고량이 비어있지 않으면
                outDtlVol += addList[2];                     //출고량 합
            } else {
                return;
            }
        } else {
            modifyTr = [priKey, finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol];
            modifyList.push(modifyTr);
            console.log("modifyList!!!");
            console.log(modifyList);
        }
    }

    //출고관리 테이블 tr클릭 시 정보 저장
    let priKey;
    let finPrdCdCode;
    let lotTdInfo;
    let outVolTd;
    let notOutVol;
    let orderVol = 0;
    let price;
    let danga;
    $("#outMngTable").on("click", "tr", function (e) {
        priKey = $(this).find("input[type='hidden']").val();
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
        if(priKey == null){
            for (let i = 0; i < outLotList.length; i++) {
                if (outLotList[i][0] == finPrdCdCode) {
                    sum += 1;
                    lotInfo = outLotList[i][1];
                }
            }
            
            if (sum == 1) {
                lotTdInfo.text(outLotList[0][1]);
            } else {
                lotTdInfo.text(lotInfo + "외 " + (sum - 1));
            }
        } else {
            outVolTd.text(modifyTr[3]);
            price.text(slsOutDtlVol * danga);
        }
        outDtlVol = 0;          //총 출고량 초기화
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //수정
    //수정될거 저장하는 list 정의
    let modifyList = [];
    let delList = []; //삭제되면 lot의 재고 update / 주문 출고량, 미출고량 update
    //수정할 테이블
    let table = $("#outMngTable");
    //td 수정을 적용할 인덱스 (td기준)
    let avArr = [5, 7];
    //notNull이어야하는 (td기준)
    let notNullList = [5, 7];

    //수정 이벤트
    table.find("tbody").on("click", "td:not(.lotNo)", function (e) {
        console.log(e);
        e.stopPropagation();
        let col = $(this).index() -1; //input값 -1
        let flag = false;
        let tdInfo = $(this);
        let defaultVal;

        //수정 적용할 인덱스인지 확인
        for(let i = 0; i<avArr.length;i++){
            if(col == avArr[i]){
                flag = true;
                break;
            }
        }

        //해당사항 없으면 return
        if(!flag){
            return;
        }

        //수정할 수 있도록 하는 설정
        tdInfo.attr("contenteditable", "true");

        //td에 focus가 되면
        tdInfo.focus(function(e){
            defaultVal = tdInfo.text();
            tdInfo.addClass("tdBorder");
        });

        //enter나 esc 누르면 blur되도록 
        tdInfo.on("keyup",function(key){
            if(key.keyCode == 13 || key.keyCode == 27){
                key.preventDefault();
                tdInfo.blur();
            }
        });
        
        //td에 blur가 되면(포커스 잃으면)
        tdInfo.blur(function(e){
            e.preventDefault();
            tdInfo.attr("contenteditable","false")
                    .removeClass("tdBorder");
            //not null이어야하는 값은 null이 되면 이전에 입력한 값으로 돌려놓게 setting
            if(tdInfo.text() == null || tdInfo.text() == ''){
                for(idx of notNullList){
                    if(col == idx){
                        tdInfo.text(defaultVal);
                        break;
                    }
                }
            } else {
                tdInfo.trigger("change");
            }
            e.stopPropagation();
        });

    });

    table.find("tbody").on("change", "td:not(:first-child)", function (e) {     //기존에 있던 tbody에 change 이벤트가 발생했을 때.
        console.log(e);
        e.preventDefault();
        let col = $(this).index() - 1;                                          //클릭된 td의 index를 (td의 index만 찾음) col변수에 저장
        let priKey = $(this).parent().find("input[type='hidden']").val();       //해당 td의 부모에서 프라이머리키 값이 있는 태그를 찾아 그 값을 저장
        let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");//html의 col번째 th name값 갖고 옴(수정될 column)
        let updCont = $(this).text();                                            //해당 td의 text값을 저장(수정될 content)
        if (priKey != null && priKey != '') {                                   //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
            checkNewModify(priKey, updCol, updCont);
        }
        console.log(modifyList);
        e.stopPropagation();
    });

    function checkNewModify(priKey, updCol, updCont) {
        for(p of modifyList){
            if (p[0] == priKey && p[1] == updCol) { //modifyList의 한 건에 대해 같은 값을 수정하는 것이라면 
                p[2] = updCont                      //새로 추가가 아닌 기존 배열에 수정
                return;
            }
        }
        let modifyTr = [priKey, updCol, updCont];
        modifyList.push(modifyTr);
    }

    //저장 버튼 이벤트
    $("#saveBtn").on("click", function () {
        let trs = table.find("tbody tr");
        if (confirm("저장하시겠습니까?") == true) {
            //null 검사
            for (tr of trs) {
                for (idx of notNullList) {                                  //tr돌면서 notNullList index가 null인지 검사
                    let content = $(tr).find("td:eq(" + idx + ")").text();
                    if (content == null || content == '') {
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            if(delList[0] != null){
                deleteSaveAjax(delList);
            }

            //수정용
            if(priKey != null && priKey != ''){
                for (obj of modifyList) {
                    modifySaveAjax(obj);
                }
            }

            //등록용
            let slsOutHdNo = $("#slsOutHdNo").val();
            if (slsOutHdNo == null || slsOutHdNo == ''){
                console.log("똑독");
                insertSaveAjax(outLotList, slsOutHdNo);
            }

            alert("저장이 완료되었습니다.");
            location.reload();
        }
    });
    //수정 끝

    function modifySaveAjax(obj){
        //checkbox인거
        let slsOutDtlNo = obj[0];
        let slsOutDtlVol = obj[3];
        let slsOutDtlVO = [];
        let updateDtl = {
            slsOutDtlNo,
            slsOutDtlVol
        }
        slsOutDtlVO.push(updateDtl);
        console.log("slsOutDtlVO");
        console.log(slsOutDtlVO);
        $.ajax({
            url: 'outManage/update',
            type :"PUT",
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                slsOutDtlNo,
                slsOutDtlVol
            },
            success : function(result){
                console.log("업데이트 완료");
            }, error : function(error){
                alert("서버 오류 : " + error);
            }
        })
    }

    //출고 insert
    function insertSaveAjax(outLotList, slsOutHdNo) {
        let slsOutHdDate = $("#slsOutHdDate").val();
        let slsOrdHdNo = $("#slsOrdHdNo").val();
        let vendCdCode = $("#vendor").val();
        let empId = $("#empId").val();
        let slsOutHdRemk = $("#remk").val();
        let slsOutDtlVO = [];

        //추가하는 tr 다 가져와 for문을 돌려서 slsOutDtlVO에 리스트 형태로 push
        for (obj of outLotList) {      //(제품코드, lot번호, 출고량)
            let finPrdCdCode = obj[0];
            let fnsPrdStkLotNo = obj[1];
            let slsOutDtlVol = obj[2];
            let addDtl = {
                finPrdCdCode,
                fnsPrdStkLotNo,
                slsOutDtlVol
            }
            slsOutDtlVO.push(addDtl);
        }
        $.ajax({
            url: 'outManage/hdDtlInsert',
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                slsOutHdVO: {
                    slsOutHdDate,
                    slsOrdHdNo,
                    vendCdCode,
                    empId,
                    slsOutHdRemk
                },
                slsOutDtlVO
            }),
            success: function (result) {
                console.log("outHdDtl 추가 성공");
            }
        });
    }

    //선택 삭제 이벤트
    $("#deleteBtn").on("click", function () {
        table.find("tbody input:checkbox[name='cb']").each(function (idx, el) {
            if ($(el).is(":checked")) {
                let tr = $(el).closest('tr');
                console.log(tr);
                let priKey = tr.find("input[type='hidden']").val();
                tr.remove();
                delList.push(priKey);
                for (let i = 0; i < modifyList.length; i++) {
                    if (modifyList[i][0] == priKey) {                   //수정목록의 길이만큼 돌면서[0]번째:priKey값이 같으면 
                        modifyList.splice(i, 1);                        //[priKey, updCol, updCont]에서 배열 i번재부터 1개의 값을 썰어버림
                    }
                }
            }
        });
    });

    function deleteSaveAjax(delList) {
        $.ajax({
            url: 'outManage/delete',
            type : 'DELETE',
            dataType: 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                delList
            },
            success: function (result) {
                console.log("삭제 성공");
            }
        });
    }
});