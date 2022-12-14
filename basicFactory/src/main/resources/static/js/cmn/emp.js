$("document").ready(function(){

    //직원 조회 버튼 이벤트
    $("#selectBtn").on("click",function(){
        let deptName = $("#deptName").val();
        if(deptName == null || deptName == ''){
            $("#deptNo").val('');
        }
        let deptNo = $("#deptNo").val();
        let empId = $("#empId").val();
        let empName = $("#empName").val();

        $.ajax({
            url : 'empView/select',
            methods : 'GET',
            dataType : 'json',
            data : {
                deptNo,
                empId,
                empName
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
                        <td class="cantModifyTd"><input type="checkbox" name="cb"></td>
                        <td class="cantModifyTd">${obj.empVO.empId}</td>
                        <td class="modifyPassword curPo">********</td>
                        <td class="deptName curPo">${obj.deptVO.deptName}</td>`;
        node += makeSelectForPos(obj.empVO.empPos);
        node += `<td>${obj.empVO.empName}</td>
                        <td>${obj.empVO.empEmail}</td>
                        <td>${obj.empVO.empPhone}</td>`;
        if(obj.empVO.empAuth == 1){
            node += `<td><input type="checkbox" checked></td>`;
        }else{
            node += `<td><input type="checkbox"></td>`;
        }
        node += `<td>${obj.empVO.empRemk}</td>
                </tr>`;
        $("#empTable tbody").append(node);
    }

    function makeSelectForPos(cont){
        let node = '<td><select class="curPo">';
        for(clfy of clfyList){
            if(clfy == cont){
                node += `<option value="${clfy}" selected>${clfy}</option>`;
            }else{
                node += `<option value="${clfy}">${clfy}</option>`;
            }
        }
        node += '</select></td>';
        return node;
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