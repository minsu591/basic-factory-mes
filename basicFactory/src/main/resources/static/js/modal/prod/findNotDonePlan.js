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
                method : "GET",
                dataType : "json",
                data : {
                    sdate : sdate,
                    edate : edate
                },
                success : function(data){
                    console.log(data);
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
            <td>${obj.planVO.planIdx}</td>
            <td>${obj.planHdVO.planHdCode}</td>
            <td>${obj.planHdVO.planHdDate}</td>
            <td>${obj.planHdVO.planHdName}</td>
            <td>${obj.planHdVO.empId}</td>
            <td>${obj.planVO.planSdate}</td>
            <td>${obj.planVO.planEdate}</td>
            <td>${obj.planVO.finPrdCdName}</td>
            <td>${obj.planVO.planProdVol}</td>
            <td>${obj.planVO.planProdVol}</td>
        </tr>`
        $("#findNotDonePlanTable tbody").append(node);
    }
  
    //미지시 생산계획 검색 모달 테이블 클릭이벤트
    $("#findNotDonePlanTable").on("click", "tr", function(){
      
    })
});
