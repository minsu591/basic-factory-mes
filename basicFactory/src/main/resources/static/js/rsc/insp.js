$(document).ready(function(){
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
 });

 //초기화버튼
 $("#resetBtn").click(function(){
  $("#outTable tr").remove();
 })

 //추가버튼 행만들기
 function detailTableMakeRow() {
  let node = `<tr>
<td><input type="checkbox" name="chk"></td>
<td><input type="text" class="rscInspCode" disabled></td>
<td><input type="date" class="rscInspDate"></td>
<td><input type="text" class="rsccode"></td>
<td><input type="text" class="rscname" disabled></td>
<td><input type="text" class="unit" disabled></td>
<td><input type="text" class="inspVol"></td>
<td><input type="text" class="inferVol"></td>
<td><input type="text" class="passVol" disabled></td>
<td><input type="text" class="empId"></td>
<td><input type="text" class="remk"></td>
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

})