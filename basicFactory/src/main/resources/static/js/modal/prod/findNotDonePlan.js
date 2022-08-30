$(document).ready(function () {
	
//생산계획모달창 ON
  $("#findPlanBtn").click(function (e) {
    e.preventDefault();
    $("#findNotDonePlanModal").modal("show");
    planNotDoneClick();
  });
  
  //생산계획모달창 조회 버튼
	$("#findNotDonePlanBtn").click(planNotDoneClick);
	
  //생산계획모달창 ON 함수
  function planNotDoneClick(){
	let sdate = $("#plansdate").val();
	let edate = $("#planedate").val();
        $.ajax({
                url : 'planNotDoneView',
                type : "GET",
                dataType : "json",
                data : {
                    sdate : sdate,
                    edate : edate
                },
                success : function(data){
                    $("#findNotDonePlanTable tbody tr").remove();
                    for (obj of data){
                        planNotDoneMakeRow(obj);
                    }
                }
            })
    }
    //생산계획모달창 행 추가 함수
    function planNotDoneMakeRow(obj){
        let node = `<tr>
            <td>${obj.planHdCode}</td>
            <td>${obj.planHdDate}</td>
            <td>${obj.planHdName}</td>
            <td>${obj.empId}</td>
        </tr>`
        $("#findNotDonePlanTable tbody").append(node);
    }
  
    //미지시 생산계획 검색 모달 테이블 클릭이벤트
    $("#findNotDonePlanTable").on("click", "tr", function(){
      let planHdCode = $(this).find("td:eq(0)").text();
      $.ajax({
        url : 'planNotDoneView/dtl',
        type : 'GET',
        dataType : "json",
        data : {
            planHdCode : planHdCode
        },
        success : function(data){
          $("#planDetailTable tbody tr").remove();
          for(obj of data){
            detailTableMakeRow(obj);
          }
          $("#findNotDonePlanModal").modal("hide");
        }
      });

    });

    function detailTableMakeRow(obj) {
      let node = `<tr>
    <td><input type="checkbox"></td>
    <td><input type="text" name="prodCode" value="${obj.finPrdCdCode}"></td>
    <td><input type="text" readonly></td>
    <td><input type="text" readonly></td>
    <td><input type="text" readonly value="${obj.planIdx}"></td>
    <td><input type="text" readonly value="${obj.planHdCode}"></td>
    <td><input type="text" readonly value="${obj.planSdate}"></td>
    <td><input type="text" readonly value="${obj.planEdate}"></td>
    <td><input type="text" readonly value="${obj.instProdIndicaVol}"></td>
    <td><input type="text" readonly value="${obj.planProdVol - obj.instProdIndicaVol}"></td>
    <td><input type="text"></td>
    <td><input type="text" readonly></td>
  </tr>`;
      $("#planDetailTable tbody").append(node);
    }
    /*완제품코드
      완제품명
      규격
      생산계획상세번호
      생산계획코드
      생산계획시작일자
      생산계획종료일자
      기지시량 (=지시량)
      미지시량 (=계획량 - 지시량)
      지시량
      지시일자*/

});
