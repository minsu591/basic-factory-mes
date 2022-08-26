$("document").ready(function(){
    //직원 조회 버튼 이벤트
    $("#selectBtn").on("click",function(){
        let deptNo = $("#deptNo").val();
        let empId = $("#empId").val();
        let empName = $("#empName").val();

        $.ajax({
            url : 'empView/select',
            methods : 'GET',
            dataType : 'json',
            data : {
                deptNo : deptNo,
                empId : empId,
                empName : empName
            },
            success : function(result){
                $("#empTable tbody tr").remove();
                for(obj of result){
                    empMakeRow(obj);
                }
            }
        })
    })

    //직원 make Tr
    function empMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>
                        <td>${obj.empVO.empId}</td>
                        <td>${obj.empVO.empPw}</td>
                        <td>${obj.deptVO.deptName}</td>
                        <td>${obj.empVO.empPos}</td>
                        <td>${obj.empVO.empName}</td>
                        <td>${obj.empVO.empEmail}</td>
                        <td>${obj.empVO.empPhone}</td>
                        <td>${obj.empVO.empPos}</td>`
        if(obj.empVO.empAuth == 1){
            node += `<td><input type="checkbox" checked></td>`;
        }else{
            node += `<td><input type="checkbox"></td>`;
        }
        node += `<td>${obj.empVO.empRemk}</td>
                </tr>`;
        $("#empTable tbody").append(node);
    }

    //추가 버튼 이벤트
    $("#addBtn").on("click",function(){
        empBlankMakeRow();
    });

    function empBlankMakeRow(){
        let node = `<tr>
                        <td><input type="checkbox" name="cb"></td>`;
        if($("#allCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" name="cb" checked></td>`;
        }
        node += `<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>/td>
                <td><input type="checkbox" checked></td>
                <td></td>
                </tr>`;

        $("#empTable tbody").append(node);
    }

    //직원 체크 유무
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#empTable tbody input:checkbox[name='cb']").prop("checked",true);
        }else{
            $("#empTable tbody input:checkbox[name='cb']").prop("checked",false);
        }
    })
    $("input[name='cb']").click(function(e){
        let total = $("input[name='cb']").length;
        let checked = $("input[name='cb']:checked").length;
        if (total != checked) $("#allCheck").prop("checked",false);
        else $("#allCheck").prop("checked", true);
    })
});