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
    
    //tr 클릭 이벤트
    $("#findMyPlanTable").on("click","tr", function(){
        //테이블 상단 공통 요소 삽입
        let planHdDate = $(this).find("td:eq(3)").text();
        let planHdName = $(this).find("td:eq(1)").text();
        let planRemk = $(this).find("td:last").text();
        let empId = $(this).find("td:eq(4)").text();
        let planHdCode = $(this).find("td:eq(0)").text();

        $("#planDate").val(planHdDate);
        $("#planDate").attr("readonly",true);
        $("#planName").val(planHdName)
        $("#planName").attr("readonly",true);
        $("#planRemk").val(planRemk);
        $("#empid").val(empId);
        $("#empid").attr("readonly",true);

        //테이블 삽입
        $.ajax({
            url : 'myPlanView/dtl',
            method : 'GET',
            data : {
                planCode : planHdCode
            },
            success : function(result){
                console.log(result);
                sucFun(result,"plan");
            }
        })
    });

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

    //미계획 주문내역 tr 클릭 이벤트
    $("#findNotDoneOrdTable").on("click","tr",function(){
        let ordNo = $(this).find("td:eq(0)").text();
        $.ajax({
            url : 'notDoneOrd/dtl',
            method : 'GET',
            data : {
                ordNo : ordNo
            },
            dataType : "json",
            success : function(result){
                sucFun(result,"order");
            }
        })
    });

    function sucFun(result,type){
        //경고창 띄워주기
        let alertFlag = false;
        if($("#planManageTable tbody").children().length != 0){
            if(confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?")==true){
                alertFlag = true;
            }
        }else{
            alertFlag = true;
        }

        if(alertFlag){
            $("#planManageTable tbody tr").remove();
            if(type == 'order'){
                for(ord of result){
                    ordMakeRowForNotDone(ord);
                }
            }else{
                console.log("plan");
                for(ord of result){
                    ordMakeRowForPlan(ord);
                }
            }
            
            if(type == 'order'){
                $("#findNotDoneOrdModal").modal("hide");
            }else{
                $("#findMyPlanModal").modal("hide");
            }
        }
    }

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
            <td>${ord.slsOrdHdVO.slsOrdHdNo}</td>
            <td>${ord.slsOrdHdVO.slsOrdHdDate}</td>
            <td>${ord.slsOrdHdVO.vendCdCode}</td>
            <td>${ord.slsOrdHdVO.vendCdNm}</td>
            <td>${ord.slsOrdHdVO.empId}</td>
            <td>${ord.slsOrdHdVO.slsOrdHdRemk}</td>
        </tr>`
        $("#findNotDoneOrdTable tbody").append(node);
    }

    //미계획 주문내역 조회 모달을 통한 데이터 출력
    function ordMakeRowForNotDone(ord){
        let node = `<tr>
            <td><input type="checkbox"></td>
            <td>${ord.slsOrdHdVO.slsOrdHdNo}</td>
            <td>${ord.slsOrdDtlVO.finPrdCdCode}</td>
            <td>${ord.slsOrdDtlVO.finPrdCdName}</td>
            <td>${ord.slsOrdDtlVO.slsOrdDtlDlvDate}</td>
            <td>${ord.slsOrdDtlVO.slsOrdDtlVol}</td>
            <td>${ord.planVO.planProdVol}</td>
            <td>${ord.slsOrdDtlVO.slsOrdDtlVol-ord.planVO.planProdVol}</td>
            <td><input type="number"></td>
            <td><input type="date"></td>
            <td><input type="date"></td>
        </tr>`
        $("#planManageTable tbody").append(node);
    }
    
    //생산계획 조회 모달을 통한 데이터 출력
    function ordMakeRowForPlan(ord){
        let node = `<tr>
                    <td><input type="checkbox"></td>`;
        if(ord.colOrdVO.slsOrdHdNo == null){
            node += `<td></td>
                    <td>${ord.planVO.finPrdCdCode}</td>
                    <td>${ord.planVO.finPrdCdName}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${ord.planVO.planProdVol}</td>
                    <td>${ord.planVO.planSdate}</td>
                    <td>${ord.planVO.planEdate}</td>
                </tr>`;
        }else{
            node += `<td>${ord.colOrdVO.slsOrdHdNo}</td>
                    <td>${ord.planVO.finPrdCdCode}</td>
                    <td>${ord.planVO.finPrdCdName}</td>
                    <td>${ord.colOrdVO.slsOrdDtlDlvDate}</td>
                    <td>${ord.colOrdVO.slsOrdDtlVol}</td>
                    <td>${ord.planVO.planProdVol}</td>
                    <td>${ord.colOrdVO.slsOrdDtlVol-ord.planVO.planProdVol}</td>
                    <td>${ord.planVO.planProdVol}</td>
                    <td>${ord.planVO.planSdate}</td>
                    <td>${ord.planVO.planEdate}</td>
                </tr>`
        }
        $("#planManageTable tbody").append(node);
    }
});