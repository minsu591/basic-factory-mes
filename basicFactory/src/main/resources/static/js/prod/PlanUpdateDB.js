$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let hdModifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#planManageTable");
    //td 수정을 적용할 인덱스
    let avArr = [8,11];
    //notNull이어야하는 idx
    let notNullList = [2,8,9,10];


    //input 수정 이벤트
    $("#form input").change(function(){
        let modifyAddFlag = checkModifyOrAdd();
        if(modifyAddFlag){
            let priKey = $("#planHdCode").val();
           let updCol = $(this).attr("name");
           let updCont = $(this).val();
           console.log(priKey);
           console.log(updCol);
           console.log(updCont);
           let up = [priKey, updCol, updCont];
           hdModifyList.push(up);
           console.log(hdModifyList);
        }
    });

    //td 수정 이벤트
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
                if(checkModifyOrAdd()){
                    tdInfo.trigger("change");
                }
            }
            e.stopPropagation();
        });

    });


    table.find("tbody").on("change","td:not(:first-child)",function(e){
        e.preventDefault();
        let flag = checkModifyOrAdd();
        if(!flag || $(this).parent().attr("class") =='addTr'){
            return false;
        }
        let col = $(this).index();
        let priKey = $(this).closest('tr').find("input[class='planIdx']").val();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;
        if($(this).find("input[type=date]").length == 1){
            updCont = $(this).find("input[type=date]").val();
        }else{
            updCont = $(this).text();
        }
        checkNewModify(priKey,updCol,updCont);
        return;
    })

    function checkNewModify(priKey,updCol,updCont){
        for(p of modifyList){
            if(p[0] == priKey && p[1] == updCol){
                p[2] = updCont
                return;
            }
        }
        let modifyTr = [priKey,updCol,updCont];
        modifyList.push(modifyTr);
        console.log(modifyList);
    }

    function exNull(st){
        return st == null || st == '';
    }
    //저장 버튼 이벤트
    $("#saveBtn").on("click",function(){
        if(confirm("저장하시겠습니까?")==true){
            //추가인지 수정인지 확인
            let modifyAddFlag = checkModifyOrAdd();
            addList = $("#planManageTable tbody").find(".addTr");
            if(modifyAddFlag){
                //수정
                if(exNull(planName)){
                    alert('헤더에 공백이 존재합니다. 확인 후 다시 저장해주세요.');
                    return false;
                }
                //tr의 null 검사
                if(forNull()){
                    return false;
                };

                
                let countTr = table.find("tbody tr").length;
                if(countTr == 0){
                    //헤더 삭제 ajax
                    let planHdCode = $("#planHdCode").val();
                    deleteHdSaveAjax(planHdCode);
                    return false;
                }else{
                    //detail 삭제용
                    for(planIdx of delList){
                        deleteSaveAjax(planIdx);
                    }
                    //헤더 수정용
                    for(obj of hdModifyList){
                        modifyHdSaveAjax(obj);
                    }
                    //detail 수정용
                    for(obj of modifyList){
                        modifySaveAjax(obj);
                    }
                    //detail 추가용
                    for(obj of addList){
                        addSaveAjax(obj);
                    }
                }
                
            }else{
                //추가
                let planDate = $("#planDate").val();
                let empid = $("#empid").val();
                if(exNull(planDate) || exNull(empid)){
                    alert('헤더에 공백이 존재합니다. 확인 후 다시 저장해주세요.');
                    return false;
                }
                //tr의 null 검사
                if(forNull()){
                    return false;
                };

                addSaveAjaxWithHd();
            }

            alert("저장이 완료되었습니다.");
            //location.reload();
        }
    });

    function forNull(){
        let trs = table.find("tbody tr");
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
                    return true;
                }
            }
        }
    }
    function modifySaveAjax(obj){
        //checkbox인거
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'planManage/update',
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

    function modifyHdSaveAjax(obj){
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'planManage/hd/update',
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
        let node = `<tr class="addTr">
                    <td><input type="checkbox" name="chk"></td>`;
        //allCheck의 체크박스가 체크되어있으면 추가되는 행도 체크된 채로 나오기
        if($("#allCheck").is(":checked")){
            node = `<tr class="addTr">
                    <td><input type="checkbox" name="chk" checked></td>`
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
                <td></td>
                </tr>`
        $("#planManageTable tbody").append(node);
    });

    function addSaveAjax(obj){
        let planHdCode = $("#planHdCode").val();
        let finPrdCdCode = $(obj).find("td:eq(2)").text();
        console.log(finPrdCdCode);
        let planPreVol = $(obj).find("td:eq(6)").text();
        if(planPreVol == ''){
            planPreVol = null;
        }
        let planProdVol = $(obj).find("td:eq(8)").text();
        let planSdate = $(obj).find("td:eq(9) input[type='date']").val();
        let planEdate = $(obj).find("td:eq(10) input[type='date']").val();
        let planRemk = $(obj).find("td:eq(11)").text();
        
        $.ajax({
            url : 'planManage/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/json; charset=UTF-8;",
            data : {
                planHdCode,
                finPrdCdCode,
                planPreVol,
                planProdVol,
                planSdate,
                planEdate,
                planRemk
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }
    function addSaveAjaxWithHd(){
        //세부plan 저장
        let plans =[];
        let addList = table.find("tbody tr");
        let slsOrdHdNo = null;
        for(obj of addList){
            let finPrdCdCode = $(obj).find("td:eq(2)").text();
            let planProdVol = $(obj).find("td:eq(8)").text();
            let planSdate = $(obj).find("td:eq(9) input").val();
            let planEdate = $(obj).find("td:eq(10) input").val();
            let planRemk = $(obj).find("td:eq(2)").text();
            let planPreVol = $(obj).find("td:eq(6)").text();

            let slsOrdHdNoForPlan = $(obj).find("td:eq(1)").text();
            if(slsOrdHdNoForPlan == null || slsOrdHdNoForPlan == ''){
                planPreVol = null;
            }else{
                slsOrdHdNo = slsOrdHdNoForPlan;
            }
            let plan = {
                finPrdCdCode,
                planProdVol,
                planSdate,
                planEdate,
                planRemk,
                planPreVol
            }
            plans.push(plan);
        }
        //헤더 정보 저장
        let planHdName = $("#planName").val();
        let empId = $("#empid").val();
        let planHdDate = $("#planDate").val();
        let planHdRemk = $("#planRemk").val();
        let planHdVO = {
            planHdName,
            slsOrdHdNo,
            empId,
            planHdDate,
            planHdRemk,
        }
        $.ajax({
            url : 'planManage/hd/insert',
            type : 'POST',
            dataType : 'text',
            data : JSON.stringify({
                planHdVO,
                plans
            }),
            contentType : 'application/json; charset=UTF-8'
            ,
            success : function(result){
                console.log(result);
                if(plans.length == result){
                    console.log("추가 성공");
                }
            }
        })
    }


    //추가 끝


    //선택 삭제 이벤트
    $("#deleteBtn").on("click",function(){
        //수정 중인지 추가 중인지 확인
        let flag = checkModifyOrAdd();
        table.find("tbody input:checkbox[name='chk']").each(function(idx,el){
            let tr = $(el).closest('tr');
            if($(el).is(":checked")){
                if(flag && tr.attr('class') !='addTr'){
                    //수정 중일 때
                    let priKey = tr.find("input[class='planIdx']").val();
                    delList.push(priKey);
                    for(let i = 0; i< modifyList.length; i++){
                        if(modifyList[i][0]== priKey){
                            modifyList.splice(i,1);
                        }
                    }
                }
                tr.remove();
                console.log(delList);
            }
            
        });
        //내부에 내용이 없으면 allCheck 해제
        if(table.find("tbody tr").length==0){
            $("#allCheck").prop("checked",false);
        }
    });

    function deleteSaveAjax(planIdx){
        $.ajax({
            url : 'planManage/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                planIdx
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

    function deleteHdSaveAjax(planHdCode){
        $.ajax({
            url : 'planManage/hd/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                planHdCode
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

    //미계획 주문내역 tr 클릭 이벤트
    $("#findNotDoneOrdTable").on("click","tr",function(){
        let trInfo = $(this);
        let slsOrdHdNo = $(this).find("td:eq(0)").text();
        $.ajax({
            url : 'notDoneOrd/dtl',
            method : 'GET',
            data : {
                slsOrdHdNo
            },
            dataType : "json",
            success : function(result){
                sucFun(result,"order",trInfo);
            }
        })
    });

    //내 계획 tr 클릭 이벤트
    $("#findMyPlanTable").on("click","tr", function(){
        //테이블 상단 공통 요소 삽입
        let trInfo = $(this);
        let planCode = trInfo.find("td:eq(0)").text();
        //테이블 삽입
        $.ajax({
            url : 'myPlanView/dtl',
            method : 'GET',
            data : {
                planCode
            },
            success : function(result){
                sucFun(result,"plan",trInfo);
                hdModifyList = [];
            }
        })
    });

    function sucFun(result,type,trInfo){
        let modifyAddflag;
        if($("#planDate").is("[readonly]")){
            modifyAddflag = true;
        }else{
            modifyAddflag = false;
        }
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
            //칸에 아무것도 없으면 유지,
            //칸에 뭐가 있는데
            //1. 수정이면 readonly true
            
            if(type == 'plan'){
                //바꿀게 수정일 때
                $("#planDate").attr("readonly",true);
                $("#empid").attr("readonly",true);

                let planHdCode = trInfo.find("td:eq(0)").text();
                let planHdDate = trInfo.find("td:eq(3)").text();
                let planHdName = trInfo.find("td:eq(1)").text();
                let planRemk = trInfo.find("td:last").text();
                let empId = trInfo.find("td:eq(4)").text();

                $("#planHdCode").val(planHdCode);
                $("#planDate").val(planHdDate);
                $("#planName").val(planHdName);
                $("#planRemk").val(planRemk);
                $("#empid").val(empId);
            }else if(type =='order'){
                //바꿀게 주문일때
                if(modifyAddflag){
                    $("#planHdCode").val('');
                    $("#planDate").val('');
                    $("#planName").val('');
                    $("#planRemk").val('');
                    $("#empid").val('');
                }
                $("#planDate").attr("readonly",false);
                $("#empid").attr("readonly",false);
            }
            

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
            <td><input type="checkbox" name="chk"></td>
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
            <td>${ord.planRemk}</td>
        </tr>`
        $("#planManageTable tbody").append(node);
    }
    
    //생산계획 조회 모달을 통한 데이터 출력
    function ordMakeRowForPlan(ord){
        let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>`;
        if(ord.colOrdVO.slsOrdHdNo == null){
            node += `<td></td>
                    <td class="finPrdCdCode">${ord.planVO.finPrdCdCode}</td>
                    <td>${ord.planVO.finPrdCdName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>`;
        }else{
            let slsOrdDtlDlvDate = ord.colOrdVO.slsOrdDtlDlvDate;
            let slsOrdDtlVol = ord.colOrdVO.slsOrdDtlVol;
            let planPreVol = ord.planVO.planPreVol;
            let planNoVol = ord.colOrdVO.slsOrdDtlVol - ord.planVO.planPreVol;
            let slsOrdHdNo = ord.colOrdVO.slsOrdHdNo;
            if(slsOrdDtlDlvDate == null || slsOrdDtlVol == null || planPreVol == null){
                slsOrdDtlDlvDate = '';
                slsOrdHdNo = '';
                slsOrdDtlVol = '';
                planPreVol = '';
                planNoVol = '';
            }
            node += `<td>${slsOrdHdNo}</td>`
            if(slsOrdHdNo == null || slsOrdHdNo == ''){
                node += `<td class="finPrdCdCode">${ord.planVO.finPrdCdCode}</td>`
            }else{
                node += `<td>${ord.planVO.finPrdCdCode}</td>`
            }

            node +=`<td>${ord.planVO.finPrdCdName}</td>
                    <td>${slsOrdDtlDlvDate}</td>
                    <td>${slsOrdDtlVol}</td>
                    <td>${planPreVol}</td>
                    <td>${planNoVol}</td>`
        }
        node += `<td>${ord.planVO.planProdVol}</td>
                <td><input type="date" value="${ord.planVO.planSdate}"></td>
                <td><input type="date" value="${ord.planVO.planEdate}"></td>
                <td>${ord.planVO.planRemk}</td>
                <input type="hidden" class="planIdx" value="${ord.planVO.planIdx}">
            </tr>`;
        $("#planManageTable tbody").append(node);
    }

    function checkModifyOrAdd(){
        if($("#planDate").is("[readonly]")){
            return true;
        }else{
            return false;
        }
    }

});