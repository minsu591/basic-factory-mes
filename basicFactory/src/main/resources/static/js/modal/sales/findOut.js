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
        $("#slsOutHdNo").val(slsOutHdNo);
        $("#slsOrdHdNo").val(slsOrdHdNo);
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#empId").val(empId);
        $("#empName").val(empName);
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
        $("#findOutModal").modal("hide");
        //경고창 띄워주기
        if ($("#outMngTable tbody").children().length != 0){
            Swal.fire({
                icon: "question",
                title: "수정한 정보가 모두 사라집니다.",
                text: "삭제하고 진행하겠습니까?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                closeOnClickOutside: false,
              }).then((ans) =>{
                  if(ans.isConfirmed){
                    $("#outMngTable tbody tr").remove();
                    for(out of result){
                        outMngMakeRow(out);
                    }
                }else{
                    return;
                }
            });
        }else{
            for(out of result){
                outMngMakeRow(out);
            }
            $("#findOutModal").modal("hide");
        }
    }
    
    //출고내역 조회 모달을 통한 데이터 출력
    function outMngMakeRow(out){
        //out.slsOutCount가 1보다 크면 > 1 -> td에 
        let price = Number(out.slsOutDtlVol * out.finPrdCdPrice).toLocaleString("ko-KR");
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <td>${out.finPrdCdCode}</td>
                        <td>${out.finPrdCdName}</td>
                        <td>${out.slsOrdDtlVol}</td>
                        <td>${out.slsOutDtlPrvsVol}</td>
                        <td>${out.slsOutDtlVol}</td>
                        <td>${(out.slsOrdDtlVol - out.slsOutDtlPrvsVol) - out.slsOutDtlVol}</td>`;
                if(out.slsOutCount > 1){
                    node +=  `<td class="lotNo canModifyTd" >${out.fnsPrdStkLotNo} 외 ${out.slsOutCount -1}</td>`;
                } else {
                    node +=  `<td class="lotNo canModifyTd">${out.fnsPrdStkLotNo}</td>`;
                }
            node += `   <td>${out.finPrdCdPrice}</td>
                        <td class="price">`+ price +`</td>
                        <td></td>
                    </tr>`;
        $("#outMngTable tbody").append(node);
        
        //dtl 뿌려지고 난 후에 합계 계산하기
        //출고관리 테이블 tr 돌면서 출고량 총 합계 계산
        let trs = $("#outMngTable").find("tbody tr");
        let priceSum = 0;
        for(tr of trs){
            let totalPrice = $(tr).find(".price").text();
            if(totalPrice == null || totalPrice == ''){
                totalPrice = 0;
            } else {
                totalPrice = totalPrice.split(",").join(""); //콤마 제거
                totalPrice = Number(totalPrice);
            }
            priceSum += totalPrice;
        }
        $("#outTotalPrice").text(priceSum.toLocaleString("ko-KR"));
    }
});
