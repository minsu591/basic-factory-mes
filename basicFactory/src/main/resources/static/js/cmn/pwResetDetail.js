$("document").ready(function(){
    $("#okBtn").click(function(){
        console.log("okBtn");
        let empId = $("#empId").val();
        let empPw = $("#newPassword").val();
        //비밀번호 정규식 검사하기!!!!
        
        $.ajax({
            url : 'confirm',
            type : 'POST',
            dataType : 'text',
            contentType : "application/json; charset=UTF-8;",
            data : JSON.stringify({
                empId,
                empPw
            }),
            success : function(result){
                if(result == 1){
                    console.log("성공!");
                }
                console.log(result);

            }
        })
    });
    
        
});