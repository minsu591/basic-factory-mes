$("document").ready(function () {
    
    //오늘 일자
    today = new Date();
    today = today.toISOString().slice(0, 10);
    outToday = $("#slsOutHdDate");
    outToday.val(today);
    let outTrInfo;
    let outLotList = [];                 //출고시킬 LOT정보 담기(제품코드, lot번호, 출고량)
    let avArr = [6];
    let ModalTable = $("#findLotTable"); //완제품 재고 테이블 정보
    let outDtlVol = 0;                   //출고량 총 합계

    //모달 td 수정 이벤트
    ModalTable.find("tbody").on("click", "td", function (e) {
        let col = $(this).index();
        let tdInfo = $(this);
        let flag = false;

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
        
        //수정 가능하도록 설정
        tdInfo.attr("contenteditable", "true"); 

        //td에 focus되면 클래스 지정(border 생성 css)
        tdInfo.unbind("focus").bind("focus", function (e) { 
            tdInfo.addClass("tdBorder");
        });

        tdInfo.on("keyup", function (key) {
            if (key.keyCode == 13 || key.keyCode == 27) {
                key.preventDefault();
                tdInfo.blur();
            }
        });

        tdInfo.unbind("blur").bind("blur", function (e) {  //td가 focus 잃으면
            e.preventDefault();
            tdInfo.attr("contenteditable", "false")
                .removeClass("tdBorder");
            tdInfo.trigger("change");
            e.stopPropagation();
        });
    });


    ModalTable.find("tbody").on("change", "td", function (e) { //모달창의 td가 변경됐을 때
        e.preventDefault();
        let modalTrInfo = $(this).closest("tr");
        let slsOutDtlVol = parseInt(modalTrInfo.find("td:eq(5)").text()); //모달 tr의 입력한 출고수량
        if(slsOutDtlVol != null && slsOutDtlVol != ''){
            checkNewOutLotList(modalTrInfo);
        }
        e.stopPropagation();
    });

    function checkNewOutLotList(modalTrInfo) {
        let slsOutHdNo = $("#slsOutHdNo").val();
        let finPrdCdCode = modalTrInfo.find("td:eq(1)").text();
        let fnsPrdStkLotNo = modalTrInfo.find("td:eq(3)").text();
        let priKey = modalTrInfo.find("input[type='hidden']").val();
        let slsOutDtlVol = modalTrInfo.find("td:eq(5)").text();
        let volNullFlag = false;
        let flag = true;
        
        if(slsOutDtlVol == null || slsOutDtlVol == ''){
            slsOutDtlVol = 0;
            volNullFlag = true;
            //slsOutDtlVol 빈값이면 outLotList에서 지우기, 추가 X
            //modifyList 중 빈값인 td면 modifyList에서 지우기, 추가 X
        }else{
            slsOutDtlVol = parseInt(slsOutDtlVol);
        }
        if(outTrInfo.hasClass("notOut")){ //신규등록
            if(outLotList.length == 0 && volNullFlag){
                return true;
            }

            for (let i =0; i<outLotList.length; i++) {
                //outLotList[addList[제품코드, lot, 출고량], addList[]]
                lot = outLotList[i];
                if (lot[0] == finPrdCdCode && lot[1] == fnsPrdStkLotNo && !volNullFlag) {
                    flag = false;
                    lot[2] = slsOutDtlVol;
                    break;
                }else if(volNullFlag){
                    if(lot[0] == finPrdCdCode && lot[1] == fnsPrdStkLotNo){
                        outLotList.splice(i,1);
                    }
                    return false;
                }
            }
            if (flag) {
                let addList = [finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol];
                outLotList.push(addList);
            }
            console.log(outLotList);
            outDtlVol += slsOutDtlVol;                     //출고량 합
        } else { //수정
            if(modifyList.length == 0 && volNullFlag){
                return true;
            }
            for (let i =0; i<modifyList.length; i++) {      
                lot = modifyList[i];
                if (lot[1] == finPrdCdCode && lot[2] == fnsPrdStkLotNo && !volNullFlag) {
                    flag = false;
                    lot[3] = slsOutDtlVol;
                    break;
                }else if(volNullFlag){
                    if(lot[1] == finPrdCdCode && lot[2] == fnsPrdStkLotNo){
                        modifyList.splice(i,1);
                        console.log(modifyList);
                    }
                    return false;
                }
            }

            if (flag) { //priKey = modar의 (출고내역번호)
                let modifyTr = [priKey, finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol, slsOutHdNo];
                modifyList.push(modifyTr);
            }
            console.log(modifyList);
        }
    }

    //출고관리 테이블 tr클릭 시 정보 저장
    let priKey;
    let finPrdCdCode;
    let lotTdInfo;
    let outVolTd;
    let preVol;
    let notOutVol;
    let orderVol = 0;
    let price;
    let danga;
    $("#outMngTable").on("click", "tr", function (e) {
        priKey = $(this).find("input[type='hidden']").val();
        preVol = $(this).find("td:eq(4)").text();
        outVolTd = $(this).find("td:eq(5)");
        lotTdInfo = $(this).find("td:eq(7)");
        notOutVol = $(this).find("td:eq(6)");
        price = $(this).find("td:eq(9)");
        finPrdCdCode = $(this).find("td:eq(1)").text();
        orderVol = $(this).find("td:eq(3)").text();
        danga = $(this).find("td:eq(8)").text();
    });

    //Lot모달 저장했을 때 해당 tr에 총 합계 출고량 입력되도록
    $("#okBtn").on("click", function (e) {
        
        //출고조회
        let okOutDtlVol = 0;
        
        //outLotList[addList[제품코드, lot, 출고량], addList[]]
        let sum = 0;
        let lotInfo;
        let trInfo = lotTdInfo.parent();
        let flag =false;
        if (trInfo.hasClass("notOut")) { //미출고 주문조회 / 클래스 주고 조건 변경
            //미출고 주문조회
            $("#findLotTable tbody tr").each(function(idx,el){
                let outVolCheck = $(el).find("td:eq(5)").text();
    
                if(outVolCheck != null && outVolCheck != ''){
                    flag = true;
                    return false;
                }
            });
            if(!flag){
                alert("입력값이 없습니다.");
                return false;
            }

            for (let i = 0; i < outLotList.length; i++) {
                if (outLotList[i][0] == finPrdCdCode) {
                    console.log(outLotList[i][0]);
                    sum += 1;
                    lotInfo = outLotList[i][1];
                }
            }
            if (sum == 1) {
                lotTdInfo.text(lotInfo);  //동일 제품이 1개일 경우 lotInfo에 lot정보 들어있음 있음
            } else {
                lotTdInfo.text(lotInfo + "외 " + (sum - 1));
            }
            okOutDtlVol = outDtlVol;
            outDtlVol = 0;          //총 출고량 초기화
        }else{
            //출고조회 빈 값 있는지 확인
            $("#findLotTable tbody tr").each(function(idx,el){
                let outVolCheck = $(el).find("td:eq(5)").text();
    
                if(outVolCheck == null || outVolCheck == ''){
                    alert('출고량이 입력되지 않았습니다.');
                    flag = true;
                    return false;
                }
            });
            if(flag){
                return false;
            }

            $("#findLotTable tbody tr").each(function(idx,el){
                okOutDtlVol += parseInt($(el).find("td:eq(5)").text());
            });
        }
        notOutVol.text(orderVol - preVol - okOutDtlVol);
        price.text(okOutDtlVol * danga);
        outVolTd.text(okOutDtlVol);
        $("#findLotModal").modal("hide");
    });

    //완제품 출고 관리에서 lot별 완제품 재고 모달창
  $("#outMngTable").on("click", ".lotNo", function (e) {
    e.preventDefault();
    $("#findLotModal").modal("show");
    //lot번호 클릭한 행의 정보
    outTrInfo = $(this).closest("tr");
    let lotNoTdInfo = $(this);
    let slsOutHdNo = $("#slsOutHdNo").val();

    if(slsOutHdNo == null || slsOutHdNo == ''){
        findLotStock(lotNoTdInfo);
    } else {
        lotUpdate(lotNoTdInfo);
    }
  });


  //출고량 변경할 때 완제품 출고내역에 해당하는 lot 재고 조회
  function lotUpdate(lotNoTdInfo) {
      let finPrdCdCode = lotNoTdInfo.parent().find("td:eq(1)").text();//click한 tr의 제품코드 찾기  
      let slsOutHdNo = $("#slsOutHdNo").val();                        //출고번호

      $.ajax({
          url: 'findOutUpdateStock',
          method: "GET",
          dataType: "json",
          data: {
            finPrdCdCode,
              slsOutHdNo
          },
          success: function (data) {
              console.log(data);
              $("#findLotTable tbody tr").remove();

              for (obj of data) {
                  findLotNoModalMakeRow(obj);
              }
          }
      });
    }

    //출고 등록 시 해당하는 제품 lot재고 모두 조회
    function findLotStock(lotNoTdInfo){
        let finPrdCdName = lotNoTdInfo.parent().find("td:eq(2)").text();
        $.ajax({
            url: 'findStock',
            method: "GET",
            dataType: "json",
            data: {
                prdName : finPrdCdName,
                lotNo : null
            },
            success: function (data) {
                console.log(data);
                $("#findLotTable tbody tr").remove();
  
                for (obj of data) {
                    findLotNoModalMakeRow(obj);
                }
            }
        });
    }
    
    //lot별 완제품 재고 모달창 데이터 출력 make row
    function findLotNoModalMakeRow(obj) {
        let trInfo = lotTdInfo.parent();
        let node = `<tr>
                    <input type="hidden" value="${obj.slsOutDtlNo}">
                    <td>${obj.slsInDtlDate}</td>
                    <td>${obj.finPrdCdCode}</td>
                    <td>${obj.finPrdCdName}</td>
                    <td>${obj.fnsPrdStkLotNo}</td>
                    <td>${obj.fnsPrdStkVol}</td>`;
        if(trInfo.hasClass("notOut")){
            node += `<td class="stockOutVol canModifyTd"></td>
            </tr>`;
        }else{
            node += `<td class="stockOutVol canModifyTd">${obj.slsOutDtlVol}</td>
                </tr>`
        }
            
                    
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

    //수정관련 정보 정의
    let modifyList = [];
    let delList = [];
    let table = $("#outMngTable");
    //notNull이어야하는 (td기준)
    let notNullList = [5, 7];

    //저장 버튼 이벤트
    $("#saveBtn").on("click", function () {
        let trs = table.find("tbody tr");
        let slsOutHdNo = $("#slsOutHdNo").val();

        if (confirm("저장하시겠습니까?") == true) {
            //null 검사
            for (tr of trs) {
                for (idx of notNullList) {
                    let content = $(tr).find("td:eq(" + idx + ")").text();
                    if (content == null || content == '') {
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            let countTr = table.find("tbody tr").length;
            if(countTr == 0){
                //헤더 삭제
                deleteHdSaveAjax(slsOutHdNo);
                return false;
            } else {
                //디테일 삭제
                console.log(delList.length);
                if(delList.length != 0){
                    for(obj of delList){
                        deleteSaveAjax(obj);
                    }
                }   
            }

            //수정용
            for (obj of modifyList) {
                modifySaveAjax(obj);
            }

            //등록용
            if (slsOutHdNo == null || slsOutHdNo == ''){
                insertSaveAjax(outLotList);
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
    function insertSaveAjax(outLotList) {
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
            console.log("출고수량:"+slsOutDtlVol);
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

    //체크박스 전체선택 & 해제
    $("#allCheck").on("click", function () {
        if ($("#allCheck").prop("checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    //선택 삭제 이벤트
    $("#deleteBtn").on("click", function () {
        table.find("tbody input:checkbox[name='cb']").each(function (idx, el) {
            if ($(el).is(":checked")) {
                let tr = $(el).closest('tr');
                tr.remove();
                let priKey = $("#slsOutHdNo").val();
                let finPrdCdCode = tr.find("td:eq(1)").text();
                console.log("출고번호 = " + priKey + "제품코드 = " + finPrdCdCode);
                let delTr = [priKey, finPrdCdCode];
                delList.push(delTr);
                for (let i = 0; i < modifyList.length; i++) {//수정하고 삭제할 수도 있어서. 검사.
                    if (modifyList[i][4] == priKey) {
                        modifyList.splice(i, 1);                        
                    }
                }
            }
            console.log(delList);
        });
    });

    function deleteHdSaveAjax(slsOutHdNo){
        $.ajax({
            url : 'outManage/hd/delete',
            type : 'DELETE',
            dataType : 'text',
            contentType: "application/json; charset=UTF-8;",
            data : JSON.stringify({
                    slsOutHdNo
            }),
            success : function(result){
                console.log("삭제 완료!")
            }
        });
    }

    function deleteSaveAjax(obj) {
        let slsOutHdNo = obj[0];    //출고번호
        let finPrdCdCode = obj[1];  //제품코드
        $.ajax({
            url: 'outManage/delete',
            type : 'DELETE',
            dataType: 'text',
            contentType: "application/json; charset=UTF-8;;",
            data : JSON.stringify({
                    slsOutHdNo, 
                    finPrdCdCode
            }),
            success: function (result) {
                //deleteSuccess();
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
});