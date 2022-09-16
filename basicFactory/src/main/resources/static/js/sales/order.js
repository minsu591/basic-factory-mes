$(document).ready(function () {

  //조건에 맞는 주문내역 조회
  $("#ordBtn").click(function (e) {
    let ordSdate = $("#orderSdate").val();
    let ordEdate = $("#orderEdate").val();
    let vendor = $("#vendor").val();

    if(ordSdate != null && ordSdate != '' && ordEdate != null && ordEdate != ''){
      if(ordSdate > ordEdate){
        if(ordDateChecked()){
          return false;
        };
      }
    } else if (ordSdate == null || ordSdate == '' && ordEdate == null || ordEdate == '' && vendorName == null || vendorName == ''){
      if(selectChecked()){
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

  function selectChecked() {
    Swal.fire({
        icon: "warning",
        title: "조회 조건을 입력해주세요."
    });
    return true;
  }

  function ordDateChecked() {
    Swal.fire({
        icon: "warning",
        title: "잘못된 검색 조건입니다."
    });
    $("#orderSdate").val('');
    $("#orderEdate").val('');
    return true;
   }
});