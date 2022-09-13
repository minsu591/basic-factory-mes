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
  let notNullList = [7,10,11];

  //td 수정 이벤트
  table.find("tbody").on("click","td",function(e){
      e.stopPropagation();
      tr = $(this).parent();

      let col;
      if(tr.hasClass("out")){
        col = $(this).index();
      } else {
        col = $(this).index() -1;
      }

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
      tdInfo.unbind("focus").bind("focus", function (e) {
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
              tdInfo.trigger("change");
          }
          e.stopPropagation();
      });
  });
  

  //기존에 있는 값들 중에 td변경될 때(체인지이벤트 일어나는 거 갖고 옴)
  table.find("tbody").on("change", "td:not(:first-child)", function (e) {
      console.log(e);
      e.preventDefault();
      let tr = $(this).parent(); //클릭된 td의 tr정보 저장
      let col;
      if(tr.hasClass("out")){
        col = $(this).index();
      } else {
        col = $(this).index() -1;
      }
      let priKey = $(this).parent().find("input[type='hidden']").val();       
      let updCol = table.find("thead").find("th:eq(" + col + ")").attr("name");
      let updCont;
      let flag = true;
      if (col == 10) {
        //selectBox일 때
        updCont = $(this).find("select option:selected").val();
        console.log(updCont);
      } else {
        //td일 때
        updCont = $(this).text();
      }

      let finPrdCdCode = tr.find("td:eq(1)").text();   //제품코드
      let fnsPrdStkLotNo = tr.find("td:eq(4)").text(); //lot번호
      let slsRtnDtlBaseVol = tr.find("td:eq(6)").text();//기반품량
      let slsRtnDtlVol = tr.find("td:eq(7)").text();   //반품량
      let danga = tr.find("td:eq(8)").text();          //단가
      let slsRtnDtlPrice = tr.find("td:eq(9)").text(slsRtnDtlVol * danga);
      let slsRtnDtlPrcCls = tr.find("select[name='prcCls']").val();//처리구분
      let slsRtnDtlResn = tr.find("td:eq(11)").text();  //반품사유

      // console.log(slsRtnDtlPrice); 
      if (priKey != null && priKey != '') {            //priKey가 null이면 modifyList에 담기지 않도록 하는 if문
          checkNewModify(priKey, updCol, updCont);
      } else {
        //addList(제품코드, lot번호, 기반품량, 반품량, 금액, 처리구분, 반품사유)
        for(let i=0; i < addList.length; i++){
          let Tr = addList[i];
          if(Tr[0] == finPrdCdCode && Tr[1] == fnsPrdStkLotNo){
            flag = false;
            Tr[3] = slsRtnDtlVol;
            Tr[5] = slsRtnDtlPrcCls;
            Tr[6] = slsRtnDtlResn;
            break;
          }
        }

        if(flag){
          addTr = [finPrdCdCode, fnsPrdStkLotNo, slsRtnDtlBaseVol, slsRtnDtlVol, (slsRtnDtlVol * danga), slsRtnDtlPrcCls, slsRtnDtlResn];
          addList.push(addTr);
        }
      }
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
      if(confirm("저장하시겠습니까?")==true){
          //null 검사
          for(tr of trs){
              for (idx of notNullList) {                                  //tr돌면서 notNullList index가 null인지 검사
                  let content;
                  if (idx == 10) {
                      content = $(tr).find("select option:selected").val();   //index가 3번째면 content에 납기일자 대입
                  } else {
                      content = $(tr).find("td:eq(" + idx + ")").text();
                  }
                  if (content == null || content == '') {
                      alert('공백인 칸이 존재합니다. 확인 후 다시 저장해주세요.');
                      return;
                  }
              }
          }
          
          //삭제용
          let countTr = table.find("tbody tr").length;
          if(countTr == 0){
              //tbody 안에 내용이 없으면 헤더 삭제 ajax
              let slsRtnHdNo = $("#slsRtnHdNo").val();
              deleteHdSaveAjax(slsRtnHdNo);
              return false;
          } else {
              //detail 삭제
              if (delList.length != 0) {
                  for (obj of delList) {
                      console.log(obj);
                      deleteSaveAjax(obj);
                  }
              }
          }

          //수정용
          for (obj of modifyList) {
              modifySaveAjax(obj);
          }

          //등록용
          let slsRtnHdNo = $("#slsRtnHdNo").val();
          if (slsRtnHdNo == null || slsRtnHdNo == '') {
              console.log("신규 반품 등록!!");
              addHdSaveAjax(addList);
          }
      }
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
  $("#deleteBtn").on("click",function(){
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
});