$("document").ready(function(){
    $("#okBtn").click(function(){
        let empId = $("#empId").val();
        let empPw = $("#newPw").val();

        if($("#newPw").hasClass("border-danger")){
            Swal.fire({
                icon: "error",
                title: "비밀번호를 올바르게 입력해주세요",
                html: "영어 소문자, 숫자, 특수문자를 하나 이상 포함한<br/> 8~16자의 비밀번호를 입력해야합니다"
              });
            return false;
        }else if($("#confirmPw").hasClass("border-danger")){
            Swal.fire({
                icon: "error",
                title: "비밀번호와 확인 비밀번호를<br> 동일하게 써주세요",
                text: "확인하고 다시 저장해주세요"
              });
            return false;
        }

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
                    Swal.fire({
                        icon: "success",
                        title: "비밀번호가<br> 성공적으로 변경되었습니다"
                      }).then((result) => {
                        if(result.isConfirmed){
                            location.replace("/cmn/login");
                        }
                      });
                      
                }

            }
        })
    });

    $("#newPw").on("propertychange change keyup paste input",function(){
        let empPw = $("#newPw").val();
        var reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(empPw.match(reg) != null){
            $("#newPw").removeClass("border-danger");
        }else{
            $("#newPw").addClass("border-danger");
        }
    });

    $("#confirmPw").on("propertychange change keyup paste input",function(){
        let confirmPw = $("#confirmPw").val();
        let empPw = $("#newPw").val();

        if(confirmPw != empPw){
            $("#confirmPw").addClass("border-danger");
        }else{
            $("#confirmPw").removeClass("border-danger");
        }
    });
    
        
});