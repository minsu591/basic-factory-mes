$(document).ready(function () {
	
//생산계획모달창 ON
  $("#findPlanBtn").click(function (e) {
    e.preventDefault();
    $("#findNotDonePlanModal").modal("show");
    planNotDoneClick();
  });
  
  //생산계획모달창 조회 버튼
	$("#findNotDonePlanBtn").click(function(){
	let sdate = $("#plansdate").val();
	let edate = $("#planedate").val();
		$.ajax({
                url : `prod/planNotDoneView/${sdate}/${edate}`,
                method : "GET",
                dataType : "json",
                success : function(data){
                    console.log(data);
                    $("#findNotDonePlanTable tbody tr").remove();
                    for (obj of data){
                        planNotDoneMakeRow(obj);
                    }
                }
            })
	});
	
  //생산계획모달창 ON 함수
  function planNotDoneClick(){
        $.ajax({
                url : 'prod/planNotDoneView',
                method : "GET",
                dataType : "json",
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
            <td>${obj.planVO.finPrdCdCode}</td>
            <td>${obj.planVO.planProdVol}</td>
            <td>${obj.planVO.planProdVol}</td>
        </tr>`
        $("#findNotDonePlanTable tbody").append(node);
    }
  
});