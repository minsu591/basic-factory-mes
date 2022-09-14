$("document").ready(function(){
    //내 생산계획 조회 모달
    $("#myPlanBtn").on("click",function(e){
        $("#findMyPlanModal").modal("show");
        myPlanClick();
    });

    $("#ordEdate").on("click",function(){
        let ordSdate = $("#ordSdate").val();
        if(ordSdate != null && ordSdate != ''){
            $("#ordEdate").attr("min",ordSdate);
        }
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
                sdate,
                edate
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
            <td>${obj.planHdDate}</td>
            <td>${obj.planHdCode}</td>
            <td>${obj.planHdName}</td>
            <td>${obj.empId}</td>
            <td>${obj.planHdRemk}</td>
        </tr>`
        $("#findMyPlanTable tbody").append(node);
    }


    //미계획 주문내역 조회 모달
    $("#NotDoneOrdBtn").on("click",function(){
        $("#ordSdate").val(prev7Days);
        $("#ordEdate").val(today);
        notDoneOrdClick();
        $("#findNotDoneOrdModal").modal("show");
    })
    
    $("#findNotDoneOrdSearchBtn").on("click",notDoneOrdClick);

    function notDoneOrdClick(){
        let sdate = $("#ordSdate").val();
        let edate = $("#ordEdate").val();
        $.ajax({
            url : 'notDoneOrd',
            method : "GET",
            dataType : "json",
            data : {
                sdate,
                edate
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
            <td>${ord.slsOrdHdDate}</td>
            <td>${ord.slsOrdHdNo}</td>
            <td>${ord.vendCdCode}</td>
            <td>${ord.vendCdNm}</td>
            <td>${ord.empId}</td>
            <td>${ord.slsOrdHdRemk}</td>
        </tr>`
        $("#findNotDoneOrdTable tbody").append(node);
    }

    $("#findNotDoneOrdModal").on("hidden.bs.modal",function(){
        $("#ordSdate").val('');
        $("#ordEdate").val('');
    });
    $("#findMyPlanModal").on("hidden.bs.modal",function(){
        $("#plansdate").val('');
        $("#planedate").val('');
    });

});