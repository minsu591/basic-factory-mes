var now_utc = Date.now() // 지금 날짜를 밀리초로
// getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
var timeOff = new Date().getTimezoneOffset() * 60000; // 분단위를 밀리초로 변환
// new Date(now_utc-timeOff).toISOString()은 '2022-05-11T18:09:38.134Z'를 반환
var today = new Date(now_utc - timeOff).toISOString().split("T")[0];

$("document").ready(function () {
  $("#selectBtn").on("click", function () {
    let mchnName = $("#mchnName").val();

    $.ajax({
      url: "mchn/name",
      method: "GET",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      data: {
        mchnName
      },
      success: function (result) {
        $("#mchntbody tr").remove();
        for (obj of result) {
          mchnMakeRow(obj);
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });

  function mchnMakeRow(obj) {
    console.log(obj.mchnInspcNxtDate);
    let node = `<tr>`;
    if ($("#allCheck").is(":checked")) {
      node += `<td class="cantModifyTd"><input type="checkbox" name="chk" checked></td>`;
    } else {
      node += `<td class="cantModifyTd"><input type="checkbox" name="chk"></td>`;
    }
    node += `<td class="cantModifyTd">${obj.mchnCode}</td>
              <td>${obj.mchnName}</td>
              <td>${obj.mchnModel}</td>
              <td class="vendor curPo">${obj.vendCdCode}</td>
              <td class="cantModifyTd">${obj.vendCdNm}</td>
              <td>${obj.mchnPrice}</td>
              <td><input type="date" value="${obj.mchnMnfctDate}"></td>
              <td><input type="date" value="${obj.mchnPrchsDate}"></td>
              <td>${obj.mchnInspcCycle}</td>
              <td><input type="date" value="${obj.mchnInspcNxtDate}"></td>
              <td class="cantModifyTd">${obj.mchnStts}</td>
              <td>${obj.mchnRemk}</td>
            </tr>`
    $("#mchntbody").append(node);
  }

  //체크박스 체크유무
  $("#allCheck").click("change", function () {
    if ($("#allCheck").is(":checked")) {
      $("#mchntbody input:checkbox[name='chk']").prop("checked", true);
    } else {
      $("#mchntbody input:checkbox[name='chk']").prop("checked", false);
    }
  });
  $("#mchntbody").on("click", "input:checkbox[name='chk']", function (e) {
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if (total != checked) {
      $("#allCheck").prop("checked", false);
    } else {
      $("#allCheck").prop("checked", true);
    }
    e.stopPropagation();
  });

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
            <td class="vendor curPo"></td>
            <td class="cantModifyTd"></td>
            <td></td>
            <td><input type="date"></td>
            <td><input type="date"></td>
            <td></td>
            <td><input type="date"></td>
            <td class="cantModifyTd">진행전</td>
            <td></td>
          </tr>`;
    $("#mchntbody").append(node);
  });



  //수정이 되는 list 정의
  let modifyList = [];
  let addList = [];
  let delList = [];
  //수정할 테이블
  let table = $("#mchnTable");
  //td 수정을 적용할 인덱스(모달창, input 빼고 오직 td에서 이루워 지는 수정만)
  let avArr = [2, 3, 6, 9, 12];
  //notNull인 td
  let notNullList = [2, 4, 9, 10];
  //primary키인 index
  let priKeyIdx = 1;

  //수정 이벤트
  table.find("tbody").on("click", "td", function (e) {
    let col = $(this).index();
    let flag = false;
    let tdInfo = $(this);
    let defaultVal;

    if (tdInfo.hasClass("nullTd")) {
      tdInfo.removeClass("nullTd");
    }

    //구매일자, 차기점검일 비교
    if(tdInfo.children("input").length == 1){
      let inputInfo = tdInfo.find("input");
      //구매일자
      if(tdInfo.next().children("input").length == 1){
        let mnfctDate = tdInfo.prev().find("input").val();      //mnfctDate 제작일자
          if(mnfctDate != null && mnfctDate != ''){
            inputInfo.attr("min",mnfctDate);
          }else{
            inputInfo.attr("min",'');
          }
      //차기점검일
      }else if(tdInfo.parent().children().eq(10).find("input").length == 1){
        let prchsDate = tdInfo.parent().children().eq(8).find("input").val();      //prchsDate 구매일자
        if(prchsDate != null && prchsDate != ''){
          inputInfo.attr("min",prchsDate);
        }else{
          inputInfo.attr("min",today);
        }
      }
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
    defaultVal = tdInfo.text();
    tdInfo.addClass("tdBorder");
    tdInfo.focus(); //아직도 일어나고 있는 포커스를 죽이고 다시 포커스

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
      //not null이여야하는 값이 null이 되면 이전에 입력한 값으로 돌려놓게
      if (tdInfo.text() == null || tdInfo.text() == '') {
        for (idx of notNullList) {
          if (col == idx) {
            tdInfo.text(defaultVal);
            break;
          }
        }
      } else {
        if (col == 6 || col == 10) {
          let txt = tdInfo.text();
          let parseIntVol = parseInt(txt);    //parseInt 문자열을 정수로 반환
          if (!$.isNumeric(parseIntVol)) {      //isNumeric 숫자로 인식되는 경우 IsNumeric은 True를 반환합니다. 그렇지 않으면 False 를 반환
            //txt가 숫자가 아니면
            tdInfo.text('');
            return false;
          } else if ($.isNumeric(parseIntVol) && txt != parseIntVol) {
            //txt가 숫자와 문자가 섞여있으면
            tdInfo.text(parseIntVol);
          }
          
          if (col == 6) {
            tdInfo.text(parseIntVol.toLocaleString("ko-KR"));
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

  //콤마 없애기
  function commaSubtract(updCont){
    mchnPrice = updCont.split(",").join(""); //콤마 제거
    mchnPrice = Number(mchnPrice);
    return mchnPrice;
  }

  //기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
  table.find("tbody").on("change", "td:not(:first-child)", function (e) {         //조회해온 tbody에 change 이벤트가 발생했을 때, td 첫번째 자식요소를 제외한 나머지 td들이 적용됨
    e.preventDefault();

    let col = $(this).index();                                              //클릭된 td의 index를 col변수에 저장(숨겨진 td의 index값만 찾음)
    let priKey = $(this).parent().find("td:eq(" + priKeyIdx + ")").text();  //해당 td의 부모에서 프라이머리키 값이 있는 태그를 찾아 그 값을 저장
    let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");        //th의 col번째 th name값 갖고 옴(수정될 column)
    let updCont = $(this).text();                                               //해당 td의 text값을 저장(수정될 content);

    if (col == 7) {                                                               //수정하고 싶은 td를 클릭하면 td text만 가져오게 되어있는데 
      updCont = $(this).find("input[type='date']").val();                       //예외적으로 체크박스나 날짜 데이터는 td안에 input이니까 td안에 input value도 가져오겠다
    } else if (col == 8) {
      updCont = $(this).find("input[type='date']").val();
    } else if (col == 10) {
      updCont = $(this).find("input[type='date']").val();
    }else if (col == 6){
      //숫자 있을 때
      updCont = commaSubtract(updCont);
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
    let td = table.find("#mchntbody td");
    if (td.length == 0 && modifyList.length == 0 && delList.length == 0) {
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
    }).then((result) => {
      if (result.isConfirmed) {
        //null 검사
        let tbody = table.find("tbody tr");
        for (tr of tbody) {
          for (idx of notNullList) {
            let td = $(tr).find("td:eq(" + idx + ")");
            let content;
            if (idx == 10) {
              content = $(tr).find("td:eq(10) input[type='date']").val();
              console.log(content);
            } else {
              content = td.text();
            }
            if (content == null || content == '') {
              $(td).addClass("nullTd");
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

        //수정용
        for (obj of modifyList) {
          modifySaveAjax(obj);
        }
        //추가용
        let trs = $("#mchntbody").find("tr[name='addTr']");
        for (tr of trs) {
          mchnCode = $(tr).find("td:eq(1)").text();
          console.log("신규 추가등록!!");
          addSaveAjax(tr);
        }
        //삭제용
        if (delList.length != 0) {
          deleteSaveAjax(delList);
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

  function modifySaveAjax(obj) {
    //checkbox인거
    let priKey = obj[0];
    let updCol = obj[1];
    let updCont = obj[2];
    console.log("modify");
    $.ajax({
      url: 'mchn/update',
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
        console.log("서버 오류 : " + error);
      }
    });
  };

  // 추가 등록 Ajax
  function addSaveAjax(tr) {
    let mchnName = $(tr).find("td:eq(2)").text();
    let mchnModel = $(tr).find("td:eq(3)").text();
    let vendCdCode = $(tr).find("td:eq(4)").text();
    let mchnPrice = commaSubtract($(tr).find("td:eq(6)").text());
    let mchnPrchsDate = $(tr).find("td:eq(7) input[type='date']").val()
    let mchnMnfctDate = $(tr).find("td:eq(8) input[type='date']").val()
    let mchnInspcCycle = $(tr).find("td:eq(9)").text();
    let mchnInspcNxtDate = $(tr).find("td:eq(10) input[type='date']").val()
    let mchnStts = $(tr).find("td:eq(11)").text();
    let mchnRemk = $(tr).find("td:last").text();

    console.log(mchnPrice);
    $.ajax({
      url: 'mchn/insert',
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        mchnName,
        mchnModel,
        vendCdCode,
        mchnPrice,
        mchnPrchsDate,
        mchnMnfctDate,
        mchnInspcCycle,
        mchnInspcNxtDate,
        mchnStts,
        mchnRemk
      }),
      success: function () {
        console.log("추가 성공");
      },
      error: function (err) {
        console.log(err);
      }
    })
  }

  //선택 삭제 이벤트
  $("#deleteBtn").on("click", function () {
    table.find("tbody input:checkbox[name='chk']").each(function (idx, el) {
      if ($(el).is(":checked")) {
        let tr = $(el).closest('tr');
        let priKey = tr.find("td:eq(" + priKeyIdx + ")").text();
        delList.push(priKey);
        tr.remove();
        for (let i = 0; i < modifyList.length; i++) {
          if (modifyList[i][0] == priKey) {
            modifyList.splice(i, 1);
          }
        }
      }
    });
    //내부에 내용이 없으면 allCheck 해제
    if (table.find("tbody tr").length == 0) {
      $("#allCheck").prop("checked", false);
    }
  });

  function deleteSaveAjax(delList) {
    $.ajax({
      url: 'mchn/delete',
      type: 'POST',
      dataType: 'text',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
      data: {
        delList
      },
      success: function (result) {
        console.log("삭제 성공");
      }
    })
  }

  function requiredWarning() {
    Swal.fire({
      icon: "warning",
      title: "데이터를 입력해 주세요."
    });
  }

});
