$("document").ready(function(){
 let tdinfo;


 //추가버튼
 $("#addRowBtn").click(function () {
  detailTableMakeRow();
 });


 function detailTableMakeRow() {
  let node = `<tr>
 <td><input type="checkbox"></td>
 <td><input type="text" readonly></td>
 <td><input type="text"></td>
 <td><input type="text"></td>
 <td><input type="text" readonly></td>
 <td><input type="text" class="rsccode"></td>
 <td><input type="text" class="rscname" readonly></td>
 <td><input type="text" class="rsclotno"></td>
 <td><input type="text" readonly></td>
 <td><input type="text" class="outVol"></td>
 <td><input type="text"></td>
 </tr>`;
  $("#outInsertTable tbody").append(node);
 }


 //출고수량>재고수량일때 alert창
$("#outInsertTable").on("input", ".outVol", function(e){
 let outVol = $(this).val();
 let stockVol = $(this).parent().prev().find("input").val();
 if (Number(outVol) > Number(stockVol)){
  Swal.fire({
   title: '수량 초과',
   text: '출고 수량이 재고 수량보다 많습니다.',
   icon: 'warning',                       // Alert 타입

   confirmButtonText: '확인' // confirm 버튼 텍스트 지정
  });
  $(this).val('');
 }
})

//자재코드, 자재명 찾기

 //자재코드 행 클릭시 모달팝업
$("#outInsertTable").on("click", ".rsccode", function (e) {
 e.preventDefault();
 tdinfo=$(this);
 //자재조회
 findRscCode();
 $("#findresourceModal").modal("show");
});

//자재코드 검색 테이블 클릭이벤트
$("#findRscTable").on("click", "tr", function () {
 let rscCdCode = $(this).find("td:eq(1)").text();
 let rscCdName = $(this).find("td:eq(2)").text();
 tdinfo.val(rscCdCode);
 tdinfo.parent().next().find("input").val(rscCdName);


  $("#findresourceModal").modal("hide");
});

  //rsccode input 내용이 사라지면 rscName 내용도 사라지는 이벤트
  $("#outInsertTable").on("change", ".rsccode", function () {
   tdinfo=$(this);
   let rsccode = $(".rsccode").text();
   if (!rsccode) {
    tdinfo.parent().next().find("input").val("");
    tdinfo.parent().next().next().find("input").val("");
    tdinfo.parent().next().next().next().find("input").val("");
   }
 });


//자재코드 조회
function findRscCode() {
 $.ajax({
   url: "findResourceCode",
   method: "GET",
   contentType: "application/json;charset=utf-8",
   dataType: "json",
   error: function (error, status, msg) {
     alert("상태코드 " + status + "에러메시지" + msg);
   },
   success: function (data) {
     console.log(data);
     $("#findRsctbody tr").remove();
     let index = 0;
     for (obj of data) {
       index += 1;
       makeRscCodeRow(obj, index);
     }
   },
 });
}

//자재조회 행생성
function makeRscCodeRow(obj, index) {
 let st = null;
 if( obj.rscCdUse == 1){
   st = `<input type="checkbox" checked onClick="return false;">`;
 }else{
   st = `<input type="checkbox" onClick="return false;">`;
 }
let node = `<tr>
            <td>${index}</td>
            <td>${obj.rscCdCode}</td>
            <td>${obj.rscCdName}</td>
            <td>${obj.rscCdClfy}</td>
            <td>${st}</td>
          </tr>`;
 $("#findRsctbody").append(node);
}



//자재lot번호 찾기

$("#outInsertTable").on("click", ".rsclotno",function (e) {
 e.preventDefault();
 tdinfo=$(this);
 let rscname = tdinfo.parent().prev().find("input").val();
 if(!rscname){
  Swal.fire({
   title: '자재 코드 미입력',
   text: '자재 코드를 먼저 선택해주세요.',
   icon: 'warning',                       // Alert 타입

   confirmButtonText: '확인' // confirm 버튼 텍스트 지정
  });
 }else{
   //자재조회
   $("#lotrscname").val(rscname);
   findRscLot();
   $("#findRscLotModal").modal("show");
 }
});

 //자재코드 검색 테이블 클릭이벤트
 $("#findRscLotTable").on("click", "tr", function () {
  let rscLotNo = $(this).find("td:eq(2)").text();
  let stockVol = $(this).find("#rscStock").val();
  tdinfo.val(rscLotNo);
  tdinfo.parent().next().find("input").val(stockVol);
  $("#findRscLotModal").modal("hide");
});


function findRscLot() {
 let rscCdName = $("#lotrscname").val();
$.ajax({
  url: "findRscLot",
  method: "GET",
  contentType: "application/json;charset=utf-8",
  dataType: "json",
  data : {
   rscCdName : rscCdName
  },
  error: function (error, status, msg) {
    alert("상태코드 " + status + "에러메시지" + msg);
  },
  success: function (data) {
    console.log(data);
    $("#findRscLottbody tr").remove();
    let index = 0;
    for (obj of data) {
      index += 1;
      makeRscLotRow(obj, index);
    }
  },
});
}

//자재lot조회 행생성
function makeRscLotRow(obj, index) {
 let st = null;
 if( obj.rscStockSt == 1){
   st = `<input type="checkbox" checked onClick="return false;">`;
 }else{
   st = `<input type="checkbox" onClick="return false;">`;
 }
let node = `<tr>
            <td>${index}</td>
            <td>${obj.rscCdName}</td>
            <td>${obj.rscLotNo}</td>
            <td>${st}</td>
            <input type="hidden" value="${obj.rscStock}" id="rscStock">
          </tr>`;
$("#findRscLottbody").append(node);
}

})