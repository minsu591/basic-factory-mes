$("document").ready(function(){

    //반품관리에서 출고조회 시 출고내역 모달창
    $("#findOutModalBtn").on("click",function(e){
        $("#findOutModal").modal("show");
        findOutClick();
    });

    $("#findOutBtn").on("click", findOutClick);

    function findOutClick(){
        let outSdate = $("#outSdate").val();
        let outEdate = $("#outEdate").val();

        $.ajax({
            url : 'outView',
            method : "GET",
            dataType : "json",
            data : {
                outSdate: outSdate,
                outEdate: outEdate,
            },
            success: function (data) {
                console.log(data);
                $("#findOutTable tbody tr").remove();
                for (obj of data){
                    findOutModalMakeRow(obj);
                }
            }
        })
    }
    
    //tr 클릭 이벤트
    $("#findOutTable").on("click","tr", function(){
        //테이블 상단 공통 요소 삽입
        let slsOutHdDate = $(this).find("td:first").text();
        let slsOutHdNo = $(this).find("td:eq(1)").text();
        let vendor = $(this).find("td:eq(3)").text();
        let vendorName = $(this).find("td:eq(4)").text();
        let empName = $(this).find("td:eq(5)").text();
        let remk = $(this).find("td:last").text();

        $("#slsOutHdDate").val(slsOutHdDate);
        $("#slsOutHdDate").attr("readonly",true);
        $("#slsOutHdNo").val(slsOutHdNo)
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#vendorName").attr("readonly", true);
        $("#empid").val(empName);
        $("#empid").attr("readonly",true);
        $("#remk").val(remk);

        //테이블 삽입
        $.ajax({
            url: 'outView/dtl',
            method : 'GET',
            data : {
                slsOutHdNo: slsOutHdNo
            },
            success : function(result){
                console.log(result);
                sucFun(result);
            }
        })
    });

    //출고내역 조회 모달 내에 데이터 출력 make row
    function findOutModalMakeRow(obj){
        let node = `<tr>
                        <td>${obj.slsOutHdDate}</td>
                        <td>${obj.slsOutHdNo}</td>
                        <td>${obj.slsOrdHdNo}</td>
                        <td>${obj.vendCdCode}</td>
                        <td>${obj.vendCdNm}</td>
                        <td>${obj.empName}</td>
                        <td>${obj.slsOutHdRemk}</td>
                    </tr>`
        $("#findOutTable tbody").append(node);
    }



    function sucFun(result){
        //경고창 띄워주기
        let alertFlag = false;
        if ($("#rtnMngTable tbody").children().length != 0){
            if(confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?")==true){
                alertFlag = true;
            }
        }else{
            alertFlag = true;
        }

        if(alertFlag){
            $("#rtnMngTable tbody tr").remove();
                for(out of result){
                    rtnMngMakeRow(out);
                }

            $("#findOutModal").modal("hide");
            }
        }


    
    //출고내역 조회 모달을 통한 데이터 출력
    function rtnMngMakeRow(out){
        let node = `<tr>
                        <td><input type="checkbox"></td>
                        <td>${out.finPrdCdCode}</td>
                        <td>${out.finPrdCdName}</td>
                        <td>${out.slsOutHdNo}</td>
                        <td>0</td>
                        <td></td>
                        <td>${out.finPrdCdPrice}</td>
                        <td></td>
                        <td>
                            <select name="prcCls" name="prcCls">
                            <option></option>
                            <option value="0">폐기</option>
                            <option value="1">입고</option>
                            <option value="2">거부</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>`;
        $("#rtnMngTable tbody").append(node);
    }
});
