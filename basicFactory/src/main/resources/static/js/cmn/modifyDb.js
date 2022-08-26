
$("document").ready(function(){
    //수정
    //procCdName, procCdRemk 수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    //수정할 테이블
    let table = $("#procTable");
    //notNull이어야하는 idx
    let notNullList = [2];
    //적용할 인덱스
    let avArr = [2,3];

    //수정 이벤트
    table.find("tbody").on("dblclick","td",function(e){
        e.stopPropagation();
        let col = $(this).index();
        let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
        let priKey = $(this).parent().find("td:eq(1)").text();
        let flag = false;
        let tdInfo = $(this);
        let defaultVal = $(this).text();
        console.log(defaultVal);

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
        tdInfo.addClass("tdBorder");
        tdInfo.on("keyup",function(key){
            if(key.keyCode == 13 || key.keyCode == 27){
                key.preventDefault();
                tdInfo.blur();
            }
        });

        tdInfo.focusout(function(){
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
            }else{
                if(priKey != null && priKey != ''){
                    checkNewModify(priKey,updCol,tdInfo.text());
                }
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
        let result;
        if(confirm("저장하시겠습니까?")==true){
            //수정용
            for(obj of modifyList){
                modifySaveAjax(obj);
            }
            //추가용

            alert("저장이 완료되었습니다.");
        }
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
                console.log(result);
            }, error : function(error){
                alert("서버 오류 : " + error);
            }
        })
    }
    //수정 끝

    //추가 이벤트
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
            </tr>`;
        $("#procTable tbody").append(node);

    });

    //추가 끝
});