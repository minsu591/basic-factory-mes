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
    let bomNotNullList = [2,3,5,7,8,10];
    let rscNotNullList = [1,3,5,7];
    //primary키인 index
    let bomPriKeyIdx = 1;


    //수정 이벤트
    bomTable.find("tbody").on("click","td:not(:first-child)",modifyTdEvent);
    rscTable.find("tbody").on("click","td:not(:first-child)",modifyTdEvent);

    function modifyTdEvent(e){
        let tdInfo = $(this);
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
        });
    }
   
    
    //기존에 있는 값들 중에 bom의 수정이 일어날 때
    bomTable.find("tbody").find("td:not(:first-child)").change(function(e){
        e.preventDefault();
        let table = $(this).closest('table');
        let col = $(this).index();
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
        //추가된 tr(priKey가 없는)은 제외
        if(bomRscIdx == null || bomRscIdx == ''){
            return;
        }
        e.preventDefault();
        let table = $(this).closest('table');
        let col = $(this).index()-2;
        let priKey = bomRscIdx;
        let updCol = table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;
        if(col == 1){
            updCont = $(this).closest('tr').find("input[class='lineCdCode']").val();
        }else{
            updCont = $(this).text();
        }
        checkNewModify(priKey,updCol,updCont,'rscTable');
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
        let bomTrs = bomTable.find("tbody tr");
        let rscTrs = rscTable.find("tbody tr");
        if(confirm("저장하시겠습니까?")==true){
            //null 검사
            for(tr of bomTrs){
                for(idx of bomNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            for(tr of rscTrs){
                for(idx of rscNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            for(priKey of bomDelList){
                bomDeleteSaveAjax(priKey);
            }
            console.log(rscDelList);
            for(priKey of rscDelList){
                rscDeleteSaveAjax(priKey);
            }
            //수정용
            for(obj of bomModifyList){
                bomModifySaveAjax(obj);
            }
            for(obj of rscModifyList){
                rscModifySaveAjax(obj);
            }
            //추가용
            bomAddList = bomTable.find("tr[name='addTr']");
            for(obj of bomAddList){
                bomAddSaveAjax(obj);
            }

            rscAddList = rscTable.find("tr[name='addTr']");
            for(obj of rscAddList){
                let bomCode = $("#bomCode").val();
                rscAddSaveAjax(bomCode,obj);
            }

            alert("저장이 완료되었습니다.");
            location.reload();
        }
    });

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
    //bom 추가 버튼
    $("#bomAddBtn").on("click",function(){
        let node =`<tr name="addTr">`;
        if ($("#bomAllCheck").is(":checked")){
            node += `<td><input type="checkbox" name="bomCb" checked></td>`;
        }else{   
            node += `<td><input type="checkbox" name="bomCb"></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"></td>
                <td></td>
            </tr>`;
        $("#bomTable tbody").append(node);
    });

    //rsc 추가 버튼
    $("#rscAddBtn").on("click",function(){
        if($("#bomCode").val() == ''){
            alert("bom을 선택하고 자재를 추가해주세요.");
        }else{
            let node = `<tr name="addTr">
                            <input type="hidden" class="bomRscIdx">
                            <input type="hidden" class="lineCdCode">`
                            
            if ($("#rscAllCheck").is(":checked")){
                node += `<td><input type="checkbox" name="rscCb" checked></td>`;
            }else{
                node += `<td><input type="checkbox" name="rscCb"></td>`;
            }
            node +=`<td class="procCode"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="rscCdCode"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            $("#bomRscTable tbody").append(node);
        }
    });


    function bomAddSaveAjax(obj){
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
        
        $.ajax({
            url : 'bomCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                bomCdName,
                finPrdCdCode,
                lineCdHdCode,
                bomCdProdVol,
                bomCdUnit,
                bomCdUse,
                bomCdRemk,
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    function rscAddSaveAjax(lineCdHdCode, obj){
        let bomCdCode = $("#bomCode").val();
        let lineCdCode = $(obj).find("input[class='lineCdCode']").val();
        let rscCdCode = $(obj).find("td:eq(5)").text();
        let bomRscUseVol = $(obj).find("td:eq(7)").text();
        let bomRscUnit = $(obj).find("td:eq(8)").text();
        
        $.ajax({
            url : 'bomRsc/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                bomCdCode,
                lineCdCode,
                rscCdCode,
                bomRscUseVol,
                bomRscUnit
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    //추가 끝


    //선택 삭제 이벤트
    $("#bomDeleteBtn").on("click",function(){
        $("#bomTable tbody").find("input:checkbox[name='bomCb']").each(function(idx,el){
            let tr = $(el).closest('tr');
            let priKey = tr.find("td:eq("+bomPriKeyIdx+")").text();

            if($(el).is(":checked")){
                bomDelList.push(priKey);
                tr.remove();
                for(let i = 0; i< bomModifyList.length; i++){
                    if(bomModifyList[i][0]== priKey){
                        bomModifyList.splice(i,1);
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
                rscDelList.push(priKey);
                tr.remove();
                for(let i = 0; i< rscModifyList.length; i++){
                    if(rscModifyList[i][0]== priKey){
                        rscModifyList.splice(i,1);
                    }
                }
            }
        });
    });
    

    function bomDeleteSaveAjax(priKey){
        $.ajax({
            url : 'bomCode/delete',
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
    function rscDeleteSaveAjax(priKey){
        $.ajax({
            url : 'bomRsc/delete',
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

    //bom tr 클릭
    $("#bomTable tbody").on("click","tr",function(e){
        let bomCode = $(this).find("td:eq(1)").text();
        let lineCode = $(this).find("td:eq(5)").text();
        let prodVol = $(this).find("td:eq(7)").text();
        let prodUnit = $(this).find("td:eq(8)").text();
        if($("#bomCode").val()==bomCode ||
            ((lineCode == null || lineCode == '') &&
            (procVol == null || procVol == '') &&
            (prodUnit == null || prodUnit == ''))){
            return false;
        }

        $("#bomCode").val(bomCode);
        $("#lineCode").val(lineCode);
        $("#prodVol").val(prodVol);
        $("#prodUnit").val(prodUnit);

        
        if($("#bomRscTable tbody tr").length != 0){
            if(confirm('현재 수정한 내용이 모두 삭제됩니다.')==true){
                rscModifyList = [];
                rscAddList = [];
                rscDelList = [];
                $("#bomRscTable tbody tr").remove();
            }else{
                return;
            }
        }
        selectBomRscAjax(bomCode);
        
        
    });

    function selectBomRscAjax(bomCode){
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
    
    function rscMakeRow(obj){
        let node = `<tr>
                    <input type="hidden" class="bomRscIdx" value="${obj.bomRscVO.bomRscIdx}">
                    <input type="hidden" class="lineCdCode" value="${obj.lineCodeVO.lineCdCode}">`;
        if($("#rscAllCheck").is(":checked")){
            node += `<td><input type="checkbox" name="rscCb" checked></td>`
        }else{
            node += `<td><input type="checkbox" name="rscCb"></td>`;
        }
        node+= `<td class="procCode">${obj.lineCodeVO.procCdCode}</td>
                <td>${obj.lineCodeVO.procCdName}</td>
                <td>${obj.lineCodeVO.mchnCode}</td>
                <td>${obj.lineCodeVO.mchnName}</td>
                <td class="rscCdCode">${obj.bomRscVO.rscCdCode}</td>
                <td>${obj.bomRscVO.rscCdName}</td>
                <td>${obj.bomRscVO.bomRscUseVol}</td>
                <td>${obj.bomRscVO.bomRscUnit}</td>
                </tr>`;
        $("#bomRscTable tbody").append(node);
    }

 });