$("document").ready(function(){
 
 //조회버튼 실행
//  $("#search").click(function(){
//   let rscReturnSDate = $("#rscReturnSDate").val();
//   let rscReturnEDate = $("#rscReturnEDate").val();

//   if(!rscReturnSDate){
//    if(!rscReturnEDate){
//     findList();
//    } else {
//     alert("일자 검색 범위를 확인해주세요.");
//    }
//   }else{
//    if(!rscReturnEDate){
//     alert("일자 검색 범위를 확인해주세요.")
//    }else {
//     findList();
//    }
//   }
//  })

//  function findList(){
//   let rscReturnCode = $("#rscReturnCode").val();
//   let vendor = $("#vendor").val();
//   let rscReturnSDate = $("#rscReturnSDate").val();
//   let rscReturnEDate = $("#rscReturnEDate").val();
//   $.ajax({
//    url : "returnListTable",
//    method : "GET",
//    dataType: "text",
//    data: {
//     rscReturnCode: rscReturnCode,
//     vendor: vendor,
//     rscReturnSDate: rscReturnSDate,
//     rscReturnEDate: rscReturnEDate
//    },
//    success: function(data){
//     $("#returnlisttable").replaceWith(data);
//     console.log(data)
//    }
//   })
//   $("#rscReturnCode").val(null);
//   $("#vendor").val(null);
//   $("#vendorName").val(null);
//   $("#rscReturnSDate").val(null);
//   $("#rscReturnEDate").val(null);
//  }

 $("#search").click(function(e) {
    e.preventDefault();
    //if문 조건 걸어서 검색타입에 따라 키워드 분류 후 서브밋
    //발주코드
    let rscReturnSDate = $("#rscReturnSDate").val();
   let rscReturnEDate = $("#rscReturnEDate").val();
    if(!rscReturnSDate){
           if(!rscReturnEDate){
            // findList();
           } else {
            alert("일자 검색 범위를 확인해주세요.");
            return false;
           }
          }else{
           if(!rscReturnEDate){
            alert("일자 검색 범위를 확인해주세요.");
            return false;
           }else {
            // findList();
           }
        }
    $("input:hidden[name=keyword]").val($("#rscReturnCode").val());
    //발주일자
    $("input:hidden[name=keyword2]").val($("#vendor").val());
    $("input:hidden[name=keyword3]").val(rscReturnSDate);
    $("input:hidden[name=keyword4]").val(rscReturnEDate);
    $("input:hidden[name=amount]").val(10);
    $("#searchForm").submit();
  });

})