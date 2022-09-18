$("document").ready(function(){
    //직원 조회 버튼 이벤트
    $("#selectBtn").on("click",function(){
        let deptName = $("#deptNameInDept").val();

        $.ajax({
            url : 'empView/dept',
            methods : 'GET',
            dataType : 'json',
            data : {
                deptName
            },
            success : function(result){
                $("#deptTable tbody tr").remove();
                for(obj of result){
                    deptMakeRow(obj);
                }
            }
        })
    })

    //부서 make Tr
    function deptMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>`;
        if($("#allCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" name="cb" checked></td>`;
        }
            node +=`<td>${obj.deptNo}</td>
                    <td class="canModifyTd">${obj.deptName}</td>
                    </tr>`

        $("#deptTable tbody").append(node);
    }

    

    //직원 체크 유무
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#deptTable tbody input:checkbox[name='cb']").prop("checked",true);
        }else{
            $("#deptTable tbody input:checkbox[name='cb']").prop("checked",false);
        }
    })
    $("input[name='cb']").click(function(e){
        let total = $("input[name='cb']").length;
        let checked = $("input[name='cb']:checked").length;
        if (total != checked) $("#allCheck").prop("checked",false);
        else $("#allCheck").prop("checked", true);
    })
});