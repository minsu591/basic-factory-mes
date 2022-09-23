$(document).ready(function () {

  //조건에 맞는 주문내역 조회
  $("#ordBtn").click(function (e) {
    let ordSdate = $("#orderSdate").val();
    let ordEdate = $("#orderEdate").val();
    let vendor = $("#vendor").val();

    if(ordSdate != null && ordSdate != '' && ordEdate != null && ordEdate != ''){
      if(ordSdate > ordEdate){                       //시작 일자가 더 클 경우
        if(ordDateChecked()){
          return false;
        };
      }
    } else if (ordSdate != null && ordSdate != '') { //시작 일자만 입력 됐을 경우
      if (ordEdate == null || ordEdate == '') {
        dateWarning();
        dateReset();
        return false;
      }
    } else if (ordEdate != null && ordEdate != '') {  //마지막 일자만 입력 됐을 경우
      if (ordSdate == null || ordSdate == '') {
        dateWarning();
        dateReset();
        return false;
      }
    }

    e.preventDefault();
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    $("input:hidden[name=keyword]").val(ordSdate);
    $("input:hidden[name=keyword2]").val(ordEdate);
    $("input:hidden[name=keyword3]").val(vendor);
    $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();

  });

  function ordDateChecked() {
    Swal.fire({
        icon: "warning",
        title: "잘못된 검색 조건입니다."
    });
    $("#orderSdate").val('');
    $("#orderEdate").val('');
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
    $("#orderSdate").val('');
    $("#orderEdate").val('');
  }
});