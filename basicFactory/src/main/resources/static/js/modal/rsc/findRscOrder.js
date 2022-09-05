$(document).ready(function () {

 //조회버튼 모달 팝업
 $("#search").click(function (e) {
  e.preventDefault();
  findRscOrderList(null, null);
  $("#findRscOrderModal").modal("show");

 })

 //발주목록 리스트 출력
 function findRscOrderList(rscOrderTtl, rscOrderDt) {
  $.ajax({
   url: "findRscOrder",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   data: {
    rscOrderTitle: rscOrderTtl,
    rscOrderDate: rscOrderDt
   },
   error: function (error, status, msg) {
    alert("상태코드 " + status + "에러메시지" + msg);
   },
   success: function (data) {
    $("#findRscOrdertbody tr").remove();
    let index = 0;
    for (obj of data) {
     index += 1;
     makeRscOrderRow(obj, index);
    }
   },
  });
 }

 //발주목록 행생성
 function makeRscOrderRow(obj, index) {
  let node = `<tr>
            <td>${obj.rscOrderCode}</td>
            <td>${obj.rscOrderDate}</td>
            <td>${obj.rscOrderTitle}</td>
            <input type="hidden" value="${obj.rscOrderRemk}" name="orderRemk">
            <input type="hidden" value="${obj.empId}" name="empId">
          </tr>`;
  $("#findRscOrdertbody").append(node);
 }

 //테이블 클릭이벤트
 $("#findRscOrdertbody").on("click", "tr", function () {
  let rscOrderCode = $(this).find("td:eq(0)").text();
  let rscOrderDate = $(this).find("td:eq(1)").text();
  let rscOrderTitle = $(this).find("td:eq(2)").text();
  let rscOrderRemk = $(this).find("input[name='orderRemk']").val();
  let empId = $(this).find("input[name='empId']").val();
  $("#rscOrderCode").val(rscOrderCode);
  $("#rscOrderDate").val(rscOrderDate);
  $("#rscOrderTitle").val(rscOrderTitle);
  if (rscOrderRemk == 'null'){
   rscOrderRemk = '';
  }
  $("#rscOrderRemk").val(rscOrderRemk);
  $("#empId").val(empId);

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
    console.log($("#outTable tr").length)
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

  $("#findRscOrderModal").modal("hide");
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
<td><input type="text" value="${obj.rscCdUnit}" disabled></td>
<td><input type="text" class="rscOrderPrc" value="${obj.rscOrderPrc}"></td>
<td><input type="text" value="${prc}" class="totalPrice" disabled></td>
<td><input type="text" value="${obj.rscOrderDtlRemk}"></td>
<input type="hidden" value="${obj.rscOrderDtlNo}">
</tr>`;
  $("#InsertTable tbody").append(node);
  totalprice();
 }


 function overlapWarning() {
  Swal.fire({
   icon: "warning", // Alert 타입
   title: "중복된 항목이 있습니다.", // Alert 제목
   confirmButtonText: "확인",
  })
 }
 function totalprice() {
  let priceList=[];
  let total = $("#outTableTfoot").children().find("#totalSum");
  let tr = $("#outTable").children();
  let totalprice;
  let sum;
  for (let i = 0; i < tr.length; i++) {
   let totalprice = tr.eq(i).children().find(".totalPrice").val();
   if(!totalprice){
    totalprice = 0;
   }else{
    totalprice = totalprice.split(",").join(""); //콤마 제거
   }
   priceList.push(Number(totalprice)); //String -> Number 전환
  }
  sum = priceList.reduce((a,b) => (a+b));
  total.text(sum.toLocaleString('ko-KR'));
 }
})