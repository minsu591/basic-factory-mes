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

    $("#addBtn").on("click",function(){
        let node = `<tr>
                        <td><input type="checkbox"></td>`;
        if ($("#allCheck").is(":checked")){
            node = `<tr>
                        <td><input type="checkbox" checked></td>`;
        }
        node +=`<td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`;
        $("#vendorTable tbody").append(node);
    });

    function vendorMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox"></td>
                        <td>${obj.vendCdCode}</td>
                        <td>${obj.empId}</td>
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
    let allCheck = $("#allCheck");
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#vendorTable tbody input:checkbox").prop("checked",true);
        }else{
            $("#vendorTable tbody input:checkbox").prop("checked",false);
        }
    })

    $("#vendorTable tbody").on("change","input:checkbox",function(){
        if(!$("this").is(":checked")){
            $("#allCheck").prop("checked",false);
        }
    });
});