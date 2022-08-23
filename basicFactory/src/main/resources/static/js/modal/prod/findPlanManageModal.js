$("document").ready(function(){
    //내 생산계획 조회 모달
    $("#myPlanBtn").on("click",function(e){
        $("#findMyPlanModal").modal("show");
        myPlanClick();
    });

    $("#findMyPlanBtn").on("click",myPlanClick);

    function myPlanClick(){
        let sdate = $("#plansdate").val();
        let edate = $("#planedate").val();
        $.ajax({
            url : 'myPlanView',
            method : "GET",
            dataType : "json",
            data : {
                sdate : sdate,
                edate : edate
            },
            success : function(data){
                console.log(data);
                $("#findMyPlanTable tbody tr").remove();
                for (obj of data){
                    myPlanMakeRow(obj);
                }
            }
        })
    }
    function myPlanMakeRow(obj){
        let node = `<tr>
        <td>${obj.planVO.planIdx}</td>
        <td>${obj.planHdVO.planHdCode}</td>
        <td>${obj.planHdVO.planHdDate}</td>
        <td>${obj.planHdVO.planHdName}</td>
        <td>${obj.planHdVO.empId}</td>
        <td>${obj.planVO.planSdate}</td>
        <td>${obj.planVO.planEdate}</td>
        <td>${obj.planVO.finPrdCdCode}</td>
        <td>${obj.planVO.finPrdCdName}</td>
        <td>${obj.planVO.planProdVol}</td>
        <td>${obj.planVO.planRemk}</td>
        </tr>`
        $("#findMyPlanTable tbody").append(node);
    }
    
    //tr 클릭 이벤트
    $("#findMyPlanTable").on("click","tr", function(){
        let planHdDate = $(this).find("td:eq(2)").text();
        let planHdName = $(this).find("td:eq(3)").text();
        let planRemk = $(this).find("td:last").text();
        let empId = $(this).find("td:eq(4)").text();

        $("#planDate").val(planHdDate);
        $("#planName").val(planHdName)
        $("#planRemk").val(planRemk);
        $("#empid").val(empId);

        $("#findMyPlanModal").modal("hide");
        //클릭한 생산계획에 해당하는 (계획코드)로 주문내역과 plan가져와서 tr에 뿌리기
    })


    //미계획 주문내역 조회 모달
    $("#NotDoneOrdBtn").on("click",function(){
        $("#findNotDoneOrdModal").modal("show");
        notDoneOrdClick();
    })
    $("#findNotDoneOrdSearchBtn").on("click",notDoneOrdClick);

    function notDoneOrdClick(){
        let sdate = $("#ordSdate").val();
        let edate = $("#ordSdate").val();
        $.ajax({
            url : 'notDoneOrd',
            method : "GET",
            dataType : "json",
            data : {
                sdate : sdate,
                edate : edate
            },
            success : function(data){
                $("#findNotDoneOrdTable tbody tr").remove();
                for (ord of data){
                    notDoneOrdMakeRow(ord);
                }
            }
        })
    }
    function notDoneOrdMakeRow(ord){
        let node = `<tr>
            <td>${ord.slsOrdHdVO.slsOrdHdNo}</td>
            <td>${ord.slsOrdHdVO.slsOrdHdDate}</td>
            <td>${ord.slsOrdHdVO.vendCdCode}</td>
            <td>${ord.slsOrdHdVO.vendCdNm}</td>
            <td>${ord.slsOrdDtlVO.finPrdCdCode}</td>
            <td>${ord.slsOrdDtlVO.finPrdCdName}</td>
            <td>${ord.slsOrdDtlVO.slsOrdDtlDlvDate}</td>
            <td>${ord.slsOrdHdVO.empId}</td>
            <td>${ord.slsOrdDtlVO.slsOrdDtlVol}</td>
            <td>${ord.planVO.planProdVol}</td>
        </tr>`
        $("#findNotDoneOrdTable tbody").append(node);
    }

});