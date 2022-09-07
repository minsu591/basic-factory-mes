$("document").ready(function () {

  //체크박스 체크유무
  $("#allCheck").click("change",function(){
    if($("#allCheck").is(":checked")){
        $("#inspctbody input:checkbox[name='chk']").prop("checked",true);
    }else{
        $("#inspctbody input:checkbox[name='chk']").prop("checked",false);
    }
  });
  $("#inspctbody").on("click","input:checkbox[name='chk']",function(e){
    let total = $("input[name=chk]").length;
    let checked = $("input[name=chk]:checked").length;
    if ((total != checked)) {
      $("#allCheck").prop("checked",false);
    } else {
      $("#allCheck").prop("checked", true);
    }
    e.stopPropagation();
  });


  

  //행추가 이벤트
  $("#addBtn").on("click",function(){
    let node = `<tr name="addTr">
                  <td><input type="checkbox" name="chk"></td>`;
    if ($("#allCheck").is(":checked")){
      node = `<tr>
                <td><input type="checkbox" name="chk" checked ></td>`;
    }
    node +=`<td name="순번"></td>
            <td class="설비코드" name=""></td>
            <td class="설비명"></td>
            <td><input type="date"></td>
            <td><input type="date"></td>
            <td name="조치사항"></td>
            <td name="조치내역"></td>
            <td class="담당자"></td>
            <td name="비고"></td>
        </tr>`;
    $("#inspctbody").append(node);
  });
  
});
