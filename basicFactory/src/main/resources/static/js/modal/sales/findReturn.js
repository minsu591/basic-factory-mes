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
                rtnSucFun(result);
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



    function rtnSucFun(result){
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
                for(rtn of result){
                    rtnMakeRow(rtn);
                }

            $("#findReturnModal").modal("hide");
            }
        }


    
    function makeSelectBox(PrcCls){
        let node = `<td class="canModifyTd"><select>`;

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
        let PrcCls = rtn.slsRtnDtlVO.slsRtnDtlPrcCls;
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <input type='hidden' value="${rtn.slsRtnDtlVO.slsRtnDtlNo}">
                        <td>${rtn.slsRtnDtlVO.finPrdCdCode}</td>
                        <td>${rtn.slsRtnDtlVO.finPrdCdName}</td>
                        <td>${rtn.slsRtnHdVO.slsOutHdNo}</td>
                        <td>${rtn.slsRtnDtlVO.fnsPrdStkLotNo}</td>
                        <td>${rtn.slsRtnDtlVO.slsOutDtlVol}</td>
                        <td>${rtn.slsRtnDtlVO.slsRtnDtlBaseVol}</td>
                        <td class="canModifyTd">${rtn.slsRtnDtlVO.slsRtnDtlVol}</td>
                        <td>${rtn.slsRtnDtlVO.finPrdCdPrice}</td>
                        <td>${rtn.slsRtnDtlVO.slsRtnDtlPrice}</td>`;
                    if(PrcCls == 0){
                        node += makeSelectBox('폐기');
                    } else if (PrcCls == 1) {
                        console.log("처리구분 "+PrcCls);
                        node += `<td>입고</td>`;
                    } else {
                        node += makeSelectBox('거부');
                    }
            node += `<td class="canModifyTd">${rtn.slsRtnDtlVO.slsRtnDtlResn}</td>
                     </tr>`;
        $("#rtnMngTable tbody").append(node);
    }
});
