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
        let lineCdCode = $(this).parent().find("input[class='lineCdCode'").val();
        if(lineCdCode == null || lineCdCode == ''){
            return;
        }
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
        let lineNames = [];
        if(confirm("저장하시겠습니까?")==true){
            //null 검사
            for(tr of lineTrs){
                for(idx of lineNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alertNull("라인 관리에 공백인 칸이 존재합니다.");
                        return;
                    }else{
                        //라인명 중복검사
                        for(n of lineNames){
                            if(n == content){
                                alertNull("라인명이 동일한 행이 있습니다.");
                                return;
                            }
                        }
                        lineNames.push(content);
                    }
                    
                }
            }
            for(tr of procTrs){
                for(idx of procNotNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alertNull("공정 관리에 공백인 칸이 존재합니다.");
                        return;
                    }
                }
            }
            
            //삭제용
            if(lineDelList.length != 0){
                lineDeleteSaveAjax(lineDelList);
            }
            if(procDelList.length != 0){
                procDeleteSaveAjax(procDelList);
            }

            //수정용
            for(obj of lineModifyList){
                lineModifySaveAjax(obj);
            }
            for(obj of procModifyList){
                procModifySaveAjax(obj);
            }
            //추가용
            addSaveAjax();

            Swal.fire({
                icon: "success",
                title : "저장이 완료되었습니다."
              }).then(function(){
                  location.reload();
              });
        }
    });
    function alertNull(title){
        Swal.fire({
            icon: "warning",
            title,
            text: "확인 후 다시 저장해주세요."
          });
    }
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
        let node = `<tr class='addTr'>
            <td><input type="checkbox" name="lineCb"></td>`;
            if($("#lineAllCheck").is(":checked")){
                node = `<tr class='addTr'>
                        <td><input type="checkbox" name="lineCb" checked></td>`;
            }
            node += `<td></td>
                    <td></td>
                </tr>`;
            $("#lineTable tbody").append(node);
    });

    //공정 추가 버튼
    $("#procAddBtn").on("click",function(){
        let no = $("#lineProcTable tbody tr").length;
        let lastNo = $("#lineProcTable tbody tr:last-child").find("td:eq(1)").text();
        let maxNo=0;
        let trs = $("#lineProcTable tbody tr");
        let noList = [];
        //noList 만들기
        for(let i = 0; i<no;i++){
            noList.push(i+1);
        }
        for(tr of trs){
            let trTxt = parseInt($(tr).find("td:eq(1)").text());
            if(maxNo < trTxt){
                maxNo = trTxt;
            }
        }
        if(no != maxNo){
            for(noIdx of noList){
                let flag = false;
                for(tr of trs){
                    let trTxt = parseInt($(tr).find("td:eq(1)").text());
                    if(noIdx == trTxt){
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    no = noIdx;
                    break;
                }
            }
        }else{
            no+=1;
        }
        if($("#procLineName").val() == ''){
            alert("라인을 선택하고 공정을 추가해주세요.")
        }else{
            let node = `<tr class='addTr'>
                        <td><input type="checkbox" name="procCb"></td>
                        <input type="hidden" class="lineCdCode" value="">`;
            if($("#procAllCheck").is(":checked")){
                node = `<tr class='addTr'>
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

    function addSaveAjax(){
        lineAddList = lineTable.find("tr[class='addTr']");
        procAddList = procTable.find("tr[class='addTr']");
        lines = [];
        procs = [];
        if(lineAddList.length == 0 && procAddList.length == 0){
            return false;
        }

        for(obj of lineAddList){
            let lineCdHdName = $(obj).find("td:eq(2)").text();
            let line = {
                lineCdHdName
            }
            lines.push(line);
        }
        let lineCdHdCode = $("#procLineCode").val();
        let lineCdHdName = $("#procLineName").val();
        for(obj of procAddList){
            let lineCdOrd = $(obj).find("td:eq(1)").text();
            let procCdCode = $(obj).find("td:eq(2)").text();
            let mchnCode = $(obj).find("td:eq(4)").text();
            let proc = {
                lineCdHdCode,
                lineCdHdName,
                lineCdOrd,
                procCdCode,
                mchnCode
            }
            procs.push(proc);
        }

        $.ajax({
            url : 'lineCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/json; charset=UTF-8;",
            data : JSON.stringify({
                line : lines,
                lineDtl : procs
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

    //추가 끝


    //선택 삭제 이벤트
    $("#lineDeleteBtn").on("click",deleteBtnFunc);
    $("#procDeleteBtn").on("click",deleteBtnFunc);
    
    function deleteBtnFunc(){
        $("tbody").find("input:checkbox").each(function(idx,el){
            let type = $(this).attr("name");
            let modifyList;
            let priKey;
            let delList;

            if($(el).is(":checked")){
                let tr = $(el).closest('tr');
                tr.remove();
                if($(tr).hasClass("addTr")){
                    //추가된 행이 삭제된거면 무시
                    return false;
                }
                if(type == 'lineCb'){
                    modifyList = lineModifyList;
                    priKey = tr.find("td:eq("+linePriKeyIdx+")").text();
                    delList = lineDelList;
                }else if(type == 'procCb'){
                    modifyList = procModifyList;
                    priKey = tr.find("input[type='hidden']").val();
                    delList = procDelList;
                }
                delList.push(priKey);
                for(let i = 0; i< modifyList.length; i++){
                    if(modifyList[i][0]== priKey){
                        modifyList.splice(i,1);
                    }
                }
            }
        });
    }
    function lineDeleteSaveAjax(lineDelList){
        console.log(lineDelList);
        $.ajax({
            url : 'lineCode/hd/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                delList : lineDelList
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }
    function procDeleteSaveAjax(procDelList){
        $.ajax({
            url : 'lineCode/delete',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                delList : procDelList
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

 });