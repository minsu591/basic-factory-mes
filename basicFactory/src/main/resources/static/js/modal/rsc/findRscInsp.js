$(document).ready(function(){
  //조회버튼 모달 팝업
  $("#search").on("click", function (e) {
    e.preventDefault();
    let rsccode = $("#rsccode").val();
    let rscname = $("#rscname").val();
    let rscdt = $("#rscInspDate").val();
    $("#rscCd").val(rsccode);
    $("#rscNm").val(rscname);
    $("#rscInspDt").val(rscdt);
    findRscInspList();
    $("#modalAllCheck").prop("checked", false);
    $("#findRscInspModal").modal("show");
  
   })

   
 //체크박스 체크유무
 $("#modalAllCheck").click("change", function () {
  if ($("#modalAllCheck").is(":checked")) {
    $("#findRscInspTable tbody input:checkbox").prop("checked", true);
  } else {
    $("#findRscInspTable tbodddy input:checkbox").prop("checked", false);
  }
})

$("#findRscInspTable").on("change", "input[name=chkModal]", function () {
  let total = $("input[name=chkModal]").length;
  let checked = $("input[name=chkModal]:checked").length;
  if ((total != checked)) {
    $("#modalAllCheck").prop("checked", false);
  } else {
    $("#modalAllCheck").prop("checked", true);
  }
})

 
    //발주목록 리스트 출력
  function findRscInspList() {
   let rscCdCode = $("#rscCd").val();
   let rscCdName = $("#rscNm").val();
   let rscInspDt = $("#rscInspDt").val();
   console.log(rscInspDt)
 
   $.ajax({
    url: "findRscInsp",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: {
      rscCdCode: rscCdCode,
      rscCdName: rscCdName,
     rscInspDate: rscInspDt
    },
    error: function (error, status, msg) {
     alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
     $("#findRscInsptbody tr").remove();
     let index = 0;
     for (obj of data) {
      index += 1;
      makeRscInspRow(obj, index);
     }
    },
   });
  }
 
   //발주목록 행생성
   function makeRscInspRow(obj, index) {
    let node = `
    <tr>
      <td><input type="checkbox" name="chkModal"></td>
      <td>${obj.rscInspCode}</td>
      <td>${obj.rscInspDate}</td>
      <td>${obj.rscCdCode}</td>
      <td>${obj.rscCdName}</td>
      <td>${obj.rscInspVol}</td>
    </tr>`;
    $("#findRscInsptbody").append(node);
   }
  
 
  //검색버튼
  $("#searchOut").click(function (){
   findRscInspList();
  })
 
  //출고목록 등록버튼 체크박스에 체크된것만
  $("#addBtn").click(function () {
    let checked = $("input[name='chkModal']:checked").length;
    if (checked == 0) {
      submitWarning();
      return;
    }
 
    let param = [];
    let info = [];
    let rowData = new Array();
    let checkbox = $("input[name='chkModal']:checked");
    console.log(checkbox);
 
 
    // 체크된 체크박스 값을 가져온다
    checkbox.each(function (i) {
      // checkbox.parent() : checkbox의 부모는 <td>이다.
      // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
      let tr = checkbox.parent().parent().eq(i);
      let td = tr.children();
      // 체크된 row의 모든 값을 배열에 담는다.
      rowData.push(tr.text());
      // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
      let rscInspCode = td.eq(1).text();

      info = {
        rscInspCode: rscInspCode
      }
 
      param.push(info);
      console.log(info);
      console.log(rowData);
    });

    console.log(param);
 
    $.ajax({
      url: "findRscInspToTable",
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(param),
      dataType: "json",
      error: function (error, status, msg) {
        alert("상태코드 " + status + "에러메시지" + msg);
      },
      success: function (data) {
        if($("#outTable tr").length > 0){
          Swal.fire({
           icon: "warning",
           title: "작성중인 내용이 있습니다",
           text: "삭제하고 진행하겠습니까?",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "확인",
           cancelButtonText: "취소",
           closeOnClickOutside: false,
         }).then((result) =>{
          if(result.isConfirmed){
           $("#outTable tr").remove();
           for (obj of data) {
            outListInsert(obj);
           }
          }else{
           return;
          }
         })
         }else{
          $("#outTable tr").remove();
          for (obj of data) {
           outListInsert(obj);
          }
         }
        $("#findRscInspModal").modal("hide");
      }
    })
 
  })
  
  function outListInsert(obj) {
    let remk = '';
    if (obj.rscInspRemk != null){
      remk = obj.rscInspRemk;
    }
    let unarvVol = obj.rscOrderVol - obj.rscOrderArv + obj.rscInspVol;
   let node = `<tr>
   <td id="chk-css"><input type="checkbox" name="chk"></td>
   <td><input type="text" class="rscOrderCode" value="${obj.rscOrderCode}" disabled></td>
   <td><input type="text" class="rscInspCode" value="${obj.rscInspCode}" disabled></td>
   <td><input type="date" class="rscInspDate" value="${obj.rscInspDate}"></td>
   <td><input type="text" class="rsccode" value="${obj.rscCdCode}" disabled></td>
   <td><input type="text" class="rscname" value="${obj.rscCdName}" disabled></td>
   <td><input type="text" class="unit" value="${obj.rscCdUnit}" disabled></td>
   <td><input type="text" class="unarvVol" value="${unarvVol}" disabled></td>
   <td><input type="text" class="inspVol" value="${obj.rscInspVol}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"></td>
   <td><input type="text" class="inferVol" value="${obj.rscInferVol}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"></td>
   <td><input type="text" class="passVol" value="${obj.rscPassVol}" disabled></td>
   <td><input type="text" class="empId" value="${obj.empId}" disabled></td>
   <td><input type="text" class="remk" value="${remk}"></td>
   <input type="hidden" class="rscOrderDtlNo" value="${obj.rscOrderDtlNo}">
   <input type="hidden" class="rscOrderVol" value="${obj.rscOrderVol}">
   </tr>`;
   $("#InsertTable tbody").append(node);
  }
 
 
  function overlapWarning() {
   Swal.fire({
    icon: "warning", // Alert 타입
    title: "중복된 항목이 있습니다.", // Alert 제목
    confirmButtonText: "확인",
   })
  }
 
 })