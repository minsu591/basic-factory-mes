$("document").ready(function(){
    let tdInfo;
    //부서명 포커스 이벤트
    $("tbody").on("click",".password",function(){
        tdInfo = $(this);
        $("#staticId").val(tdInfo.parent().find("td:eq(1)").text());
        //추가한 행이면 아이디도 모달창 내에서 설정할 수 있게 변경
        if(tdInfo.parent().attr("name") == 'addTr'){
            $("#staticId").removeClass("form-control-plaintext");
            $("#staticId").addClass("form-control");
            $("#staticId").attr("readonly",false);
            $("#exId").show()
        }else{
            $("#exId").hide();
        }
        $("#settingPwModal").modal("show");
    });
    $("#inputPassword").off("propertychange change keyup paste input").on("propertychange change keyup paste input",function(idx,el){
        var pw = $("#inputPassword").val();
        //하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
        var reg = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
        if(pw.match(reg)){
            $("#inputPassword").removeClass("border-danger");
        }else{
            $("#inputPassword").addClass("border-danger");
        }
    });

    $("#confirmPassword").off("propertychange change keyup paste input").on("propertychange change keyup paste input",function(idx,el){
        var conPw = $("#confirmPassword").val();
        var pw = $("#inputPassword").val();
        //하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자 정규식
        if(pw == conPw){
            $("#confirmPassword").removeClass("border-danger");
        }else{
            $("#confirmPassword").addClass("border-danger");
        }
    });

    $("#okBtn").off("click").on("click",function(){
        var conPw = $("#confirmPassword").val();
        var pw = $("#inputPassword").val();
        var reg = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
        if(pw.match(reg) && conPw == pw){
            tdInfo.parent().find("td:eq(2)").text("********");
            tdInfo.parent().find("input[class='modPw']").val(pw);
            tdInfo.trigger("change");
            $("#settingPwModal").modal("hide");
        }else if(pw.match(reg)){
            alert("비밀번호 확인란에서 비밀번호를 동일하게 작성해주세요.");
            return false;
        }else if(pw == conPw){
            alert("8자 이상 문자열, 하나 이상의 숫자, 특수문자를 포함하는 비밀번호를 입력해주세요.");
            return false;
        }else{
            alert("비밀번호를 올바르게 작성해주세요.");
            return false;
        }

        if(!$("#staticId").is('[readonly]')){
            if($("#staticId").hasClass("border-danger")){
                alert("아이디 중복검사를 해주세요.");
                return false;
            }else{
                tdInfo.parent().find("td:eq(1)").text($("#staticId").val());
            }
        }
    });

    $("#exId").off("click").on("click",function(idx,el){
        let id = $("#staticId").val();
        //id 중복 검사
        $.ajax({
            url : 'emp/findId',
            type : 'GET',
            dataType : 'json',
            success : function(result){
                let flag = true;
                for(obj of result){
                    if(obj.empVO.empId == id){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    alert("사용 가능한 아이디입니다.");
                    $("#staticId").removeClass("border-danger");
                }else{
                    alert("이미 존재하는 아이디입니다.");
                    $("#staticId").addClass("border-danger");
                }
            }
        })
    });

    $("#settingPwModal").on("hidden.bs.modal",function(){
        $("#confirmPassword").val('');
        $("#inputPassword").val('');
        $("#staticId").val('');
        $("#confirmPassword").removeClass("border-danger");
        $("#inputPassword").removeClass("border-danger");

        $("#staticId").addClass("form-control-plaintext");
        $("#staticId").removeClass("form-control");
        $("#staticId").attr("readonly",true);
    });

});