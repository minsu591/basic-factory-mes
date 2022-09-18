$("document").ready(function () {

//오늘 일자
today = new Date();
today = today.toISOString().slice(0, 10);
orderToday = $("#slsOrdHdDate");
orderToday.val(today);

//수정될거 저장하는 list 정의
let modifyList = [];
let hdModifyList = [];
let addList = [];
let delList = [];
//수정할 table 정보
let table = $("#ordMngTable");
//td 수정을 적용할 인덱스 (td기준)
let avArr = [4];
//notNull이어야하는 (td기준)
let notNullList = [1,3,4];


//헤더 input 클릭 시 border지우기
$(".card").on("click", "input.nullVol", function(){
    $(this).removeClass("nullVol");
})

//초기화 버튼
$("#resetBtn").click(function () {
$("#ordMngTable tbody tr").remove();
$("#allCheck").prop("checked", false);
$("#slsOrdHdDate").val(today);
$("#slsOrdHdDate").prop("disabled", false);
$("#slsOrdHdNo").val('');
$("#vendor").val('');
$("#vendorName").val('');
})

//input 수정 이벤트
$("#vendor, #form input").on("change", function(e){
    console.log(e);
    let slsOutHdNo = $("#slsOrdHdNo").val();
    let modifyAddFlag = checkModifyOrAdd(slsOutHdNo);
    if (modifyAddFlag){  //true : 수정 중 (주문번호 != null)
        let priKey = $("#slsOrdHdNo").val();
        let updCol = $(this).attr("name");
        let updCont = $(this).val();
        let hdUp = [priKey, updCol, updCont];        
        
        for(mod of hdModifyList){
            if(mod[0] == priKey && mod[1] == updCol){ //주문번호가 같고 컬럼이 같으면 내용변경
                mod[2] = updCont;
                return false;
            }
        }
        hdModifyList.push(hdUp);
        console.log(hdModifyList);
    }
});

//td 수정 이벤트
table.find("tbody").on("click","td",function(e){
    e.stopPropagation();
    let col = $(this).index() -1; //input값 -1
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;

    //저장을 한 번해서 공백 경고 border에 포커스 오면 해당 클래스 삭제
    if(tdInfo.hasClass("nullVol")){
        tdInfo.removeClass("nullVol");
    }

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
    tdInfo.focus();
    defaultVal = tdInfo.text();
    tdInfo.addClass("tdBorder");


    //enter나 esc 누르면 blur되도록 
    tdInfo.on("keyup",function(key){
        if(key.keyCode == 13 || key.keyCode == 27){
            key.preventDefault();
            tdInfo.blur();
        }
    });
    
    //td에 blur가 되면(포커스 잃으면)
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
        } else {
            if (col == 4) {
                let txt = tdInfo.text(); //1234asdfsdaf
                let parseIntVol = parseInt(txt); //1234
                if (!$.isNumeric(parseIntVol)) {
                    //txt가 숫자가 아니면
                    tdInfo.text('');
                    return false;
                } else if ($.isNumeric(parseIntVol) && txt != parseIntVol) {
                    //txt가 숫자와 문자가 섞여있으면
                    tdInfo.text(parseIntVol);
                }
            }
            //포커스가 나갈 때 체인지 이벤트를 강제로 일으킴(값이 변할 경우 변화를 캐치하는 이벤트)
            tdInfo.trigger("change");
        }
        e.stopPropagation();
    });
});


//기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
table.find("tbody").on("change", "td:not(:first-child)", function (e) {     //조회해온 tbody에 change 이벤트가 발생했을 때.
    console.log(e);
    e.preventDefault();
    let trInfo = $(this).parent();
    let col = $(this).index() - 1;                                           //클릭된 td의 index를 (td의 index만 찾음) col변수에 저장
    let priKey = $(this).parent().find("input[type='hidden']").val();        //해당 td의 부모에서 프라이머리키 값이 있는 태그를 찾아 그 값을 저장
    let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");//html의 col번째 th name값 갖고 옴(수정될 column)
    let updCont = $(this).text();                                            //해당 td의 text값을 저장(수정될 content)
    let slsOrdDtlVol = parseInt(trInfo.find("td:eq(4)").text());
    if(slsOrdDtlVol <= 0) {
        minusWarning();
        trInfo.find("td:eq(4)").text('');
        return false;
    }

    if (col == 3) {
        updCont = $(this).find("input[type='date']").val();                  //컬럼 index가 3번째 td라면 updCont는 input의 date값을 담음(납기일자)
    }
    if (priKey != null && priKey != '') {                                    //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
        checkNewModify(priKey, updCol, updCont);
    }
    e.stopPropagation();
});

function checkNewModify(priKey, updCol, updCont) {
    for(p of modifyList){
        if (p[0] == priKey && p[1] == updCol) { //modifyList의 한 건에 대해 같은 값을 수정하는 것이라면 
            p[2] = updCont                      //새로 추가가 아닌 기존 배열에 수정
            return;
        }
    }
    let modifyTr = [priKey, updCol, updCont];
    modifyList.push(modifyTr);
}

