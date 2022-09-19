$("document").ready(function(){
  
  //들어오자마자
  //각 페이지의 a에 class 부여
  let nPageNum = $("#pageForm").find("input[name='nPageNum']").val();
  let ePageNum = $("#pageForm").find("input[name='ePageNum']").val();
  $("#nListTable").siblings("nav").find("a").each(function(idx,el){
    if($(el).text() == nPageNum){
      $(el).addClass("pagingactive");
    }
  });
  $("#eListTable").siblings("nav").find("a").each(function(idx,el){
    if($(el).text() == ePageNum){
      $(el).addClass("pagingactive");
    }
  });
  

  //조회버튼 실행
  $("#search").click(function(e){
    e.preventDefault();
    let rscOutCode = $("#rscOutCode").val();
    let rscCdCode = $("#rsccode").val();
    let rscOutSDate = $("#rscOutSDate").val();
    let rscOutEDate = $("#rscOutEDate").val();
    console.log(rscOutSDate + " ," + rscOutEDate);
    
  if(!rscOutSDate){
   if(!rscOutEDate){
    // findList();
   } else {
    dateWarning();
    dateReset();
    return false;
   }
  }else{
   if(!rscOutEDate){
    dateWarning();
    dateReset();
    return false;
   }else {
    // findList();
    if (rscOutSDate > rscOutEDate) {
      dateWarning2();
      dateReset();
      return false;
    }
   }
  }

  //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
  $("input:hidden[name=keyword]").val(rscOutCode);
  $("input:hidden[name=keyword2]").val(rscOutSDate);
  $("input:hidden[name=keyword3]").val(rscOutEDate);
  $("input:hidden[name=keyword4]").val(rscCdCode);
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

//날짜데이터 리셋
function dateReset() {
  $("#rscOutSDate").val('');
  $("#rscOutEDate").val('');
}
})