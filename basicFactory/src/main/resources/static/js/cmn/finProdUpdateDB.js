$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#finProdTable");
    //td 수정을 적용할 인덱스
    let avArr = [2,3,4,5,7];
    //notNull이어야하는 idx
    let notNullList = [2,3,4,5,8];
    //primary키인 index
    let priKeyIdx = 1;

    //수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let col = $(this).index();
        let flag = false;
        let tdInfo = $(this);
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


    
    //기존에 있는 값들 중에 td변경될 때
    table.find("tbody td:not(:first-child)").change(function(e){
        console.log(e);
        e.preventDefault();
        let col = $(this).index();
        let priKey = $(this).parent().find("td:eq("+priKeyIdx+")").text();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let updCont;
        if(col == 6){
            //checkbox일 때
            updCont = 0;
            if($(this).find("input").is(":checked")){
                updCont = 1;
            }
        }else{
            //td일 때
            updCont = $(this).text();
        }
        checkNewModify(priKey,updCol,updCont);
        console.log(modifyList);
        e.stopPropagation();
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

    //저장 버튼 이벤트
    $("#saveBtn").on("click",function(){
        let trs = table.find("tbody tr");
        if(confirm("저장하시겠습니까?")==true){
            //null 검사
            for(tr of trs){
                for(idx of notNullList){
                    let content = $(tr).find("td:eq("+idx+")").text();
                    if(content == null || content == ''){
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            if(delList.length != 0){
                deleteSaveAjax(delList);
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
            url : 'finProdCode/update',
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
        let node = `<tr name="addTr">
                        <td><input type="checkbox" name="cb"></td>`;
        if ($("#allCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" name="cb" checked ></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox" name="use"></td>
                <td></td>
                <td class="empId"></td>
            </tr>`;
        $("#finProdTable tbody").append(node);
    });

    function addSaveAjax(obj){
        let finPrdCdName = $(obj).find("td:eq(2)").text();
        let finPrdCdVol = $(obj).find("td:eq(3)").text();
        let finPrdCdUnit = $(obj).find("td:eq(4)").text();
        let finPrdCdPrice = $(obj).find("td:eq(5)").text();
        let finPrdCdRemk = $(obj).find("td:eq(7)").text();
        let empId = $(obj).find("td:eq(8)").text();

        //checkbox인 td
        let finPrdCdUse = $(obj).find("td:eq(6) input");
        console.log(finPrdCdUse);
        if($(finPrdCdUse).is(":checked")){
            finPrdCdUse = 1;
        }else{
            finPrdCdUse = 0;
        }
        
        $.ajax({
            url : 'finProdCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                finPrdCdName : finPrdCdName,
                finPrdCdVol : finPrdCdVol,
                finPrdCdUnit : finPrdCdUnit,
                finPrdCdPrice : finPrdCdPrice,
                finPrdCdUse : finPrdCdUse,
                finPrdCdRemk : finPrdCdRemk,
                empId : empId
            },
            success : function(result){
                console.log("추가 성공");
            }

        })
    }

    //추가 끝

    //선택 삭제 이벤트
    $("#deleteBtn").on("click",function(){
        table.find("tbody input:checkbox[name='cb']").each(function(idx,el){
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

    function deleteSaveAjax(delList){
        $.ajax({
            url : 'finProdCode/delete',
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

});