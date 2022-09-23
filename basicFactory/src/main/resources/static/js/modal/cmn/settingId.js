$("document").ready(function(){
    let tdInfo;
    //아이디 중복검사 이후에 값을 바꿨는지 검사
    let saveId = '';
    //부서명 포커스 이벤트
    var pattern = /[\u0000-\u007f]|([\u0080-\u07ff]|(.))/g;
    $("tbody").on("click",".modifyEmpId",function(){
        tdInfo = $(this);
        //nullTd class 사라지는 if문
        if(tdInfo.hasClass("nullTd")){
            tdInfo.removeClass("nullTd");
        }
        clickTd();
    });

    function clickTd(){
        $("#idStaticId").val(tdInfo.parent().find("td:eq(1)").text());
        //추가한 행이면 아이디도 모달창 내에서 설정할 수 있게 변경
        $("#idStaticId").removeClass("form-control-plaintext");
        $("#idStaticId").addClass("form-control").addClass("notConfirmId");
        $("#settingIdModal").modal("show");
    }
    
    //아이디창 입력
    $("#idStaticId").off("propertychange change keyup paste input").on("propertychange change keyup paste input",function(idx,el){
        let empId = $("#idStaticId").val();
        let idByte = empId.replace(pattern, "$&$1$2").length;
        if(parseInt(idByte) > 20){
            $("#idStaticId").addClass("nullTd");
        }else{
            if($("#idStaticId").hasClass("nullTd")){
                $("#idStaticId").removeClass("nullTd");
            }
        }
    });


    $("#idOkBtn").off("click").on("click",function(){
        var id = $("#idStaticId").val();
        let idByte = id.replace(pattern, "$&$1$2").length;

        //아이디를 입력색할 수 있다면
        if($("#idStaticId").hasClass("notConfirmId") || (saveId != '' && saveId != id)){
            Swal.fire({
                icon: "warning",
                title: "아이디 중복검사를 해주세요"
            });
            return false;
        }else if(parseInt(idByte) > 20){
            Swal.fire({
                icon: "warning",
                title: "아이디는 20byte 이하로 설정해주세요"
            });
            return false;
        }else{
            tdInfo.parent().find("td:eq(1)").text(id);
            $("#settingIdModal").modal("hide");
        }

    });

    $("#idExId").off("click").on("click",function(idx,el){
        let id = $("#idStaticId").val();
        id = id.replace(/ /g,"");
        $("#idStaticId").val(id);
        
        if(id == null || id == ''){
            Swal.fire({
                icon: "warning",
                title: "아이디가 공백입니다"
            });
            return false;
        }
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
                    $("#idStaticId").removeClass("border-danger");
                    $("#idStaticId").removeClass("notConfirmId");
                    saveId = id;
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "이미 존재하는 아이디입니다"
                    });
                    $("#idStaticId").addClass("border-danger");
                }
            }
        })
    });

    $("#settingIdModal").on("hidden.bs.modal",function(){
        $("#staticId").val('');
        $("#staticId").removeClass("border-danger");
        
        $("#staticId").addClass("form-control-plaintext");
        $("#staticId").removeClass("form-control");
    });

});