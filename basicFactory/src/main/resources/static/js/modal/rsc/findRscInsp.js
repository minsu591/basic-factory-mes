$(document).ready(function(){
  //조회버튼 모달 팝업
  $("#search").on("click", function (e) {
    e.preventDefault();
    findRscInspList();
    let rsccode = $("#rsccode").val();
    let rscname = $("#rscname").val();
    let rscdt = $("#rscInspDate").val();
    $("#rscCd").val(rsccode);
    $("#rscNm").val(rscname);
    $("#rscInspDt").val(rscdt);
    $("#findRscInspModal").modal("show");
  
   })
 
    //발주목록 리스트 출력
  function findRscInspList() {
   let rscCdCode = $("#rscCd").val();
   let rscCdName = $("#rscNm").val();
   let rscInspDt = $("#rscInspDt").val();
   console.log(rscCdName)
 
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
 
 
  //테이블 클릭이벤트
  $("#findRscInsptbody").on("click", "tr", function () {
   let rscInspCode = $(this).find("td:eq(0)").text();
 
   //발주목록 상세 내역 불러오기
   $.ajax({
    url: "findRscInspToTable",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    data: {
      rscInspCode: rscInspCode,
    },
    error: function (error, status, msg) {
     alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data)
     let index = 0;
     for (obj of data) {
      index += 1;
      outListInsert(obj, index);
     }
    },
   });
 
   $("#findRscInspModal").modal("hide");
  });
 
  
  function outListInsert(obj) {
    let remk = '';
    if (obj.rscInspRemk != null){
      remk = obj.rscInspRemk;
    }
   let node = `<tr>
   <td><input type="checkbox" name="chk"></td>
   <td><input type="text" class="rscOrderCode" value="${obj.rscOrderCode}" disabled></td>
   <td><input type="text" class="rscInspCode" value="${obj.rscInspCode}" disabled></td>
   <td><input type="date" class="rscInspDate" value="${obj.rscInspDate}"></td>
   <td><input type="text" class="rsccode" value="${obj.rscCdCode}" disabled></td>
   <td><input type="text" class="rscname" value="${obj.rscCdName}"disabled></td>
   <td><input type="text" class="unit" value="${obj.rscCdUnit}" disabled></td>
   <td><input type="text" class="inspVol" value="${obj.rscInspVol}"></td>
   <td><input type="text" class="inferVol" value="${obj.rscInferVol}"></td>
   <td><input type="text" class="passVol" value="${obj.rscPassVol}" disabled></td>
   <td><input type="text" class="empId" value="${obj.empId}"></td>
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