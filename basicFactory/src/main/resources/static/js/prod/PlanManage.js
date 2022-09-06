$("document").ready(function(){
    //담당자 input에 값 넣기
    //체크박스 체크유무
    $("#allCheck").click("change",function(){
        if($("#allCheck").is(":checked")){
            $("#planManageTable tbody input:checkbox[name='chk']").prop("checked",true);
        }else{
            $("#planManageTable tbody input:checkbox[name='chk']").prop("checked",false);
        }
    })
    $("#planManageTable tbody").on("click","input:checkbox[name='chk']",function(e){
        let total = $("input[name='chk']").length;
        let checked = $("input[name='chk']:checked").length;
        if (total != checked) $("#allCheck").prop("checked",false);
        else $("#allCheck").prop("checked", true);
        e.stopPropagation();
    })
    $("#planManageTable tbody").on("click","input:checkbox",function(e){
        e.stopPropagation();
    })

    //선택삭제 버튼
    $("#deleteBtn").on("click",function(){
        let trs = $("#planManageTable tbody tr")
    })
    
});