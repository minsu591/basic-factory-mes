$("document").ready(function(){
    //조회 버튼 이벤트
    $("#lineSelectBtn").on("click",function(){
        let lineName = $("#lineName").val();
        $.ajax({
            url : 'lineCode/name',
            methods :'GET',
            data : {
                lineName : lineName
            },
            dataType : 'json',
            success : function(result){
                console.log(result);
                $("#lineTable tbody tr").remove();
                for(obj of result){
                    lineMakeRow(obj);
                }
            }
        })
    });

    function lineMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="lineCb"></td>`;
        if($("#lineAllCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" name="lineCb" checked></td>`
        }
        node += `<td>${obj.lineCdHdCode}</td>
                <td class="canModifyTd">${obj.lineCdHdName}</td>
                </tr>`;
        $("#lineTable tbody").append(node);
    }

    //라인 tr 이벤트
    $("#lineTable tbody").on("click","tr",function(){
        let lineCode = $(this).find("td:eq(1)").text();
        let lineName = $(this).find("td:eq(2)").text();
        
        console.log($("#procLineCode").val()==lineCode);
        if(lineName == null || lineName == '' || $("#procLineCode").val()==lineCode){
            return;
        }
        if($("#lineProcTable tbody").find("tr").length != 0){
            Swal.fire({
                icon: "warning",
                title: "작성중인 내용이 있습니다",
                text: "삭제하고 진행하겠습니까?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "확인",
                cancelButtonText: "취소"
                }).then((result) =>{
                    if(result.isConfirmed){
                        detailSelectAjax(lineCode, lineName);
                    }
            });
        }else{
            detailSelectAjax(lineCode, lineName);
        }
    });

    function detailSelectAjax(lineCode, lineName){
        $("#procLineCode").val(lineCode);
        $("#procLineName").val(lineName);
        if(lineCode != null && lineCode != ''){
            $.ajax({
                url : 'lineCode/dtl',
                methods : 'GET',
                data : {
                    lineCode
                },
                dataType : 'json',
                success :function(result){
                    $("#lineProcTable tbody tr").remove();
                    for(obj of result){
                        procMakeRow(obj);
                    }
                }
            });
        }
    }

    //공정 make row
    function procMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="procCb"></td>
                        <input type="hidden" class="lineCdCode" value="${obj.lineCdCode}">`;
        if($("#procAllCheck").is(":checked")){
            node = `<tr>
                    <input type="hidden" class="lineCdCode" value="${obj.lineCdCode}">
                    <td><input type="checkbox" name="procCb" checked></td>`
        }
        node += `<td>${obj.lineCdOrd}</td>
                <td class="procCode canModifyTd curPo">${obj.procCdCode}</td>
                <td>${obj.procCdName}</td>
                <td class="mchnCode canModifyTd curPo">${obj.mchnCode}</td>
                <td>${obj.mchnName}</td>
                </tr>`;
        $("#lineProcTable tbody").append(node);
    }

    //라인 체크박스 유무
    $("#lineAllCheck").click("change",function(){
        if($("#lineAllCheck").is(":checked")){
            $("#lineTable tbody input:checkbox[name='lineCb']").prop("checked",true);
        }else{
            $("#lineTable tbody input:checkbox[name='lineCb']").prop("checked",false);
        }
    })
    $("input[name='lineCb']").click(function(e){
        e.stopPropagation();
        let total = $("input[name='lineCb']").length;
        let checked = $("input[name='lineCb']:checked").length;
        if (total != checked) $("#lineAllCheck").prop("checked",false);
        else $("#lineAllCheck").prop("checked", true);
    });

    //공정 체크박스 유무
    $("#procAllCheck").click("change",function(){
        if($("#procAllCheck").is(":checked")){
            $("#lineProcTable tbody input:checkbox[name='procCb']").prop("checked",true);
        }else{
            $("#lineProcTable tbody input:checkbox[name='procCb']").prop("checked",false);
        }
    })
    $("input[name='procCb']").click(function(e){
        let total = $("input[name='procCb']").length;
        let checked = $("input[name='procCb']:checked").length;
        if (total != checked) $("#procAllCheck").prop("checked",false);
        else $("#procAllCheck").prop("checked", true);
    })


});