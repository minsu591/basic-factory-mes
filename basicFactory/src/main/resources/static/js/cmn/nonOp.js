$("document").ready(function () {
  //조회버튼 click 이벤트
  $("#selectBtn").on("click", function () {
    let nonOpName = $("#nonOpName").val();
    $.ajax({
      url: "nonOpCode/findname",
      method: "GET",
      dataType: "json",
      data: {
        nonOpName
      },
      success: function (result) {
        $("#nonOpTable tbody tr").remove();
        for (obj of result) {
          makeRow(obj);
        }
      },
    });
  });

  //추가 버튼 누르면 행 추가
  $("#addBtn").on("click", function () {
    let node = `<tr name="addTr">
                  <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")) {
        node = `<tr>
                  <td><input type="checkbox" name="chk" checked></td>`;
    }
    node += `<td></td>
              <td></td>
              <td></td>
            </tr>`;

    $("#nonOpTable tbody").append(node);
  });

  function makeRow(obj) {
    let node = `<tr>
                  <td><input type="checkbox" name="chk"></td>
                  <td>${obj.nonOpCode}</td>
                  <td>${obj.nonOpName}</td>
                  <td>${obj.nonOpRemk}</td>
                </tr>`;
    $("#nonOpTable tbody").append(node);
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#nonOpTable tbody input:checkbox[name=chk]").prop("checked", true);
    } else {
      $("#nonOpTable tbody input:checkbox[name=chk]").prop("checked", false);
    }
  });
  $("input[name=chk]").click(function () {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) $("#allCheck").prop("checked", false);
    else $("#allCheck").prop("checked", true);
  });

  //수정될거 저장하는 list 정의
  let modifyList = [];
  let addList = [];
  let delList = [];
  //수정할 테이블
  let table = $("#nonOpTable");
  //td 수정을 적용할 인덱스
  let avArr = [2,3];
  //notNull이어야하는 idx
  let notNullList = [2];
  //primary키인 index
  let priKeyIdx = 1;

  //수정 이벤트
  table.find("tbody").on("click","td",function(e){
    e.stopPropagation();
    let col = $(this).index();
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;

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
    //enter나 esc 누르면 blur되도록
    tdInfo.on("keyup",function(key){
        if(key.keyCode == 13 || key.keyCode == 27){
            key.preventDefault();
            tdInfo.unbind("blur").bind("blur");
        }
    });
    //td에 blur가 되면
    tdInfo.unbind("blur").bind("blur",function(e){
        e.preventDefault();
        tdInfo.attr("contenteditable","false")
                .removeClass("tdBorder");
        //not null이어야하는 값은 null이 되면 이전에 입력한 값으로 돌려놓게 setting
        if(tdInfo.text() == null || tdInfo.text() == ''){
            for(idx of notNullList){
                if(col == idx){
                    tdInfo.text(defaultVal);
                    return false;
                }
            }
        }
        //추가된 행이면 modifyList에 추가되지 않게
        if(tdInfo.closest("tr").attr("name") != 'addTr'){
            tdInfo.trigger("change");
        }
        
        e.stopPropagation();
    });
  });

  //기존에 있는 값들 중에 td변경될 때
  table.find("tbody td:not(:first-child)").change(function(e){
    e.preventDefault();
    let col = $(this).index();
    let priKey = $(this).parent().find("td:eq("+priKeyIdx+")").text();
    let updCol =table.find("thead").find("th:eq("+col+")").attr("name");
    let updCont = $(this).text();
    
    if(priKey != null && priKey != '') {                                        //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
      checkNewModify(priKey, updCol, updCont);
    }
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
    if(confirm("저장하시겠습니까?") == true) {
      //null 검사
      for(tr of trs){
        for(idx of notNullList) {   //tr돌면서 notNullList index가 null인지 검사
          let content = $(tr).find("td:eq("+idx+")").text();
          if(content == null || content == '') {
            $(tr).find("td:eq("+idx+")").addClass("nullTd");
            alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요');
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
      //location.reload();
      
    }      
  });

  function modifySaveAjax(obj){
    //checkbox인거
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];
    $.ajax({
      url : 'nonOpCode/update',
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

  function addSaveAjax(obj){
    let nonOpName = $(obj).find("td:eq(2)").text();
    let nonOpRemk = $(obj).find("td:eq(3)").text();

    $.ajax({
      url : 'nonOpCode/insert',
      type : 'POST',
      dataType : 'text',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
      data : {
        nonOpName,
        nonOpRemk
      },
      success : function(result){
          console.log("추가 성공");
      }
    })
  }

  //선택 삭제 이벤트
  $("#deleteBtn").on("click",function(){
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
  });

  function deleteSaveAjax(delList){
    $.ajax({
        url : 'nonOpCode/delete',
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