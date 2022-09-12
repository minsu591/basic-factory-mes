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
      console.log(planHdCode);
      $.ajax({
        url : 'planNotDoneView/dtl',
        type : 'GET',
        dataType : "json",
        data : {
            planHdCode
        },
        success : function(data){
          //생산지시 array 삭제
          lineArray.splice(0);
          inDtlVol.splice(0);
          prodCodeArr.splice(0);
          //테이블 삭제
          $("#procStatusTable tbody tr").remove();
          $("#rscStockTable tbody tr").remove();
          
          $("#planDetailTable tbody tr").remove();
          for(obj of data){
            let finInfoList = finInfo(obj.finPrdCdCode);
            console.log(finInfoList);
            detailTableMakeRow(obj,finInfoList);
          }
          $("#findNotDonePlanModal").modal("hide");
        }
      });

    });

    function detailTableMakeRow(obj,finInfoList) {
      let node = `<tr>
          <td><input type="checkbox"></td>
          <td><input type="text" disabled name="prodCode" value="${obj.finPrdCdCode}" ></td>
          <td><input type="text" disabled value="${finInfoList[0]}"></td>
          <td><input type="text" disabled value="${finInfoList[1]}"></td>
          <td><input type="text" disabled value="${obj.planIdx}"></td>
          <td><input type="text" disabled value="${obj.planHdCode}"></td>
          <td><input type="text" disabled value="${obj.planSdate}"></td>
          <td><input type="text" disabled value="${obj.planEdate}"></td>
          <td><input type="text" disabled value="${obj.instProdIndicaVol}"></td>
          <td><input type="text" disabled value="${obj.planProdVol - obj.instProdIndicaVol}"></td>
          <td><input type="text"></td>
          <td><input type="text" disabled value="${finInfoList[2]}"></td>
          <td><input type="date"></td>
        </tr>`;
      $("#planDetailTable tbody").append(node);
    }

    function finInfo(prodCode){
      let finPrdCdName;
      let prodUnit;
      let lineName;
      $.ajax({
        url: `findProdName/${prodCode}`,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async : false,
        success: function (data) {
          console.log(data);
          finPrdCdName = data.finPrdCdName;
          prodUnit = data.finPrdCdVol + data.finPrdCdUnit;
          lineName = data.lineCdHdName;
        },
        error: function (error, status, msg) {
          finPrdCdName = "";
          prodUnit = "";
          lineName = "";
        },
      });
      return [finPrdCdName,prodUnit,lineName];
    }

});
