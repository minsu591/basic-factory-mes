
$("document").ready(function(){
    //수정
    //procCdName, procCdRemk 수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#procTable");
    //notNull이어야하는 idx
    let notNullList = [2];
    //적용할 인덱스
    let avArr = [2,3];
    let priKeyIdx = 1;

    //수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let col = $(this).index();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let priKey = $(this).parent().find("td:eq("+priKeyIdx+")").text();
        let flag = false;
        let tdInfo = $(this);
        let defaultVal;

        //nullTd class 제거
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
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
        defaultVal = tdInfo.text();
        tdInfo.addClass("tdBorder");

        tdInfo.on("keyup",function(key){
            if(key.keyCode == 13 || key.keyCode == 27){
                key.preventDefault();
                tdInfo.blur();
            }
        });
        
        tdInfo.unbind("blur").bind("blur",function(e){
            e.preventDefault();
            tdInfo.attr("contenteditable","false")
                    .removeClass("tdBorder");
            //not null이어야하는 값 검사
            if(tdInfo.text() == null || tdInfo.text() == ''){
                for(idx of notNullList){
                    if(col == idx){
                        tdInfo.text(defaultVal);
                        return false;
                    }
                }
            }
            if(priKey != null && priKey != ''){
                checkNewModify(priKey,updCol,tdInfo.text());
            }
        });

    });

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
        let nullFlag = false;
        Swal.fire({
            icon: "question",
            title: "저장하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            closeOnClickOutside: false,
          }).then((ans) =>{
            if(ans.isConfirmed){
                //null 검사
                for(tr of trs){
                    for(idx of notNullList){
                        let content = $(tr).find("td:eq("+idx+")").text();
                        console.log(content);
                        if(content == null || content == ''){
                            $(tr).find("td:eq("+idx+")").addClass("nullTd");
                            nullFlag = true;
                        }
                    }
                }
                //null 값이 있으면 alert
                if(nullFlag){
                    Swal.fire({
                        icon: "error",
                        title: "비어있는 데이터가 존재합니다",
                        text: "확인하고 다시 저장해주세요"
                    });
                    return false;
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

                Swal.fire({
                    icon: "success",
                    title: "저장이 완료되었습니다",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인",
                    closeOnClickOutside: false,
                }).then((ans) =>{
                    location.reload();
                });
            }
        });
    });

    function modifySaveAjax(obj){
        let priKey = obj[0];
        let updCol = obj[1];
        let updCont = obj[2];
        $.ajax({
            url : 'procCode/update',
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
                <td class="canModifyTd"></td>
                <td class="canModifyTd"></td>
            </tr>`;
        $("#procTable tbody").append(node);
    });

    function addSaveAjax(obj){
        let procName = $(obj).find("td:eq(2)").text();
        let procRemk = $(obj).find("td:eq(3)").text();
        if(procName == null && procName == ''&& procRemk == null && procRemk == ''){
            return;
        }
        $.ajax({
            url : 'procCode/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                procName : procName,
                procRemk : procRemk
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
        //내부에 내용이 없으면 allCheck 해제
        if(table.find("tbody tr").length==0){
            $("#allCheck").prop("checked",false);
        }
    });

    function deleteSaveAjax(delList){
        $.ajax({
            url : 'procCode/delete',
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