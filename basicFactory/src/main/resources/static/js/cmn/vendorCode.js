$("document").ready(function(){
    //조회버튼 click 이벤트
    $("#selectBtn").on("click",function(){
        let vendorName = $("#vendorName").val();
        $.ajax({
            url : 'vendorCode/name',
            method : 'GET',
            dataType : 'json',
            data : {
                vendorName : vendorName
            },
            success :function(result){
                $("#vendorTable tbody tr").remove();
                for(obj of result){
                    vendorMakeRow(obj);
                }
            }
        })
    });

    function vendorMakeRow(obj){
        let node = `<tr>
                        <td class="cantModifyTd"><input type="checkbox" name="chk"></td>
                        <td class="cantModifyTd">${obj.vendCdCode}</td>
                        <td class="empId">${obj.empId}</td>
                        <td>${obj.vendCdClfy}</td>
                        <td>${obj.vendCdNm}</td>
                        <td>${obj.vendCdRegNo}</td>
                        <td>${obj.vendCdPhone}</td>
                        <td>${obj.vendCdAdr}</td>
                        <td>${obj.vendCdRemk}</td>
                    </tr>`;
        $("#vendorTable tbody").append(node);
    }

    

     //체크박스 체크유무
     $("#allCheck").click("change",function(){
         if($("#allCheck").is(":checked")){
             $("#vendorTable tbody input:checkbox").prop("checked",true);
         }else{
             $("#vendorTable tbody input:checkbox").prop("checked",false);
         }
     })
       $("input[name=chk]").click(function(){
             let total = $("input[name=chk]").length;
             let checked = $("input[name=chk]:checked").length;
             if (total != checked) $("#allCheck").prop("checked",false);
             else $("#allCheck").prop("checked", true);
       })
});