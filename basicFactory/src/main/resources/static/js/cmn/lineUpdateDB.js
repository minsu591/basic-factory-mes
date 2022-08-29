$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let lineModifyList = [];
    let lineAddList = [];
    let lineDelList = [];

    let procModifyList = [];
    let procAddList = [];
    let procDelList = [];
    //수정할 테이블
    let lineTable = $("#lineTable");
    let procTable = $("#lineProcTable");
    //td 수정을 적용할 인덱스
    let lineAvArr = [2];
    //notNull이어야하는 idx
    let lineNotNullList = [2];
    let procNotNullList = [2,4];
    //primary키인 index
    let linePriKeyIdx = 1;
    let procPriKeyIdx;


    //line 수정 이벤트
    lineTable.find("tbody").on("click","td",function(e){
        let col = $(this).index();
        let flag = false;
        let tdInfo = $(this);
        let defaultVal;
        //적용할 인덱스인지 확인
        for(let i = 0; i<lineAvArr.length;i++){
            if(col == lineAvArr[i]){
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
                for(idx of lineNotNullList){
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

   
    
    //기존에 있는 값들 중에 line td변경될 때
    $("tbody").find("td:not(:first-child)").change(function(e){
        e.preventDefault();
        let table = $(this).closest('table');
        let col = $(this).index();
        let priKey = $(this).parent().find("td:eq("+linePriKeyIdx+")").text();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont = $(this).text();
        checkNewModify(priKey,updCol,updCont,'lineTable');
        return;
    });

    procTable.find("tbody").on("change","td:not(:first-child)",function(e){
        e.preventDefault();
        let table = $(this).closest('table');
        let col = $(this).index()-1;
        let priKey = $(this).closest('tr').find("input[class='lineCdCode']").val();
        let updCol = table.find("thead").find("th:eq("+col+")").attr("name");

        let updCont = $(this).text();
        checkNewModify(priKey,updCol,updCont,'procTable');
        return;
    })

    function checkNewModify(priKey,updCol,updCont,type){
        let modifyList;
        if(type == 'lineTable'){
            modifyList = lineModifyList;
        }else{
            modifyList = procModifyList;
        }
        for(p of modifyList){
            if(p[0] == priKey && p[1] == updCol){
                p[2] = updCont
                return;
            }
        }
        let modifyTr = [priKey,updCol,updCont];
        modifyList.push(modifyTr);
        console.log(modifyList);
        return;
    }

    //저장 버튼 이벤트
    $("#saveBtn").on("click",function(){
        let lineTrs = lineTable.find("tbody tr");
        let procTrs = procTable.find("tbody tr");
        if(confirm("저장하시겠습니까?")==true){
            //null 검사
            for(tr of lineTrs){
                for(idx of lineNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            for(tr of procTrs){
                for(idx of procNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            for(priKey of lineDelList){
                lineDeleteSaveAjax(priKey);
            }
            for(priKey of procDelList){
                procDeleteSaveAjax(priKey);
            }
            //수정용
            for(obj of lineModifyList){
                lineModifySaveAjax(obj);
            }
            for(obj of procModifyList){
                procModifySaveAjax(obj);
            }
            //추가용
            lineAddList = lineTable.find("tr[name='addTr']");
            for(obj of lineAddList){
                lineAddSaveAjax(obj);
            }
            procAddList = procTable.find("tr[name='addTr']");
            for(obj of procAddList){
                procAddSaveAjax(obj);
            }

            alert("저장이 완료되었습니다.");
            location.reload();
        }
    });

    function lineModifySaveAjax(obj){
        //checkbox인거
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'lineCode/hd/update',
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

    function procModifySaveAjax(obj){
        //checkbox인거
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'lineCode/update',
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
    //라인 추가 버튼
    $("#lineAddBtn").on("click",function(){
        let node = `<tr name='addTr'>
            <td><input type="checkbox" name="lineCb"></td>`;
            if($("#lineAllCheck").is(":checked")){
                node = `<tr>
                        <td><input type="checkbox" name="lineCb" checked></td>`;
            }
            node += `<td></td>
                    <td></td>
                </tr>`;
            $("#lineTable tbody").append(node);
    });

    //공정 추가 버튼
    $("#procAddBtn").on("click",function(){
        let no = $("#lineProcTable tbody tr").length +1;
        if($("#procLineName").val() == ''){
            alert("라인을 선택하고 공정을 추가해주세요.")
        }else{
            let node = `<tr name='addTr'>
            <td><input type="checkbox" name="procCb"></td>`;
            if($("#procAllCheck").is(":checked")){
                node = `<tr>
                        <td><input type="checkbox" name="procCb" checked></td>`;
            }
            node += `<td>`+no+`</td>
                    <td class="procCode"></td>
                    <td></td>
                    <td class="mchnCode"></td>
                    <td></td>
                </tr>`;
            $("#lineProcTable tbody").append(node);
        }
    });

    function lineAddSaveAjax(obj){
        let lineName = $(obj).find("td:eq(2)").text();
        
        $.ajax({
            url : 'lineCode/hd/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                lineName : lineName
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    function procAddSaveAjax(lineCdHdCode, obj){
        let procCdCode = $(obj).find("td:eq(2)").text();
        let mchnCode = $(obj).find("td:eq(4)").text();
        let lineCdOrd = $(obj).find("td:eq(1)").text();
        
        $.ajax({
            url : 'lineCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                lineCdHdCode : lineCdHdCode,
                procCdCode : procCdCode,
                mchnCode : mchnCode,
                lineCdOrd : lineCdOrd
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    //추가 끝


    //선택 삭제 이벤트
    $("#lineDeleteBtn").on("click",function(){
        $("tbody").find("input:checkbox").each(function(idx,el){
            let type = $(this).attr("name");
            let modifyList;
            let priKey;
            let delList;

            if($(el).is(":checked")){
                let tr = $(el).closest('tr');
                if(type == 'lineCb'){
                    modifyList = listModifyList;
                    priKey = tr.find("td:eq("+priKeyIdx+")").text();
                    delList = lineDelList;
                }else if(type == 'procCb'){
                    modifyList = procModifyList;
                    priKey = tr.find("input[type='hidden']").val();
                    delList = procDelList;
                }
                delList.push(priKey);
                tr.remove();
                for(let i = 0; i< modifyList.length; i++){
                    if(tr[i][0]== priKey){
                        modifyList.splice(i,1);
                        break;
                    }
                }
            }
        });
    });

    function lineDeleteSaveAjax(priKey){
        $.ajax({
            url : 'lineCode/hd/delete',
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
    function procDeleteSaveAjax(priKey){
        $.ajax({
            url : 'lineCode/delete',
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

 });