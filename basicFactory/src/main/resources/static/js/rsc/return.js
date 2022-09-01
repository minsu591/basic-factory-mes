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

 //반품수량과 단가 입력시 합계 금액 계산
 $("#InsertTable").on("change", ".outVol", function(){
  tdinfo = $(this);
  let outVol = tdinfo.val();
  let price = tdinfo.parent().next().find(".price").val();
  let multiple = outVol * price;
  console.log(outVol)
  console.log(price);
  tdinfo.parent().next().next().find("input").val(multiple);
 })

 $("#InsertTable").on("change", ".price", function(){
  tdinfo = $(this);
  let price = tdinfo.val();
  let outVol = tdinfo.parent().prev().find(".outVol").val();
  let multiple = outVol * price;
  console.log(outVol)
  console.log(price);
  tdinfo.parent().next().find("input").val(multiple);
 })


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
 });

 function detailTableMakeRow() {
   let node = `<tr>
<td><input type="checkbox" name="chk"></td>
<td><input type="text" name="outcode" readonly></td>
<td><input type="date"></td>
<td><input type="text" class="vendor"></td>
<td><input type="text" readonly></td>
<td><input type="text" class="rsccode" readonly></td>
<td><input type="text" class="rscname" readonly></td>
<td><input type="text" class="rsclotno"></td>
<td><input type="text" readonly></td>
<td><input type="text" class="outVol"></td>
<td><input type="text" class="price"></td>
<td><input type="text" readonly></td>
<td><input type="text"></td>
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


 //수정
 $("#outTable").find("input").on("change", function () {
   let outCode = $(this).parent().parent().children.eq(1).val();
   let modifyArray = [];
   if (outCode) {
     modifyArray = {
       outCode: outCode,

     }
   }
 })


 //등록버튼

 $("#subBtn").click(function () {
   let checked = $("input[name='chk']:checked").length;
   if (checked == 0) {
     submitWarning();
     return;
   }
   let param = [];
   let info = [];
   let rowData = new Array();
   let checkbox = $("input[name='chk']:checked");
   console.log(checkbox)
   // 체크된 체크박스 값을 가져온다
   checkbox.each(function (i) {
     // checkbox.parent() : checkbox의 부모는 <td>이다.
     // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
     let tr = checkbox.parent().parent().eq(i);
     let td = tr.children().children();
     // 체크된 row의 모든 값을 배열에 담는다.
     rowData.push(tr.text());

     // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
     let rscOutCode = td.eq(1).val();
     let rscOutDate = td.eq(2).val();
     let rscCdCode = td.eq(3).val();
     let rscLotNo = td.eq(5).val();
     let rscOutVol = td.eq(7).val();
     let vendCdCode = td.eq(8).val();
     let rscOutResn = td.eq(10).val();
     let empId = td.eq(11).val();
     if (!rscOutDate || !vendCdCode || !rscCdCode || !rscLotNo || !rscOutVol || !empId) {
       Swal.fire({
         icon: "warning", // Alert 타입
         title: "입력되지 않은 값이 있습니다.", // Alert 제목
         html: "출고일자, 자재코드, <br/>자재LOT번호, 출고수량, 담당자는<br/>기본 입력사항입니다.",
         confirmButtonText: "확인"
       })
     } else if (rscOutVol < 0) {
       Swal.fire({
         icon: "warning", // Alert 타입
         title: "입력값 오류", // Alert 제목
         html: "출고수량은 0 이상만 입력 가능합니다.",
         confirmButtonText: "확인"
       })
     } else {
       if (!rscOutCode) {
         rscOutCode = null;
       } else if (!vendCdCode) {
         vendCdCode = null;
       }

       info = {
         rscOutCode: rscOutCode,
         rscOutDate: rscOutDate,
         vendCdCode: vendCdCode,
         rscCdCode: rscCdCode,
         rscLotNo: rscLotNo,
         rscOutVol: rscOutVol,
         rscOutResn: rscOutResn,
         empId: empId
       }

       param.push(info);
       console.log(info);
       console.log(rowData);

       console.log(param);


       $.ajax({
         url: "outInAndUp",
         method: "POST",
         headers: { "content-type": "application/json" },
         data: JSON.stringify(param),
         dataType: "text",
         error: function (error, status, msg) {
           alert("상태코드 " + status + "에러메시지" + msg);
         },
         success: function () {
           alert("등록처리완료");
           //완료된 행 삭제
           $("input[name='chk']:checked").each(function (k, val) {
             $(this).parent().parent().remove();
           });
         }
       })
     }

   });


 })

 //조회버튼 모달 팝업
 $("#search").click(function (e) {
   e.preventDefault();
   findRscOutList();
   $("#modalAllCheck").prop("checked", false);
   $("#findRscOutModal").modal("show");

 })

 //체크박스 체크유무
 $("#modalAllCheck").click("change", function () {
   if ($("#modalAllCheck").is(":checked")) {
     $("#findRscOutTable tbody input:checkbox").prop("checked", true);
   } else {
     $("#findRscOutTable tbodddy input:checkbox").prop("checked", false);
   }
 })

 $("#findRscOutTable").on("change", "input[name=chkModal]", function () {
   let total = $("input[name=chkModal]").length;
   let checked = $("input[name=chkModal]:checked").length;
   if ((total != checked)) {
     $("#modalAllCheck").prop("checked", false);
   } else {
     $("#modalAllCheck").prop("checked", true);
   }
 })


 function findRscOutList() {
   let rscOutCode = $("#rscOutCode").val();
   let rscOutDate = $("#rscOutDate").val();
   $.ajax({
     url: "findRscOut",
     method: "GET",
     contentType: "application/json;charset=utf-8",
     dataType: "json",
     data: {
       rscOutCode: rscOutCode,
       rscOutDate: rscOutDate
     },
     error: function (error, status, msg) {
       alert("상태코드 " + status + "에러메시지" + msg);
     },
     success: function (data) {
       console.log(data);
       $("#findRscOuttbody tr").remove();
       let index = 0;
       for (obj of data) {
         index += 1;
         makeRscOutRow(obj, index);
       }
     },
   });
 }

 //출고목록 행생성
 function makeRscOutRow(obj, index) {
   let node = `<tr>
             <td><input type="checkbox" name="chkModal"></td>
             <td>${obj.rscOutCode}</td>
             <td>${obj.rscOutDate}</td>
             <td>${obj.vendCdNm}</td>
             <td>${obj.rscCdName}</td>
             <td>${obj.rscOutVol}</td>
           </tr>`;
   $("#findRscOuttbody").append(node);
 }

 //이미 출력되어있는 행의 출고코드 목록
 let outCodeList = [];

 //출고목록 등록버튼 체크박스에 체크된것만
 $("#addBtn").click(function () {
   let outCodeListTemp = [];
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

   let flag = true;

   // 체크된 체크박스 값을 가져온다
   checkbox.each(function (i) {
     // checkbox.parent() : checkbox의 부모는 <td>이다.
     // checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
     let tr = checkbox.parent().parent().eq(i);
     let td = tr.children();
     // 체크된 row의 모든 값을 배열에 담는다.
     rowData.push(tr.text());
     // td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
     let rscOutCode = td.eq(1).text();
     //중복값체크
     outCodeListTemp.push(rscOutCode);
     if (outCodeList.indexOf(rscOutCode) >= 0) {
       flag = false;
       return;
     }

     info = {
       rscOutCode: rscOutCode
     }

     param.push(info);
     console.log(info);
     console.log(rowData);
   });

   if (flag == false) {
     $("input[name='chkModal']:checked").prop("checked", false);
     overlapWarning();
     return;
   }
   //...연산자 : 값을 풀어넣음
   outCodeList.push(...outCodeListTemp);

   console.log(param);

   $.ajax({
     url: "outUpList",
     method: "POST",
     headers: { "content-type": "application/json" },
     data: JSON.stringify(param),
     dataType: "json",
     error: function (error, status, msg) {
       alert("상태코드 " + status + "에러메시지" + msg);
     },
     success: function (data) {
       for (obj of data) {
         outListInsert(obj);
       }
       $("#findRscOutModal").modal("hide");
     }
   })

 })

 function outListInsert(obj) {
  let node = `<tr>
  <td><input type="checkbox" name="chk"></td>
  <td><input type="text" name="outcode" readonly></td>
  <td><input type="date"></td>
  <td><input type="text" class="vendor"></td>
  <td><input type="text" readonly></td>
  <td><input type="text" class="rsccode" readonly></td>
  <td><input type="text" class="rscname" readonly></td>
  <td><input type="text" class="rsclotno"></td>
  <td><input type="text" readonly></td>
  <td><input type="text" class="outVol"></td>
  <td><input type="text"></td>
  <td><input type="text" readonly></td>
  <td><input type="text"></td>
  <td><input type="text"></td>
  </tr>`;
   $("#InsertTable tbody").append(node);
 }

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

function overlapWarning() {
  Swal.fire({
    icon: "warning", // Alert 타입
    title: "중복된 항목이 있습니다.", // Alert 제목
    confirmButtonText: "확인",
  })
}

})