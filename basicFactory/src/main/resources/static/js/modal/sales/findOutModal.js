$("document").ready(function(){

    //반품관리에서 출고조회 시 출고내역 모달창
    $("#findOutModalBtn").on("click", function (e) {
        $("#slsRtnHdNo").val('');
        $("#findOutModal").modal("show");
        findOutClick();
    });

    $("#findOutBtn").on("click", findOutClick); //모달창에서 조회 눌렀을 때

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
        let slsOutHdNo = $(this).find("td:eq(1)").text();
        let vendor = $(this).find("td:eq(3)").text();
        let vendorName = $(this).find("td:eq(4)").text();
        let remk = $(this).find("td:last").text();

        $("#slsOutHdNo").val(slsOutHdNo);
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#remk").val(remk);

        //테이블 삽입
        $.ajax({
            url: 'outView/dtl/return',
            method : 'GET',
            data : {
                slsOutHdNo: slsOutHdNo
            },
            success : function(result){
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
        if ($("#rtnMngTable tbody").children().length != 0){
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
                    $("#rtnMngTable tbody tr").remove();
                    for(out of result){
                        rtnMngMakeRow(out);
                    }
                }else{
                    return;
                }
            });
        }else{
            for(out of result){
                rtnMngMakeRow(out);
            }
            $("#findOutModal").modal("hide");
        }
    }
    
    //출고내역 조회 모달을 통한 데이터 출력
    function rtnMngMakeRow(out){
        let node = `<tr class="out">
                        <td><input type="checkbox" name="cb"></td>
                        <td>${out.finPrdCdCode}</td>
                        <td>${out.finPrdCdName}</td>
                        <td>${out.slsOutHdNo}</td>
                        <td>${out.fnsPrdStkLotNo}</td>
                        <td>${out.slsOutDtlVol}</td>
                        <td>${out.slsRtnDtlVol}</td>
                        <td class="canModifyTd"></td>
                        <td>${out.finPrdCdPrice}</td>
                        <td class="price"></td>
                        <td class="canModifyTd">
                            <select name="prcCls">
                            <option></option>
                            <option value="0">폐기</option>
                            <option value="1">입고</option>
                            <option value="2">거부</option>
                            </select>
                        </td>
                        <td class="canModifyTd"></td>
                        <td class="canModifyTd"></td>
                    </tr>`;
        $("#rtnMngTable tbody").append(node);
    }
});
