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
        let empId = '';
        $.ajax({
            url : 'myPlanView',
            method : "GET",
            dataType : "json",
            data : {
                sdate : sdate,
                edate : edate,
                empId : empId
            },
            success : function(data){
                $("#findMyPlanTable tbody tr").remove();
                for (obj of data){
                    myPlanMakeRow(obj);
                }
            }
        })
    }
    
    

    //생산계획 조회 모달 내에 데이터 출력 make row
    function myPlanMakeRow(obj){
        let node = `<tr>
        <td>${obj.planHdVO.planHdCode}</td>
        <td>${obj.planHdVO.planHdName}</td>
        <td>${obj.planHdVO.slsOrdHdNo}</td>
        <td>${obj.planHdVO.planHdDate}</td>
        <td>${obj.planHdVO.empId}</td>
        <td>${obj.planHdVO.planHdRemk}</td>
        </tr>`
        $("#findMyPlanTable tbody").append(node);
    }




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

    //미계획 주문내역 모달창 출력 make row
    function notDoneOrdMakeRow(ord){
        let node = `<tr>
            <td>${ord.slsOrdHdNo}</td>
            <td>${ord.slsOrdHdDate}</td>
            <td>${ord.vendCdCode}</td>
            <td>${ord.vendCdNm}</td>
            <td>${ord.empId}</td>
            <td>${ord.slsOrdHdRemk}</td>
        </tr>`
        $("#findNotDoneOrdTable tbody").append(node);
    }

});