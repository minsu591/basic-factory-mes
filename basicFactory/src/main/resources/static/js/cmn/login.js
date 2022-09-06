$("document").ready(function(){
    $("#signInBtn").click(function(){
        let empId = $("#empId").val();
        let empPw = $("#empPw").val();

        $.ajax({
            url : 'login/check',
            type : 'POST',
            dataType : 'text',
            contentType : "application/json; charset=UTF-8;",
            data : JSON.stringify({
                empId,
                empPw
            }),
            success : function(result){
                //-1 : 존재하는 아이디가 아님
                // 0 : 비밀번호 오류
                // 1 : 로그인
                if(result == -1){
                    alert("아이디가 존재하지 않습니다.");
                }else if(result == 0){
                    alert("비밀번호가 올바르지 않습니다.")
                }else if(result == 1){
                    let h = window.location.href;
                    if(h == 'http://localhost/cmn/login'){
                        location.href = 'http://localhost/cmn/empView';
                    }else{
                        location.href = window.location.href;
                    }
                }

            }
        })
    })

});