function exNull(st){
    return st == null || st == '';
}

//저장 버튼 이벤트
    $("#saveBtn").on("click", function () {
    Swal.fire({
        icon: "question",
        title: "저장하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        closeOnClickOutside: false,
    }).then((result) => {
        if (result.isConfirmed) {
            if ($("#slsOrdHdNo").val() == null || $("#slsOrdHdNo").val() == '' && table.find("tbody tr").length == 0) {
                noDataWarn();
                return false;
            }
            let slsOrdHdNo = $("#slsOrdHdNo").val();
            addList = table.find("tr[name='addTr']");
            
            //추가인지 수정인지 확인
            let modifyAddFlag = checkModifyOrAdd(slsOrdHdNo);

            //출고된 내역이 있는 주문인지 확인
            let checkOrderFlag = checkOrder(slsOrdHdNo);
            //중복되는 제품코드를 저장못하게 하기
            let trs = table.find("tr[name='addTr']");
            console.log(trs);
            let finPrdCodeList = [];
            for (tr of trs) {
                finPrdCodeList.push($(tr).find("td:eq(1)").text());
            }
            
            if (modifyAddFlag) { // true: 수정
                //tr의 null 검사
                if (forNull()) {
                    return false;
                }

                //추가 등록 (있는 헤더 가져다가 인서트)
                if (slsOrdHdNo != null && slsOrdHdNo != '') {
                    for (obj of addList) {
                        addDtlSaveAjax(obj, slsOrdHdNo);
                    }
                }

                //해당 주문번호의 출고내역 존재하면 거래처 수정 불가
                if (checkOrderFlag) {
                    changeWarning();
                    return false;
                } else {
                    //헤더 수정용
                    for (obj of hdModifyList) {
                        modifyHdSaveAjax(obj);
                    }
                }
                //detail 수정용
                for (obj of modifyList) {
                    modifySaveAjax(obj);
                }
                //삭제용
                let countTr = table.find("tbody tr").length;
                if (countTr == 0) {
                    //헤더 삭제 ajax(tbody 안에 내용 없으면 헤더 삭제)
                    deleteHdSaveAjax(slsOrdHdNo);
                } else {
                    //detail 삭제
                    if (delList.length != 0) {
                        deleteSaveAjax(delList);
                    }
                }
            } else {
                //추가용
                let vendCdCode = $("#vendor").val();
                let empName = $("#empName").val();
                
                //필수항목 미기재 시 리턴
                if (exNull(empName) || exNull(vendCdCode)) {
                    insertHeaderWarning();
                    if(empName == null || empName == ''){
                        $("#empName").addClass("nullVol");
                    }
                    if(vendCdCode == null || vendCdCode == '') {
                        $("#vendor").addClass("nullVol");
                    }
                    return false;
                }
                if (forNull()) {
                    return false;
                }
                //헤더 넣고 여러개 인서트
                if (slsOrdHdNo == null || slsOrdHdNo == '') {
                    addHdSaveAjax(addList);
                }
            }
            Swal.fire({
                icon: "success",
                title: "저장이 완료되었습니다",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인",
                closeOnClickOutside: false,
            }).then((result) => {
                location.reload();
            });
        } else {
            return;
        }
    });
});

function forNull(){
    //null 검사
    let trs = table.find("tbody tr");
    let flag = false;
    for(tr of trs){
        for (idx of notNullList) {                                  //tr돌면서 notNullList index가 null인지 검사
            let td = $(tr).find("td:eq(" + idx + ")");
            let content;
            if (idx == 3) {
                content = $(tr).find("input[type='date']").val();   //index가 3번째면 content에 납기일자 대입
            } else {
                content = $(tr).find("td:eq(" + idx + ")").text();
            }
            if (content == null || content == '') {
                $(td).addClass("nullVol");
                flag = true;
            }
        }
    }
    if(flag){
        requiredWarn();
        return true;
    } else {
        return false;
    }

}


function modifyHdSaveAjax(obj){
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];
    $.ajax({
        url : 'outManage/hd/update',
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
    node +=`<input type="hidden">
            <td class="productCode canModifyTd" data-toggle="modal" data-target=".bd-example-modal-lg"></td>
            <td></td>
            <td class="canModifyTd"><input type="date" min="`+ today + `"></td>
            <td class="canModifyTd"></td>
        </tr>`;
    $("#ordMngTable tbody").append(node);
});


