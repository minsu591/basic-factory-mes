$(document).ready(function () {
  //추가버튼
  $("#addBtn").on("click", function () {
    let node = `<tr>
                <td><input type="checkbox"></td>`;
    //allCheck의 체크박스가 체크되어있으면 추가되는 행도 체크된 채로 나오기
    if ($("#allCheck").is(":checked")) {
      node = `<tr>
              <td><input type="checkbox" checked></td>`
    }
    
    node += `<td><input type="text" id="productCode" 
                                    class="form-control mx-sm-2" data-toggle="modal"
                                    data-target=".bd-example-modal-lg"></td>
              <td><input type="text" id="productName" class="form-control mx-sm-2" readonly></td>
              <td><input type="date" id="slsOrdDtlDlvDate" class="form-control mx-sm-2"></td>
              <td><input type="text" id="slsOrdDtlVol" class="form-control mx-sm-2"></td>
            </tr>`
    console.log(node);
    $("#ordMngTable tbody").append(node);
  });

  $("#ordMngTable").on("click", "#productCode", function (e) {
    e.preventDefault();
    //제품 조회
    findProduct();
    $("#findproductModal").modal("show");
  })
});