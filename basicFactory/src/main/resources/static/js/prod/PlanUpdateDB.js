var now_utc = Date.now() // 지금 날짜를 밀리초로
// getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
var timeOff = new Date().getTimezoneOffset()*60000; // 분단위를 밀리초로 변환
// new Date(now_utc-timeOff).toISOString()은 '2022-05-11T18:09:38.134Z'를 반환
var today = new Date(now_utc-timeOff).toISOString().split("T")[0];
var prev7Days = new Date(now_utc - timeOff - 6*24*60*60*1000).toISOString().split("T")[0];


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
    //planDate에 today 설정
    $("#planDate").val(today);
    $("#planDate").attr("disabled",true);
    let empId = $("#empid").val();

    //input 수정 이벤트
    $("#form input").change(function(){
        let modifyAddFlag = checkModifyOrAdd();
        if(modifyAddFlag){
            let priKey = $("#planHdCode").val();
           let updCol = $(this).attr("name");
           let updCont = $(this).val();
           let up = [priKey, updCol, updCont];
            for(mod of hdModifyList){
                if(mod[0] == priKey && mod[1] == updCol){
                    mod[2] = updCont;
                    return false;
                }
            }

           hdModifyList.push(up);
           console.log(hdModifyList);
        }
    });

    $("input").on("click",function(){
        let inputInfo = $(this);
        //header의 border 선택할 때
        if(inputInfo.hasClass("border-danger")){
            inputInfo.removeClass("border-danger");
        }
    });

    //td 수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let tdInfo = $(this);
        let col = tdInfo.index();
        let flag = false;
        let defaultVal = tdInfo.text();

        //저장을 한 번해서 공백이라고 경고 border가 띄워진거에 포커스 오면 해당 클래스 삭제
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }

        //작업계획 시작일자, 종료일자 비교
        if(tdInfo.children("input").length == 1){
            let inputInfo = tdInfo.find("input");
            //시작일자
            if(tdInfo.next().children("input").length == 1){
                console.log(tdInfo.next().find("input").val());
                let edate = tdInfo.next().find("input").val();
                if(edate != null && edate != ''){
                    inputInfo.attr("max",edate);
                }else{
                    inputInfo.attr("max",'');
                }
            }else{
                //종료일자
                let sdate = tdInfo.prev().find("input").val();
                if(sdate != null && sdate != ''){
                    inputInfo.attr("min",sdate);
                }else{
                    inputInfo.attr("min",today);
                }
            }
        }


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
        tdInfo.addClass("tdBorder");
        tdInfo.focus();

        //enter나 esc 누르면 blur되도록
        tdInfo.on("keyup",function(key){
            if(key.keyCode == 13 || key.keyCode == 27){
                key.preventDefault();
                tdInfo.blur();
            }
        });

        //td에 blur가 되면
        tdInfo.unbind("blur").bind("blur",function(e){
            e.preventDefault();
            tdInfo.attr("contenteditable","false")
                    .removeClass("tdBorder");
            //not null이어야하는 값은 null이 되면 이전에 입력한 값으로 돌려놓게 setting
            if(tdInfo.text() == null || tdInfo.text() == ''){
                for(idx of notNullList){
                    if(col == idx){
                        //빈 값이면 notNull검사
                        tdInfo.text(defaultVal);
                        return false;
                    }
                }
            }
            //계획량이 주문량보다 클 때 경고
            let notPlanVol = tdInfo.closest("tr").find("td:eq(7)").text();
            if(col == 8){
                let txt = tdInfo.text();
                let parseIntVol = parseInt(txt);
                if(!$.isNumeric(parseIntVol)){
                    //txt가 숫자가 아니면
                    tdInfo.text('');
                    return false;
                }else if($.isNumeric(parseIntVol) && txt != parseIntVol){
                    //txt가 숫자와 문자가 섞여있으면
                    tdInfo.text(parseIntVol);
                }

                if(notPlanVol != null && notPlanVol != '' && parseInt(notPlanVol) < parseInt(tdInfo.text())){
                    Swal.fire({
                        icon: "error",
                        title: "미계획량보다 계획량이 큽니다",
                        text: "다시 입력해주세요"
                    });
                    tdInfo.text(defaultVal);
                    return false;
                }
            }
            if(col == 8 && notPlanVol != null && notPlanVol != ''){
                
                
            }
            //주문번호 참고해오면
            //미계획량 : notPlanVol
            
            if(checkModifyOrAdd()){
                tdInfo.trigger("change");
            }
            e.stopPropagation();
        });

    });


    table.find("tbody").on("change","td:not(:first-child)",function(e){
        e.preventDefault();
        let flag = checkModifyOrAdd();
        //수정모드가 아니거나 tr의 대상이 addTr이라면
        if(!flag || $(this).parent().attr("class") =='addTr'){
            return false;
        }
        let col = $(this).index();
        let priKey = $(this).closest('tr').find("input[name='planIdx']").val();
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
    }

    function exNull(st){
        return st == null || st == '';
    }
    //저장 버튼 이벤트
    $("#saveBtn").on("click",function(){
        Swal.fire({
            icon: "question",
            title: "저장하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            closeOnClickOutside: false,
          }).then((result) =>{
            if(result.isConfirmed){
                addList = $("#planManageTable tbody").find(".addTr");
                let planName = $("#planName").val();
                let trs = $("#planManageTable tbody tr");
                let modifyAddFlag = checkModifyOrAdd();
                //생산계획명 검사
                if(trs.length == 0 && !modifyAddFlag){
                    Swal.fire({
                        icon: "warning",
                        title: "저장할 생산계획내역이 존재하지 않습니다",
                        text: "확인 후 다시 저장해주세요"
                    });
                    return false;
                }else if(exNull(planName)){
                    $("#planName").addClass("border-danger");
                    Swal.fire({
                        icon: "warning",
                        title: "생산계획명이 비었습니다",
                        text: "확인 후 다시 저장해주세요"
                    });
                    return false;
                }
                
                //추가인지 수정인지 확인
                if(modifyAddFlag){
                    //수정
                    //tr의 null 검사
                    addList = table.find("tbody .addTr");
                    if(forNull()){
                        return false;
                    };

                    let countTr = table.find("tbody tr").length;
                    if(countTr == 0){
                        //헤더 삭제 ajax
                        //tbody 안에 내용이 없으면 헤더 삭제
                        let planHdCode = $("#planHdCode").val();
                        deleteHdSaveAjax(planHdCode);
                        Swal.fire({
                            icon: "success",
                            title: "삭제가 완료되었습니다",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "확인",
                            closeOnClickOutside: false,
                        }).then((result) =>{
                            location.reload();
                        });
                        return false;
                    }else{
                        //detail 삭제용
                        if(delList.length != 0){
                            deleteSaveAjax(delList);
                        }
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
                }else{
                    //추가
                    let empid = $("#empid").val();
                    addList = table.find("tbody tr");
                    if(exNull(empid)){
                        $("#empid").addClass("border-danger");
                        Swal.fire({
                            icon: "warning",
                            title: "담당자 아이디가 비었습니다",
                            text: "확인 후 다시 저장해주세요"
                        });
                        return false;
                    }
                    //tr의 null 검사
                    if(forNull()){
                        return false;
                    };

                    addSaveAjaxWithHd();
                }

                Swal.fire({
                    icon: "success",
                    title: "저장이 완료되었습니다",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인",
                    closeOnClickOutside: false,
                }).then((result) =>{
                    location.reload();
                });
           }else{
            return;
           }
          });
        
    });

    function forNull(){
        let flag = false;
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
                    $(td).addClass("nullTd");
                    flag = true;
                }
            }
        }
        if(flag){
            Swal.fire({
                icon: "error",
                title: "비어있는 데이터가 존재합니다",
                text: "확인하고 다시 저장해주세요"
              });
            return true;
        }else{
            return false;
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
                <td class="finPrdCdCode canModifyTd"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="canModifyTd"></td>
                <td class="canModifyTd"><input type="date" min=${today}></td>
                <td class="canModifyTd"><input type="date" min=${today}></td>
                <td class="canModifyTd"></td>
                </tr>`
        $("#planManageTable tbody").append(node);
    });

    function addSaveAjax(obj){
        let planHdCode = $("#planHdCode").val();
        let finPrdCdCode = $(obj).find("td:eq(2)").text();
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
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
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
        let slsOrdHdNo = null;
        for(obj of addList){
            let finPrdCdCode = $(obj).find("td:eq(2)").text();
            let planProdVol = $(obj).find("td:eq(8)").text();
            let planSdate = $(obj).find("td:eq(9) input").val();
            let planEdate = $(obj).find("td:eq(10) input").val();
            let planRemk = $(obj).find("td:eq(11)").text();
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
                    let priKey = tr.find("input[name='planIdx']").val();
                    delList.push(priKey);
                    for(let i = 0; i< modifyList.length; i++){
                        if(modifyList[i][0]== priKey){
                            modifyList.splice(i,1);
                        }
                    }
                }
                tr.remove();
            }
            
        });
        //내부에 내용이 없으면 allCheck 해제
        if(table.find("tbody tr").length==0){
            $("#allCheck").prop("checked",false);
        }
    });

    function deleteSaveAjax(delList){
        $.ajax({
            url : 'planManage/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                delList
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
            contentType: "application/json; charset=UTF-8;",
            data : JSON.stringify({
                planHdCode
            }),
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

    //미계획 주문내역 tr 클릭 이벤트
    $("#findNotDoneOrdTable").on("click","tr",function(){
        let trInfo = $(this);
        let slsOrdHdNo = $(this).find("td:eq(1)").text();
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
        let planHdCode = trInfo.find("td:eq(1)").text();
        //테이블 삽입
        $.ajax({
            url : 'myPlanView/dtl',
            method : 'GET',
            data : {
                planHdCode
            },
            success : function(result){
                sucFun(result,"plan",trInfo);
                hdModifyList = [];
            }
        })
    });

    function sucFun(result,type,trInfo){

        if($("#planManageTable tbody").children().length != 0){
            Swal.fire({
                icon: "question",
                title: "수정한 정보가 모두 사라집니다.",
                text: "삭제하고 진행하겠습니까?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                closeOnClickOutside: false,
              }).then((ans) =>{
                if(ans.isConfirmed){
                    changeTbody(result,type,trInfo);
                }else{
                    return;
                }
            });
        }else{
            changeTbody(result,type,trInfo);
        }

    }

    function changeTbody(result,type,trInfo){
        let modifyAddflag;
        if($("#form").hasClass("myPlan")){
            modifyAddflag = true;
        }else{
            modifyAddflag = false;
        }
        //칸에 아무것도 없으면 유지,
        //칸에 뭐가 있는데
        //1. 수정이면 readonly true
        
        if(type == 'plan'){
            $("#form").addClass("myPlan");
            //바꿀게 수정일 때
            $("#empid").attr("disabled",true);

            let planHdCode = trInfo.find("td:eq(1)").text();
            let planHdDate = trInfo.find("td:eq(0)").text();
            let planHdName = trInfo.find("td:eq(2)").text();
            let planRemk = trInfo.find("td:last").text();
            let empId = trInfo.find("td:eq(3)").text();

            $("#planHdCode").val(planHdCode);
            $("#planDate").val(planHdDate);
            $("#planName").val(planHdName);
            $("#planRemk").val(planRemk);
            $("#empid").val(empId);
        }else if(type =='order'){
            $("#form").removeClass("myPlan");

            //바꿀게 주문일때
            if(modifyAddflag){
                $("#planHdCode").val('');
                $("#planDate").val(today);
                $("#planName").val('');
                $("#planRemk").val('');
                $("#empid").val(empId);
            }
            $("#empid").attr("disabled",false);
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
            <td class="canModifyTd"></td>
            <td class="canModifyTd"><input type="date" min=${today}></td>
            <td class="canModifyTd"><input type="date" min=${today}></td>
            <td class="canModifyTd"></td>
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
                node += `<td class="finPrdCdCode canModifyTd">${ord.planVO.finPrdCdCode}</td>`
            }else{
                node += `<td>${ord.planVO.finPrdCdCode}</td>`
            }

            node +=`<td>${ord.planVO.finPrdCdName}</td>
                    <td>${slsOrdDtlDlvDate}</td>
                    <td>${slsOrdDtlVol}</td>
                    <td>${planPreVol}</td>
                    <td>${planNoVol}</td>`
        }
        node += `<td class="canModifyTd">${ord.planVO.planProdVol}</td>
                <td class="canModifyTd"><input type="date" value="${ord.planVO.planSdate}" min=${today}></td>
                <td class="canModifyTd"><input type="date" value="${ord.planVO.planEdate}" min=${today}></td>
                <td class="canModifyTd">${ord.planVO.planRemk}</td>
                <input type="hidden" name="planIdx" value="${ord.planVO.planIdx}">
            </tr>`;
        $("#planManageTable tbody").append(node);
    }

    function checkModifyOrAdd(){
        if($("#form").hasClass("myPlan")){
            //form에 myPlan class가 있으면 수정할 수 있음
            return true;
        }else{
            return false;
        }
    }

});