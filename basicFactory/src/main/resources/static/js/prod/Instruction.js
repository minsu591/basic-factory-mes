$(document).ready(function () {
  //생산지시테이블 초기데이터 입력
  instTableInsert();
});

function instTableInsert() {
  $.ajax({
    url: "findvInst",
    method: "GET",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    error: function (error, status, msg) {
      alert("상태코드 " + status + "에러메시지" + msg);
    },
    success: function (data) {
      console.log(data);

      for (obj of data) {
        let node = `<tr>
        <td>${obj.instDate}</td>
        <td>${obj.instNo}</td>
        <td>${obj.vendCdNm}</td>
        <td>${obj.finPrdCdCode}</td>
        <td>${obj.finPrdCdName}</td>
        <td>${obj.slsOrdHdNo}</td>
        <td>${obj.slsOrdDtlDlvDate}</td>
        <td>${obj.slsOrdDtlVol}</td>
        <td>${obj.instProdIndicaVol}</td>
        <td>${obj.workScope}</td>
        <td>${obj.workDate}</td>
      </tr>`;
        $("#instTable tbody").append(node);
      }
    },
  });
}
