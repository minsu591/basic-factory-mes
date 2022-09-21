$(document).ready(function () {

  //조건에 맞는 출고내역 조회
  $("#outBtn").click(function (e) {
    e.preventDefault();
    let outSdate = $("#outSdate").val();
    let outEdate = $("#outEdate").val();
    let vendorName = $("#vendorName").val();
    let vendorCode = $("#vendor").val();

    if (outSdate != null && outSdate != '' && outEdate != null && outEdate != '') {
      if (outSdate > outEdate) {                          //시작 일자가 더 클 경우
        if (outDateChecked()) {
          dateReset();
          return false;
        };
      }
    } else if (outSdate != null && outSdate != '') {      //시작 일자만 입력 됐을 경우
      if (outEdate == null || outEdate == '') {
        dateWarning();
        dateReset();
        return false;
      }
    } else if (outEdate != null && outEdate != '') {      //마지막 일자만 입력 됐을 경우
      if (outSdate == null || outSdate == '') {
        dateWarning();
        dateReset();
        return false;
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
    return true;
  }

  function dateWarning() {
    Swal.fire({
      icon: "warning",
      title: "일자 검색값 확인",
      text: "입력값이 부족합니다.",
      confirmButtonText: "확인",
    })
  }

  function dateReset() {
    $("#outSdate").val('');
    $("#outEdate").val('');
  }
});