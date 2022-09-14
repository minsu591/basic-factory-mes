$("document").ready(function(){
    let tdInfo;
    //부서명 포커스 이벤트
    $("tbody").on("click",".modifyPassword",function(){
        tdInfo = $(this);
        let empId = tdInfo.prev().text();
        $("#staticId").val(empId);
        //nullTd class 사라지는 if문
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }
        $("#settingPwModal").modal("show");
    });

    $("#inputPassword").off("propertychange change keyup paste input").on("propertychange change keyup paste input",function(idx,el){
        var pw = $("#inputPassword").val();
        //8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
        var reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(pw.match(reg) != null){
            $("#inputPassword").removeClass("border-danger");
        }else{
            $("#inputPassword").addClass("border-danger");
        }
    });

    $("#confirmPassword").off("propertychange change keyup paste input").on("propertychange change keyup paste input",function(idx,el){
        var conPw = $("#confirmPassword").val();
        var pw = $("#inputPassword").val();
        //8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
        if(pw == conPw){
            $("#confirmPassword").removeClass("border-danger");
        }else{
            $("#confirmPassword").addClass("border-danger");
        }
    });

    $("#okBtn").off("click").on("click",function(){
        var conPw = $("#confirmPassword").val();
        var pw = $("#inputPassword").val();

        //비밀번호 확인
        var reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(pw.match(reg) != null && conPw == pw){
            tdInfo.parent().find("td:eq(2)").text("********");
            tdInfo.parent().find("input[class='modPw']").val(pw);
            tdInfo.trigger("change");
            $("#settingPwModal").modal("hide");
        }else if(pw.match(reg) != null){
            //정규식만 충족, 비밀번호랑 비밀번호 확인 동일 X
            Swal.fire({
                icon: "warning",
                title: "비밀번호 확인란에서 비밀번호를 동일하게 작성해주세요",
                text: "수정 후 다시 저장해주세요"
            });
            return false;
        }else if(pw == conPw){
            //비밀번호랑 비밀번호 확인만 동일, 정규식 충족 X
            Swal.fire({
                icon: "warning",
                title: "비밀번호를 올바르게 설정해주세요",
                text: "비밀번호는 영문, 숫자, 특수문자를 최소 한가지씩 포함하는 8 ~ 16자이어야 합니다"
            });
            return false;
        }else{
            Swal.fire({
                icon: "warning",
                title: "비밀번호를 올바르게 설정해주세요"
            });
            return false;
        }

        
    });

    $("#settingPwModal").on("hidden.bs.modal",function(){
        $("#confirmPassword").val('');
        $("#inputPassword").val('');
        $("#confirmPassword").removeClass("border-danger");
        $("#inputPassword").removeClass("border-danger");
    });

});