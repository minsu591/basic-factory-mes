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

    

    function bomMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="bomCb"></td>`;
        if($("#bomAllCheck").is(":checked")){
            node = `<tr>
                <td><input type="checkbox" name="bomCb" checked></td>`
        }
        node += `<td>${obj.bomCdCode}</td>
                <td>${obj.bomCdName}</td>
                <td class="finPrdCdCode">${obj.finPrdCdCode}</td>
                <td>${obj.finPrdCdName}</td>
                <td class="lineCdHdCode">${obj.lineCdHdCode}</td>
                <td>${obj.lineCdHdName}</td>
                <td>${obj.bomCdProdVol}</td>
                <td>${obj.bomCdUnit}</td>`;
        if(obj.bomCdUse == 1){
            node += `<td><input type="checkbox" class="bomCdUse" checked ></td>`;
        }else{
            node += `<td><input type="checkbox" class="bomCdUse"></td>`;
        }
        node += `<td>${obj.bomCdRemk}</td>
                </tr>`;
        $("#bomTable tbody").append(node);
    }


    

    //bom 체크박스 체크유무
    $("#bomAllCheck").click("change",function(){
        if($("#bomAllCheck").is(":checked")){
            $("#bomTable tbody input:checkbox[name='bomCb']").prop("checked",true);
        }else{
            $("#bomTable tbody input:checkbox[name='bomCb']").prop("checked",false);
        }
    })
    $("#bomTable tbody").on("click","input:checkbox[name='bomCb']",function(e){
        let total = $("input[name='bomCb']").length;
        let checked = $("input[name='bomCb']:checked").length;
        if (total != checked) $("#bomAllCheck").prop("checked",false);
        else $("#bomAllCheck").prop("checked", true);
        e.stopPropagation();
    })
    $("#bomTable tbody").on("click","input:checkbox",function(e){
        e.stopPropagation();
    })

    //rsc 체크박스 체크유무
    $("#rscAllCheck").click("change",function(){
        if($("#rscAllCheck").is(":checked")){
            $("#bomRscTable tbody input:checkbox[name='rscCb']").prop("checked",true);
        }else{
            $("#bomRscTable tbody input:checkbox[name='rscCb']").prop("checked",false);
        }
    })
    $("#bomRscTable tbody").on("click","input:checkbox[name='rscCb']",function(e){
        let total = $("input[name=rscCb]").length;
        let checked = $("input[name=rscCb]:checked").length;
        if (total != checked) $("#rscAllCheck").prop("checked",false);
        else $("#rscAllCheck").prop("checked", true);
        e.stopPropagation();
    })

});