$("document").ready(function () {
  let tdInfo;
  let href;
  let modalId;
  $("tbody").on("click",".procCode",function (e) {
    e.preventDefault();
    //공정명 검색
    let lineCode;
    href =window.location.href;
    if(href == "http://localhost/cmn/lineCode"){
      modalId = $("#findProcCdNameModal");
      findAllProcCode();
    }else if(href == "http://localhost/cmn/bomCode"){
      lineCode = $("#lineCode").val();
      modalId = $("#findProcForLineModal");
      findAllProcCodeWithMchn(lineCode);
    }
    modalId.modal("show");
    tdInfo = $(this);
  });

  //LINE 공정 td 클릭
  $("#findProcCdNameTable").on("click", "tr", clickTr);
  //BOM 공정 td 클릭
  $("#findProcForLineTable").on("click", "tr", clickTr);

  function clickTr(){
    let procCdCode = $(this).find("td:eq(1)").text();
    let procCdName = $(this).find("td:eq(2)").text();

    if(href == "http://localhost/cmn/bomCode"){
      let mchnCode = $(this).find("td:eq(3)").text();
      let mchnName = $(this).find("td:eq(4)").text();
      let lineCdCode = $(this).find("input[class='lineCdCode']").val();
      tdInfo.next().next().text(mchnCode);
      tdInfo.next().next().next().text(mchnName);
      tdInfo.parent().find("input[class='lineCdCode']").val(lineCdCode);
    }else if(href == "http://localhost/cmn/lineCode"){
      let trs = tdInfo.closest('tbody').find("tr");
      for(tr of trs){
        if($(tr).find("td:eq(2)").text() == procCdCode){
          Swal.fire({
            icon: "warning",
            title : "공정코드가 동일한 행이 있습니다.",
            text: "확인 후 다시 클릭해주세요."
          });
          return false;
        }
      }
    }
    
    tdInfo.text(procCdCode);
    tdInfo.next().text(procCdName);
    if(!tdInfo.parent().hasClass("addTr")){
      tdInfo.trigger("change");
    }
    modalId.modal("hide");
  }
  
//공정코드 테이블의 조회
function findAllProcCode(){
  $.ajax({
    url: "findproccode",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#findProcCdNameTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeProcCodeRow(obj,index);
      }
    },
  });
}

//line가 묶어서 공정코드, 설비코드 조회
function findAllProcCodeWithMchn(lineCode) {
  $.ajax({
    url: "bomRsc/proc",
    type: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data : {
      lineCode
    },
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      $("#findProcForLineTable tbody tr").remove();
      let index = 0;
      for (obj of data) {
        index += 1;
        makeProcCodeRow(obj,index);
      }
    },
  });
}
function makeProcCodeRow(obj,index) {
  let node;
  if(href == "http://localhost/cmn/bomCode"){
        node = `<tr>
        <input type="hidden" value="${obj.lineCdCode}" class="lineCdCode">
        <td>${index}</td>
        <td>${obj.procCdCode}</td>
        <td>${obj.procCdName}</td>
        <td>${obj.mchnCode}</td>
        <td>${obj.mchnName}</td>
      </tr>`;
    //BOM 공정 td 클릭
    $("#findProcForLineTable").append(node);
  }else{
    node = `<tr>
    <td>${index}</td>
    <td>${obj.procCdCode}</td>
    <td>${obj.procCdName}</td>
    </tr>`;
    $("#findProcCdNameTable").append(node);
  }
  
}
});
