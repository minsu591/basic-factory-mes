$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#planManageTable");
    //td 수정을 적용할 인덱스
    let avArr = [8];
    //notNull이어야하는 idx
    let notNullList = [2,8,9,10];


    //수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let tdInfo = $(this);
        let col = tdInfo.index();
        let flag = false;
        let defaultVal;
        //적용할 인덱스인지 확인
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
        tdInfo.attr("contenteditable","true");
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
        //td에 blur가 되면
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
            }else{
                tdInfo.trigger("change");
            }
            e.stopPropagation();
        });

    });


    table.find("tbody").on("change","td:not(:first-child)",function(e){
        e.preventDefault();
        if($(this).parent().attr("class") =='addBtn'){
            return false;
        }
        let col = $(this).index();
        let ordCode = $(this).parent().find("td:eq(1)").text();
        let finCode = $(this).parent().find("td:eq(2)").text();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;
        if($(this).find("input[type=date]").length == 1){
            updCont = $(this).find("input[type=date]").val();
        }else{
            updCont = $(this).text();
        }
        checkNewModify(ordCode,finCode,updCol,updCont);
        return;
    })

    function checkNewModify(ordCode,finCode,updCol,updCont){
        for(p of modifyList){
            if(p[0] == ordCode && p[1] == finCode && p[2] == updCol){
                p[3] = updCont
                return;
            }
        }
        let modifyTr = [ordCode,finCode,updCol,updCont];
        modifyList.push(modifyTr);
        console.log(modifyList);
    }

    function exNull(st){
        return st == null || st == '';
    }
    //저장 버튼 이벤트
    $("#saveBtn").on("click",function(){
        let trs = table.find("tbody tr");
        if(confirm("저장하시겠습니까?")==true){
            //추가인지 수정인지
            console.log($("#planDate").attr("readonly"));
            let planName = $("#planName").val();
            if($("#planDate").attr("readonly")){
                //수정
                if(exNull(planName)){
                    alert('헤더에 공백이 존재합니다. 확인 후 다시 저장해주세요.');
                }
            }else{
                //추가
                let planDate = $("#planDate").val();
                let empid = $("#empid").val();
                if(exNull(planDate) || exNull(empid)){
                    alert('헤더에 공백이 존재합니다. 확인 후 다시 저장해주세요.');
                }
            }

            //null 검사
            for(tr of trs){
                for(idx of notNullList){
                    let td = $(tr).find("td:eq("+idx+")");
                    let content;
                    if(idx == 9 || idx == 10){
                        content = td.find("input[type='date']").val();
                    }else{
                        content = td.text();
                    }

                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            for(priKey of delList){
                deleteSaveAjax(priKey);
            }
            //수정용
            for(obj of modifyList){
                modifySaveAjax(obj);
            }
            //추가용
            addList = table.find("tr[name='addTr']");
            for(obj of addList){
                addSaveAjax(obj);
            }

            alert("저장이 완료되었습니다.");
            location.reload();
        }
    });

    function modifySaveAjax(obj){
        //checkbox인거
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'vendorCode/update',
            type :"POST",
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                priKey : priKey,
                updCol : updCol,
                updCont : updCont
            },
            success : function(result){
                console.log("업데이트 완료");
            }, error : function(error){
                alert("서버 오류 : " + error);
            }
        })
    }
    //수정 끝

    //추가 이벤트
    //추가 버튼 누르면 행 추가
    $("#addBtn").on("click",function(){
        let node = `<tr class="addBtn">
                    <td><input type="checkbox"></td>`;
        //allCheck의 체크박스가 체크되어있으면 추가되는 행도 체크된 채로 나오기
        if($("#allCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" checked></td>`
        }
        node += `<td></td>
                <td class="finPrdCdCode"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="date"></td>
                <td><input type="date"></td>
                </tr>`
        $("#planManageTable tbody").append(node);
    });

    function addSaveAjax(obj){
        let empId = $(obj).find("td:eq(2)").text();
        //selectBox
        let vendCdClfy = $(obj).find("td:eq(3) select option:selected").val();
        console.log(vendCdClfy);
        let vendCdNm = $(obj).find("td:eq(4)").text();
        let vendCdRegNo = $(obj).find("td:eq(5)").text();
        let vendCdPhone = $(obj).find("td:eq(6)").text();
        let vendCdAdr = $(obj).find("td:eq(7)").text();
        let vendCdRemk = $(obj).find("td:eq(8)").text();
        
        $.ajax({
            url : 'vendorCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                empId : empId,
                vendCdClfy : vendCdClfy,
                vendCdNm : vendCdNm,
                vendCdRegNo : vendCdRegNo,
                vendCdPhone : vendCdPhone,
                vendCdAdr : vendCdAdr,
                vendCdRemk : vendCdRemk
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    //추가 끝


    //선택 삭제 이벤트
    $("#deleteBtn").on("click",function(){
        table.find("tbody input:checkbox[name='chk']").each(function(idx,el){
            if($(el).is(":checked")){
                let tr = $(el).closest('tr');
                let priKey = tr.find("td:eq("+priKeyIdx+")").text();
                delList.push(priKey);
                tr.remove();
                for(let i = 0; i< modifyList.length; i++){
                    if(modifyList[i][0]== priKey){
                        modifyList.splice(i,1);
                    }
                }
            }
        });
    });

    function deleteSaveAjax(priKey){
        $.ajax({
            url : 'vendorCode/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                priKey : priKey
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

    //미계획 주문내역 tr 클릭 이벤트
    $("#findNotDoneOrdTable").on("click","tr",function(){
        let slsOrdHdNo = $(this).find("td:eq(0)").text();
        $.ajax({
            url : 'notDoneOrd/dtl',
            method : 'GET',
            data : {
                slsOrdHdNo
            },
            dataType : "json",
            success : function(result){
                $("#planDate").val('');
                $("#planDate").attr("readonly",false);
                $("#planName").val('')
                $("#planName").attr("readonly",false);
                $("#planRemk").val('');
                $("#empid").val('');
                $("#empid").attr("readonly",false);

                sucFun(result,"order");
            }
        })
    });

    //tr 클릭 이벤트
    $("#findMyPlanTable").on("click","tr", function(){
        //테이블 상단 공통 요소 삽입
        let planHdDate = $(this).find("td:eq(3)").text();
        let planHdName = $(this).find("td:eq(1)").text();
        let planRemk = $(this).find("td:last").text();
        let empId = $(this).find("td:eq(4)").text();
        let planHdCode = $(this).find("td:eq(0)").text();

        $("#planDate").val(planHdDate);
        $("#planDate").attr("readonly",true);
        $("#planName").val(planHdName);
        $("#planRemk").val(planRemk);
        $("#empid").val(empId);
        $("#empid").attr("readonly",true);

        //테이블 삽입
        $.ajax({
            url : 'myPlanView/dtl',
            method : 'GET',
            data : {
                planCode : planHdCode
            },
            success : function(result){
                sucFun(result,"plan");
            }
        })
    });

    function sucFun(result,type){
        //경고창 띄워주기
        let alertFlag = false;
        if($("#planManageTable tbody").children().length != 0){
            if(confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?")==true){
                alertFlag = true;
            }
        }else{
            alertFlag = true;
        }

        if(alertFlag){
            modifyList = [];
            addList = [];
            delList = [];
            $("#planManageTable tbody tr").remove();
            if(type == 'order'){
                for(ord of result){
                    ordMakeRowForNotDone(ord);
                }
            }else{
                for(ord of result){
                    ordMakeRowForPlan(ord);
                }
            }
            
            if(type == 'order'){
                $("#findNotDoneOrdModal").modal("hide");
            }else{
                $("#findMyPlanModal").modal("hide");
            }
        }
    }
    //미계획 주문내역 조회 모달을 통한 데이터 출력
    function ordMakeRowForNotDone(ord){
        let node = `<tr>
            <td><input type="checkbox"></td>
            <td>${ord.slsOrdHdNo}</td>
            <td>${ord.finPrdCdCode}</td>
            <td>${ord.finPrdCdName}</td>
            <td>${ord.slsOrdDtlDlvDate}</td>
            <td>${ord.slsOrdDtlVol}</td>
            <td>${ord.planPreVol}</td>
            <td>${ord.slsOrdDtlVol-ord.planPreVol}</td>
            <td></td>
            <td><input type="date"></td>
            <td><input type="date"></td>
        </tr>`
        $("#planManageTable tbody").append(node);
    }
    
    //생산계획 조회 모달을 통한 데이터 출력
    function ordMakeRowForPlan(ord){
        let node = `<tr>
                    <td><input type="checkbox"></td>`;
        if(ord.colOrdVO.slsOrdHdNo == null){
            node += `<td></td>
                    <td class="finPrdCdCode">${ord.planVO.finPrdCdCode}</td>
                    <td>${ord.planVO.finPrdCdName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${ord.planVO.planProdVol}</td>
                    <td><input type="date" value="${ord.planVO.planSdate}"></td>
                    <td><input type="date" value="${ord.planVO.planEdate}"></td>
                </tr>`;
        }else{
            node += `<td>${ord.colOrdVO.slsOrdHdNo}</td>
                    <td>${ord.planVO.finPrdCdCode}</td>
                    <td>${ord.planVO.finPrdCdName}</td>
                    <td>${ord.colOrdVO.slsOrdDtlDlvDate}</td>
                    <td>${ord.colOrdVO.slsOrdDtlVol}</td>
                    <td>${ord.planVO.planPreVol}</td>
                    <td>${ord.colOrdVO.slsOrdDtlVol-ord.planVO.planPreVol}</td>
                    <td>${ord.planVO.planProdVol}</td>
                    <td><input type="date" value="${ord.planVO.planSdate}"></td>
                    <td><input type="date" value="${ord.planVO.planEdate}"></td>
                </tr>`
        }
        $("#planManageTable tbody").append(node);
    }

});