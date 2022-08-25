$("document").ready(function(){
    //bom 조회버튼 click 이벤트
    $("#bomSelectBtn").on("click",function(){
        let finName = $("#finName").val();
        $.ajax({
            url : 'bomCode/name',
            method : 'GET',
            dataType : 'json',
            data : {
                finName : finName
            },
            success :function(result){
                $("#bomTable tbody tr").remove();
                for(obj of result){
                    bomMakeRow(obj);
                }

                //필요 자재 목록 삭제
                $("#bomCode").val('');
                $("#lineCode").val('');
                $("#prodVol").val('');
                $("#prodUnit").val('');
                $("#bomRscTable tbody tr").remove();

            }
        });

    });

    //bom 추가 버튼
    $("#bomAddBtn").on("click",function(){
        let node = `<tr>
                        <td><input type="checkbox" name="bomCb"></td>`;
        if ($("#bomAllCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" name="bomCb" checked></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"></td>
                <td></td>
            </tr>`;
        $("#bomTable tbody").append(node);
    });

    //bom tr 클릭
    $("#bomTable tbody").on("click","tr",function(){
        let bomCode = $(this).find("td:eq(1)").text();
        let lineCode = $(this).find("td:eq(5)").text();
        let prodVol = $(this).find("td:eq(7)").text();
        let prodUnit = $(this).find("td:eq(8)").text();

        $("#bomCode").val(bomCode);
        $("#lineCode").val(lineCode);
        $("#prodVol").val(prodVol);
        $("#prodUnit").val(prodUnit);

        $.ajax({
            url : 'bomRsc',
            methods : 'GET',
            data : {
                bomCode : bomCode
            },
            dataType : 'json',
            success : function(result){
                $("#bomRscTable tbody tr").remove();
                for(obj of result){
                    rscMakeRow(obj);
                }
            }
        })
    })


    //rsc 추가 버튼
    $("#rscAddBtn").on("click",function(){
        if($("#bomCode").val() == ''){
            alert("bom을 선택하고 자재를 추가해주세요.");
        }else{
            let node = `<tr>
                            <td><input type="checkbox" name="rscCb"></td>`;
            if ($("#rscAllCheck").is(":checked")){
                node = `<tr>
                            <td><input type="checkbox" name="rscCb" checked></td>`;
            }
            node +=`<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            $("#bomRscTable tbody").append(node);
        }
    });

    function bomMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="bomCb"></td>`;
        if($("#bomAllCheck").is(":checked")){
            node = `<tr>
                <td><input type="checkbox" name="bomCb" checked></td>`
        }
        node += `<td>${obj.bomCdCode}</td>
                <td>${obj.bomCdName}</td>
                <td>${obj.finPrdCdCode}</td>
                <td>${obj.finPrdCdName}</td>
                <td>${obj.lineCdHdCode}</td>
                <td>${obj.lineCdHdName}</td>
                <td>${obj.bomCdProdVol}</td>
                <td>${obj.bomCdUnit}</td>`;
        if(obj.bomCdUse == 1){
            node += `<td><input type="checkbox" checked></td>`;
        }else{
            node += `<td><input type="checkbox"></td>`;
        }
        node += `<td>${obj.bomCdRemk}</td>
                </tr>`;
        $("#bomTable tbody").append(node);
    }

    function rscMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="rscCb"></td>`;
        if($("#rscAllCheck").is(":checked")){
            node = `<tr>
                <td><input type="checkbox" name="rscCb" checked></td>`
        }
        node+= `<td>${obj.lineCodeVO.procCdCode}</td>
                <td>${obj.lineCodeVO.procCdName}</td>
                <td>${obj.lineCodeVO.mchnCode}</td>
                <td>${obj.lineCodeVO.mchnName}</td>
                <td>${obj.bomRscVO.rscCdCode}</td>
                <td>${obj.bomRscVO.rscCdName}</td>
                <td>${obj.bomRscVO.bomRscUseVol}</td>
                <td>${obj.bomRscVO.bomRscUnit}</td>
                </tr>`;
        $("#bomRscTable tbody").append(node);
    }

    

    //bom 체크박스 체크유무
    $("#bomAllCheck").click("change",function(){
        if($("#bomAllCheck").is(":checked")){
            $("#bomTable tbody input:checkbox[name='bomCb']").prop("checked",true);
        }else{
            $("#bomTable tbody input:checkbox[name='bomCb']").prop("checked",false);
        }
    })
    $("input[name='bomCb']").click(function(e){
        e.stopPropagation();
        let total = $("input[name='bomCb']").length;
        let checked = $("input[name='bomCb']:checked").length;
        if (total != checked) $("#bomAllCheck").prop("checked",false);
        else $("#bomAllCheck").prop("checked", true);
    })

    //rsc 체크박스 체크유무
    $("#rscAllCheck").click("change",function(){
        if($("#rscAllCheck").is(":checked")){
            $("#bomRscTable tbody input:checkbox[name='rscCb']").prop("checked",true);
        }else{
            $("#bomRscTable tbody input:checkbox[name='rscCb']").prop("checked",false);
        }
    })
    $("input[name='rscCb']").click(function(e){
        let total = $("input[name=rscCb]").length;
        let checked = $("input[name=rscCb]:checked").length;
        if (total != checked) $("#rscAllCheck").prop("checked",false);
        else $("#rscAllCheck").prop("checked", true);
    })

});