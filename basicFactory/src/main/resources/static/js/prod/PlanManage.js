$("document").ready(function(){
    //추가 버튼
    $("#addBtn").on("click",function(){
        let node = `<tr>
                    <td><input type="checkbox"></td>`;
        //allCheck의 체크박스가 체크되어있으면 추가되는 행도 체크된 채로 나오기
        if($("#allCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" checked></td>`
        }
        node += `<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`
        console.log(node);
        $("#planManageTable tbody").append(node);
    });

    //체크박스 체크유무
    let allCheck = $("#allCheck");
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#planManageTable tbody input:checkbox").prop("checked",true);
        }else{
            $("#planManageTable tbody input:checkbox").prop("checked",false);
        }
    })

    $("#planManageTable tbody").on("change","input:checkbox",function(){
        if(!$("this").is(":checked")){
            $("#allCheck").prop("checked",false);
        }
    });

    //선택삭제 버튼
    $("#deleteBtn").on("click",function(){
        let trs = $("#planManageTable tbody tr")
    })
    
});