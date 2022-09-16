$(document).ready(function () {

  //조건에 맞는 출고내역 조회
  $("#outBtn").click(function (e) {
    e.preventDefault();
    let outSdate = $("#outSdate").val();
    let outEdate = $("#outEdate").val();
    let vendorName = $("#vendorName").val();
    let vendorCode = $("#vendor").val();

    if (outSdate != null && outSdate != '' && outEdate != null && outEdate != '') {
      if (outSdate > outEdate) {
        if (outDateChecked()) {
          return false;
        };
      }
    }
    
    $("input:hidden[name=keyword]").val(outSdate);
    $("input:hidden[name=keyword2]").val(outEdate);
    $("input:hidden[name=keyword3]").val(vendorCode);
    $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();
  });

  function outDateChecked() {
    Swal.fire({
      icon: "warning",
      title: "잘못된 검색 조건입니다."
    });
    $("#outSdate").val('');
    $("#outEdate").val('');
    return true;
  }
});