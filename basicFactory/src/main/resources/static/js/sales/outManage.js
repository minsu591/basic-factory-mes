$("document").ready(function () {
    
    //오늘 일자
    today = new Date();
    today = today.toISOString().slice(0, 10);
    outToday = $("#slsOutHdDate");
    outToday.val(today);
    
    let outTableTrInfo;                  //출고관리 테이블의 tr
    let outLotList = [];                 //출고시킬 LOT정보 담기(제품코드, lot번호, 출고량)
    let avArr = [6];
    let ModalTable = $("#findLotTable"); //완제품 재고 테이블 정보
    let defaultVal;
    //모달창 열 때 임시로 값을 담아두는 곳 (저장 눌렀을 경우에만 modifyList에 담길 수 있음)    
    let modTempList = [];

    //초기화 버튼
    $("#resetBtn").click(function () {
        $("#outMngTable tbody tr").remove();
        $("#allCheck").prop("checked", false);
        $("#slsOutHdDate").val(today);
        $("#slsOutHdDate").prop("disabled", false);
        $("#slsOutHdNo").val('');
        $("#vendor").val('');
        $("#vendorName").val('');
        $("#outTotalPrice").text('');
    })

    //lot별 완제품 재고 모달 td 수정 이벤트
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
        tdInfo.focus();
        defaultVal = tdInfo.text();
        tdInfo.addClass("tdBorder");

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
            let txt = tdInfo.text();
            let parseIntVol = parseInt(txt);
            if (!$.isNumeric(parseIntVol)) {
                //txt가 숫자가 아니면
                tdInfo.text('');
                return false;
            } else if ($.isNumeric(parseIntVol) && txt != parseIntVol) {
                //txt가 숫자와 문자가 섞여 있으면
                tdInfo.text(parseIntVol);
            }
            
            tdInfo.trigger("change");
            e.stopPropagation();
        });
    });


    ModalTable.find("tbody").on("change", "td", function (e) { //모달창의 td가 변경됐을 때
        e.preventDefault();
        let modalTd = $(this);
        let modalTrInfo = $(this).closest("tr");
        let slsOutDtlVol = parseInt(modalTrInfo.find("td:eq(5)").text()); //모달 클릭 tr의 입력한 출고수량

        //0의 값이 입력 됐을 때
        if (slsOutDtlVol <= 0) {
            minusWarning();
            modalTd.text(defaultVal);
            return false;
        }

        if (slsOutDtlVol != null && slsOutDtlVol != '') {
            let outVolTd = $(this);
            checkNewOutLotList(modalTrInfo,outVolTd);
        }

        e.stopPropagation();
    });

    function checkNewOutLotList(modalTrInfo,outVolTd) {
        //변경될 때의 값들
        let slsOutHdNo = $("#slsOutHdNo").val();
        let finPrdCdCode = modalTrInfo.find("td:eq(1)").text();
        let fnsPrdStkLotNo = modalTrInfo.find("td:eq(3)").text();
        let priKey = modalTrInfo.find("input[type='hidden']").val();
        let slsOutDtlVol = modalTrInfo.find("td:eq(5)").text();
        let orderVol = outTableTrInfo.find("td:eq(3)").text();
        let volNullFlag = false;
        let flag = true;
        
        if(slsOutDtlVol == null || slsOutDtlVol == ''){
            slsOutDtlVol = 0;
            volNullFlag = true;
        }else{
            slsOutDtlVol = parseInt(slsOutDtlVol);
        }

        //미출고 주문조회로 값을 등록할 때(신규 등록)
        if (outTableTrInfo.hasClass("notOut")) {

            //td클릭할 때 밖 데이터 합치기 
            let preVol = parseInt(outTableTrInfo.find("td:eq(4)").text());
            let slsOutDtlVol = parseInt(outTableTrInfo.find("td:eq(5)").text());
            let orderVol = parseInt(outTableTrInfo.find("td:eq(3)").text());

            //모달창 띄울 때 기본 데이터
            $("#outTotalSum").text((preVol + slsOutDtlVol) + "/" + orderVol);   

            let myOutTotal = parseInt($(outVolTd).text());                              //클릭한 td (출고량)
            if (myOutTotal > parseInt($(outVolTd).parents().find("td:eq(4)").text())) { //재고량보다 클 때 
                //재고량보다 출고량이 크다면
                outVolWarn();
            }
            
            //기출고량 합계 비교하려고 tr돌림
            $("#findLotTable tbody tr").each(function (idx,el) {    
                let outVol = $(el).find("td:eq(5)").text();  //입력한 출고량
                if (outVol == null || outVol == '') {
                    outVol = 0;
                } else if (parseInt(outVol) == NaN) {        //빈값이나 이상한 값이면 0으로 
                    outVol = 0;
                } else {                                    
                    preVol += parseInt(outVol);              //출고관리 테이블의 기출고량 + 출고량
                }
            });

            //주문량 보다 출고량이 많을 때
            if (orderVol < preVol) {             //preVol = 기출고량 + 출고량 (다 더한 거)
                excsWarning();
                $(outVolTd).text('');            //입력값 초기화
                preVol -= parseInt(myOutTotal);  //입력한 출고량만큼 빼주기
            }
            
            $("#outTotalSum").text(preVol + "/" + orderVol);

        //출고량 수정일 때
        } else { 
            if(modTempList.length == 0 && volNullFlag){
                return true;
            }
            for (let i =0; i<modTempList.length; i++) {      
                lot = modTempList[i];
                if (lot[1] == finPrdCdCode && lot[2] == fnsPrdStkLotNo && !volNullFlag) {
                    flag = false;
                    lot[3] = slsOutDtlVol;
                    break;
                }else if(volNullFlag){
                    if(lot[1] == finPrdCdCode && lot[2] == fnsPrdStkLotNo){
                        modTempList.splice(i,1);
                        console.log(modTempList);
                    }
                    return false;
                }
            }

            if (flag) { //priKey = modar의 (출고내역번호 input hidden값)
                let modifyTr = [priKey, finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol, slsOutHdNo];
                modTempList.push(modifyTr);
            }
            console.log(modTempList);
            

            //완제품 재고 모달창의 tr 돌면서 총 출고량 계산
            let trs = ModalTable.find("tbody tr");
            let prvsVol = parseInt(outTableTrInfo.find("td:eq(4)").text());        //기출고량
            let totalOutVol = 0;
            for(tr of trs){
                let outVol = Number($(tr).find("td:eq(5)").text());
                if(outVol == null || outVol == ''){
                    totalOutVol += 0;
                } else {
                    totalOutVol += outVol;
                }
            }

            if (orderVol < totalOutVol + prvsVol) { //출고량 + 기출고량이 주문량보다 크면 X
                excsWarning();
                modalTrInfo.find("td:eq(5)").text(defaultVal); //초기화
                return false;
            }
            //모달창 아래 기출고량+ 기존 출고량 + 출고량 합계
            $("#outTotalSum").text((prvsVol + totalOutVol) + "/" + orderVol);
        }
    }

    //취소 버튼
    $("#xBtn").click(function(){
        outDtlVol = 0;
    });

    //Lot모달 저장했을 때 해당 tr에 총 합계 출고량 입력되도록
    $("#okBtn").on("click", function (e) {
        let preVol = outTableTrInfo.find("td:eq(4)").text();
        let outVolTd = outTableTrInfo.find("td:eq(5)");
        let lotTdInfo = outTableTrInfo.find("td:eq(7)");
        let notOutVol = outTableTrInfo.find("td:eq(6)");
        let finPrdCdCode = outTableTrInfo.find("td:eq(1)").text();
        let orderVol = outTableTrInfo.find("td:eq(3)").text();
        let danga = outTableTrInfo.find("td:eq(8)").text();
        
        //출고량
        let okOutDtlVol = 0;
        
        //outLotList[addList[제품코드, lot, 출고량], addList[]]
        let sum = 0;
        let lotInfo;
        let flag = false;
        

        //미출고 주문조회
        if (outTableTrInfo.hasClass("notOut")) { 
            //모달 위에서 부터 빈값 확인
            $("#findLotTable tbody tr").each(function (idx, el) {
                let finPrdCdCode = $(el).find("td:eq(1)").text();
                let fnsPrdStkLotNo = $(el).find("td:eq(3)").text();
                let slsOutDtlVol = $(el).find("td:eq(5)").text();

                //총 출고량 구하기
                if (slsOutDtlVol == null || slsOutDtlVol == '') {
                    //빈값 무시
                } else if (parseInt(slsOutDtlVol) == NaN) {
                    //빈값 무시
                } else {
                    let tempFlag = true;
                    for (out of outLotList) {
                        //동일 제품이 존재한다면 List에 담지 않기
                        if (finPrdCdCode == out[0] && fnsPrdStkLotNo == out[1]){
                            out[2] = slsOutDtlVol;
                            tempFlag = false;
                            break;
                        }
                    }

                    if (tempFlag) {
                        let out = [finPrdCdCode, fnsPrdStkLotNo, parseInt(slsOutDtlVol)];
                        outLotList.push(out);
                    }
                    //출고량 더하기
                    okOutDtlVol += parseInt(slsOutDtlVol);
                }
            });

            //동일 제품이 여러개의 lot로 출고 됐을 경우
            for (let i = 0; i < outLotList.length; i++) {
                if (outLotList[i][0] == finPrdCdCode) {
                    sum += 1;
                    lotInfo = outLotList[i][1];
                }
            }

            if (sum == 1) {
                lotTdInfo.text(lotInfo);
            } else {
                lotTdInfo.text(lotInfo + "외 " + (sum - 1));
            }

        }else{
            for(temp of modTempList){
                let tempFlag = true;
                for(mod of modifyList){
                    if(temp[1] == mod[1] && temp[2] == mod[2]){
                        mod[3] = temp[3];
                        tempFlag = false;
                        break;
                    }
                }
                if(tempFlag){
                    modifyList.push(temp);
                }
            }
            
            if(modifyList.length == 0){
                modifyList = modTempList;
            }
            //완제품 lot tr의 입력된 출고량 빈 값 있는지 확인
            $("#findLotTable tbody tr").each(function(idx,el){
                let outVolCheck = $(el).find("td:eq(5)").text();
    
                if(outVolCheck == null || outVolCheck == ''){
                    flag = true;
                    return false;
                }
            });
            if(flag){
                return false;
            }

            //저장할 때 LOT테이블 TR돌면서 출고량 합계
            $("#findLotTable tbody tr").each(function(idx,el){
                okOutDtlVol += parseInt($(el).find("td:eq(5)").text());
                console.log(okOutDtlVol);
            });
        }

        $("#findLotModal").modal("hide");

        //미출고량
        notOutVol.text(orderVol - preVol - okOutDtlVol);
        //금액 콤마찍기
        outTableTrInfo.find("td:eq(9)").text(Number(okOutDtlVol * danga).toLocaleString("ko-KR")); 

        outVolTd.text(okOutDtlVol);

        //출고관리 테이블 tr 돌면서 출고량 총 합계 계산
        if (okOutDtlVol != null) {
            totalPrice();
        }
    });

    //완제품 출고 관리에서 lot별 완제품 재고 모달창
  $("#outMngTable").on("click", ".lotNo", function (e) {
      
      e.preventDefault();
      let tdInfo = $(this);
      outDtlVol = 0;
      tempOutLotList = [];
      modTempList = [];

    //저장을 한 번해서 공백 경고 border에 포커스 오면 해당 클래스 삭제
    if(tdInfo.hasClass("nullVol")){
        tdInfo.removeClass("nullVol");
    }
    
    $("#findLotModal").modal("show");

    //lot번호 클릭한 행의 정보
    outTableTrInfo = $(this).closest("tr");
    let lotNoTdInfo = $(this);
    let slsOutHdNo = $("#slsOutHdNo").val();
    let orderVol = outTableTrInfo.find("td:eq(3)").text();
    let prvsVol = Number(outTableTrInfo.find("td:eq(4)").text());     //기출고량
    let saveOutVol = Number(outTableTrInfo.find("td:eq(5)").text());  //기존에 저장된 출고량

    //수정이라면 기출고량 + 기존출고량 / 주문량 표시
    if(saveOutVol != null && saveOutVol != ''){
        $("#outTotalSum").text((prvsVol + saveOutVol) + "/" + orderVol);
    } else {
        $("#outTotalSum").text(prvsVol + "/" + orderVol);
    }
    
    //
    if(slsOutHdNo == null || slsOutHdNo == ''){
        findLotStock(lotNoTdInfo);
    } else {
        lotUpdate(lotNoTdInfo);
    }

    console.log($("#findLotTable tbody").find("tr"));
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
                lotNo : null,
                stockClfy : '1'
            },
            success: function (data) {
                $("#findLotTable tbody tr").remove();
  
                for (obj of data) {
                    findLotNoModalMakeRow(obj);
                }
            }
        });
    }
    
    //lot별 완제품 재고 모달창 데이터 출력 make row
    function findLotNoModalMakeRow(obj) {
        let node = `<tr class="lotModalTr">
                    <input type="hidden" value="${obj.slsOutDtlNo}">
                    <td>${obj.slsInDtlDate}</td>
                    <td>${obj.finPrdCdCode}</td>
                    <td>${obj.finPrdCdName}</td>
                    <td>${obj.fnsPrdStkLotNo}</td>`;
        
        if(outTableTrInfo.hasClass("notOut")){
            let sdVol='';
            for(out of outLotList){
                if(out[0] == obj.finPrdCdCode && out[1] == obj.fnsPrdStkLotNo){
                    sdVol = out[2];
                    break;
                }
            }
            node += `<td>${obj.fnsPrdStkVol}</td>
                     <td class="stockOutVol canModifyTd">${sdVol}</td>
                    </tr>`;
        }else{
            //priKey, finPrdCdCode, fnsPrdStkLotNo, slsOutDtlVol, slsOutHdNo
            let sdVol= obj.slsOutDtlVol;
            for(mod of modifyList){
                if(mod[1] == obj.finPrdCdCode && mod[2] == obj.fnsPrdStkLotNo){
                    sdVol = mod[3];
                    break;
                }
            }
            
            node += `<td>${obj.fnsPrdStkVol + sdVol}</td>
                     <td class="stockOutVol canModifyTd">${sdVol}</td>
                 </tr>`
        }
        console.log(modifyList);
                    
        $("#findLotTable tbody").append(node);
    }

    //수정관련 정보 정의
    let modifyList = [];
    let delList = [];
    let table = $("#outMngTable");
    let notNullList = [7];

    //저장 버튼 이벤트
    $("#saveBtn").on("click", function () {
        let trs = table.find("tbody tr");
        let slsOutHdNo = $("#slsOutHdNo").val();
        let flag = false;
        Swal.fire({
            icon: "question",
            title: "저장하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            closeOnClickOutside: false,
        }).then((result) => {
            if (result.isConfirmed) {
                if(!$("#vendor").val()){
                    noDataWarn();
                    return false;
                }
                //null 검사
                for (tr of trs) {
                    for (idx of notNullList) {
                        let td = $(tr).find("td:eq(" + idx + ")");
                        let content = $(tr).find("td:eq(" + idx + ")").text();
                        if (content == null || content == '') {
                            $(td).addClass("nullVol");
                            flag = true;
                        }
                    }
                }

                if(flag) {
                    requiredWarn();
                    return;
                }
                
                let countTr = table.find("tbody tr").length;
                if(countTr == 0){
                    //헤더 삭제
                    deleteHdSaveAjax(slsOutHdNo);
                } else {
                    //디테일 삭제
                    console.log(delList.length);
                    if(delList.length != 0){
                        for (obj of delList) {
                            console.log(obj);
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
                Swal.fire({
                    icon: "success",
                    title: "저장이 완료되었습니다",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인",
                    closeOnClickOutside: false,
                }).then((result) => {
                    location.reload();
                });
            } else {
                return;
            }
        });
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
        if ($("input[type='checkbox']:checked").length === 0) {
            deleteWarning();
            return;
        }
        table.find("tbody input:checkbox[name='cb']").each(function (idx, el) {
            if ($(el).is(":checked")) {
                let tr = $(el).closest('tr');
                tr.remove();
                let priKey = $("#slsOutHdNo").val();
                let finPrdCdCode = tr.find("td:eq(1)").text();
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
        //내부에 내용이 없으면 allCheck 해제
        if (table.find("tbody tr").length == 0) {
            $("#allCheck").prop("checked", false);
        }
        
        //출고관리 테이블 tr 돌면서 출고량 총 합계 계산
        totalPrice();
    });

    function totalPrice() {
        let trs = table.find("tbody tr");
        let priceSum = 0;
        for (tr of trs) {
            let totalPrice = $(tr).find(".price").text();
            if (totalPrice == null || totalPrice == '') {
                totalPrice = 0;
            } else {
                totalPrice = totalPrice.split(",").join(""); //콤마 제거
                totalPrice = Number(totalPrice);
            }
            priceSum += totalPrice;
        }

        if (table.find("tbody tr").length == 0) {
            $("#outTotalPrice").text('');
        } else {
            $("#outTotalPrice").text(priceSum.toLocaleString("ko-KR"));
        }
    }

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
                console.log("outHd 삭제 완료!")
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
                console.log('outDtl삭제 완료!');
            }
        });
    }

    function requiredWarn() {
        Swal.fire({
            icon: "warning",
            title: "입력하지 않은 값이 있습니다.",
            text: "다시 입력해주세요.",
            confirmButtonText: "확인"
        });
    }

    function noDataWarn() {
        Swal.fire({
            icon: "warning",
            title: "입력된 값이 없습니다.",
            confirmButtonText: "확인"
        });
    }

    function outVolWarn() {
        Swal.fire({
            icon: "warning",
            title: "수량 초과",
            text: "출고량이 재고량보다 많습니다.",
            confirmButtonText: "확인"
        });
    }

    function stockVolWarn() {
        Swal.fire({
            icon: "warning",
            title: "수량 초과",
            text: "모두 소진된 재고입니다.",
            confirmButtonText: "확인"
        });
    }

    function minusWarning() {
        Swal.fire({
            icon: "warning",
            title: "입력값 오류",
            text: "0보다 큰 값의 숫자만 입력할 수 있습니다.",
            confirmButtonText: "확인",
        });
    }

    function excsWarning() {
        Swal.fire({
            icon: "warning",
            title: "수량 초과", 
            text: "주문량보다 출고량이 큽니다.",
            confirmButtonText: "확인"
        });
    }

    function deleteWarning() {
        Swal.fire({
            icon: "warning",
            title: "삭제할 항목을 선택하세요.",
            confirmButtonText: "확인"
        });
    }
});