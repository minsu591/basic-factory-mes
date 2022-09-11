$("document").ready(function(){
    $("#okBtn").click(function(){
        let empId = $("#empId").val();
        let empName = $("#empName").val();
        let empEmail = $("#empEmail").val();
        
        // if(empId == null || empId == ''){
        //     alert("아이디가 공백입니다.");
        //     return false;
        // }else if(empName == null || empName == ''){
        //     alert("이름이 공백입니다.");
        //     return false;
        // }else if(empEmail == null || empEmail == ''){
        //     alert("확인 이메일이 공백입니다.");
        //     return false;
        // }

        $.ajax({
            url : 'reset/empId',
            type : 'POST',
            dataType : 'text',
            contentType : "application/json; charset=UTF-8;",
            data : JSON.stringify({
                empId,
                empName,
                empEmail
            }),
            success : function(result){
                // -1 아이디가 존재하지 않음
                // -2 아이디와 이름이 일치하지 않음
                // -3 아이디와 이메일이 일치하지 않음
                // 1 정상적으로 email 전송 완료
                if(result == -1){
                    alert("아이디가 존재하지 않습니다.");
                }else if(result == -2){
                    alert("아이디와 이름이 일치하지 않습니다.")
                }else if(result == -3){
                    alert("아이디와 이메일이 일치하지 않습니다.")
                }else if(result == 1){
                    //다 일치했을 때
                    alert("이메일을 성공적으로 발송했습니다. 5분 내에 비밀번호를 재설정해주세요.")
                }

            }
        })
    });
    
        
});