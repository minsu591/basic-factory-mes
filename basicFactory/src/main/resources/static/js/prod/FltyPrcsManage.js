$(document).ready(function () {

  //오늘 일자
  today = new Date();
  today = today.toISOString().slice(0, 10);
  outToday = $("#fltyPrcsDate");
  outToday.val(today);

  //추가 버튼
  $("#addBtn").on("click", function () {
    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")){
        node = `<tr>
                    <td><input type="checkbox" name="chk" checked></td>`;
    }
            node +=`<td><input type="text" class="form-control mx-sm-2 productCode" data-toggle="modal"
                          data-target=".bd-example-modal-lg"></td>
                    <td><input type="text" class="form-control mx-sm-2 productName" readonly></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;

    $("#fltyPrcsTable tbody").append(node);
  });

  //체크박스 체크유무
  $("#allCheck").click("change",function(){
    if($("#allCheck").is(":checked")){
        $("#fltyPrcsTable tbody input:checkbox").prop("checked",true);
    }else{
        $("#fltyPrcsTable tbody input:checkbox").prop("checked",false);
    }
})
  $("input[name=chk]").click(function(){
        let total = $("input[name=chk]").length;
        let checked = $("input[name=chk]:checked").length;
        if (total != checked) $("#allCheck").prop("checked",false);
        else $("#allCheck").prop("checked", true);
  })

  //선택삭제 버튼
  $("#deleteBtn").on("click", function () {
    let trs = $("#fltyPrcsTable tbody tr");

  });
});