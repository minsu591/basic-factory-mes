$("document").ready(function(){
    let tdInfo;
    //아이디 중복검사 이후에 값을 바꿨는지 검사
    let saveId = '';
    //부서명 포커스 이벤트
    $("tbody").on("click",".modifyPassword",function(){
        tdInfo = $(this);
        //nullTd class 사라지는 if문
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }
        if(tdInfo.prev().hasClass("nullTd")){
            tdInfo.prev().removeClass("nullTd");
        }
        clickTd();
    });
    $("tbody").on("click",".modifyEmpId",function(){
        tdInfo = $(this);
        //nullTd class 사라지는 if문
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }
        if(tdInfo.next().hasClass("nullTd")){
            tdInfo.next().removeClass("nullTd");
        }
        clickTd();
    });
    function clickTd(){
        $("#staticId").val(tdInfo.parent().find("td:eq(1)").text());
        //추가한 행이면 아이디도 모달창 내에서 설정할 수 있게 변경
        if(tdInfo.parent().attr("name") == 'addTr'){
            $("#staticId").removeClass("form-control-plaintext");
            $("#staticId").addClass("form-control").addClass("notConfirmId");
            $("#staticId").attr("disabled",false);
            $("#exId").show()
        }else{
            $("#exId").hide();
        }
        $("#settingPwModal").modal("show");
    }
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
        var id = $("#staticId").val();
        var conPw = $("#confirmPassword").val();
        var pw = $("#inputPassword").val();
        //아이디를 입력색할 수 있다면
        if(!$("#staticId").is('[disabled]')){
            //저장 버튼 눌렀을 때 다시 검사
            
            if($("#staticId").hasClass("notConfirmId") || (saveId != '' && saveId != id)){
                Swal.fire({
                    icon: "warning",
                    title: "아이디 중복검사를 해주세요"
                });
                return false;
            }else{
                tdInfo.parent().find("td:eq(1)").text(id);
            }
        }

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
            alert("비밀번호를 올바르게 작성해주세요.");
            return false;
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
                    Swal.fire({
                        icon: "success",
                        title: "사용 가능한 아이디입니다"
                    });
                    $("#staticId").removeClass("border-danger");
                    $("#staticId").removeClass("notConfirmId");
                    saveId = id;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "이미 존재하는 아이디입니다"
                    });
                    $("#staticId").addClass("border-danger");
                }
            }
        })
    });

    $("#settingPwModal").on("hidden.bs.modal",function(){
        $("#confirmPassword").val('');
        $("#inputPassword").val('');
        $("#staticId").val('');

        $("#staticId").removeClass("border-danger");
        
        $("#confirmPassword").removeClass("border-danger");
        $("#inputPassword").removeClass("border-danger");

        $("#staticId").addClass("form-control-plaintext");
        $("#staticId").removeClass("form-control");
        $("#staticId").attr("disabled",true);
    });

});