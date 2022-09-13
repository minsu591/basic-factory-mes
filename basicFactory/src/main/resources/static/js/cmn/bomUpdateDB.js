$("document").ready(function(){
    //수정
    //수정될거 저장하는 list 정의
    let bomModifyList = [];
    let bomAddList = [];
    let bomDelList = [];

    let rscModifyList = [];
    let rscAddList = [];
    let rscDelList = [];
    //수정할 테이블
    let bomTable = $("#bomTable");
    let rscTable = $("#bomRscTable");
    //td 수정을 적용할 인덱스
    let bomAvArr = [2,7,8,10];
    let rscAvArr = [7];
    //notNull이어야하는 idx
    let bomNotNullList = [2,3,5,7,8];
    let rscNotNullList = [1,3,5,7];
    //primary키인 index
    let bomPriKeyIdx = 1;

    //수정 이벤트
    bomTable.find("tbody").on("click","td:not(:first-child)",function(){
        let tdInfo = $(this);
        modifyTdEvent(tdInfo);
    });
    rscTable.find("tbody").on("click","td:not(:first-child)",function(){
        let tdInfo = $(this);
        modifyTdEvent(tdInfo);
    });

    function modifyTdEvent(tdInfo){
        console.log(tdInfo);
        let col = tdInfo.index();
        let flag = false;
        let defaultVal;
        let avArr;
        let notNullList;
        if(tdInfo.closest('table').attr('id') == 'bomTable'){
            avArr = bomAvArr;
            notNullList = bomNotNullList;
        }else{
            col -=2;
            avArr = rscAvArr;
            notNullList = rscNotNullList;
        }

        //기존에 있는 border class 전부 삭제
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }
        if(tdInfo.hasClass("sameTd")){
            tdInfo.removeClass("sameTd");
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
        tdInfo.focus();
        //td에 focus가 되면
        defaultVal = tdInfo.text();
        tdInfo.addClass("tdBorder");

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
                        tdInfo.text(defaultVal);
                        break;
                    }
                }
            }
            
            if(!tdInfo.hasClass("bomAddTr") && !tdInfo.hasClass("rscAddTr")){
                console.log("change");
                tdInfo.trigger("change");
            }
        });
    }
   
    
    //기존에 있는 값들 중에 bom의 수정이 일어날 때
    bomTable.find("tbody td:not(:first-child)").change(function(e){
        let col = $(this).index();
        let table = $(this).closest('table');
        let priKey = $(this).parent().find("td:eq("+bomPriKeyIdx+")").text();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;

        if(col == 9){
            //checkbox일 때
            if($(this).find("input[type='checkbox']").is(":checked")){
                updCont = 1;
            }else{
                updCont = 0;
            }
        }else{
            updCont = $(this).text();
        }
        checkNewModify(priKey,updCol,updCont,'bomTable');
        return;
    });

    //필요 자재 목록의 수정이 일어날 때
    rscTable.find("tbody").on("change","td:not(:first-child)",function(e){
        let bomRscIdx = $(this).parent().find("input[class='bomRscIdx']").val();
        let col = $(this).index()-2;
        let updCol = rscTable.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;
        if(col == 1){
            updCont = $(this).closest('tr').find("input[class='lineCdCode']").val();
        }else{
            updCont = $(this).text();
        }
        checkNewModify(bomRscIdx,updCol,updCont,'rscTable');
        return;
    })

    function checkNewModify(priKey,updCol,updCont,type){
        let modifyList;
        if(type == 'bomTable'){
            modifyList = bomModifyList;
        }else if (type=='rscTable') {
            modifyList = rscModifyList;
        }
        for(p of modifyList){
            if(p[0] == priKey && p[1] == updCol){
                p[2] = updCont
                return;
            }
        }
        let modifyTr = [priKey,updCol,updCont];
        modifyList.push(modifyTr);
        return;
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
            cancelButtonText: "취소"
          }).then((result) =>{
            if(result.isConfirmed){
                let flag = examineTr();
                if(flag){
                    return false;
                };
                //삭제용
                if(bomDelList.length != 0){
                    bomDeleteSaveAjax(bomDelList);
                }
                if(rscDelList.length != 0){
                    rscDeleteSaveAjax(rscDelList);
                }
                //수정용
                for(obj of bomModifyList){
                    bomModifySaveAjax(obj);
                }
                for(obj of rscModifyList){
                    rscModifySaveAjax(obj);
                }

                
                bomAddList = bomTable.find(".bomAddTr");
                rscAddList = rscTable.find(".rscAddTr");
                let insertFlag = bomAllInsert();
                if(insertFlag){
                    return false;
                }

                Swal.fire({
                    icon: "success",
                    title : "저장이 완료되었습니다."
                    }).then(function(){
                        location.reload();
                    });
            }
        });
    });

    function exNull(st){
        return st == null || st == '';
    }

    function examineTr(){
        let bomTrs = bomTable.find("tbody tr");
        let rscTrs = rscTable.find("tbody tr");
        let bomNullFlag = false;
        let rscNullFlag = false;
        let alertBomNameSameFlag = false;
        let alertFinSameFlag = false;
        let alertLineSameFlag = false;

        //null 검사
        let finList = [];
        let lineList = [];
        let bomNameList = [];
        for(tr of bomTrs){
            //기존 라인코드와 동일하지 않은 건에 대해

            let bomUseCheck = $(tr).find("input[class='bomCdUse']").is(":checked");
            for(idx of bomNotNullList){
                let tdInfo = $(tr).find("td:eq("+idx+")");
                let content = tdInfo.text();
                //기존에 있는 border class 전부 삭제
                if(tdInfo.hasClass("nullTd")){
                    tdInfo.removeClass("nullTd");
                }
                if(tdInfo.hasClass("sameTd")){
                    tdInfo.removeClass("sameTd");
                }

                //특정 td값이 공백일 때,
                if(content == null || content == ''){
                    tdInfo.addClass("nullTd");
                    bomNullFlag = true;
                
                }else if(idx == 2){
                    let bomName = $(tr).find("td:eq(2)").text();
                    let bomNameSameFlag = true;
                    if(bomNameList.length == 0){
                        bomNameList.push(bomName);
                    }else{
                        for(let i = 0; i<bomNameList.length;i++){
                            if(bomNameList[i] == bomName){
                                if(!$(bomTrs[i]).find("td:eq("+idx+")").hasClass("sameTd")){
                                    $(bomTrs[i]).find("td:eq("+idx+")").addClass("sameTd");
                                }
                                tdInfo.addClass("sameTd");
                                bomNameSameFlag = false;
                                alertBomNameSameFlag = true;
                                break;
                            }
                        }
                        if(bomNameSameFlag){
                            bomNameList.push(bomName);
                        }
                    }
                    

                }else if(bomUseCheck && idx == 3){//특정 td값이 공백이 아닐 때,
                    //완제품코드 중복 검사
                    let finCode = $(tr).find("td:eq(3)").text();
                    let finSameFlag = false;
                    if(finList.length == 0){
                        finList.push(finCode);
                    }else{
                        for(let i = 0; i<finList.length;i++){
                            if(finList[i] == finCode){
                                //원본 sameTd 주기
                                if(!$(bomTrs[i]).find("td:eq("+idx+")").hasClass("sameTd")){
                                    $(bomTrs[i]).find("td:eq("+idx+")").addClass("sameTd");
                                }
                                tdInfo.addClass("sameTd");
                                finSameFlag = true;
                                alertFinSameFlag = true;
                                break;
                            }
                        }
                        if(!finSameFlag){
                            finList.push(finCode);
                        }
                    }
                    
                }else if(bomUseCheck && idx == 5){
                    let lineCode = $(tr).find("td:eq(5)").text();
                    let lineSameFlag = false;
                    //라인코드 중복 검사
                    if(lineList.length == 0){
                        lineList.push(lineCode);
                    }else{
                        for(let i =0; i<lineList.length; i++){
                            if(lineList[i] == lineCode){
                                //원본 sameTd 주기
                                if(!$(bomTrs[i]).find("td:eq("+idx+")").hasClass("sameTd")){
                                    $(bomTrs[i]).find("td:eq("+idx+")").addClass("sameTd");
                                }
                                tdInfo.addClass("sameTd");
                                lineSameFlag = true;
                                alertLineSameFlag = true;
                                break;
                            }
                        }
                        if(!lineSameFlag){
                            lineList.push(lineCode);
                        }
                    }
                }
            }
        }

        //rsc null 검사
        
        for(tr of rscTrs){
            for(idx of rscNotNullList){
                let tdInfo = $(tr).find("td:eq("+idx+")");
                let content = tdInfo.text();
                //기존에 있는 border class 전부 삭제
                if(tdInfo.hasClass("nullTd")){
                    tdInfo.removeClass("nullTd");
                }

                if(content == null || content == ''){
                    tdInfo.addClass("nullTd");
                    rscNullFlag = true;
                }
            }
        }

        if(bomNullFlag || rscNullFlag){
            Swal.fire({
                icon: "error",
                title: "비어있는 데이터가 존재합니다",
                text: "확인하고 다시 저장해주세요"
            });
            return true;
        }else if(alertBomNameSameFlag){
            Swal.fire({
                icon: "error",
                title: "BOM명이 중복되는 요소가 존재합니다"
            });
            return true;
        }else if(alertFinSameFlag){
            Swal.fire({
                icon: "error",
                title: "사용가능한 BOM 중에 완제품코드가 중복되는 요소가 존재합니다"
            });
            return true;
        }else if(alertLineSameFlag){
            Swal.fire({
                icon: "error",
                title: "사용가능한 BOM 중에 라인코드가 중복되는 요소가 존재합니다."
            });
            return true;
        }


        //사용여부가 체크된 것 중에
        //bom 코드 완제품코드와 라인코드가 동일하거나 || 라인코드가 겹치거나 || 완제품코드가 겹치는게 있다면 저장 불가
        
    }

    function bomModifySaveAjax(obj){
        //checkbox인거
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'bomCode/update',
            type :"POST",
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                priKey,
                updCol,
                updCont
            },
            success : function(result){
                console.log("업데이트 완료");
            }, error : function(error){
                alert("서버 오류 : " + error);
            }
        })
    }

    function rscModifySaveAjax(obj){
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'bomRsc/update',
            type :"POST",
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                priKey,
                updCol,
                updCont
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
    //bom 추가 버튼
    $("#bomAddBtn").on("click",function(){
        let node =`<tr class="bomAddTr">`;
        if ($("#bomAllCheck").is(":checked")){
            node += `<td class="cantModifyTd"><input type="checkbox" name="bomCb" checked></td>`;
        }else{   
            node += `<td class="cantModifyTd"><input type="checkbox" name="bomCb"></td>`;
        }
        node +=`<td class="cantModifyTd"></td>
                <td></td>
                <td class="finPrdCdCode"></td>
                <td class="cantModifyTd"></td>
                <td class="lineCdHdCode"></td>
                <td class="cantModifyTd"></td>
                <td></td>
                <td></td>
                <td><input type="checkbox" class="bomCdUse"></td>
                <td></td>
            </tr>`;
        $("#bomTable tbody").append(node);
    });

    //rsc 추가 버튼
    $("#rscAddBtn").on("click",function(){
        let bomCode = $("#bomCode").val();
        let lineCode = $("#lineCode").val();

        if(exNull(bomCode) && exNull(lineCode)){
            Swal.fire({
                icon: "warning",
                title: "BOM을 선택하고 자재를 추가해주세요",
              });
        }else{
            let node = `<tr class="rscAddTr">
                            <input type="hidden" class="bomRscIdx">
                            <input type="hidden" class="lineCdCode">`
                            
            if ($("#rscAllCheck").is(":checked")){
                node += `<td><input type="checkbox" name="rscCb" checked></td>`;
            }else{
                node += `<td><input type="checkbox" name="rscCb"></td>`;
            }
            node +=`<td class="procCode canModifyTd"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="rscCdCode canModifyTd"></td>
                    <td></td>
                    <td class="canModifyTd"></td>
                    <td></td>
                </tr>`;
            $("#bomRscTable tbody").append(node);
        }
    });

    function bomAllInsert(){
        let bomCdCode = $("#bomCode").val();
        let bomCdName = $("#bomCdName").val();
        let lineCode = $("#lineCode").val();
        let bomAllList = bomTable.find("tbody tr");
        let bomData = null;
        if(bomCdCode == null || bomCdCode == ''){
            for(bom of bomAllList){
                if($(bom).find("td:eq(2)").text() == bomCdName){
                    bomData = bom;
                }
            }
            
        }else{
            //기존에 있는 데이터면 bomCdCode로 찾기
            for(bom of bomAllList){
                if($(bom).find("td:eq(1)").text() == bomCdCode){
                    bomData = bom;
                }
            }
        }
        if($(bomData).find("td:eq(5)").text() != lineCode){
            Swal.fire({
                icon: "error",
                title: "필요 자재 목록의 라인코드와 선택된 BOM코드의 라인코드가 동일하지 않습니다",
                text: "확인하고 다시 저장해주세요"
              });
            return true;
        }
        
        boms = [];
        rscs = [];

        for(obj of bomAddList){
            let bomCdName = $(obj).find("td:eq(2)").text();
            let finPrdCdCode = $(obj).find("td:eq(3)").text();
            let lineCdHdCode = $(obj).find("td:eq(5)").text();
            let bomCdProdVol = $(obj).find("td:eq(7)").text();
            let bomCdUnit = $(obj).find("td:eq(8)").text();
            let bomCdRemk = $(obj).find("td:eq(10)").text();

            let bomCdUse;
            if($(obj).find("td:eq(9) input[type='checkbox']").is(":checked")){
                bomCdUse = 1;
            }else{
                bomCdUse = 0;
            }
            let bom = {
                bomCdName,
                finPrdCdCode,
                lineCdHdCode,
                bomCdProdVol,
                bomCdUnit,
                bomCdUse,
                bomCdRemk,
            }
            boms.push(bom);
        }

        for(obj of rscAddList){
            let bomCdCode = $("#bomCode").val();
            let bomCdName = $("#bomCdName").val();
            let lineCdCode = $(obj).find("input[class='lineCdCode']").val();
            let rscCdCode = $(obj).find("td:eq(5)").text();
            let bomRscUseVol = $(obj).find("td:eq(7)").text();
            let bomRscUnit = $(obj).find("td:eq(8)").text();
            let rsc = {
                bomCdCode,
                bomCdName,
                lineCdCode,
                rscCdCode,
                bomRscUseVol,
                bomRscUnit
            }
            rscs.push(rsc);
        }
        if(bomAddList.length != 0 || rscAddList.length != 0){
            $.ajax({
                url : 'bomCode/insert',
                type : 'POST',
                dataType : 'text',
                contentType: "application/json; charset=UTF-8;",
                data : JSON.stringify({
                    boms,
                    rscs
                }),
                success : function(result){
                    if(result == 1){
                        console.log("추가 성공");
                    }else{
                        console.log("추가 실패");
                    }
                }
            });
        }
    }



    //추가 끝


    //선택 삭제 이벤트
    $("#bomDeleteBtn").on("click",function(){
        $("#bomTable tbody").find("input:checkbox[name='bomCb']").each(function(idx,el){
            let tr = $(el).closest('tr');
            let priKey = tr.find("td:eq("+bomPriKeyIdx+")").text();

            if($(el).is(":checked")){
                tr.remove();
                if(!$(tr).hasClass("bomAddTr")){
                    bomDelList.push(priKey);
                    for(let i = 0; i< bomModifyList.length; i++){
                        if(bomModifyList[i][0]== priKey){
                            bomModifyList.splice(i,1);
                        }
                    }
                }
            }
        });
    });


    $("#rscDeleteBtn").on("click",function(){
        $("#bomRscTable tbody").find("input:checkbox[name='rscCb']").each(function(idx,el){
            let tr = $(el).closest('tr');
            let priKey = tr.find("input[class='bomRscIdx']").val();

            if($(el).is(":checked")){
                tr.remove();
                if(!$(tr).hasClass("rscAddTr")){
                    rscDelList.push(priKey);
                    for(let i = 0; i< rscModifyList.length; i++){
                        if(rscModifyList[i][0]== priKey){
                            rscModifyList.splice(i,1);
                        }
                    }
                }
            }
        });
    });
    

    function bomDeleteSaveAjax(bomDelList){
        $.ajax({
            url : 'bomCode/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                bomDelList
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }
    function rscDeleteSaveAjax(rscDelList){
        $.ajax({
            url : 'bomRsc/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                rscDelList
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }
    //bom tr 클릭
    $("#bomTable tbody").on("click","tr",function(e){
        let bomCode = $(this).find("td:eq(1)").text();
        let bomCdName = $(this).find("td:eq(2)").text();
        let finCode = $(this).find("td:eq(3)").text();
        let lineCode = $(this).find("td:eq(5)").text();
        let prodVol = $(this).find("td:eq(7)").text();
        let prodUnit = $(this).find("td:eq(8)").text();
        let inputBomCode = $("#bomCode").val();
        let trInfo = $(this);


        //현재 bomCode와 선택한 bomCode가 동일하면 변경안되도록
        //bomCode 제외 다 입력 안되어있으면 rsc 입력 못하도록
        if((inputBomCode == bomCode && (!exNull(inputBomCode))) ||
            exNull(bomCdName) || exNull(lineCode) || exNull(finCode) || exNull(prodVol) || exNull(prodUnit)){
            return false;
        }

        if($("#bomRscTable tbody tr").length != 0){
            Swal.fire({
                icon: "question",
                title: "현재 수정한 내용이 모두 삭제됩니다",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인",
                cancelButtonText: "취소"
                }).then((result) =>{
                    if(result.isConfirmed){
                        rscModifyList = [];
                        rscAddList = [];
                        rscDelList = [];
                        $("#bomRscTable tbody tr").remove();

                        $("#bomCode").val(bomCode);
                        $("#bomCdName").val(bomCdName);
                        $("#lineCode").val(lineCode);
                        $("#prodVol").val(prodVol);
                        $("#prodUnit").val(prodUnit);
                        
                        clickBomTr = $(this);
                        if(!exNull(bomCode)){
                            //bomCode가 비어있지 않으면 자재내역 불러오기
                            selectBomRscAjax(trInfo, bomCode);
                        }
                    }else{
                        return false;
                    }
            });
            
        }else{
            $("#bomCode").val(bomCode);
            $("#bomCdName").val(bomCdName);
            $("#lineCode").val(lineCode);
            $("#prodVol").val(prodVol);
            $("#prodUnit").val(prodUnit);
            
            clickBomTr = $(this);
            if(!exNull(bomCode)){
                //bomCode가 비어있지 않으면 자재내역 불러오기
                selectBomRscAjax(trInfo, bomCode);
            }
        }
            
    });


    function selectBomRscAjax(trInfo, bomCode){
        let lineCode = trInfo.find("td:eq(5)").text();
        let orgLineCode = trInfo.find("input[class='dataLineCdHdCode']").val();

        //데이터에 있는 lineCode와 orgLineCode가 동일하지 않으면 출력 X
        if(orgLineCode != lineCode){
            return false;
        }

        $.ajax({
            url : 'bomRsc',
            methods : 'GET',
            data : {
                bomCode : bomCode
            },
            dataType : 'json',
            success : function(result){
                $("#bomRscTable tbody tr").remove();
                
                for(obj of result){
                    rscMakeRow(obj);
                }
                
            }
        })
    }
    
    //db에 존재하는 데이터 가져오기
    function rscMakeRow(obj){
        let node = `<tr>
                    <input type="hidden" class="bomRscIdx" value="${obj.bomRscVO.bomRscIdx}">
                    <input type="hidden" class="lineCdCode" value="${obj.lineCodeVO.lineCdCode}">`;
        if($("#rscAllCheck").is(":checked")){
            node += `<td><input type="checkbox" name="rscCb" checked></td>`
        }else{
            node += `<td><input type="checkbox" name="rscCb"></td>`;
        }
        node+= `<td class="procCode canModifyTd">${obj.lineCodeVO.procCdCode}</td>
                <td>${obj.lineCodeVO.procCdName}</td>
                <td>${obj.lineCodeVO.mchnCode}</td>
                <td>${obj.lineCodeVO.mchnName}</td>
                <td class="rscCdCode canModifyTd">${obj.bomRscVO.rscCdCode}</td>
                <td>${obj.bomRscVO.rscCdName}</td>
                <td class="canModifyTd">${obj.bomRscVO.bomRscUseVol}</td>
                <td>${obj.bomRscVO.bomRscUnit}</td>
                </tr>`;
        $("#bomRscTable tbody").append(node);
    }

 });