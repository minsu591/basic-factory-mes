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
                <td>${obj.lineCdHdName}</td>
                </tr>`;
        $("#lineTable tbody").append(node);
    }

    //라인 tr 이벤트
    $("#lineTable tbody").on("click","tr",function(){
        let lineCode = $(this).find("td:eq(1)").text();
        let lineName = $(this).find("td:eq(2)").text();
        $("#procLineCode").val(lineCode);
        $("#procLineName").val(lineName);

        $.ajax({
            url : 'lineCode/dtl',
            methods : 'GET',
            data : {
                lineCode : lineCode
            },
            dataType : 'json',
            success :function(result){
                $("#lineProcTable tbody tr").remove();
                for(obj of result){
                    procMakeRow(obj);
                }
            }
        })
    });

    //라인 추가 버튼
    $("#lineAddBtn").on("click",function(){
        let node = `<tr>
            <td><input type="checkbox" name="lineCb"></td>`;
            if($("#lineAllCheck").is(":checked")){
                node = `<tr>
                        <td><input type="checkbox" name="lineCb" checked></td>`;
            }
            node += `<td></td>
                    <td></td>
                </tr>`;
            $("#lineTable tbody").append(node);
    });

    //공정 추가 버튼
    $("#procAddBtn").on("click",function(){
        if($("#procLineName").val() == ''){
            alert("라인을 선택하고 공정을 추가해주세요.")
        }else{
            let node = `<tr>
            <td><input type="checkbox" name="procCb"></td>`;
            if($("#procAllCheck").is(":checked")){
                node = `<tr>
                        <td><input type="checkbox" name="procCb" checked></td>`;
            }
            node += `<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            $("#lineProcTable tbody").append(node);
        }
    });


    //공정 make row
    function procMakeRow(obj){
        let node = `<tr>
                        <td><input type="checkbox" name="procCb"></td>`;
        if($("#procAllCheck").is(":checked")){
            node = `<tr>
                    <td><input type="checkbox" name="procCb" checked></td>`
        }
        node += `<td>${obj.procCdCode}</td>
                <td>${obj.procCdName}</td>
                <td>${obj.lineCdOrd}</td>
                <td>${obj.mchnCode}</td>
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


    //라인 추가 버튼

});