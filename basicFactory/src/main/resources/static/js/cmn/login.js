$("document").ready(function(){
    $("#empPw").on("keyup",function(key){
        if(key.keyCode == 13){
            $("#signInBtn").click();
        }
    });
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
                console.log("result");
                if(result == -1){
                    Swal.fire({
                        icon: "warning",
                        title: "아이디가 존재하지 않습니다."
                      });
                }else if(result == 0){
                    Swal.fire({
                        icon: "warning",
                        title: "비밀번호가 올바르지 않습니다."
                      });
                }else if(result == 1){
                    location.href = 'http://localhost/prod/planView';
                }

            }
        })
    })
        
});