$("document").ready(function () {
    //주문관리에서 조회 시 주문내역 모달창
    $("#findOrderBtn").on("click",function(e){
        $("#findOrdModal").modal("show");
        findOrderClick();
    });

    $("#findOrdBtn").on("click", findOrderClick);

    function findOrderClick(){
        let ordSdate = $("#ordSdate").val();
        let ordEdate = $("#ordEdate").val();

        $.ajax({
            url : 'orderView',
            method : "GET",
            dataType : "json",
            data : {
                ordSdate: ordSdate,
                ordEdate: ordEdate,
            },
            success: function (data) {
                console.log(data);
                $("#findOrdTable tbody tr").remove();
                for (obj of data){
                    ordModalMakeRow(obj);
                }
            }
        })
    }
    
    //tr 클릭 이벤트
    $("#findOrdTable").on("click","tr", function(){
        //테이블 상단 공통 요소 삽입
        let slsOrdHdDate = $(this).find("td:first").text();
        let slsOrdHdNo = $(this).find("td:eq(1)").text();
        let vendor = $(this).find("td:eq(2)").text();
        let vendorName = $(this).find("td:eq(3)").text();
        let empName = $(this).find("td:eq(4)").text();
        let remk = $(this).find("td:last").text();

        $("#slsOrdHdDate").val(slsOrdHdDate);
        $("#slsOrdHdDate").attr("disabled",true);
        $("#slsOrdHdNo").val(slsOrdHdNo);
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#empName").val(empName);
        $("#remk").val(remk);

        //테이블 삽입
        $.ajax({
            url: 'orderView/dtl',
            method : 'GET',
            data : {
                slsOrdHdNo: slsOrdHdNo
            },
            success : function(result){
                console.log(result);
                sucFun(result);
            }
        })
    });

    //주문내역 조회 모달 내에 데이터 출력 make row
    function ordModalMakeRow(obj){
        let node = `<tr>
                        <td>${obj.slsOrdHdDate}</td>
                        <td>${obj.slsOrdHdNo}</td>
                        <td>${obj.vendCdCode}</td>
                        <td>${obj.vendCdNm}</td>
                        <td>${obj.empName}</td>
                        <td>${obj.slsOrdHdRemk}</td>
                    </tr>`
        $("#findOrdTable tbody").append(node);
    }


    function sucFun(result){
        $("#findOrdModal").modal("hide");
        //경고창 띄워주기
        if ($("#ordMngTable tbody").children().length != 0){
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
                    $("#ordMngTable tbody tr").remove();
                    for(ord of result){
                        ordMakeRow(ord);
                    }
                }else{
                    return;
                }
            });
        }else{
            for(ord of result){
                ordMakeRow(ord);
            }
            $("#findOrdModal").modal("hide");
        }
    }
    
    //주문내역 조회 모달을 통한 데이터 출력
    function ordMakeRow(ord){
        let node = `<tr>
                    <td><input type="checkbox" name="cb"></td>
                    <input type="hidden" value="${ord.slsOrdDtlNo}">
                    <td class="productCode canModifyTd">${ord.finPrdCdCode}</td>
                    <td>${ord.finPrdCdName}</td>
                    <td class="canModifyTd"><input type="date" value="${ord.slsOrdDtlDlvDate}"></td>
                    <td class="canModifyTd">${ord.slsOrdDtlVol}</td>
                    </tr>`;
        $("#ordMngTable tbody").append(node);
    }
});