//주문헤더 insert
function addHdSaveAjax(addList) {
    let slsOrdHdDate = $("#slsOrdHdDate").val();
    let vendCdCode = $("#vendor").val();
    let empId = $("#empId").val();
    let slsOrdHdRemk = $("#remk").val();
    let slsOrdDtlVO = [];

    //추가하는 tr 다 가져와 for문을 돌려서 slsOrdDtlVO에 리스트 형태로 push
    for (obj of addList) {
        let finPrdCdCode = $(obj).find("td:eq(1)").text();
        let slsOrdDtlDlvDate = $(obj).find("input[type='date']").val();
        let slsOrdDtlVol = $(obj).find("td:eq(4)").text();
        let addDtl = {
            finPrdCdCode,
            slsOrdDtlDlvDate,
            slsOrdDtlVol
        }
        slsOrdDtlVO.push(addDtl);
    }
    $.ajax({
        url: 'ordManage/hdDtlInsert',
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            slsOrdHdVO: {
                slsOrdHdDate,
                vendCdCode,
                empId,
                slsOrdHdRemk
            },
            slsOrdDtlVO
        }),
        success: function (result) {
            console.log("orderHdDtl 추가 성공")
        }
    })
}

//기존 주문 추가 등록Ajax
function addDtlSaveAjax(obj, slsOrdHdNo) {
    let finPrdCdCode = $(obj).find("td:eq(1)").text();
    let slsOrdDtlDlvDate = $(obj).find("input[type='date']").val();
    let slsOrdDtlVol = $(obj).find("td:eq(4)").text();

    $.ajax({
        url: 'ordManage/dtlInsert',
        type : 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            slsOrdHdNo,
            finPrdCdCode,
            slsOrdDtlDlvDate,
            slsOrdDtlVol
        }),
        success : function(result) {
            console.log("orderDtl 추가 성공");
        }

    })
}
//추가 끝


//체크박스 전체선택 & 해제
$("#allCheck").on("click", function () {
    if ($("#allCheck").prop("checked")) {
        $("input[type=checkbox]").prop("checked", true);
    } else {
        $("input[type=checkbox]").prop("checked", false);
    }
});

//선택 삭제 이벤트
$("#deleteBtn").on("click", function () {
    if ($("input[type='checkbox']:checked").length === 0) {
        deleteWarning();
        return;
    }
    table.find("tbody input:checkbox[name='cb']").each(function(idx,el){
        if($(el).is(":checked")){                                  
            let tr = $(el).closest('tr');
            let priKey = tr.find("input[type='hidden']").val();
            delList.push(priKey);
            tr.remove();
            for(let i = 0; i< modifyList.length; i++){              
                if (modifyList[i][0] == priKey) {                   //수정목록의 길이만큼 돌면서[0]번째:priKey값이 같으면 
                    modifyList.splice(i, 1);                        //[priKey, updCol, updCont]에서 배열 i번재부터 1개의 값을 썰어버림
                }
            }
        }
    });
});

function deleteHdSaveAjax(slsOrdHdNo){
    $.ajax({
        url : 'ordManage/hd/delete',
        type : 'DELETE',
        dataType : 'text',
        contentType: "application/json; charset=UTF-8;",
        data : JSON.stringify({
            slsOrdHdNo
        }),
        success : function(result){
            console.log("삭제 성공");
        }
    });
}

function deleteSaveAjax(delList) {
    $.ajax({
        url: 'ordManage/delete',
        type : 'DELETE',
        dataType: 'text',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
        data : {
            delList
        },
        success: function (result) {
            console.log("삭제 성공");
        }
    });
}

function checkModifyOrAdd(slsOrdHdNo){
    if (slsOrdHdNo != null && slsOrdHdNo != ''){
        return true; //수정 중
    } else {
        return false;
    }
}

function checkOrder(slsOrdHdNo){
    let result;
    $.ajax({
        url:'checkOrder',
        type: 'GET',
        async: false,
        data: {
            slsOrdHdNo
        },
        success: function(suc){
            result = suc;
        }
    });

    console.log(result);
    return result;
}

//alert
function deleteWarning() {
    Swal.fire({
        icon: "warning", // Alert 타입
        title: "삭제할 항목을 선택하세요.", // Alert 제목
        confirmButtonText: "확인"
    });
}

function requiredWarn() {
        Swal.fire({
            icon: "warning",
            title: "입력하지 않은 값이 있습니다.",
            text: "확인하고 다시 저장해주세요"
        });
    }

function noDataWarn() {
    Swal.fire({
        icon: "warning",
        title: "입력된 값이 없습니다.",
    });
}

function insertHeaderWarning() {
    Swal.fire({
        icon: "warning",
        title: "필수 항목 미입력",
        html: "주문일자, 담당자, 거래처는 <br/> 기본 입력사항입니다."
    });
}
    
function changeWarning() {
    Swal.fire({
        icon: "warning",
        title: "수정 불가",
        html: "출고내역이 존재하는 주문입니다."
    });
}

function minusWarning() {
    Swal.fire({
        icon: "warning",
        title: "0보다 큰 값의 숫자만 <br> 입력할 수 있습니다.",
        text: "다시 입력해주세요.",
        confirmButtonText: "확인",
    });
}
});