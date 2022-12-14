$("document").ready(function () {

  $("#search").click(function (e) {
    e.preventDefault();
    let rscInSDate = $("#rscInSDate").val();
    let rscInEDate = $("#rscInEDate").val();

    if (!rscInSDate) {
      if (!rscInEDate) {
        // findList();
      } else {
        dateWarning();
        dateReset();
        return false;
      }
    } else {
      if (!rscInEDate) {
        dateReset();
        dateWarning();
        return false;
      } else {
        // findList();
        if (rscInSDate > rscInEDate) {
          dateWarning2();
          dateReset();
          return false;
        }
      }
    }
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    //발주코드
    $("input:hidden[name=keyword]").val($("#rscInCode").val());
    //발주일자
    $("input:hidden[name=keyword2]").val($("#rsccode").val());
    $("input:hidden[name=keyword3]").val(rscInSDate);
    $("input:hidden[name=keyword4]").val(rscInEDate);
    $("input:hidden[name=amount]").val(10);

    $("#searchForm").submit();
  });


  function dateWarning() {
    Swal.fire({
      icon: "warning",
      title: "일자 검색값 확인",
      text : "입력값이 부족합니다.",
      confirmButtonText: "확인",
    })
  }

  function dateWarning2() {
    Swal.fire({
      icon: "warning",
      title: "일자 검색 범위 확인",
      html : "시작날짜는 마침날짜보다 작아야합니다.",
      confirmButtonText: "확인",
    })
  }

  function dateReset(){
    $("#rscInSDate").val('');
    $("#rscInEDate").val('');
  }

});