$("document").ready(function(){
    //수정

    //수정될거 저장하는 list 정의
    let modifyList = [];
    let addList = [];
    let delList = [];
    //수정할 테이블
    let table = $("#ordMngTable");
    //td 수정을 적용할 인덱스(hidden input빼고)
    let avArr = [4];
    //notNull이어야하는 idx
    let notNullList = [1,2,3,4];


    //수정 이벤트
    table.find("tbody").on("click","td",function(e){
        e.stopPropagation();
        let col = $(this).index('td'); //이거고침
        let flag = false;
        let tdInfo = $(this);
        let defaultVal;

        //수정 적용할 인덱스인지 확인
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

        //수정할 수 있도록 하는 설정
        tdInfo.attr("contenteditable", "true");
        
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
        
        //td에 blur가 되면(포커스 잃으면)
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
            } else {
                //포커스가 나갈 때 체인지 이벤트를 강제로 일으킴(값이 변할 경우 변화를 캐치하는 이벤트)
                tdInfo.trigger("change");
            }
            e.stopPropagation();
        });

    });


    
    //기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
    table.find("tbody").on("change","td:not(:first-child)", function (e) {  //기존에 있던 tbody에 change 이벤트가 발생했을 때.
        console.log(e);
        e.preventDefault();
        let col = $(this).index('td');                                      //클릭된 td의 index를 (td의 index만 찾음) col변수에 저장
        let priKey = $(this).parent().find("input[type='hidden']").val();   //해당 td의 부모에서 프라이머리키 td를 찾아 그 값을 저장
                                                                            //set ${updCol}= #{updCont} where PK컬럼 = #{ priKey }
        //html의 th name속성값 찾아옴
        let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");//thead에서 col번째 th name값 갖고 옴
        let updCont = $(this).text();   //해당 td의 text값을 저장

        checkNewModify(priKey, updCol, updCont);
        console.log(modifyList);
        e.stopPropagation();
    });

    function checkNewModify(priKey, updCol, updCont) {
        for(p of modifyList){
            if (p[0] == priKey && p[1] == updCol) { //modifyList의 한 건에 대해 같은 값을 수정하는 것이라면 
                
                p[2] = updCont
                return;
            }
        }
        let modifyTr = [priKey, updCol, updCont];
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
                    if (content == null || content == '') {
                        alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                        return;
                    }
                }
            }
            
            //삭제용
            for(priKey of delList){
                deleteSaveAjax(priKey);
            }
            //수정용
            console.log(modifyList);
            for (obj of modifyList) {
                modifySaveAjax(obj);
            }
            //추가용(추가 후 저장누르면 name이 'addTr'인 값을 addList에 추가하여 Ajax실행)
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
        console.log("modify");
        $.ajax({
            url: 'ordManage/update',
            type :"PUT",
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
    $("#addBtn").on("click",function(){
        let node = `<tr name="addTr">
                        <td><input type="checkbox" name="cb"></td>`;
        if ($("#allCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" name="cb" checked ></td>`;
        }
        node +=`<td class="productCode" data-toggle="modal" data-target=".bd-example-modal-lg"></td>
                <td></td>
                <td><input type="date"></td>
                <td></td>
            </tr>`;
        $("#ordMngTable tbody").append(node);
    });

    function addSaveAjax(obj) {
        //주문일자, 거래처 코드, 담당자 입력
        let orderDate = $("#slsOrdHdDate").val();
        let vendorCode = $("#vendor").val();
        let empId = $("#empid").val();
        
        let prdCode = $(obj).find("td:eq(2)").text();
        let prdName = $(obj).find("td:eq(3)").text();
        let ordDlvDate = $(obj).find("td:eq(4)").text();
        let ordDtlVol = $(obj).find("td:eq(5)").text();
        
        $.ajax({
            url: 'ordManage/insert',
            type : 'POST',
            dataType : 'text',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
            data : {
                prdCode,
                prdName,
                ordDlvDate,
                ordDtlVol
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
                let tr = $(el).parent().parent();
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

    function deleteSaveAjax(priKey){
        $.ajax({
            url : 'finProdCode/delete',
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