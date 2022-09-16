$("document").ready(function () {
  //조회버튼 click 이벤트
  $("#selectBtn").on("click", function () {
    let faultyName = $("#faultyName").val();
    $.ajax({
      url: "faultyCode/findName",
      method: "GET",
      dataType: "json",
      data: {
        faultyName: faultyName
      },
      success: function (result) {
        $("#faultyTable tbody tr").remove();
        for (obj of result) {
          faultyMakeRow(obj);
        }
      },
    });
  });

  function faultyMakeRow(obj) {
    let node = `<tr>
                  <td class="cantModifyTd"><input type="checkbox" name="chk"></td>
                  <td class="cantModifyTd">${obj.faultyCdCode}</td>
                  <td>${obj.faultyName}</td>
                  <td>${obj.faultyRemk}</td>
                </tr>`;
    $("#faultyTable tbody").append(node);
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#faultyTable tbody input:checkbox[name=chk]").prop("checked", true);
    } else {
      $("#faultyTable tbody input:checkbox[name=chk]").prop("checked", false);
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
  let table = $("#faultyTable");
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
    //td에 focus가 되면
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
  $("#saveBtn").on("click", function() {
    let trs = table.find("tbody tr[name='addTr']");
    if (trs.length == 0 && modifyList.length == 0 && delList.length == 0) {
      console.log("hi");
      requiredWarning();
      return false;
    }
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
          confirmButtonText: "확인",
          closeOnClickOutside: false,
        }).then((result) =>{
          location.reload();
        });
      }else{
        return;
      }
    });
  });

  function modifySaveAjax(obj){
    //checkbox인거
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];

    $.ajax({
        url : 'faultyCode/update',
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

  //추가 버튼 누르면 행 추가
  $("#addBtn").on("click", function () {
    let node = `<tr name="addTr">
                  <td class="cantModifyTd"><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")) {
        node = `<tr>
                  <td class="cantModifyTd"><input type="checkbox" name="chk" checked></td>`;
    }
    node += `<td class="cantModifyTd"></td>
              <td></td>
              <td></td>
            </tr>`;

    $("#faultyTable tbody").append(node);
  });

  function addSaveAjax(obj){
    let faultyName = $(obj).find("td:eq(2)").text();
    let faultyRemk = $(obj).find("td:eq(3)").text();
    
    $.ajax({
        url : 'faultyCode/insert',
        type : 'POST',
        dataType : 'text',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
        data : {
          faultyName,
          faultyRemk
        },
        success : function(result){
          console.log("추가 성공");
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
  });

  function deleteSaveAjax(delList){
    $.ajax({
      url : 'faultyCode/delete',
      type : 'GET',
      dataType : 'text',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
      data : {
        delList
      },
      success : function(result){
        deleteWarning();
        console.log("삭제 성공");
      }
    })
  }

  function deleteWarning() {
    Swal.fire({
      icon: "warning", // Alert 타입
      title: "삭제할 항목을 선택하세요." // Alert 제목
    });
  }

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
