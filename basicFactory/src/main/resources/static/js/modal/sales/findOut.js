$("document").ready(function(){
    //출고관리에서 조회 시 출고내역 모달창
    $("#findOutMngBtn").on("click",function(e){
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
        let slsOrdHdNo = $(this).find("td:eq(2)").text();
        let vendor = $(this).find("td:eq(3)").text();
        let vendorName = $(this).find("td:eq(4)").text();
        let empId = $(this).find(".empId").val();
        let empName = $(this).find("td:eq(5)").text();
        let remk = $(this).find("td:last").text();

        $("#slsOutHdDate").val(slsOutHdDate);
        $("#slsOutHdDate").attr("readonly",true);
        $("#slsOutHdNo").val(slsOutHdNo);
        $("#slsOrdHdNo").val(slsOrdHdNo);
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#vendorName").attr("readonly", true);
        $("#empId").val(empId);
        $("#empName").val(empName);
        $("#empName").attr("readonly",true);
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
                        <input type="hidden" class="empId" value="${obj.empId}">
                        <td>${obj.empName}</td>
                        <td>${obj.slsOutHdRemk}</td>
                    </tr>`
        $("#findOutTable tbody").append(node);
    }



    function sucFun(result){
        //경고창 띄워주기
        let alertFlag = false;
        if ($("#outMngTable tbody").children().length != 0){
            if(confirm("수정한 정보가 모두 사라집니다. 진행하시겠습니까?")==true){
                alertFlag = true;
            }
        }else{
            alertFlag = true;
        }

        if(alertFlag){
            $("#outMngTable tbody tr").remove();
                for(out of result){
                    outMngMakeRow(out);
                }

            $("#findOutModal").modal("hide");
            }
        }


    
    //출고내역 조회 모달을 통한 데이터 출력
    function outMngMakeRow(out){
        console.log(out);
        //out.slsOutCount가 1보다 크면 > 1 -> td에 
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <input type="hidden" value="${out.slsOutDtlNo}">
                        <td>${out.finPrdCdCode}</td>
                        <td>${out.finPrdCdName}</td>
                        <td>${out.slsOrdDtlVol}</td>
                        <td>${out.slsOutDtlPrvsVol}</td>
                        <td>${out.slsOutDtlVol}</td>
                        <td>${(out.slsOrdDtlVol - out.slsOutDtlPrvsVol) - out.slsOutDtlVol}</td>`;
                if(out.slsOutCount > 1){
                    node +=  `<td class="lotNo">${out.fnsPrdStkLotNo} 외 ${out.slsOutCount -1}</td>`;
                } else {
                    node +=  `<td class="lotNo">${out.fnsPrdStkLotNo}</td>`;
                }
            node += `   <td>${out.finPrdCdPrice}</td>
                        <td>${out.slsOutDtlVol * out.finPrdCdPrice}</td>
                    </tr>`;
        $("#outMngTable tbody").append(node);
    }
});
