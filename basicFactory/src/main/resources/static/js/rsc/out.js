$("document").ready(function(){
 let tdinfo;


 //추가버튼
 $("#addRowBtn").click(function () {
  detailTableMakeRow();
});

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
 console.log(rscCdCode);
 let rscCdName = $(this).find("td:eq(2)").text();
 tdinfo.val(rscCdCode);
 console.log(tdinfo.val(rscCdCode));
 tdinfo.parent().next().find("input").val(rscCdName);


  $("#findresourceModal").modal("hide");
});


function detailTableMakeRow() {
 let node = `<tr>
<td><input type="checkbox"></td>
<td><input type="text" readonly></td>
<td><input type="text"></td>
<td><input type="text"></td>
<td><input type="text" readonly></td>
<td><input type="text" name="rsccode" class="rsccode"></td>
<td><input type="text" class="rscname" readonly></td>
<td><input type="text"></td>
<td><input type="text" readonly></td>
<td><input type="text"></td>
<td><input type="text"></td>
</tr>`;
 $("#outInsertTable tbody").append(node);
}

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
})