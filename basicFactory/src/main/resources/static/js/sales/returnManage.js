$(document).ready(function () {

  //오늘 일자
  today = new Date();
  today = today.toISOString().slice(0, 10);
  rtnToday = $("#slsRtnHdDate");
  rtnToday.val(today);

  //체크박스 전체선택 & 해제
  $("#allCheck").on("click", function () {
    if ($("#allCheck").prop("checked")) {
      $("input[type=checkbox]").prop("checked", true);
    } else {
      $("input[type=checkbox]").prop("checked", false);
    }
  });

  //수정될거 저장하는 list 정의
  let modifyList = [];
  let addList = [];
  let delList = [];
  //수정할 테이블
  let table = $("#rtnMngTable");
  //td 수정을 적용할 인덱스 (td기준)
  let avArr = [7, 11];
  //notNull이어야하는 (td기준)
  let notNullList = [7, 10, 11];
  let defaultVal;
  //td 수정 이벤트
  table.find("tbody").on("click","td",function(e){
      e.stopPropagation();
      let col;
      let flag = false;
      tr = $(this).parent();
      tdInfo = $(this);

      if(tr.hasClass("out")){
        col = $(this).index();
      } else {
        col = $(this).index() -1;
      }

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
      tdInfo.unbind("blur").bind("blur", function (e) {
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
             if (col == 7 ) {
                let txt = tdInfo.text();
                let parseIntVol = parseInt(txt);
                if(!$.isNumeric(parseIntVol)){
                    //txt가 숫자가 아니면
                    tdInfo.text('');
                    return false;
                } else if ($.isNumeric(parseIntVol) && txt != parseIntVol){
                    //txt가 숫자와 문자가 섞여있으면
                    tdInfo.text(parseIntVol);
                }
             }
              tdInfo.trigger("change");
          }
          e.stopPropagation();
      });
  });
  

  //기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
    table.find("tbody").on("change", "td:not(:first-child)", function (e) {
        let td = $(this);
        e.preventDefault();
        let tr = $(this).parent(); //클릭된 td의 tr정보 저장
        let col;
        let prcCls = tr.find("td:eq(10)").text();
        if(tr.hasClass("out")){
            col = $(this).index();
        } else {
            col = $(this).index() -1;
        }

        //입고로 반품된 내역 수정 불가
        if (prcCls == '입고' && col == 7 || prcCls == '입고' &&  col == 11) {
            notUpdate();
            td.text(defaultVal);
            return false;
        }
            
      let priKey = $(this).parent().find("input[type='hidden']").val();       
      let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");
      let updCont;
      let flag = true;
      if (col == 10) {
        //selectBox일 때
        updCont = $(this).find("select option:selected").val();
      } else {
        //td일 때
        updCont = $(this).text();
      }

      let finPrdCdCode = tr.find("td:eq(1)").text();              //제품코드
      let fnsPrdStkLotNo = tr.find("td:eq(4)").text();            //lot번호
      let slsOutDtlVol = parseInt(tr.find("td:eq(5)").text());    //출고량
      let slsRtnDtlBaseVol = parseInt(tr.find("td:eq(6)").text());//기반품량
      let slsRtnDtlVol = parseInt(tr.find("td:eq(7)").text());    //반품량
      let danga = parseInt(tr.find("td:eq(8)").text());           //단가
      let slsRtnDtlPrcCls = tr.find("select[name='prcCls']").val();//처리구분
      let slsRtnDtlResn = tr.find("td:eq(11)").text();           //반품사유
      let slsRtnHdNo = $("#slsRtnHdNo").val();

      // 반품량이 출고량보다 많을 때
      if (slsRtnHdNo != null && slsOutDtlVol < (slsRtnDtlBaseVol + slsRtnDtlVol)) {
          Swal.fire({
              icon: "warning",
              title: "반품 등록 불가",
              html: "반품량이 출고량보다 많습니다."
          });
          
          tr.find("td:eq(7)").text(defaultVal);
          return false;
      }

      //0의 값이 입력 됐을 때
      if(slsRtnDtlVol <= 0){
        minusWarning();
        td.text(defaultVal);
        return false;
      }

      if(col == 7){ //반품량 입력했을 때 금액 계산되도록 Nan방지
        tr.find("td:eq(9)").text(Number(slsRtnDtlVol * danga).toLocaleString("ko-KR"));
      }
      if (priKey != null && priKey != '') {
          checkNewModify(priKey, updCol, updCont);
      } else {
        //addList(제품코드, lot번호, 기반품량, 반품량, 금액, 처리구분, 반품사유)
        for(let i=0; i < addList.length; i++){
          let Tr = addList[i];
          //중복 된 데이터 수정
          if(Tr[0] == finPrdCdCode && Tr[1] == fnsPrdStkLotNo){
            flag = false;
            Tr[3] = slsRtnDtlVol;
            Tr[4] = slsRtnDtlVol * danga;
            Tr[5] = slsRtnDtlPrcCls;
            Tr[6] = slsRtnDtlResn;
            break;
          }
        }

        if(flag && col == 7){
          addTr = [finPrdCdCode, fnsPrdStkLotNo, slsRtnDtlBaseVol, slsRtnDtlVol, slsRtnDtlVol * danga , slsRtnDtlPrcCls, slsRtnDtlResn];
          addList.push(addTr);
        }
      }

    //반품관리 테이블 tr 돌면서 출고량 총 합계 계산
    let trs = table.find("tbody tr");
    let priceSum = 0;
    for(tr of trs){
        let totalPrice = $(tr).find(".price").text();
        if(totalPrice == null || totalPrice == ''){
            totalPrice = 0;
        } else {
            totalPrice = totalPrice.split(",").join(""); //콤마 제거
            totalPrice = Number(totalPrice);
        }
        priceSum += totalPrice;
    }
    $("#rtnTotalPrice").text(priceSum.toLocaleString("ko-KR"));
      console.log(addList); //제품코드, lot번호, 기반품량, 반품량, 금액, 처리구분, 반품사유
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
      console.log(modifyList);
    }

  //저장 버튼 이벤트
  $("#saveBtn").on("click", function () {
      let trs = table.find("tbody tr");
      let flag = false;

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
              if ($("#vendor").val() == null || $("#vendor").val() == '') {
                  noDataWarn();
                  return false;
              }
              //null 검사
              for (tr of trs) {
                  for (idx of notNullList) {
                    let td = $(tr).find("td:eq(" + idx + ")");
                    let content = $(tr).find("td:eq(" + idx + ")").text();
                      if (idx == 10 && $(tr).find("select").length == 1) {
                          content = $(tr).find("select option:selected").val();
                      } else {
                          content = $(tr).find("td:eq(" + idx + ")").text();
                      }
                      if (content == null || content == '') {
                        $(td).addClass("nullVol");
                        flag = true;
                      }
                  }
              }

              if(flag) {
                requiredWarn();
                return;
              }

          
              //삭제용
              let countTr = table.find("tbody tr").length;
              if (countTr == 0) {
                  //tbody 안에 내용이 없으면 헤더 삭제 ajax
                  let slsRtnHdNo = $("#slsRtnHdNo").val();
                  deleteHdSaveAjax(slsRtnHdNo);
              } else {
                  //detail 삭제
                  if (delList.length != 0) {
                      for (obj of delList) {
                          deleteSaveAjax(obj);
                      }
                  }
              }

              //수정용
              for (obj of modifyList) {
                  //modRr[priKey, updCol, updCont]
                  modifySaveAjax(obj);
              }

              //등록용
              let slsRtnHdNo = $("#slsRtnHdNo").val();
              if (slsRtnHdNo == null || slsRtnHdNo == '') {
                  addHdSaveAjax(addList);
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

  function modifySaveAjax(obj){
      //checkbox인거
      let priKey = obj[0];
      let updCol = obj[1];
      let updCont = obj[2];

      console.log(priKey);
      console.log(updCol);
      console.log(updCont);
      $.ajax({
          url: 'rtnManage/update',
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


  //반품헤더 insert
  function addHdSaveAjax(addList) {
      let slsRtnHdDate = $("#slsRtnHdDate").val();
      let vendCdCode = $("#vendor").val();
      let empId = $("#empId").val();
      let slsRtnHdRemk = $("#remk").val();
      let slsRtnDtlVO = [];
      //addList(제품코드, lot번호, 기반품량, 반품량, 금액, 처리구분, 반품사유)

      for (obj of addList) {
        let finPrdCdCode = obj[0];
        let fnsPrdStkLotNo = obj[1];
        let slsRtnDtlBaseVol = obj[2];
        let slsRtnDtlVol = obj[3];
        let slsRtnDtlPrice = obj[4];
        let slsRtnDtlPrcCls = obj[5];
        let slsRtnDtlResn = obj[6];
          let addDtl = {
              finPrdCdCode,
              fnsPrdStkLotNo,
              slsRtnDtlBaseVol,
              slsRtnDtlVol,
              slsRtnDtlPrice,
              slsRtnDtlPrcCls,
              slsRtnDtlResn
          }
          slsRtnDtlVO.push(addDtl);
      }
      let slsOutHdNo = $("#slsOutHdNo").val();
      console.log(slsOutHdNo);
      $.ajax({
          url: 'rtnManage/hdDtlInsert',
          type: 'POST',
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify({
              slsRtnHdVO: {
                  slsOutHdNo,
                  slsRtnHdDate,
                  vendCdCode,
                  empId,
                  slsRtnHdRemk
              },
              slsRtnDtlVO
          }),
          success: function (result) {
              console.log("rtnHdDtl 추가 성공")
          }
      })
  }
  //추가 끝

  //선택 삭제 이벤트
    $("#deleteBtn").on("click", function () {
        if ($("input[type='checkbox']:checked").length === 0) {
            deleteWarning();
            return;
        }
      table.find("tbody input:checkbox[name='cb']").each(function(idx,el){
         let tr = $(el).closest('tr');
          if ($(el).is(":checked") && tr.find("td:eq(10) select").length == 0) {     
            //입고  
              notDelete();
              $(el).prop("checked", false);
              $("#allCheck").prop("checked", false);
          } else if ($(el).is(":checked")) {
              let priKey = tr.find("input[type='hidden']").val();
              // 입고인지 아닌지 검사
              delList.push(priKey);
              tr.remove();
              for (let i = 0; i < modifyList.length; i++) {
                  if (modifyList[i][0] == priKey) {                   //수정목록의 길이만큼 돌면서[0]번째:priKey값이 같으면 
                      modifyList.splice(i, 1);                        //[priKey, updCol, updCont]에서 배열 i번재부터 1개의 값을 썰어버림
                  }
              }
          }
      });
  });

  function deleteHdSaveAjax(slsRtnHdNo){
      $.ajax({
          url : 'rtnManage/hd/delete',
          type : 'DELETE',
          dataType : 'text',
          contentType: "application/json; charset=UTF-8;",
          data : JSON.stringify({
              slsRtnHdNo
          }),
          success : function(result){
              console.log("헤더 삭제 성공");
          }
      });
  }

    function deleteSaveAjax(slsRtnDtlNo) {
        console.log(slsRtnDtlNo);
      $.ajax({
          url: 'rtnManage/delete',
          type : 'DELETE',
          dataType: 'text',
          contentType: "application/json; charset=UTF-8;",
          data: JSON.stringify({
              slsRtnDtlNo
          }),
          success: function (result) {
              console.log("삭제 성공");
          }
      });
    }

//alert
function notUpdate() {
    Swal.fire({
        icon: "warning",
        title: "수정 불가",
        html: "입고 처리된 반품내역은 수정할 수 없습니다.",
        confirmButtonText: "확인"
    });
}
function notDelete() {
    Swal.fire({
        icon: "warning",
        title: "삭제 불가",
        html: "입고 처리된 반품내역은 삭제할 수 없습니다.",
        confirmButtonText: "확인"
    });
}

function requiredWarn() {
    Swal.fire({
        icon: "warning",
        title: "입력하지 않은 값이 있습니다.",
        confirmButtonText: "확인"
    });
}
    
function deleteWarning() {
    Swal.fire({
        icon: "warning",
        title: "삭제할 항목을 선택하세요.",
        confirmButtonText: "확인"
    });
}
    
function noDataWarn() {
    Swal.fire({
        icon: "warning",
        title: "입력된 값이 없습니다.",
        confirmButtonText: "확인"
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