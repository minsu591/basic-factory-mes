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

    $("#addBtn").on("click",function(){
        let node = `<tr>
                        <td><input type="checkbox" ></td>`;
        if ($("#allCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" checked ></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
            </tr>`;
        $("#procTable tbody").append(node);
    });

    function procMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" ></td>
                        <td>${obj.procCdCode}</td>
                        <td>${obj.procCdName}</td>
                        <td>${obj.procCdRemk}</td>`;
        $("#procTable tbody").append(node);
    }

    

    //체크박스 체크유무
    let allCheck = $("#allCheck");
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#procTable tbody input:checkbox").prop("checked",true);
        }else{
            $("#procTable tbody input:checkbox").prop("checked",false);
        }
    })

    $("#procTable tbody").on("change","input:checkbox",function(){
        if(!$("this").is(":checked")){
            $("#allCheck").prop("checked",false);
        }
    });
});