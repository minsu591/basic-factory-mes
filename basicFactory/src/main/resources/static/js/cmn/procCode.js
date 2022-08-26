$("document").ready(function(){
    //조회버튼 click 이벤트
    $("#selectBtn").on("click",function(){
        let procName = $("#procName").val();
        $.ajax({
            url : 'procCode/name',
            method : 'GET',
            dataType : 'json',
            data : {
                procName : procName
            },
            success :function(result){
                $("#procTable tbody tr").remove();
                if($("#allCheck").is(":checked")){
                    $("#allCheck").prop("checked",false);
                }
                for(obj of result){
                    procMakeRow(obj);
                }
            }
        })
    });

    

    function procMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <td>${obj.procCdCode}</td>
                        <td>${obj.procCdName}</td>
                        <td>${obj.procCdRemk}</td>`;
        $("#procTable tbody").append(node);
    }

    

    //체크박스 체크유무
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#procTable tbody input:checkbox[name='cb']").prop("checked",true);
        }else{
            $("#procTable tbody input:checkbox[name='cb']").prop("checked",false);
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