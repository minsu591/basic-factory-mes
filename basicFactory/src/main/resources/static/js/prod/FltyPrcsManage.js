$(document).ready(function () {

  //오늘 일자
  day = new Date();
  day = day.toISOString().slice(0, 10);
  today = $("#fltyPrcsDate");
  today.val(day);

  //추가 버튼
  $("#addBtn").on("click", function () {
    let node = `<tr>
                    <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")){
        node = `<tr>
                    <td><input type="checkbox" name="chk" checked></td>`;
    }
            node +=`
                    <td><input type="hidden"></td>
                    <td><input type="text" class="form-control mx-sm-3 productCode" data-toggle="modal"
                          data-target=".bd-example-modal-lg"></td>
                    <td><input type="text" class="form-control mx-sm-3 productName" readonly></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="faultyCode"></td>
                    <td id="faultyName"></td>
                    <td><input type="date" id="fltyPrcsDate"></td>
                    <td id="empId"></td>
                    <td></td>
                </tr>`;
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

});