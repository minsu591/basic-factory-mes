let clfyList = ["","관리자","직원"];

$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#empTable");
    //notNull이어야하는 idx
    let notNullList = [1,2,3,4,5,6,7];
    //적용할 인덱스
    let avArr = [5,6,7,9];
    //프라이머리 키
    let priKeyIdx = 1;
    
    //수정 이벤트
    table.find("tbody").on("click","td:not(:first-child)",function(e){
        e.stopPropagation();
        let tdInfo = $(this);
        let col = tdInfo.index();
        let flag = false;
        let defaultVal = tdInfo.text();

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

        tdInfo.off("keyup").on("keyup",function(key){
            if(key.keyCode == 13 || key.keyCode == 27){
                key.preventDefault();
                tdInfo.unbind("blur").bind("blur");
            }
        });
        
        tdInfo.unbind("blur").bind("blur",function(e){
            e.preventDefault();            
            tdInfo.attr("contenteditable","false")
                    .removeClass("tdBorder");
            //not null이어야하는 값
            if(tdInfo.text() == null || tdInfo.text() == ''){
                for(idx of notNullList){
                    if(col == idx){
                        tdInfo.text(defaultVal);
                        break;
                    }
                }
            }
            if(tdInfo.closest("tr").attr("name")!='addTr'){
                tdInfo.trigger("change");
            }
            
        });

    });

    table.find("tbody td:not(:first-child)").change(function(){
        let tdInfo = $(this);
        let col = tdInfo.index();
        let updCol =$("#empTable thead").find("th:eq("+col+")").attr("name");
        let priKey = tdInfo.parent().find("td:eq("+priKeyIdx+")").text();
        let updCont;
        if(col == 8){
            //체크박스 일 때
            if($(this).find("input[type='checkbox']").is(":checked")){
                updCont = 1;
            }else{
                updCont = 0;
            }
        }else if(col == 4){
            //select box 일 때
            updCont = $(this).find("select option:selected").val();
        } else if(col == 2){
            //비밀번호 일 때
            updCont = $(this).parent().find("input[class='modPw']").val();
        }
        else{
            updCont = $(this).text();
        }
        
        checkNewModify(priKey,updCol,updCont);
        console.log(modifyList);
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
                let regExp = '';
                let nullFlag = 0;
                //null 검사
                for(tr of trs){
                    for(idx of notNullList){
                        let content;
                        //select option인 경우의 content
                        if(idx == 4){
                            content = $(tr).find("td:eq("+idx+") select option:selected").val();
                        }else{
                            content = $(tr).find("td:eq("+idx+")").text();
                        }

                        if(content == null || content == ''){
                            nullFlag = 1;
                            $(tr).find("td:eq("+idx+")").addClass("nullTd");
                        }else if(idx == 6){
                            //이메일 정규식
                            regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                            if(content.match(regExp) == null){
                                nullFlag = 2;
                                $(tr).find("td:eq("+idx+")").addClass("nullTd");
                            }
                        }else if(idx==7){
                            //휴대폰번호 정규식
                            regExp = /^\d{3}-\d{3,4}-\d{4}$/;
                            if(content.match(regExp) == null){
                                nullFlag = 3;
                                $(tr).find("td:eq("+idx+")").addClass("nullTd");
                            }
                        }
                    }
                }

                if(nullFlag > 0){
                    if(nullFlag == 1){
                        Swal.fire({
                            icon: "error",
                            title: "비어있는 데이터가 존재합니다",
                            text: "확인 후 다시 저장해주세요"
                        });
                    }else if(nullFlag == 2){
                        Swal.fire({
                            icon: "error",
                            title: "이메일을 올바르게 입력해주세요",
                            text: "수정 후 다시 저장해주세요"
                        });
                    }else if(nullFlag == 3){
                        Swal.fire({
                            icon: "error",
                            title: "휴대폰 번호를 올바르게 입력해주세요",
                            text: "하이픈을 포함한 휴대폰 번호를 입력해주세요"
                        });
                    }
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
            url : 'emp/update',
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
     //추가 버튼 이벤트
     $("#addBtn").on("click",function(){
        empBlankMakeRow();
    });

    function empBlankMakeRow(){
        let node = `<tr name='addTr'>
                        <td class="cantModifyTd"><input type="checkbox" name="cb"></td>`;
        if($("#allCheck").is(":checked")){
            node = `<tr name='addTr'>
                    <td class="cantModifyTd"><input type="checkbox" name="cb" checked></td>`;
        }
        node += `<td class='modifyEmpId'></td>
                <td class='modifyPassword'></td>
                <td class='deptName'></td>`;
        node += makeSelectForPos('');
        node += `<td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"></td>
                <td></td>
                <input type="hidden" class="modPw">
                </tr>`;

        $("#empTable tbody").append(node);
    }


    function addSaveAjax(obj){
        let empId = $(obj).find("td:eq(1)").text();
        let empPw = $(obj).find("input[class='modPw']").val();
        let deptName = $(obj).find("td:eq(3)").text();
        let empPos = $(obj).find("td:eq(4) select option:selected").val();
        let empName = $(obj).find("td:eq(5)").text();
        let empEmail = $(obj).find("td:eq(6)").text();
        let empPhone = $(obj).find("td:eq(7)").text();
        let empRemk = $(obj).find("td:eq(8)").text();
        let empAuth;
        if($(obj).find("td:eq(8) input[type='checkbox']").is(":checked")){
            empAuth = 1;
        }else{
            empAuth = 0;
        }

        $.ajax({
            url : 'emp/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/json; charset=UTF-8;",
            data : JSON.stringify({
                empId,
                empPw,
                deptName,
                empPos,
                empName,
                empEmail,
                empPhone,
                empRemk,
                empAuth
            }),
            success : function(result){
                console.log("추가 성공");
            }

        });
    }
    
    function makeSelectForPos(cont){
        let node = '<td><select>';
        for(clfy of clfyList){
            if(clfy == cont){
                node += `<option value="${clfy}" selected>${clfy}</option>`;
            }else{
                node += `<option value="${clfy}">${clfy}</option>`;
            }
        }
        node += '</select></td>';
        return node;
    }

    //추가 끝

    //선택 삭제 이벤트
    $("#deleteBtn").on("click",function(){
        table.find("tbody input:checkbox[name='cb']").each(function(idx,el){
            let tr = $(el).closest('tr');
            if($(el).is(":checked")){
                if(tr.attr('name') != 'addTr'){
                    let priKey = tr.find("td:eq("+priKeyIdx+")").text();
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
    });

    function deleteSaveAjax(delList){
        if(delList.length == 0){
            return false;
        }
        $.ajax({
            url : 'emp/delete',
            type : 'GET',
            dataType : 'text',
            data : {
                delList
            },
            success : function(result){
                console.log("삭제 성공");
            }
        })
    }

});