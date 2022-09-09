
$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#deptTable");
    //notNull이어야하는 idx
    let notNullList = [2];
    //적용할 인덱스
    let avArr = [2];
    //프라이머리 키
    let priKeyIdx = 1;

    //수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let col = $(this).index();
        let tdInfo = $(this);
        let updCol = table.find("thead").find("th:eq("+col+")").attr("name");
        let priKey = tdInfo.parent().find("td:eq("+priKeyIdx+")").text();
        let updCont;
        let flag = false;
        let defaultVal = tdInfo.text();

        //nullTd class 지우기
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
                tdInfo.unbind("blur").bind("blur");
            }
        });
        
        tdInfo.unbind("blur").bind("blur",function(e){
            e.preventDefault();
            updCont = tdInfo.text();
            tdInfo.attr("contenteditable","false")
                    .removeClass("tdBorder");
            //not null이어야하는 값
            if(updCont == null || updCont == ''){
                for(idx of notNullList){
                    if(col == idx){
                        tdInfo.text(defaultVal);
                        return false;
                    }
                }
            }
            //추가한 요소가 아닌지 확인
            if(priKey != null && priKey != ''){
                checkNewModify(priKey,updCol,updCont);
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
            cancelButtonText: "취소"
          }).then((result) =>{
            if(result.isConfirmed){
                //null 검사
                for(tr of trs){
                    for(idx of notNullList){
                        let content = $(tr).find("td:eq("+idx+")").text();
                        if(content == null || content == ''){
                            $(tr).find("td:eq("+idx+")").addClass("nullTd");
                            nullFlag = true;
                        }
                    }
                }
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
                    confirmButtonText: "확인"
                }).then((result) =>{
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
            url : 'dept/update',
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

    //추가 버튼 이벤트
    $("#addBtn").on("click",function(){
        empBlankMakeRow();
    });

    function empBlankMakeRow(){
        let node = `<tr name="addTr">
                        <td><input type="checkbox" name="cb"></td>`;
        if($("#allCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" name="cb" checked></td>`;
        }
        node += `<td></td>
                <td class="canModifyTd"></td>
                </tr>`;

        $("#deptTable tbody").append(node);
    }


    function addSaveAjax(obj){
        let deptName = $(obj).find("td:eq(2)").text();
        if(deptName == null && deptName == ''){
            return;
        }
        $.ajax({
            url : 'dept/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                deptName : deptName
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
            url : 'dept/delete',
            type : 'GET',
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