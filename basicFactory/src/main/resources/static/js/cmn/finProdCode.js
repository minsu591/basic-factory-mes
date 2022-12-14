$("document").ready(function(){
    //조회버튼 click 이벤트
    $("#selectBtn").on("click",function(){
        let finName = $("#finName").val();
        $.ajax({
            url : 'finProdCode/name',
            method : 'GET',
            dataType : 'json',
            data : {
                finName : finName
            },
            success :function(result){
                $("#finProdTable tbody tr").remove();
                if($("#allCheck").is(":checked")){
                    $("#allCheck").prop("checked",false);
                }
                for(obj of result){
                    finProdMakeRow(obj);
                }
            }
        })
    });


    function finProdMakeRow(obj){
        let node = `<tr>
                        <td class="cantModifyTd"><input type="checkbox" name="cb"></td>
                        <td class="cantModifyTd">${obj.finPrdCdCode}</td>
                        <td>${obj.finPrdCdName}</td>
                        <td>${obj.finPrdCdVol}</td>
                        <td>${obj.finPrdCdUnit}</td>
                        <td>${obj.finPrdCdPrice}</td>`;
        if(obj.finPrdCdUse == 1){
            node += `<td><input type="checkbox" name='use' checked></td>`;
        }else{
            node += `<td><input type="checkbox" name='use'></td>`;
        }
        node+= `<td>${obj.finPrdCdRemk}</td>
                <td class="curPo">${obj.empId}</td>
                </tr>`;
        $("#finProdTable tbody").append(node);
    }

    

    //체크박스 체크유무
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#finProdTable tbody input:checkbox[name='cb']").prop("checked",true);
        }else{
            $("#finProdTable tbody input:checkbox[name='cb']").prop("checked",false);
        }
    });
    $("input[name='cb']").click(function(e){
        e.stopPropagation();
        let total = $("input[name=cb]").length;
        let checked = $("input[name=cb]:checked").length;
        if (total != checked) $("#allCheck").prop("checked",false);
        else $("#allCheck").prop("checked", true);
    });
});