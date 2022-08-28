$(document).ready(function () {

  //오늘 일자
  today = new Date();
  today = today.toISOString().slice(0, 10);
  orderToday = $("#slsOrdHdDate");
  orderToday.val(today);

  //추가 버튼
  $("#addBtn").on("click", function () {

    let node = `<tr>
                  <td><input type="checkbox" name="checkRow"></td>
                  <td><input type="text" class="form-control mx-sm-2 productCode" data-toggle="modal"
                                        data-target=".bd-example-modal-lg"></td>
                  <td><input type="text" class="form-control mx-sm-2 productName" readonly></td>
                  <td><input type="date" class="form-control mx-sm-2"></td>
                  <td><input type="text" class="form-control mx-sm-2"></td>
                </tr>`

    $("#ordMngTable tbody").append(node);
  });

  //체크박스 전체선택 & 해제
  $("#allCheck").on("click", function () {
    if ($("#allCheck").prop("checked")) {
      $("input[type=checkbox]").prop("checked", true);
    } else {
      $("input[type=checkbox]").prop("checked", false);
    }
  });

  //선택삭제 버튼
  $("#deleteBtn").on("click", function () {
    let trs = $("#planManageTable tbody tr");

  });
});