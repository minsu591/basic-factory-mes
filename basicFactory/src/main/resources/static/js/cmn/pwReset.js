$("document").ready(function(){
    $("#okBtn").click(function(){
        let empId = $("#empId").val();
        let empName = $("#empName").val();
        let empEmail = $("#empEmail").val();
        let res = true;

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
                    Swal.fire({
                        icon: "error",
                        title: "아이디가 존재하지 않습니다"
                      });
                      res = false;
                      return false;
                }else if(result == -2){
                    Swal.fire({
                        icon: "error",
                        title: "아이디와 이름이 일치하지 않습니다"
                      });
                      res = false;
                    return false;
                }else if(result == -3){
                    Swal.fire({
                        icon: "error",
                        title: "아이디와 이메일이<br> 일치하지 않습니다"
                      });
                      res = false;
                    return false;
                }
                //다 일치했을 때
                console.log("중간");
                Swal.fire({
                    icon: "success",
                    title: "비밀번호 재설정 메일이 <br>성공적으로 발송되었습니다",
                    text: "메일 전송까지 최대 1분이 소요될 수 있습니다. <br> 10분 내에 확인하고 비밀번호를 재설정해주세요"
                }
            }
        });
        // if(res){
        //     console.log("마지막");
        //     Swal.fire({
        //         icon: "success",
        //         title: "비밀번호 재설정 메일이 <br>성공적으로 발송되었습니다",
        //         text: "메일 전송까지 최대 1분이 소요될 수 있습니다. <br> 10분 내에 확인하고 비밀번호를 재설정해주세요"
        //     });
        // }
    });
    
        
});