$("document").ready(function () {

  //오늘 일자
  // day = new Date();
  // day = day.toISOString().slice(0, 10);
  // today = $("#fltyPrcsDate");
  // today.val(day);

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#fltyPrcstbody input:checkbox[name='chk']").prop("checked", true);
    } else {
      $("#fltyPrcstbody input:checkbox[name='chk']").prop("checked", false);
    }
  });
  $("#fltyPrcstbody").on("click", "input:checkbox[name='chk']", function (e) {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if ((total != checked)) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
    e.stopPropagation();
  });

  //초기화 버튼
  $("#resetBtn").click(function () {
    $("#fltyPrcstbody tr").remove();
    $("#allCheck").prop("checked", false);
    $("#processPerfomNo").val('');
    $("#productname").val('');
    $("#productcode").val('');
    $("#proccdname").val('');
    $("#mchnname").val('');
  })

  //수정이 되는 list 정의
  let hdModifyList = [];
  let modifyList = [];
  let addList = [];
  //수정할 테이블
  let table = $("#fltyPrcsTable");
  //td 수정을 적용할 인덱스(모달창, input 빼고 오직 td에서 이루워 지는 수정만)
  let avArr = [4, 7];
  //notNull인 td
  let notNullList = [2,4,5,6];
  //primary키인 index
  let fltyPrcsPriKeyIdx = 1;

  //수정 이벤트
  table.find("tbody").on("click", "td", function (e) {
    let col = $(this).index();
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;

    if (tdInfo.hasClass("nullTd")) {
      tdInfo.removeClass("nullTd");
    }

    //수정 적용할 인덱스인지 확인
    for (let i = 0; i < avArr.length; i++) {
      if (col == avArr[i]) {
        flag = true;
        break;
      }
    }

    //해당사항 없으면 return
    if (!flag) {
      return;
    }

    //td에 입력할 수 있도록 설정(contenteditable)
    tdInfo.attr("contenteditable", "true");

    //td에 focus가 되면
    tdInfo.unbind("focus").bind("focus", function () {  //아직도 일어나고 있는 포커스를 죽이고 다시 포커스
      defaultVal = tdInfo.text();
      tdInfo.addClass("tdBorder");
    });

    //enter나 esc 누르면 블러 되도록
    tdInfo.on("keyup", function (key) {
      if (key.keyCode == 13 || key.keyCode == 27) {
        key.preventDefault();
        tdInfo.blur();
      }
    });

    //td에 blur가 되면(포커스 잃으면)
    tdInfo.unbind("blur").bind("blur", function (e) {
      e.preventDefault();
      tdInfo.attr("contenteditable", "false").removeClass("tdBorder");
      //not null이여야한느 값이 null이 되면 이전에 입력한 값으로 돌려놓게
      if (tdInfo.text() == null || tdInfo.text() == '') {
        for (idx of notNullList) {
          if (col == idx) {
            tdInfo.text(defaultVal);
            break;
          }
        }
      } else {
        if (col == 4) {
          let txt = tdInfo.text();
          let parseIntVol = parseInt(txt);      //parseInt 문자열을 정수로 반환
          if (!$.isNumeric(parseIntVol)) {      //isNumeric 숫자로 인식되는 경우 IsNumeric은 True를 반환합니다. 그렇지 않으면 False 를 반환
            //txt가 숫자가 아니면
            tdInfo.text('');
            return false;
          } else if ($.isNumeric(parseIntVol) && txt != parseIntVol) {
            //txt가 숫자와 문자가 섞여있으면
            tdInfo.text(parseIntVol);
          }
        }
      }
      //추가된 행이면 modifyList에 추가되지 않게
      if (tdInfo.closest("tr").attr("name") != 'addTr') {
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
    let priKey = $(this).parent().find("td:eq(" + fltyPrcsPriKeyIdx + ")").text();  //해당 td의 부모에서 프라이머리키 값이 있는 태그를 찾아 그 값을 저장
    let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");        //th의 col번째 th name값 갖고 옴(수정될 column)
    let updCont = $(this).text();                                               //해당 td의 text값을 저장(수정될 content);

    if (col == 5) {                                                               //수정하고 싶은 td를 클릭하면 td text만 가져오게 되어있는데 
      updCont = $(this).find("input[type='date']").val();                       //예외적으로 체크박스나 날짜 데이터는 td안에 input이니까 td안에 input value도 가져오겠다
    }
    if (priKey != null && priKey != '') {                                        //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
      checkNewModify(priKey, updCol, updCont);
    }

    e.stopPropagation();
  });

  function checkNewModify(priKey, updCol, updCont) {
    for (p of modifyList) {                               //한번 수정한 값에서 다시 수정할때
      if (p[0] == priKey && p[1] == updCol) {            //modifyList의 한 건에 대해 같은 값을 수정하는 것이라면 
        p[2] = updCont                                  //새로 추가가 아닌 기존 배열에 수정
        return;
      }
    }
    let modifyTr = [priKey, updCol, updCont];
    modifyList.push(modifyTr);
  }

  //저장 버튼 이벤트
  $("#saveBtn").on("click", function () {
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
    }).then((result) => {
      if (result.isConfirmed) {
        if($(""))
        //null 검사
        for (tr of trs) {
          for (idx of notNullList) {
            let content = $(tr).find("td:eq(" + idx + ")").text();
            if(idx == 5) {
              content = $(tr).find("input[type='date']").val();
            }

            if (content == null || content == '') {
              $(tr).find("td:eq(" + idx + ")").addClass("nullTd");
              nullFlag = true;
            }
          }
        }
        if (nullFlag) {
          Swal.fire({
            icon: "error",
            title: "비어있는 데이터가 존재합니다",
            text: "확인하고 다시 저장해주세요"
          });
          return false;
        }

        //바로 저장버튼 눌렀을때 경고창 띄우기
        if(trs.length == 0 && modifyList.length == 0) {
          requiredWarning();
          return false;
        }

        //헤더 항목 미기재시
        // if(exNull() || ) {

        // }

        //수정용
        for (obj of modifyList) {
          modifySaveAjax(obj);
        }

        //추가용
        addList = $("#fltyPrcstbody").find("tr[name='addTr']");
        let fltyPrcsNo;
        for (tr of addList) {
          fltyPrcsNo = $(tr).find("td:eq(1)").text();
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
        }).then((result) => {
          location.reload();
        });
      }
    });
  });

  function modifySaveAjax(obj) {
    //checkbox인거
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];
    console.log("modify");
    $.ajax({
      url: 'fltyPrcs/update',
      type: "POST",
      dataType: 'text',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
      data: {
        priKey,
        updCol,
        updCont
      },
      success: function () {
        console.log("업데이트 완료");
      }, error: function (error) {
        alert("서버 오류 : " + error);
      }
    });
  };

  //불량처리 추가 등록 Ajax
  function addSaveAjax(tr) {
    let processPerfomNo = $("#processPerfomNo").val();
    let faultyCdCode = $(tr).find("td:eq(2)").text();
    let fltyPrcsVol = $(tr).find("td:eq(4)").text();
    let fltyPrcsDate = $(tr).find("input[type='date']").val();
    let empId = $(tr).find("td:eq(6)").text();
    let fltyPrcsRemk = $(tr).find("td:eq(7)").text();

    $.ajax({
      url: 'fltyPrcs/insert',
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        processPerfomNo,
        faultyCdCode,
        fltyPrcsVol,
        fltyPrcsDate,
        empId,
        fltyPrcsRemk
      }),
      success: function () {
        console.log("추가 성공");
      },
      error: function (err) {
        console.log(err);
      }
    })
  }

  //행추가 이벤트
  $("#addBtn").on("click", function () {
    let empId = $("#sideBarEmpId").val();
    let node = `<tr name="addTr">
                  <td class="cantModifyTd"><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")) {
      node = `<tr>
                <td class="cantModifyTd"><input type="checkbox" name="chk" checked ></td>`;
    }
    node += `<td name="flty_prcs_no"></td>
            <td class="faultyCode curPo"></td>
            <td class="faultyName cantModifyTd"></td>
            <td></td>
            <td><input type="date"></td>
            <td class="empId curPo">${empId}</td>
            <td></td>
        </tr>`;
    $("#fltyPrcstbody").append(node);
  });

  //선택 삭제 이벤트
  $("#deleteBtn").on("click", function () {
    $("#fltyPrcstbody").find("input:checkbox[name='chk']").each(function (idx, el) {
      if ($(el).is(":checked")) {
        let tr = $(el).closest('tr');
        tr.remove();
      }
    });
    //내부에 내용이 없으면 allCheck 해제
    if (table.find("tbody tr").length == 0) {
      $("#allCheck").prop("checked", false);
    }
  });

  //생산 불량 목록 tr 클릭
  $("#procFltytbody").on("click", "tr", function (e) {
    let procPerfomNo = $(this).find("td:first").text();
    let finCode = $(this).find("td:eq(2)").text();
    let finCdName = $(this).find("td:eq(3)").text();
    let procName = $(this).find("td:eq(5)").text();
    let mchnName = $(this).find("td:eq(6)").text();

    $("#processPerfomNo").val(procPerfomNo);
    $("#processPerfomNo").prop("disabled", false);
    $("#productcode").val(finCode);
    $("#productname").val(finCdName);
    $("#proccdname").val(procName);
    $("#mchnname").val(mchnName);

    if ($("#fltyPrcstbody tr").length != 0) {
      if (confirm('현재 입력한 내용이 모두 삭제됩니다.') == true) {
        modifyList = [];
        addList = [];
        $("#fltyPrcstbody tr").remove();
      } else {
        return false;
      }
    }
  });


  function requiredWarning() {
    Swal.fire({
      icon: "warning",
      title: "데이터를 입력해 주세요."
    });
  }
});