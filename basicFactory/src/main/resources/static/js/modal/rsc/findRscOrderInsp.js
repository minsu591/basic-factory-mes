$(document).ready(function(){
  //조회버튼 모달 팝업
  $("#search").click(function (e) {
   e.preventDefault();
   findRscOrderInspList();
   $("#findRscOrderInspModal").modal("show");
 
  })

   //발주목록 리스트 출력
 function findRscOrderInspList() {
  let rscOrderCd = $("#rscOrderCd").val();
  let rscOrderTtl = $("#rscOrderTtl").val();
  let rscOrderDt = $("#rscOrderDt").val();

  $.ajax({
   url: "findRscOrderInsp",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data: {
    rscOrderCode: rscOrderCd,
    rscOrderTitle: rscOrderTtl,
    rscOrderDate: rscOrderDt
   },
   error: function (error, status, msg) {
    alert("상태코드 " + status + "에러메시지" + msg);
   },
   success: function (data) {
    $("#findRscOrderInsptbody tr").remove();
    let index = 0;
    for (obj of data) {
     index += 1;
     makeRscOrderInspRow(obj, index);
    }
   },
  });
 }

  //발주목록 행생성
  function makeRscOrderInspRow(obj, index) {
   let node = `<tr>
             <td>${obj.rscOrderCode}</td>
             <td>${obj.rscOrderDate}</td>
             <td>${obj.rscOrderTitle}</td>
           </tr>`;
   $("#findRscOrderInsptbody").append(node);
  }
 

 //검색버튼
 $("#searchOut").click(function (){
  findRscOrderInspList();
 })


 //테이블 클릭이벤트
 $("#findRscOrdertbody").on("click", "tr", function () {
  let rscOrderCode = $(this).find("td:eq(0)").text();
  let rscOrderDate = $(this).find("td:eq(1)").text();
  let rscOrderTitle = $(this).find("td:eq(2)").text();
  $("#rscOrderCode").val(rscOrderCode);
  $("#rscOrderDate").val(rscOrderDate);
  $("#rscOrderTitle").val(rscOrderTitle);
//여기까지 수정완료

  
  //발주목록 상세 내역 불러오기
  $.ajax({
   url: "orderDetailsList",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data: {
    rscOrderCode: rscOrderCode
   },
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
   },
  });

  $("#findRscOrderInspModal").modal("hide");
 });

 
 function outListInsert(obj) {
  let prc = Number(obj.rscOrderVol * obj.rscOrderPrc).toLocaleString('ko-KR');
  let node = `<tr>
<td><input type="checkbox" name="chk"></td>
<td><input type="text" value="${obj.vendCdCode}" name="vendcode"></td>
<td><input type="text" value="${obj.vendCdNm}" disabled></td>
<td><input type="text" class="rsccode" value="${obj.rscCdCode}"></td>
<td><input type="text" class="rscname" value="${obj.rscCdName}" disabled></td>
<td><input type="text" value="${obj.rscOrderVol}"></td>
<td><input type="text" class="unit" value="${obj.rscCdUnit}" disabled></td>
<td><input type="text" class="price" value="${obj.rscOrderPrc}"></td>
<td><input type="text" value="${prc}" class="totalPrice" disabled></td>
<td><input type="text" value="${obj.rscOrderDtlRemk}"></td>
<input type="hidden" value="${obj.rscOrderDtlNo}">
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