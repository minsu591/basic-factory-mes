$("document").ready(function(){
    let tdInfo;
    //td에 부서명 포커스 이벤트
    $("tbody").on("click",".deptName",function(){
        tdInfo = $(this);
        clickEvent();
    });
    //deptName input에 부서명 포커스 이벤트
    $("#deptName").on("click",function(){
        tdInfo = $(this);
        clickEvent();
    })

    function clickEvent(){
        findDept('');
        $("#findDeptModal").modal("show");
    }
    //부서 모달창 조회 이벤트
    $("#findDeptBtn").on("click",function(){
        let deptName = $("#modalDeptName").val();
        findDept(deptName);
    });

    function findDept(deptName){
        $.ajax({
            url : 'empView/dept',
            methods : 'GET',
            dataType :'json',
            data : {
                deptName
            },
            success : function(result){
                $("#findDeptTable tbody tr").remove();
                for(obj of result){
                    deptMakeRow(obj);
                }
            }
        })
    }


    //부서 make Tr
    function deptMakeRow(obj){
        let node = `<tr>
                        <td>${obj.deptNo}</td>
                        <td>${obj.deptName}</td>
                    </tr>`;
        $("#findDeptTable tbody").append(node);
    }

    //부서 TR 선택 이벤트
    $("#findDeptTable tbody").on("click","tr",function(){
        let deptNo = $(this).find("td:eq(0)").text();
        let deptName = $(this).find("td:eq(1)").text();
        if(tdInfo.prop('tagName')=='TD'){
            tdInfo.text(deptName);
            if(tdInfo.parent().attr("name") != 'addTr'){
                tdInfo.trigger("change");
            }
        }else{
            $("#deptNo").val(deptNo);
            $("#deptName").val(deptName);
        }
        
        $("#findDeptModal").modal("hide");
    });
});