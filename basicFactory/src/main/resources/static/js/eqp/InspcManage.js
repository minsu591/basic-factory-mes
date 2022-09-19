$("document").ready(function () {
  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#inspctbody input:checkbox[name='chk']").prop("checked", true);
    } else {
      $("#inspctbody input:checkbox[name='chk']").prop("checked", false);
    }
  });
  $("#inspctbody").on("change", "input:checkbox[name='chk']", function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
  });

  //수정이 되는 list 정의
  let modifyList = [];
  let addList = [];
  let delList = [];
  //수정할 테이블
  let table = $("#inspcTable");
  //td 수정을 적용할 인덱스(모달창, input 빼고 오직 td에서 이루워 지는 수정만)
  let avArr = [6,7,9];
  //notNull인 td
  let notNullList = [2,3,4,5,6,8];
  //primary키인 index
  let priKeyIdx = 1;
  //selectBox 만들기 위한 리스트
  let clfyList = ['','임시점검','정기점검','수리'];

  //수정 이벤트
  table.find("tbody").on("click", "td", function(e){
    let col = $(this).index();
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;

    //nullTd class 제거
    if(tdInfo.hasClass("nullTd")){
      tdInfo.removeClass("nullTd");
    }

    //수정 적용할 인덱스인지 확인
    for(let i = 0; i<avArr.length; i++){
      if(col == avArr[i]){
          flag = true;
          break;
      }
    }

    //해당사항 없으면 return
    if(!flag){
      return;
    }

    //td에 입력할 수 있도록 설정(contenteditable)
    tdInfo.attr("contenteditable", "true");

    //td에 focus가 되면
    tdInfo.unbind("focus").bind("focus", function(){  //아직도 일어나고 있는 포커스를 죽이고 다시 포커스
      defaultVal = tdInfo.text();
      tdInfo.addClass("tdBorder");
    });

    //enter나 esc 누르면 블러 되도록
    tdInfo.on("keyup", function(key){
      if(key.keyCode == 13 || key.keyCode == 27){
        key.preventDefault();
        tdInfo.blur();
      }
    });

    //td에 blur가 되면(포커스 잃으면)
    tdInfo.unbind("blur").bind("blur", function(e){
      e.preventDefault();
      tdInfo.attr("contenteditable", "false").removeClass("tdBorder");
      //not null이여야한느 값이 null이 되면 이전에 입력한 값으로 돌려놓게
      if(tdInfo.text() == null || tdInfo.text() == ''){
        for(idx of notNullList){
          if(col == idx){
            tdInfo.text(defaultVal);
            return false;
          }
        }
      }
      //addTr은 수정에 들어가지 않게 막기
      if(tdInfo.closest("tr").attr("name")!='addTr'){
        //포커스가 나갈 때 체인지 이벤트를 강제로 일으킴(값이 변할 경우 변화를 캐치하는 이벤트)
        tdInfo.trigger("change");
      }
    
      e.stopPropagation();
    });
  });

  //기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
  table.find("tbody").on("change", "td:not(:first-child)", function (e) {         //조회해온 tbody에 change 이벤트가 발생했을 때, td 첫번째 자식요소를 제외한 나머지 td들이 적용됨
    e.preventDefault();

    let col = $(this).index();                                              //클릭된 td의 index를 col변수에 저장(숨겨진 td의 index값만 찾음)
    let priKey = $(this).parent().find("td:eq("+priKeyIdx+")").text();  //해당 td의 부모에서 프라이머리키 값이 있는 태그를 찾아 그 값을 저장
    let updCol = table.find("thead").find("th:eq("+col+")").attr("name");        //th의 col번째 th name값 갖고 옴(수정될 column)
    let updCont;                                                                //해당 td의 text값을 저장(수정될 content);
 
    if(col == 4){                                                               //수정하고 싶은 td를 클릭하면 td text만 가져오게 되어있는데 
      updCont = $(this).find("td:eq(4) input[type='date']").val();                       //예외적으로 체크박스나 날짜 데이터는 td안에 input이니까 td안에 input value도 가져오겠다
    } else if(col == 5){                                                               //수정하고 싶은 td를 클릭하면 td text만 가져오게 되어있는데 
      updCont = $(this).find("td:eq(5) input[type='date']").val();                       //예외적으로 체크박스나 날짜 데이터는 td안에 input이니까 td안에 input value도 가져오겠다
    } else if(col == 6){
      //selectBox일 때
      updCont = $(this).find("td:eq(6) select option:selected").val();
    } else {
      //td일 때
      updCont = $(this).text();
    }

    if(priKey != null && priKey != '') {                                        //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
      checkNewModify(priKey, updCol, updCont);
    }

    e.stopPropagation();
  });

  function checkNewModify(priKey, updCol, updCont) {
    for(p of modifyList){                               //한번 수정한 값에서 다시 수정할때
      if(p[0] == priKey && p[1] == updCol) {            //modifyList의 한 건에 대해 같은 값을 수정하는 것이라면 
        p[2] = updCont                                  //새로 추가가 아닌 기존 배열에 수정
        return;
      }
    }
    let modifyTr = [priKey, updCol, updCont];
    modifyList.push(modifyTr);
  }

  //저장 버튼 이벤트
  $("#saveBtn").on("click", function() {
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
    }).then((result) => {
      if(result.isConfirmed){
        for(tr of trs){
          //null 검사
          for(idx of notNullList){                                                   //tr돌면서 notNullList index가 null인지 검사
            let content = $(tr).find("td:eq("+idx+")").text();
            if(idx == 4){                                                               //수정하고 싶은 td를 클릭하면 td text만 가져오게 되어있는데 
              content = $(tr).find("td:eq("+idx+") input[type='date']").val();                       //예외적으로 체크박스나 날짜 데이터는 td안에 input이니까 td안에 input value도 가져오겠다
            } else if(idx == 5){
              content = $(tr).find("td:eq("+idx+") input[type='date']").val();
            } else if(idx == 6){
              content = $(tr).find("td:eq("+idx+") select option:selected").val();
            }

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

        //바로 저장버튼 눌렀을때 경고창 띄우기
        let td = table.find("#mchntbody td");
        if(td.length == 0 && modifyList.length == 0 && delList.length == 0) {
          requiredWarning();
          return false;
        }

        //수정용
        for(obj of modifyList) {
          modifySaveAjax(obj);
        }
        //추가용
        addList = table.find("tr[name='addTr']");
        for(obj of addList){
          console.log("신규 추가등록!!");
          addSaveAjax(tr);
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
      } else{
        return;
      }
    });
  });

  function modifySaveAjax(obj) {
    //checkbox인거
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];

    $.ajax({
      url : 'inspc/update',
      type : "POST",
      dataType : 'text',
      contentType : "application/x-www-form-urlencoded; charset=UTF-8;",
      data : {
        priKey,
        updCol,
        updCont
      },
      success : function() {
        console.log("업데이트 완료");
      }, error : function(error) {
        console.log("서버 오류 : " + error);
      }
    });
  };

  //행추가 이벤트
  $("#addBtn").on("click", function () {
    let empId = $("#sideBarEmpId").val();
    let node = `<tr name="addTr">
                  <td class="cantModifyTd"><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")) {
      node = `<tr>
                <td class="cantModifyTd"><input type="checkbox" name="chk" checked ></td>`;
    }
    node += `<td class="cantModifyTd"></td>
            <td class="mchnCode curPo"></td>
            <td class="cantModifyTd"></td>
            <td><input type="date"></td>
            <td><input type="date"></td>`;
    node += makeSelectForClfy('');
    node += `<td></td>
            <td class="empId curPo">${empId}</td>
            <td></td>
        </tr>`;
    $("#inspctbody").append(node);
  });

  function makeSelectForClfy(clfy){
    let node = '<td><select class="curPo">';
    for(let i =0; i<clfyList.length;i++){
      if(clfy == clfyList[i]){
        node += '<option value="'+clfyList[i]+'"selected>'+clfyList[i]+'</option>';
      }else{
        node += '<option value="'+clfyList[i]+'">'+clfyList[i]+'</option>';
      }
    }
    node += '</select></td>';
    return node;
  }

  //추가 등록 Ajax
  function addSaveAjax(tr){
    let mchnCode = $(tr).find("td:eq(2)").text();
    let inspcSdate = $(tr).find("td:eq(4) input[type='date']").val();
    let inspcEdate = $(tr).find("td:eq(5) input[type='date']").val();
    let inspcActnPnt = $(tr).find("td:eq(6) option:selected").val();
    console.log(inspcActnPnt);
    let inspcActnRsn = $(tr).find("td:eq(7)").text();
    let empId = $(tr).find("td:eq(8)").text();
    let inspcRemk = $(tr).find("td:eq(9)").text();
    
    
    $.ajax({
      url : 'inspc/insert',
      type : 'POST',
      contentType: "application/json;charset=utf-8",
      data :  JSON.stringify({
        mchnCode,
        inspcSdate,
        inspcEdate,
        inspcActnPnt,
        inspcActnRsn,
        empId,
        inspcRemk
      }),
      success : function(){
        console.log("추가 성공");
      },
      error : function(err){
        console.log(err);
      }
    })
  }

  //선택 삭제 이벤트
  $("#deleteBtn").on("click",function(){
    if ($("input[type='checkbox']:checked").length === 0) {
      deleteWarning();
      return;
    }
    table.find("tbody input:checkbox[name='chk']").each(function(idx,el){
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
  

  function deleteWarning() {
    Swal.fire({
      icon: "warning", // Alert 타입
      title: "삭제할 항목을 선택하세요." // Alert 제목
    });
  }

  function requiredWarning() {
    Swal.fire({
      icon: "warning",
      title: "데이터를 입력해 주세요."
    });
  }

});
