$("document").ready(function(){
    

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