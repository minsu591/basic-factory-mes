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
                console.log(result);
                for(obj of result){
                    finProdMakeRow(obj);
                }
            }
        })
    });

    $("#addBtn").on("click",function(){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>`;
        if ($("#allCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" name="cb" checked ></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"></td>
                <td></td>
                <td></td>
            </tr>`;
        $("#finProdTable tbody").append(node);
    });

    function finProdMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <td>${obj.finPrdCdCode}</td>
                        <td>${obj.finPrdCdName}</td>
                        <td>${obj.finPrdCdVol}</td>
                        <td>${obj.finPrdCdUnit}</td>
                        <td>${obj.finPrdCdPrice}</td>`;
        if(obj.finPrdCdUse == 1){
            node += `<td><input type="checkbox" checked></td>`;
        }else{
            node += `<td><input type="checkbox"></td>`;
        }
        node+= `<td>${obj.finPrdCdRemk}</td>
                <td>${obj.empId}</td>
                </tr>`;
        $("#finProdTable tbody").append(node);
    }

    

    //체크박스 체크유무
    let allCheck = $("#allCheck");
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#finProdTable tbody input:checkbox[name='cb']").prop("checked",true);
        }else{
            $("#finProdTable tbody input:checkbox[name='cb']").prop("checked",false);
        }
    })

    $("#finProdTable tbody").on("change","input:checkbox[name='cb']",function(){
        if(!$("this").is(":checked")){
            $("#allCheck").prop("checked",false);
        }
    });
});