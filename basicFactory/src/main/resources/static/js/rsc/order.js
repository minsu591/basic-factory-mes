$("document").ready(function () {
 let tdinfo;

 //체크박스 체크유무
 $("#allCheck").click("change", function () {
  if ($("#allCheck").is(":checked")) {
   $("#InsertTable tbody input:checkbox").prop("checked", true);
  } else {
   $("#InsertTable tbody input:checkbox").prop("checked", false);
  }
 })

 $("#InsertTable").on("change", "input[name=chk]", function () {
  let total = $("input[name=chk]").length;
  let checked = $("input[name=chk]:checked").length;
  if ((total != checked)) {
   $("#allCheck").prop("checked", false);
  } else {
   $("#allCheck").prop("checked", true);
  }
 })

 //수량 * 금액 계산
 $("#InsertTable").on("change", ".orderVol", function () {
  tdinfo = $(this);
  let orderVol = tdinfo.val();

  if (orderVol <= 0){
    minusWarning();
    tdinfo.val('');
  }else{
    let price = tdinfo.parent().next().next().find(".price").val();
    let multiple = orderVol * price;
    tdinfo.parent().next().next().next().find("input").val(Number(multiple).toLocaleString('ko-KR')); // 숫자에 , 달기
    totalprice();
  }
 })

 $("#InsertTable").on("change", ".price", function () {
  tdinfo = $(this);
  let price = tdinfo.val();
  if (price < 0){
    minusWarning();
    tdinfo.val('');
  }
  let orderVol = tdinfo.parent().prev().prev().find(".orderVol").val();
  let multiple = orderVol * price;
  tdinfo.parent().next().find("input").val(Number(multiple).toLocaleString('ko-KR')); // 숫자에 , 달기
  totalprice();
 })


 //총 금액 계산
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

 //추가버튼
 $("#addRowBtn").click(function () {
  detailTableMakeRow();
 });

 //삭제 버튼
 $("#delRowBtn").click(function () {
  if ($("input[type='checkbox']:checked").length === 0) {
   deleteWarning();
   return;
  }
  $("input[name='chk']:checked").each(function (k, val) {
   $(this).parent().parent().remove();
  });
  $("#allCheck").prop("checked", false);
  if ($("input[type='checkbox']:checked").length == 0){
   $("#outTableTfoot").children().find("#totalSum").text('');
  }
  totalprice();
 });
 
 function detailTableMakeRow() {
  let node = `<tr>
<td><input type="checkbox" name="chk"></td>
<td><input type="text" class="vendor"></td>
<td><input type="text" class="vendorName" disabled></td>
<td><input type="text" class="rsccode"></td>
<td><input type="text" class="rscname" disabled></td>
<td><input type="text" class="orderVol"></td>
<td><input type="text" class="unit" disabled></td>
<td><input type="text" class="price"></td>
<td><input type="text" class="totalPrice" disabled></td>
<td><input type="text"></td>
</tr>`;
  $("#InsertTable tbody").append(node);
 }


 //출고수량>재고수량일때 alert창
 $("#InsertTable").on("input", ".outVol", function (e) {
  let outVol = $(this).val();
  let stockVol = $(this).parent().prev().find("input").val();
  if (Number(outVol) > Number(stockVol)) {
   Swal.fire({
    title: '수량 초과',
    text: '출고 수량이 재고 수량보다 많습니다.',
    icon: 'warning',                       // Alert 타입

    confirmButtonText: '확인' // confirm 버튼 텍스트 지정
   });
   $(this).val('');
  }
 })

 
 
 //등록버튼
 $("#subBtn").click(function () {
  let rscOrderCode = $("#rscOrderCode").val();
  if (!rscOrderCode){
    rscOrderCode = null;
  }
  let rscOrderDate = $("#rscOrderDate").val();
  let empId = $("#empId").val();
  let rscOrderTitle = $("#rscOrderTitle").val();
  //헤더 정보 저장
  let rscOrderVO = {
    rscOrderCode,
    rscOrderDate,
    empId,
    rscOrderTitle,
  }

  //필수항목 미기재시 리턴
  if(!rscOrderDate || !empId || !rscOrderTitle){
    insertHeaderWarning();
    return;
  }
  if(rscOrderCode == null){ // 새로 등록
    let orders = [];
    let outTable = $("#InsertTable").find("tbody tr");
    for (obj of outTable) {
      let vendCdCode = $(obj).children().eq(1).find("input").val();
      let rscCdCode = $(obj).children().eq(3).find("input").val();
      let rscOrderVol = $(obj).children().eq(5).find("input").val();
      let rscOrderPrc = $(obj).children().eq(7).find("input").val();
      let rscOrderDtlRemk = $(obj).children().eq(9).find("input").val();

      //필수사항 미기재시 리턴
      if (!vendCdCode || !rscCdCode || !rscOrderVol || !rscOrderPrc){
        Swal.fire({
          icon: "warning", // Alert 타입
          title: "입력되지 않은 값이 있습니다.", // Alert 제목
          html: "거래처코드, 자재코드, <br/>발주수량, 단가는<br/>기본 입력사항입니다.",
          confirmButtonText: "확인"
         })
         return;
      } else {
        //디테일 리스트 저장
        let order = {
          vendCdCode,
          rscCdCode,
          rscOrderVol,
          rscOrderPrc,
          rscOrderDtlRemk
        }
        orders.push(order);
      }
    }
    $.ajax({
      url : 'orderInsert',
      type : 'POST',
      dataType : 'text',
      data : JSON.stringify({
        rscOrderVO,
        orders
      }),
      contentType : 'application/json; charset=UTF-8',
      success : function(result){
        console.log(result);
        if(orders.length == result){
          console.log("추가 성공");
        }
      }
    })
  }else { // 수정 - 세부내역 전부 delete 후 insert
    //해당 발주코드를 가진 dt테이블의 내용을 모두 삭제
    //디테일 리스트의 내용을 모두 insert
    let orders = [];
    let outTable = $("#InsertTable").find("tbody tr");
    for (obj of outTable) {
      let vendCdCode = $(obj).children().eq(1).find("input").val();
      let rscCdCode = $(obj).children().eq(3).find("input").val();
      let rscOrderVol = $(obj).children().eq(5).find("input").val();
      let rscOrderPrc = $(obj).children().eq(7).find("input").val();
      let rscOrderDtlRemk = $(obj).children().eq(9).find("input").val();

      //필수사항 공백일 경우 리턴
      if (!vendCdCode || !rscCdCode || !rscOrderVol || !rscOrderPrc){
        Swal.fire({
          icon: "warning", // Alert 타입
          title: "입력되지 않은 값이 있습니다.", // Alert 제목
          html: "거래처코드, 자재코드, <br/>발주수량, 단가는<br/>기본 입력사항입니다.",
          confirmButtonText: "확인"
         })
         return;
      } else {
        //디테일 리스트 저장
        let order = {
          vendCdCode,
          rscCdCode,
          rscOrderVol,
          rscOrderPrc,
          rscOrderDtlRemk
        }
        orders.push(order);
      }
    }
    $.ajax({
      url : 'orderUpdate',
      type : 'POST',
      dataType : 'text',
      data : JSON.stringify({
        rscOrderVO,
        orders
      }),
      contentType : 'application/json; charset=UTF-8',
      success : function(result){
        console.log(result);
        if(orders.length == result){
          console.log("업데이트 성공");
        }
      }
    })
  }
 })


 function deleteWarning() {
  Swal.fire({
   icon: "warning", // Alert 타입
   title: "삭제할 항목을 선택하세요.", // Alert 제목
   confirmButtonText: "확인"
  })
 }

 function submitWarning() {
  Swal.fire({
   icon: "warning", // Alert 타입
   title: "선택된 항목이 없습니다.", // Alert 제목
   confirmButtonText: "확인",
  })
 }

 function minusWarning(){
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "0이상의 숫자만 입력할 수 있습니다.", // Alert 제목
    confirmButtonText: "확인",
   })
 }

 function insertHeaderWarning(){
  Swal.fire({
    title: '필수 항목 미입력',
    html: '발주일자, 담당자ID, 발주명은 <br/> 기본 입력사항입니다.',
    icon: 'warning',                       // Alert 타입

    confirmButtonText: '확인' // confirm 버튼 텍스트 지정
   });
 }


})