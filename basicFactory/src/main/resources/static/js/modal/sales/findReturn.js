$("document").ready(function(){
    //완제품 반품 관리에서 조회 시 반품내역 모달창
    $("#findRtnMngBtn").on("click",function(e){
        $("#findReturnModal").modal("show");
        findReturnClick();
    });
    
    //selectBox 만들기 위한 리스트
    let selectBoxList = ['폐기','입고','거부'];

    $("#findRtnBtn").on("click", findReturnClick);

    function findReturnClick(){
        let rtnSdate = $("#rtnSdate").val();
        let rtnEdate = $("#rtnEdate").val();

        $.ajax({
            url : 'returnView',
            method : "GET",
            dataType : "json",
            data : {
                rtnSdate: rtnSdate,
                rtnEdate: rtnEdate,
            },
            error: function (error) {
                console.log(error);
            },
            success: function (data) {
                console.log(data);
                $("#findRtnTable tbody tr").remove();
                for (obj of data){
                    rtnModalMakeRow(obj);
                }
            }
        })
    }
    
    //tr 클릭 이벤트
    $("#findRtnTable").on("click","tr", function(){

        //테이블 상단 공통 요소 삽입
        let slsRtnHdDate = $(this).find("td:first").text();
        let slsRtnHdNo = $(this).find("td:eq(1)").text();
        let vendor = $(this).find("td:eq(2)").text();
        let vendorName = $(this).find("td:eq(3)").text();
        let empId = $(this).find(".empId").val();
        let empName = $(this).find("td:eq(4)").text();
        let remk = $(this).find("td:last").text();

        $("#slsRtnHdDate").val(slsRtnHdDate);
        $("#slsRtnHdDate").attr("disabled", true);
        $("#slsRtnHdNo").val(slsRtnHdNo)
        $("#vendor").val(vendor);
        $("#vendorName").val(vendorName);
        $("#empId").val(empId);
        $("#empName").val(empName);
        $("#remk").val(remk);

        //테이블 삽입
        $.ajax({
            url: 'returnView/dtl',
            method : 'GET',
            data : {
                slsRtnHdNo: slsRtnHdNo
            },
            success : function(result){
                console.log(result);
                sucFun(result);
            }
        })
    });

    //반품내역 조회 모달 내에 데이터 출력 make row
    function rtnModalMakeRow(obj){
        let node = `<tr>
                        <td>${obj.slsRtnHdDate}</td>
                        <td>${obj.slsRtnHdNo}</td>
                        <td>${obj.vendCdCode}</td>
                        <td>${obj.vendCdNm}</td>
                        <input type="hidden" class="empId" value="${obj.empId}">
                        <td>${obj.empName}</td>
                        <td>${obj.slsRtnHdRemk}</td>
                    </tr>`
        $("#findRtnTable tbody").append(node);
    }



    function sucFun(result){
        $("#findReturnModal").modal("hide");
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
                    for(rtn of result){
                        rtnMakeRow(rtn);
                    }
                }else{
                    return;
                }
            });
        }else{
            for(rtn of result){
                rtnMakeRow(rtn);
            }
            $("#findReturnModal").modal("hide");
        }
    }

    function makeSelectBox(PrcCls) {
        let node;
        if (PrcCls != 1) {
            node = `<td class="canModifyTd"><select>`;
        } else {
            node = `<td><select>`;
        }

        for(select of selectBoxList){
            let val = 0;
            if(select == '폐기') {
                val = 0;
            }
            else if(select == '입고') {
                val = 1;
            } else if (select == '거부'){
                val = 2;
            } else {
                val = '';
            }

            if (select == PrcCls) {
                node += `<option value="`+ val +`"selected>${select}</option>`;
            }else {
                node += `<option value="`+ val +`">${select}</option>`;
            }
        }
        node += `</select></td>`;
        return node;
    }

    //반품내역 조회 모달을 통한 데이터 출력
    function rtnMakeRow(rtn){
        let price = Number(rtn.slsRtnDtlVO.slsRtnDtlPrice).toLocaleString("ko-KR");
        let PrcCls = rtn.slsRtnDtlVO.slsRtnDtlPrcCls;
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <input type='hidden' value="${rtn.slsRtnDtlVO.slsRtnDtlNo}">
                        <td>${rtn.slsRtnDtlVO.finPrdCdCode}</td>
                        <td>${rtn.slsRtnDtlVO.finPrdCdName}</td>
                        <td>${rtn.slsRtnHdVO.slsOutHdNo}</td>
                        <td>${rtn.slsRtnDtlVO.fnsPrdStkLotNo}</td>
                        <td>${rtn.slsRtnDtlVO.slsOutDtlVol}</td>
                        <td>${rtn.slsRtnDtlVO.slsRtnDtlBaseVol}</td>`;
        if (PrcCls != 1) {
            node += `<td class="canModifyTd">${rtn.slsRtnDtlVO.slsRtnDtlVol}</td>`;
        } else {
            node += `<td>${rtn.slsRtnDtlVO.slsRtnDtlVol}</td>`;
        }
        node += `<td>${rtn.slsRtnDtlVO.finPrdCdPrice}</td>
                 <td class="price">`+ price +`</td>`;
                    if(PrcCls == 0){
                        node += makeSelectBox('폐기');
                    } else if (PrcCls == 1) {
                        console.log("처리구분 "+PrcCls);
                        node += `<td>입고</td>`;
                    } else {
                        node += makeSelectBox('거부');
        }
        if (PrcCls != 1) {
            node += `<td class="canModifyTd">${rtn.slsRtnDtlVO.slsRtnDtlResn}</td>
                     <td class="canModifyTd"></td> </tr>`;
        } else {
            node += `<td>${rtn.slsRtnDtlVO.slsRtnDtlResn}</td>
                     <td></td> </tr>`;
        }
        
        $("#rtnMngTable tbody").append(node);

        //dtl 뿌려지고 난 후에 합계 계산하기
        //출고관리 테이블 tr 돌면서 출고량 총 합계 계산
        let trs = $("#rtnMngTable").find("tbody tr");
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
        $("#rtnTotalPrice").text(priceSum.toLocaleString("ko-KR"));
    }
});
